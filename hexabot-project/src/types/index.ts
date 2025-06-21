// Core Types for Hexabot AI Agent Platform

export interface Message {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: MessageMetadata;
  createdAt: Date;
}

export interface MessageMetadata {
  intent?: string;
  entities?: Record<string, any>;
  confidence?: number;
  escalationRequested?: boolean;
  leadQualified?: boolean;
  responseTime?: number;
}

export interface Conversation {
  id: string;
  sessionId: string;
  customerEmail?: string;
  customerName?: string;
  status: ConversationStatus;
  escalatedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

export type ConversationStatus = 
  | 'active' 
  | 'escalated' 
  | 'resolved' 
  | 'abandoned';

export interface Lead {
  id: string;
  conversationId: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  serviceInterest?: ServiceType;
  urgencyLevel: UrgencyLevel;
  qualificationScore: number;
  notes?: string;
  status: LeadStatus;
  createdAt: Date;
}

export type ServiceType = 
  | 'strategic_sourcing'
  | 'logistics_optimization'
  | 'trade_documentation'
  | 'b2b_solutions'
  | 'general_inquiry';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'urgent';

export type LeadStatus = 
  | 'new'
  | 'qualified'
  | 'contacted'
  | 'converted'
  | 'lost';

// AI Response Types
export interface AIResponse {
  content: string;
  intent: string;
  entities: Record<string, any>;
  confidence: number;
  shouldEscalate: boolean;
  suggestedActions: string[];
  metadata: {
    responseTime: number;
    modelUsed: string;
    tokensUsed: number;
  };
}

// Chat Interface Types
export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  isTyping: boolean;
  error?: string;
  conversationId?: string;
  sessionId: string;
}

export interface ChatAction {
  type: 'ADD_MESSAGE' | 'SET_LOADING' | 'SET_TYPING' | 'SET_ERROR' | 'RESET_CHAT';
  payload?: any;
}

// User Interface Types
export interface User {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  isAnonymous: boolean;
}

// Configuration Types
export interface BotConfig {
  name: string;
  avatar?: string;
  welcomeMessage: string;
  fallbackMessage: string;
  escalationThreshold: number;
  maxResponseTime: number;
  supportedLanguages: string[];
  businessHours: BusinessHours;
}

export interface BusinessHours {
  timezone: string;
  schedule: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
}

// Analytics Types
export interface ConversationAnalytics {
  totalConversations: number;
  resolvedByBot: number;
  escalatedToHuman: number;
  averageResponseTime: number;
  customerSatisfactionScore: number;
  commonIntents: IntentAnalytics[];
  peakHours: number[];
}

export interface IntentAnalytics {
  intent: string;
  count: number;
  successRate: number;
  averageConfidence: number;
}

// API Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
  sessionId: string;
  user?: Partial<User>;
  metadata?: Record<string, any>;
}

export interface ChatResponse {
  message: Message;
  shouldEscalate: boolean;
  suggestedActions?: string[];
  conversationId: string;
}

// Escalation Types
export interface EscalationRequest {
  conversationId: string;
  reason: EscalationReason;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  customerInfo: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
  context: {
    summary: string;
    keyPoints: string[];
    suggestedActions: string[];
  };
  metadata: Record<string, any>;
}

export type EscalationReason = 
  | 'complex_query'
  | 'customer_request'
  | 'technical_issue'
  | 'pricing_discussion'
  | 'contract_negotiation'
  | 'complaint'
  | 'urgent_matter';

// Knowledge Base Types
export interface KnowledgeBaseEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  intent: string;
  confidence: number;
  lastUpdated: Date;
}

// Webhook Types
export interface WebhookPayload {
  event: string;
  data: Record<string, any>;
  timestamp: Date;
  signature?: string;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  serviceInterest?: ServiceType;
  urgency?: UrgencyLevel;
}

// Component Props Types
export interface ChatWidgetProps {
  config: BotConfig;
  user?: User;
  onEscalation?: (request: EscalationRequest) => void;
  onLeadCapture?: (lead: Partial<Lead>) => void;
  className?: string;
}

export interface MessageBubbleProps {
  message: Message;
  isTyping?: boolean;
  showAvatar?: boolean;
  className?: string;
}

export interface TypingIndicatorProps {
  isVisible: boolean;
  text?: string;
  className?: string;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Database Types (Supabase)
export interface Database {
  public: {
    Tables: {
      conversations: {
        Row: Conversation;
        Insert: Omit<Conversation, 'id' | 'createdAt' | 'updatedAt'>;
        Update: Partial<Omit<Conversation, 'id' | 'createdAt'>>;
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, 'id' | 'createdAt'>;
        Update: Partial<Omit<Message, 'id' | 'createdAt'>>;
      };
      leads: {
        Row: Lead;
        Insert: Omit<Lead, 'id' | 'createdAt'>;
        Update: Partial<Omit<Lead, 'id' | 'createdAt'>>;
      };
    };
  };
}