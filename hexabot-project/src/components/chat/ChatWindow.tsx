'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageBubble, TypingIndicator } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { Message } from '@/lib/supabase';
import { generateSessionId } from '@/lib/utils';
import { Bot, Users, Clock } from 'lucide-react';

interface ChatWindowProps {
  className?: string;
}

export function ChatWindow({ className }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [sessionId] = useState(() => generateSessionId());
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      created_at: new Date().toISOString(),
      conversation_id: 'temp',
      role: 'assistant',
      content: `Hello! I'm Hexabot, your digital consultant for Trilogy Trading LLC. I'm here to help you with:

• Strategic Product Sourcing
• Logistics Optimization  
• Trade Documentation Services
• B2B Trade Solutions

How can I assist you today?`,
      metadata: {}
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Create user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      created_at: new Date().toISOString(),
      conversation_id: conversationId || 'temp',
      role: 'user',
      content,
      metadata: {}
    };

    // Add user message to state
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Send message to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          conversationId,
          sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      // Update conversation ID if this is the first message
      if (!conversationId && data.conversationId) {
        setConversationId(data.conversationId);
      }

      // Add assistant response
      const assistantMessage: Message = {
        id: data.message.id,
        created_at: data.message.created_at,
        conversation_id: data.message.conversation_id,
        role: 'assistant',
        content: data.message.content,
        metadata: data.message.metadata || {}
      };

      // Simulate typing delay for better UX
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      
      // Add error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        created_at: new Date().toISOString(),
        conversation_id: conversationId || 'temp',
        role: 'system',
        content: 'Sorry, I encountered an error. Please try again.',
        metadata: {}
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  return (
    <Card className={`flex flex-col h-[600px] max-w-2xl mx-auto shadow-lg ${className}`}>
      {/* Chat Header */}
      <CardHeader className="flex-shrink-0 border-b border-gray-200 bg-gradient-to-r from-trilogy-blue to-trilogy-navy text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Hexabot</h3>
              <p className="text-sm text-blue-100">Digital Consultant • Trilogy Trading LLC</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-blue-100">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>24/7</span>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isTyping && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>

      {/* Chat Input */}
      <div className="flex-shrink-0">
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          isLoading={isLoading}
          placeholder="Ask me about global trade, sourcing, logistics, or documentation..."
        />
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-4 py-2 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span>Powered by Hexabot AI</span>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>Human agents available</span>
            </div>
          </div>
          <div className="text-right">
            <div>Session: {sessionId.slice(-8)}</div>
            {conversationId && (
              <div>Conv: {conversationId.slice(-8)}</div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}