import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role key for admin operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Database types
export interface Database {
  public: {
    Tables: {
      conversations: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id: string | null;
          session_id: string | null;
          status: 'active' | 'escalated' | 'resolved' | 'abandoned';
          customer_email: string | null;
          customer_name: string | null;
          escalated_at: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string | null;
          session_id?: string | null;
          status?: 'active' | 'escalated' | 'resolved' | 'abandoned';
          customer_email?: string | null;
          customer_name?: string | null;
          escalated_at?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string | null;
          session_id?: string | null;
          status?: 'active' | 'escalated' | 'resolved' | 'abandoned';
          customer_email?: string | null;
          customer_name?: string | null;
          escalated_at?: string | null;
        };
      };
      messages: {
        Row: {
          id: string;
          created_at: string;
          conversation_id: string;
          role: 'user' | 'assistant' | 'system';
          content: string;
          metadata: Record<string, any>;
        };
        Insert: {
          id?: string;
          created_at?: string;
          conversation_id: string;
          role: 'user' | 'assistant' | 'system';
          content: string;
          metadata?: Record<string, any>;
        };
        Update: {
          id?: string;
          created_at?: string;
          conversation_id?: string;
          role?: 'user' | 'assistant' | 'system';
          content?: string;
          metadata?: Record<string, any>;
        };
      };
      leads: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          conversation_id: string | null;
          name: string | null;
          email: string | null;
          phone: string | null;
          company: string | null;
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
          summary: string;
          service_interest: 'strategic_sourcing' | 'logistics_optimization' | 'trade_documentation' | 'b2b_solutions' | 'general' | null;
          urgency_level: 'low' | 'medium' | 'high' | 'urgent';
          qualification_score: number;
          source: string | null;
          notes: string | null;
          assigned_to: string | null;
          follow_up_date: string | null;
          metadata: Record<string, any>;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          conversation_id?: string | null;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          company?: string | null;
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
          summary: string;
          service_interest?: 'strategic_sourcing' | 'logistics_optimization' | 'trade_documentation' | 'b2b_solutions' | 'general' | null;
          urgency_level?: 'low' | 'medium' | 'high' | 'urgent';
          qualification_score?: number;
          source?: string | null;
          notes?: string | null;
          assigned_to?: string | null;
          follow_up_date?: string | null;
          metadata?: Record<string, any>;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          conversation_id?: string | null;
          name?: string | null;
          email?: string | null;
          phone?: string | null;
          company?: string | null;
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
          summary?: string;
          service_interest?: 'strategic_sourcing' | 'logistics_optimization' | 'trade_documentation' | 'b2b_solutions' | 'general' | null;
          urgency_level?: 'low' | 'medium' | 'high' | 'urgent';
          qualification_score?: number;
          source?: string | null;
          notes?: string | null;
          assigned_to?: string | null;
          follow_up_date?: string | null;
          metadata?: Record<string, any>;
        };
      };
      escalations: {
        Row: {
          id: string;
          created_at: string;
          conversation_id: string;
          lead_id: string | null;
          escalation_reason: string;
          escalation_type: 'human_request' | 'complex_query' | 'pricing_discussion' | 'technical_issue' | 'complaint' | 'urgent_matter';
          customer_info: Record<string, any>;
          context_summary: string;
          priority: 'low' | 'medium' | 'high' | 'urgent';
          status: 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
          assigned_to: string | null;
          resolved_at: string | null;
          resolution_notes: string | null;
          metadata: Record<string, any>;
        };
        Insert: {
          id?: string;
          created_at?: string;
          conversation_id: string;
          lead_id?: string | null;
          escalation_reason: string;
          escalation_type?: 'human_request' | 'complex_query' | 'pricing_discussion' | 'technical_issue' | 'complaint' | 'urgent_matter';
          customer_info?: Record<string, any>;
          context_summary: string;
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          status?: 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
          assigned_to?: string | null;
          resolved_at?: string | null;
          resolution_notes?: string | null;
          metadata?: Record<string, any>;
        };
        Update: {
          id?: string;
          created_at?: string;
          conversation_id?: string;
          lead_id?: string | null;
          escalation_reason?: string;
          escalation_type?: 'human_request' | 'complex_query' | 'pricing_discussion' | 'technical_issue' | 'complaint' | 'urgent_matter';
          customer_info?: Record<string, any>;
          context_summary?: string;
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          status?: 'pending' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
          assigned_to?: string | null;
          resolved_at?: string | null;
          resolution_notes?: string | null;
          metadata?: Record<string, any>;
        };
      };
    };
    Views: {
      analytics_summary: {
        Row: {
          total_conversations: number;
          active_conversations: number;
          escalated_conversations: number;
          conversations_today: number;
          conversations_this_week: number;
          total_messages: number;
          user_messages: number;
          bot_messages: number;
          messages_today: number;
          total_leads: number;
          new_leads: number;
          contacted_leads: number;
          qualified_leads: number;
          leads_today: number;
          leads_this_week: number;
          total_escalations: number;
          pending_escalations: number;
          escalations_today: number;
          avg_resolution_time_seconds: number;
          escalation_rate_percent: number;
        };
      };
      leads_by_service: {
        Row: {
          service_interest: string;
          lead_count: number;
          percentage: number;
        };
      };
      daily_conversation_trends: {
        Row: {
          date: string;
          conversations: number;
          escalations: number;
          unique_sessions: number;
        };
      };
    };
  };
}

export type Conversation = Database['public']['Tables']['conversations']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];
export type Lead = Database['public']['Tables']['leads']['Row'];
export type Escalation = Database['public']['Tables']['escalations']['Row'];
export type NewConversation = Database['public']['Tables']['conversations']['Insert'];
export type NewMessage = Database['public']['Tables']['messages']['Insert'];
export type NewLead = Database['public']['Tables']['leads']['Insert'];
export type NewEscalation = Database['public']['Tables']['escalations']['Insert'];
export type AnalyticsSummary = Database['public']['Views']['analytics_summary']['Row'];