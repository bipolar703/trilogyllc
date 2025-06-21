import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getLeadStatistics, getRecentLeads, getPendingEscalations } from '@/lib/crm/leads';

export async function GET(request: NextRequest) {
  try {
    // Simple authentication check (in production, use proper auth)
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.DASHBOARD_ACCESS_TOKEN || 'trilogy-dashboard-2024'}`;
    
    if (authHeader !== expectedAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch analytics data
    const [
      analyticsStats,
      recentLeads,
      pendingEscalations,
      leadsByService,
      conversationTrends
    ] = await Promise.all([
      getLeadStatistics(),
      getRecentLeads(20),
      getPendingEscalations(15),
      getLeadsByService(),
      getConversationTrends()
    ]);

    return NextResponse.json({
      success: true,
      data: {
        analytics: analyticsStats,
        recentLeads,
        pendingEscalations,
        leadsByService,
        conversationTrends,
        lastUpdated: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Dashboard analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

async function getLeadsByService() {
  try {
    const { data, error } = await supabaseAdmin
      .from('leads_by_service')
      .select('*');

    if (error) {
      console.error('Error fetching leads by service:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getLeadsByService:', error);
    return [];
  }
}

async function getConversationTrends() {
  try {
    const { data, error } = await supabaseAdmin
      .from('daily_conversation_trends')
      .select('*')
      .limit(30);

    if (error) {
      console.error('Error fetching conversation trends:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getConversationTrends:', error);
    return [];
  }
}