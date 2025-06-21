import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    // Test database connection
    const { data, error } = await supabaseAdmin
      .from('conversations')
      .select('count')
      .limit(1);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      version: '1.0.0',
      services: {
        api: 'operational',
        database: 'operational',
        chat: 'operational',
      },
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        error: 'Database connection failed',
        services: {
          api: 'operational',
          database: 'failed',
          chat: 'degraded',
        },
      },
      { status: 503 }
    );
  }
}