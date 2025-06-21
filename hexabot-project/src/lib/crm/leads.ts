import { supabaseAdmin } from '@/lib/supabase';
import type { NewLead, NewEscalation, Lead, Escalation } from '@/lib/supabase';
import type { EscalationData } from '@/lib/ai/gemini';

export interface CreateLeadParams {
  conversationId: string;
  escalationData: EscalationData;
  sessionId: string;
  contextSummary: string;
}

export interface LeadCreationResult {
  lead: Lead;
  escalation: Escalation;
  success: boolean;
  error?: string;
}

/**
 * Create a new lead and escalation record from AI function call
 */
export async function createLeadFromEscalation(params: CreateLeadParams): Promise<LeadCreationResult> {
  const { conversationId, escalationData, sessionId, contextSummary } = params;

  try {
    // Calculate qualification score
    const qualificationScore = calculateLeadQualificationScore(escalationData);

    // Determine escalation type based on reason
    const escalationType = determineEscalationType(escalationData.escalationReason);

    // Create lead record
    const leadData: NewLead = {
      conversation_id: conversationId,
      name: escalationData.userName,
      email: escalationData.userEmail,
      phone: escalationData.userPhone || null,
      company: escalationData.userCompany || null,
      summary: escalationData.summaryOfRequest,
      service_interest: escalationData.serviceInterest,
      urgency_level: escalationData.urgencyLevel,
      qualification_score: qualificationScore,
      source: 'hexabot',
      status: 'new',
      metadata: {
        sessionId,
        escalationReason: escalationData.escalationReason,
        createdViaFunction: true,
        originalRequest: escalationData.summaryOfRequest,
      },
    };

    const { data: lead, error: leadError } = await supabaseAdmin
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (leadError) {
      console.error('Error creating lead:', leadError);
      throw new Error(`Failed to create lead: ${leadError.message}`);
    }

    // Create escalation record
    const escalationData_record: NewEscalation = {
      conversation_id: conversationId,
      lead_id: lead.id,
      escalation_reason: escalationData.escalationReason,
      escalation_type: escalationType,
      context_summary: contextSummary,
      priority: mapUrgencyToPriority(escalationData.urgencyLevel),
      customer_info: {
        name: escalationData.userName,
        email: escalationData.userEmail,
        phone: escalationData.userPhone,
        company: escalationData.userCompany,
      },
      status: 'pending',
      metadata: {
        sessionId,
        serviceInterest: escalationData.serviceInterest,
        qualificationScore,
        createdViaFunction: true,
      },
    };

    const { data: escalation, error: escalationError } = await supabaseAdmin
      .from('escalations')
      .insert(escalationData_record)
      .select()
      .single();

    if (escalationError) {
      console.error('Error creating escalation:', escalationError);
      throw new Error(`Failed to create escalation: ${escalationError.message}`);
    }

    // Update conversation status
    await supabaseAdmin
      .from('conversations')
      .update({
        status: 'escalated',
        escalated_at: new Date().toISOString(),
        customer_name: escalationData.userName,
        customer_email: escalationData.userEmail,
      })
      .eq('id', conversationId);

    return {
      lead,
      escalation,
      success: true,
    };

  } catch (error) {
    console.error('Error in createLeadFromEscalation:', error);
    return {
      lead: {} as Lead,
      escalation: {} as Escalation,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Calculate lead qualification score based on provided information
 */
function calculateLeadQualificationScore(data: EscalationData): number {
  let score = 0;

  // Base score for service interest
  const serviceScores = {
    strategic_sourcing: 30,
    logistics_optimization: 25,
    trade_documentation: 20,
    b2b_solutions: 35,
    general: 10,
  };
  score += serviceScores[data.serviceInterest] || 10;

  // Urgency multiplier
  const urgencyScores = {
    urgent: 30,
    high: 20,
    medium: 10,
    low: 5,
  };
  score += urgencyScores[data.urgencyLevel] || 5;

  // Contact information bonus
  if (data.userEmail) score += 15;
  if (data.userPhone) score += 15;
  if (data.userCompany) score += 10;

  // Summary quality bonus (longer, more detailed summaries score higher)
  if (data.summaryOfRequest.length > 100) score += 10;
  if (data.summaryOfRequest.length > 200) score += 5;

  // Ensure score is within bounds
  return Math.min(100, Math.max(0, score));
}

/**
 * Determine escalation type based on escalation reason
 */
function determineEscalationType(reason: string): 'human_request' | 'complex_query' | 'pricing_discussion' | 'technical_issue' | 'complaint' | 'urgent_matter' {
  const lowerReason = reason.toLowerCase();

  if (lowerReason.includes('pricing') || lowerReason.includes('quote') || lowerReason.includes('cost')) {
    return 'pricing_discussion';
  }
  if (lowerReason.includes('urgent') || lowerReason.includes('asap') || lowerReason.includes('immediately')) {
    return 'urgent_matter';
  }
  if (lowerReason.includes('technical') || lowerReason.includes('specification') || lowerReason.includes('regulation')) {
    return 'technical_issue';
  }
  if (lowerReason.includes('complaint') || lowerReason.includes('problem') || lowerReason.includes('issue')) {
    return 'complaint';
  }
  if (lowerReason.includes('complex') || lowerReason.includes('detailed') || lowerReason.includes('specific')) {
    return 'complex_query';
  }

  return 'human_request';
}

/**
 * Map urgency level to escalation priority
 */
function mapUrgencyToPriority(urgency: string): 'low' | 'medium' | 'high' | 'urgent' {
  const urgencyMap: Record<string, 'low' | 'medium' | 'high' | 'urgent'> = {
    low: 'low',
    medium: 'medium',
    high: 'high',
    urgent: 'urgent',
  };

  return urgencyMap[urgency] || 'medium';
}

/**
 * Get lead statistics for analytics
 */
export async function getLeadStatistics() {
  try {
    const { data: stats, error } = await supabaseAdmin
      .from('analytics_summary')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching lead statistics:', error);
      return null;
    }

    return stats;
  } catch (error) {
    console.error('Error in getLeadStatistics:', error);
    return null;
  }
}

/**
 * Get recent leads for dashboard
 */
export async function getRecentLeads(limit: number = 10) {
  try {
    const { data: leads, error } = await supabaseAdmin
      .from('leads')
      .select(`
        *,
        conversations:conversation_id (
          session_id,
          created_at
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent leads:', error);
      return [];
    }

    return leads || [];
  } catch (error) {
    console.error('Error in getRecentLeads:', error);
    return [];
  }
}

/**
 * Get pending escalations for dashboard
 */
export async function getPendingEscalations(limit: number = 10) {
  try {
    const { data: escalations, error } = await supabaseAdmin
      .from('escalations')
      .select(`
        *,
        leads:lead_id (
          name,
          email,
          company,
          service_interest
        ),
        conversations:conversation_id (
          session_id
        )
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching pending escalations:', error);
      return [];
    }

    return escalations || [];
  } catch (error) {
    console.error('Error in getPendingEscalations:', error);
    return [];
  }
}

/**
 * Update lead status
 */
export async function updateLeadStatus(leadId: string, status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost', notes?: string) {
  try {
    const updateData: any = {
      status,
      updated_at: new Date().toISOString(),
    };

    if (notes) {
      updateData.notes = notes;
    }

    const { data, error } = await supabaseAdmin
      .from('leads')
      .update(updateData)
      .eq('id', leadId)
      .select()
      .single();

    if (error) {
      console.error('Error updating lead status:', error);
      return { success: false, error: error.message };
    }

    return { success: true, lead: data };
  } catch (error) {
    console.error('Error in updateLeadStatus:', error);
    return { success: false, error: 'Unknown error occurred' };
  }
}

/**
 * Send notification email for new lead (placeholder for future implementation)
 */
export async function sendLeadNotification(lead: Lead, escalation: Escalation): Promise<boolean> {
  try {
    // TODO: Implement email notification using Resend or similar service
    // For now, just log the notification
    console.log('New lead notification:', {
      leadId: lead.id,
      customerName: lead.name,
      customerEmail: lead.email,
      serviceInterest: lead.service_interest,
      urgencyLevel: lead.urgency_level,
      qualificationScore: lead.qualification_score,
      escalationReason: escalation.escalation_reason,
    });

    // Simulate successful notification
    return true;
  } catch (error) {
    console.error('Error sending lead notification:', error);
    return false;
  }
}