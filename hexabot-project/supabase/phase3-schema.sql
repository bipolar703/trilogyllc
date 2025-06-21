-- Phase 3: Enhanced Schema for Lead Management and Analytics
-- Run this after the initial schema.sql

-- Create leads table for CRM integration
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
    name TEXT,
    email TEXT,
    phone TEXT,
    company TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
    summary TEXT NOT NULL,
    service_interest TEXT CHECK (service_interest IN ('strategic_sourcing', 'logistics_optimization', 'trade_documentation', 'b2b_solutions', 'general')),
    urgency_level TEXT DEFAULT 'medium' CHECK (urgency_level IN ('low', 'medium', 'high', 'urgent')),
    qualification_score INTEGER DEFAULT 0 CHECK (qualification_score >= 0 AND qualification_score <= 100),
    source TEXT DEFAULT 'hexabot',
    notes TEXT,
    assigned_to TEXT,
    follow_up_date TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for leads table
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_conversation_id ON leads(conversation_id);
CREATE INDEX IF NOT EXISTS idx_leads_service_interest ON leads(service_interest);
CREATE INDEX IF NOT EXISTS idx_leads_urgency_level ON leads(urgency_level);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Create trigger for leads updated_at
CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON leads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Create escalations table for tracking handoff events
CREATE TABLE IF NOT EXISTS escalations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
    escalation_reason TEXT NOT NULL,
    escalation_type TEXT DEFAULT 'human_request' CHECK (escalation_type IN ('human_request', 'complex_query', 'pricing_discussion', 'technical_issue', 'complaint', 'urgent_matter')),
    customer_info JSONB DEFAULT '{}'::jsonb,
    context_summary TEXT NOT NULL,
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'resolved', 'closed')),
    assigned_to TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolution_notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for escalations table
CREATE INDEX IF NOT EXISTS idx_escalations_conversation_id ON escalations(conversation_id);
CREATE INDEX IF NOT EXISTS idx_escalations_status ON escalations(status);
CREATE INDEX IF NOT EXISTS idx_escalations_priority ON escalations(priority);
CREATE INDEX IF NOT EXISTS idx_escalations_created_at ON escalations(created_at DESC);

-- Create analytics view for dashboard
CREATE OR REPLACE VIEW analytics_summary AS
SELECT 
    -- Conversation metrics
    (SELECT COUNT(*) FROM conversations) as total_conversations,
    (SELECT COUNT(*) FROM conversations WHERE status = 'active') as active_conversations,
    (SELECT COUNT(*) FROM conversations WHERE status = 'escalated') as escalated_conversations,
    (SELECT COUNT(*) FROM conversations WHERE created_at >= CURRENT_DATE) as conversations_today,
    (SELECT COUNT(*) FROM conversations WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as conversations_this_week,
    
    -- Message metrics
    (SELECT COUNT(*) FROM messages) as total_messages,
    (SELECT COUNT(*) FROM messages WHERE role = 'user') as user_messages,
    (SELECT COUNT(*) FROM messages WHERE role = 'assistant') as bot_messages,
    (SELECT COUNT(*) FROM messages WHERE created_at >= CURRENT_DATE) as messages_today,
    
    -- Lead metrics
    (SELECT COUNT(*) FROM leads) as total_leads,
    (SELECT COUNT(*) FROM leads WHERE status = 'new') as new_leads,
    (SELECT COUNT(*) FROM leads WHERE status = 'contacted') as contacted_leads,
    (SELECT COUNT(*) FROM leads WHERE status = 'qualified') as qualified_leads,
    (SELECT COUNT(*) FROM leads WHERE created_at >= CURRENT_DATE) as leads_today,
    (SELECT COUNT(*) FROM leads WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as leads_this_week,
    
    -- Escalation metrics
    (SELECT COUNT(*) FROM escalations) as total_escalations,
    (SELECT COUNT(*) FROM escalations WHERE status = 'pending') as pending_escalations,
    (SELECT COUNT(*) FROM escalations WHERE created_at >= CURRENT_DATE) as escalations_today,
    
    -- Performance metrics
    (SELECT AVG(EXTRACT(EPOCH FROM (updated_at - created_at))) FROM conversations WHERE status = 'resolved') as avg_resolution_time_seconds,
    (SELECT COUNT(*) * 100.0 / NULLIF((SELECT COUNT(*) FROM conversations), 0) FROM conversations WHERE status = 'escalated') as escalation_rate_percent;

-- Create leads by service interest view
CREATE OR REPLACE VIEW leads_by_service AS
SELECT 
    service_interest,
    COUNT(*) as lead_count,
    COUNT(*) * 100.0 / (SELECT COUNT(*) FROM leads WHERE service_interest IS NOT NULL) as percentage
FROM leads 
WHERE service_interest IS NOT NULL
GROUP BY service_interest
ORDER BY lead_count DESC;

-- Create daily conversation trends view
CREATE OR REPLACE VIEW daily_conversation_trends AS
SELECT 
    DATE(created_at) as date,
    COUNT(*) as conversations,
    COUNT(*) FILTER (WHERE status = 'escalated') as escalations,
    COUNT(DISTINCT session_id) as unique_sessions
FROM conversations 
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Enable RLS for new tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE escalations ENABLE ROW LEVEL SECURITY;

-- Create policies for leads table (permissive for development)
CREATE POLICY "Allow all operations on leads for now" 
    ON leads FOR ALL 
    USING (true) 
    WITH CHECK (true);

-- Create policies for escalations table (permissive for development)
CREATE POLICY "Allow all operations on escalations for now" 
    ON escalations FOR ALL 
    USING (true) 
    WITH CHECK (true);

-- Grant permissions
GRANT ALL ON leads TO anon, authenticated;
GRANT ALL ON escalations TO anon, authenticated;
GRANT SELECT ON analytics_summary TO anon, authenticated;
GRANT SELECT ON leads_by_service TO anon, authenticated;
GRANT SELECT ON daily_conversation_trends TO anon, authenticated;

-- Insert sample data for testing
INSERT INTO leads (name, email, phone, company, summary, service_interest, urgency_level, qualification_score) VALUES 
    ('John Smith', 'john.smith@example.com', '+1-555-0123', 'Tech Innovations Inc', 'Interested in sourcing electronics from Asia for new product line', 'strategic_sourcing', 'high', 85),
    ('Maria Garcia', 'maria@globaltraders.com', '+34-600-123456', 'Global Traders Ltd', 'Needs logistics optimization for European distribution network', 'logistics_optimization', 'medium', 70),
    ('Ahmed Hassan', 'ahmed.hassan@middleeastimports.com', '+971-50-1234567', 'Middle East Imports', 'Requires trade documentation assistance for UAE-Jordan corridor', 'trade_documentation', 'medium', 60),
    ('Sarah Johnson', 'sarah@startupventure.io', NULL, 'Startup Venture', 'Looking to enter Asian markets with B2B solutions', 'b2b_solutions', 'low', 45);

-- Insert sample escalations
INSERT INTO escalations (conversation_id, escalation_reason, escalation_type, context_summary, priority) VALUES 
    ((SELECT id FROM conversations LIMIT 1), 'Customer requested detailed pricing for large volume sourcing project', 'pricing_discussion', 'Customer needs 10,000 units monthly from China, requires detailed cost breakdown and timeline', 'high'),
    ((SELECT id FROM conversations LIMIT 1 OFFSET 1), 'Complex customs regulations inquiry beyond bot knowledge', 'complex_query', 'Customer asked about specific import regulations for electronics from China to Germany', 'medium');

-- Create function to calculate lead qualification score
CREATE OR REPLACE FUNCTION calculate_lead_score(
    p_service_interest TEXT,
    p_urgency_level TEXT,
    p_has_email BOOLEAN,
    p_has_phone BOOLEAN,
    p_has_company BOOLEAN
) RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 0;
BEGIN
    -- Base score for service interest
    CASE p_service_interest
        WHEN 'strategic_sourcing' THEN score := score + 30;
        WHEN 'logistics_optimization' THEN score := score + 25;
        WHEN 'trade_documentation' THEN score := score + 20;
        WHEN 'b2b_solutions' THEN score := score + 35;
        ELSE score := score + 10;
    END CASE;
    
    -- Urgency multiplier
    CASE p_urgency_level
        WHEN 'urgent' THEN score := score + 30;
        WHEN 'high' THEN score := score + 20;
        WHEN 'medium' THEN score := score + 10;
        WHEN 'low' THEN score := score + 5;
    END CASE;
    
    -- Contact information bonus
    IF p_has_email THEN score := score + 15; END IF;
    IF p_has_phone THEN score := score + 15; END IF;
    IF p_has_company THEN score := score + 10; END IF;
    
    -- Ensure score is within bounds
    RETURN LEAST(100, GREATEST(0, score));
END;
$$ LANGUAGE plpgsql;