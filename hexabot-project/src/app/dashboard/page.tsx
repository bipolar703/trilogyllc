'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  AlertCircle, 
  Phone, 
  Mail, 
  Building, 
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react';

interface DashboardData {
  analytics: any;
  recentLeads: any[];
  pendingEscalations: any[];
  leadsByService: any[];
  conversationTrends: any[];
  lastUpdated: string;
}

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authenticate = () => {
    // Simple password check (in production, use proper auth)
    if (password === 'trilogy2024') {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setError('Invalid password');
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/dashboard/analytics', {
        headers: {
          'Authorization': 'Bearer trilogy-dashboard-2024',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'text-blue-600 bg-blue-100',
      contacted: 'text-yellow-600 bg-yellow-100',
      qualified: 'text-green-600 bg-green-100',
      converted: 'text-purple-600 bg-purple-100',
      lost: 'text-red-600 bg-red-100',
      pending: 'text-orange-600 bg-orange-100',
    };
    return colors[status as keyof typeof colors] || 'text-gray-600 bg-gray-100';
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      low: 'text-green-600',
      medium: 'text-yellow-600',
      high: 'text-orange-600',
      urgent: 'text-red-600',
    };
    return colors[urgency as keyof typeof colors] || 'text-gray-600';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Trilogy Trading Dashboard</CardTitle>
            <p className="text-center text-gray-600">Enter password to access analytics</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Dashboard password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && authenticate()}
            />
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            <Button onClick={authenticate} className="w-full">
              Access Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Hexabot Analytics</h1>
              <p className="text-gray-600">Trilogy Trading LLC - AI Agent Performance Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={fetchDashboardData} disabled={loading} variant="outline">
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              {data?.lastUpdated && (
                <p className="text-sm text-gray-500">
                  Last updated: {formatDate(data.lastUpdated)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {data && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Conversations</p>
                      <p className="text-2xl font-bold text-gray-900">{data.analytics?.total_conversations || 0}</p>
                      <p className="text-sm text-gray-500">
                        {data.analytics?.conversations_today || 0} today
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Leads</p>
                      <p className="text-2xl font-bold text-gray-900">{data.analytics?.total_leads || 0}</p>
                      <p className="text-sm text-gray-500">
                        {data.analytics?.leads_today || 0} today
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <AlertCircle className="h-8 w-8 text-orange-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending Escalations</p>
                      <p className="text-2xl font-bold text-gray-900">{data.analytics?.pending_escalations || 0}</p>
                      <p className="text-sm text-gray-500">
                        {data.analytics?.escalations_today || 0} today
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Escalation Rate</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {data.analytics?.escalation_rate_percent?.toFixed(1) || 0}%
                      </p>
                      <p className="text-sm text-gray-500">
                        {data.analytics?.escalated_conversations || 0} escalated
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Leads */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Recent Leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.recentLeads?.slice(0, 10).map((lead) => (
                      <div key={lead.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{lead.name || 'Anonymous'}</h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                              {lead.email && (
                                <div className="flex items-center">
                                  <Mail className="h-3 w-3 mr-1" />
                                  {lead.email}
                                </div>
                              )}
                              {lead.company && (
                                <div className="flex items-center">
                                  <Building className="h-3 w-3 mr-1" />
                                  {lead.company}
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{lead.summary}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                                {lead.status}
                              </span>
                              <span className={`text-xs font-medium ${getUrgencyColor(lead.urgency_level)}`}>
                                {lead.urgency_level} priority
                              </span>
                              <span className="text-xs text-gray-500">
                                Score: {lead.qualification_score}
                              </span>
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDate(lead.created_at)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Escalations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Pending Escalations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.pendingEscalations?.slice(0, 10).map((escalation) => (
                      <div key={escalation.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {escalation.leads?.name || 'Anonymous Customer'}
                            </h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                              {escalation.leads?.email && (
                                <div className="flex items-center">
                                  <Mail className="h-3 w-3 mr-1" />
                                  {escalation.leads.email}
                                </div>
                              )}
                              {escalation.leads?.service_interest && (
                                <span className="capitalize">
                                  {escalation.leads.service_interest.replace('_', ' ')}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{escalation.escalation_reason}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(escalation.status)}`}>
                                {escalation.status}
                              </span>
                              <span className={`text-xs font-medium ${getUrgencyColor(escalation.priority)}`}>
                                {escalation.priority} priority
                              </span>
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDate(escalation.created_at)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Service Interest Distribution */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Leads by Service Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.leadsByService?.map((service) => (
                    <div key={service.service_interest} className="text-center p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 capitalize mb-2">
                        {service.service_interest?.replace('_', ' ') || 'General'}
                      </h4>
                      <p className="text-2xl font-bold text-blue-600">{service.lead_count}</p>
                      <p className="text-sm text-gray-600">{service.percentage?.toFixed(1)}%</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Message Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Messages</span>
                      <span className="font-medium">{data.analytics?.total_messages || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">User Messages</span>
                      <span className="font-medium">{data.analytics?.user_messages || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bot Messages</span>
                      <span className="font-medium">{data.analytics?.bot_messages || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Messages Today</span>
                      <span className="font-medium">{data.analytics?.messages_today || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lead Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">New Leads</span>
                      <span className="font-medium">{data.analytics?.new_leads || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contacted</span>
                      <span className="font-medium">{data.analytics?.contacted_leads || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Qualified</span>
                      <span className="font-medium">{data.analytics?.qualified_leads || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">This Week</span>
                      <span className="font-medium">{data.analytics?.leads_this_week || 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active Conversations</span>
                      <span className="font-medium">{data.analytics?.active_conversations || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Escalated</span>
                      <span className="font-medium">{data.analytics?.escalated_conversations || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">This Week</span>
                      <span className="font-medium">{data.analytics?.conversations_this_week || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Escalation Rate</span>
                      <span className="font-medium">{data.analytics?.escalation_rate_percent?.toFixed(1) || 0}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}