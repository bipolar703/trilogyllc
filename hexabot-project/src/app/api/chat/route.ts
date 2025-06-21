import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateResponse, validateResponse, extractMessageInsights } from '@/lib/ai/gemini';
import { createLeadFromEscalation, sendLeadNotification } from '@/lib/crm/leads';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationId, sessionId } = body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Message is too long. Please keep messages under 2000 characters.' },
        { status: 400 }
      );
    }

    let currentConversationId = conversationId;

    // Create new conversation if none exists
    if (!currentConversationId) {
      const { data: newConversation, error: conversationError } = await supabaseAdmin
        .from('conversations')
        .insert({
          session_id: sessionId,
          status: 'active',
        })
        .select()
        .single();

      if (conversationError) {
        console.error('Error creating conversation:', conversationError);
        return NextResponse.json(
          { error: 'Failed to create conversation' },
          { status: 500 }
        );
      }

      currentConversationId = newConversation.id;
    }

    // Get conversation history for context
    const { data: conversationHistory, error: historyError } = await supabaseAdmin
      .from('messages')
      .select('*')
      .eq('conversation_id', currentConversationId)
      .order('created_at', { ascending: true });

    if (historyError) {
      console.error('Error fetching conversation history:', historyError);
      // Continue without history rather than failing
    }

    // Extract insights from user message
    const messageInsights = extractMessageInsights(message);

    // Save user message to database
    const { data: userMessage, error: userMessageError } = await supabaseAdmin
      .from('messages')
      .insert({
        conversation_id: currentConversationId,
        role: 'user',
        content: message,
        metadata: {
          timestamp: new Date().toISOString(),
          sessionId,
          insights: messageInsights,
        },
      })
      .select()
      .single();

    if (userMessageError) {
      console.error('Error saving user message:', userMessageError);
      return NextResponse.json(
        { error: 'Failed to save user message' },
        { status: 500 }
      );
    }

    // Generate AI response using Gemini
    const aiResponse = await generateResponse(message, conversationHistory || []);

    // Validate the AI response
    const validation = validateResponse(aiResponse.content);
    if (!validation.isValid) {
      console.warn('AI response validation failed:', validation.issues);
      // Log the issues but continue with the response
    }

    // Handle function calls (escalation)
    let leadCreationResult = null;
    if (aiResponse.functionCall && aiResponse.functionCall.name === 'escalateToHuman') {
      try {
        // Create conversation summary for context
        const contextSummary = `Customer: ${aiResponse.functionCall.parameters.userName} (${aiResponse.functionCall.parameters.userEmail})
Service Interest: ${aiResponse.functionCall.parameters.serviceInterest}
Urgency: ${aiResponse.functionCall.parameters.urgencyLevel}
Request: ${aiResponse.functionCall.parameters.summaryOfRequest}
Escalation Reason: ${aiResponse.functionCall.parameters.escalationReason}

Recent conversation context:
${conversationHistory?.slice(-3).map(msg => `${msg.role}: ${msg.content}`).join('\n') || 'No previous context'}
Current message: ${message}`;

        // Create lead and escalation records
        leadCreationResult = await createLeadFromEscalation({
          conversationId: currentConversationId,
          escalationData: aiResponse.functionCall.parameters,
          sessionId,
          contextSummary,
        });

        if (leadCreationResult.success) {
          console.log('Lead created successfully:', leadCreationResult.lead.id);
          
          // Send notification (async, don't wait for it)
          sendLeadNotification(leadCreationResult.lead, leadCreationResult.escalation)
            .catch(error => console.error('Failed to send lead notification:', error));
        } else {
          console.error('Failed to create lead:', leadCreationResult.error);
        }
      } catch (error) {
        console.error('Error handling function call:', error);
      }
    }

    // Save assistant response to database
    const { data: assistantMessage, error: assistantMessageError } = await supabaseAdmin
      .from('messages')
      .insert({
        conversation_id: currentConversationId,
        role: 'assistant',
        content: aiResponse.content,
        metadata: {
          timestamp: new Date().toISOString(),
          sessionId,
          responseType: 'ai_generated',
          userMessageId: userMessage.id,
          aiMetadata: {
            responseTime: aiResponse.responseTime,
            shouldEscalate: aiResponse.shouldEscalate,
            tokensUsed: aiResponse.tokensUsed,
            validationIssues: validation.issues,
            functionCall: aiResponse.functionCall,
            leadCreated: leadCreationResult?.success || false,
            leadId: leadCreationResult?.lead?.id || null,
          },
        },
      })
      .select()
      .single();

    if (assistantMessageError) {
      console.error('Error saving assistant message:', assistantMessageError);
      return NextResponse.json(
        { error: 'Failed to save assistant message' },
        { status: 500 }
      );
    }

    // Update conversation status if escalation is needed
    if (aiResponse.shouldEscalate || aiResponse.functionCall) {
      await supabaseAdmin
        .from('conversations')
        .update({ 
          status: 'escalated',
          escalated_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          customer_name: aiResponse.functionCall?.parameters.userName || null,
          customer_email: aiResponse.functionCall?.parameters.userEmail || null,
        })
        .eq('id', currentConversationId);
    } else {
      // Just update the timestamp
      await supabaseAdmin
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', currentConversationId);
    }

    // Return response
    return NextResponse.json({
      success: true,
      message: assistantMessage,
      conversationId: currentConversationId,
      userMessage: userMessage,
      aiMetadata: {
        responseTime: aiResponse.responseTime,
        shouldEscalate: aiResponse.shouldEscalate,
        messageInsights: messageInsights,
        functionCall: aiResponse.functionCall,
        leadCreated: leadCreationResult?.success || false,
        leadId: leadCreationResult?.lead?.id || null,
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Return a helpful error message
    return NextResponse.json(
      { 
        error: 'I apologize, but I\'m experiencing technical difficulties. Please contact our team directly at +962 79 687 2273 or info@trilogytradingllc.com for immediate assistance.',
        fallback: true
      },
      { status: 500 }
    );
  }
}