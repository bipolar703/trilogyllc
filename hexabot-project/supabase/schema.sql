-- Hexabot Database Schema
-- This file contains the complete database schema for the Hexabot AI Agent Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create conversations table
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id TEXT,
    session_id TEXT UNIQUE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'escalated', 'resolved', 'abandoned')),
    customer_email TEXT,
    customer_name TEXT,
    escalated_at TIMESTAMP WITH TIME ZONE
);

-- Create messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes for better performance
CREATE INDEX idx_conversations_session_id ON conversations(session_id);
CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX idx_conversations_status ON conversations(status);
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX idx_messages_role ON messages(role);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for conversations table
CREATE TRIGGER update_conversations_updated_at 
    BEFORE UPDATE ON conversations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for conversations table
CREATE POLICY "Allow all operations on conversations for now" 
    ON conversations FOR ALL 
    USING (true) 
    WITH CHECK (true);

-- Create policies for messages table
CREATE POLICY "Allow all operations on messages for now" 
    ON messages FOR ALL 
    USING (true) 
    WITH CHECK (true);

-- Insert sample data for testing (optional)
INSERT INTO conversations (session_id, user_id) VALUES 
    ('sample_session_1', 'test_user_1'),
    ('sample_session_2', 'test_user_2');

-- Insert sample messages for testing (optional)
INSERT INTO messages (conversation_id, role, content) VALUES 
    ((SELECT id FROM conversations WHERE session_id = 'sample_session_1'), 'user', 'Hello, I need help with product sourcing.'),
    ((SELECT id FROM conversations WHERE session_id = 'sample_session_1'), 'assistant', 'Hello! I''d be happy to help you with product sourcing. What specific products are you looking to source?'),
    ((SELECT id FROM conversations WHERE session_id = 'sample_session_2'), 'user', 'What are your logistics services?'),
    ((SELECT id FROM conversations WHERE session_id = 'sample_session_2'), 'assistant', 'We offer comprehensive logistics optimization including end-to-end supply chain management, multimodal transportation solutions, and customs compliance assurance.');

-- Create a view for conversation summaries
CREATE VIEW conversation_summaries AS
SELECT 
    c.id,
    c.session_id,
    c.created_at,
    c.updated_at,
    c.status,
    c.customer_name,
    c.customer_email,
    COUNT(m.id) as message_count,
    MAX(m.created_at) as last_message_at,
    FIRST_VALUE(m.content) OVER (
        PARTITION BY c.id 
        ORDER BY m.created_at ASC 
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) as first_message
FROM conversations c
LEFT JOIN messages m ON c.id = m.conversation_id
GROUP BY c.id, c.session_id, c.created_at, c.updated_at, c.status, c.customer_name, c.customer_email;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON conversations TO anon, authenticated;
GRANT ALL ON messages TO anon, authenticated;
GRANT SELECT ON conversation_summaries TO anon, authenticated;