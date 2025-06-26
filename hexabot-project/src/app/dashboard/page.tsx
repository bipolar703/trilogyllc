"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  RefreshCw,
} from "lucide-react";

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
  const [password, setPassword] = useState("");
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authenticate = () => {
    // Simple password check (in production, use proper auth)
    if (password === "trilogy2024") {
      setIsAuthenticated(true);
      fetchDashboardData();
    } else {
      setError("Invalid password");
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/dashboard/analytics", {
        headers: {
          Authorization: "Bearer trilogy-dashboard-2024",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const result = await response.json();
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: "text-blue-600 bg-blue-100",
      contacted: "text-yellow-600 bg-yellow-100",
      qualified: "text-green-600 bg-green-100",
      converted: "text-purple-600 bg-purple-100",
      lost: "text-red-600 bg-red-100",
      pending: "text-orange-600 bg-orange-100",
    };
    return colors[status as keyof typeof colors] || "text-gray-600 bg-gray-100";
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      low: "text-green-600",
      medium: "text-yellow-600",
      high: "text-orange-600",
      urgent: "text-red-600",
    };
    return colors[urgency as keyof typeof colors] || "text-gray-600";
  };

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        data-oid="-w__y5x"
      >
        <Card className="w-full max-w-md" data-oid="k06nlwz">
          <CardHeader data-oid="ubjl3te">
            <CardTitle className="text-center" data-oid="xvy44qb">
              Trilogy Trading Dashboard
            </CardTitle>
            <p className="text-center text-gray-600" data-oid="rrp:cz4">
              Enter password to access analytics
            </p>
          </CardHeader>
          <CardContent className="space-y-4" data-oid="leu8..u">
            <Input
              type="password"
              placeholder="Dashboard password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && authenticate()}
              data-oid="hs.bh0e"
            />

            {error && (
              <p className="text-red-600 text-sm" data-oid="la-7s7k">
                {error}
              </p>
            )}
            <Button
              onClick={authenticate}
              className="w-full"
              data-oid="x7jhubc"
            >
              Access Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading && !data) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center"
        data-oid="no3b.m_"
      >
        <div className="text-center" data-oid="k9lk5v-">
          <RefreshCw
            className="h-8 w-8 animate-spin mx-auto mb-4"
            data-oid="-ec.0eg"
          />

          <p data-oid="e26rvzt">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" data-oid="72_ajis">
      {/* Header */}
      <div className="bg-white shadow-sm border-b" data-oid="7ueh54n">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="uclqwgf"
        >
          <div
            className="flex justify-between items-center py-6"
            data-oid="yzb9h63"
          >
            <div data-oid="wx:z-k.">
              <h1
                className="text-3xl font-bold text-gray-900"
                data-oid="rjfijsp"
              >
                Hexabot Analytics
              </h1>
              <p className="text-gray-600" data-oid="e-5-co1">
                Trilogy Trading LLC - AI Agent Performance Dashboard
              </p>
            </div>
            <div className="flex items-center gap-4" data-oid="b7j0omb">
              <Button
                onClick={fetchDashboardData}
                disabled={loading}
                variant="outline"
                data-oid="f-h4.cj"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  data-oid=":g930k6"
                />
                Refresh
              </Button>
              {data?.lastUpdated && (
                <p className="text-sm text-gray-500" data-oid="38delq8">
                  Last updated: {formatDate(data.lastUpdated)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        data-oid="mj58pyn"
      >
        {error && (
          <div
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            data-oid="yy1.rtb"
          >
            <p className="text-red-600" data-oid="gsq941w">
              {error}
            </p>
          </div>
        )}

        {data && (
          <>
            {/* Key Metrics */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              data-oid="cjgq8kq"
            >
              <Card data-oid="55mno6k">
                <CardContent className="p-6" data-oid="j:hfsvn">
                  <div className="flex items-center" data-oid="pd-tl49">
                    <MessageSquare
                      className="h-8 w-8 text-blue-600"
                      data-oid="yjkvrsa"
                    />

                    <div className="ml-4" data-oid="p9rvd2_">
                      <p
                        className="text-sm font-medium text-gray-600"
                        data-oid="gsuysob"
                      >
                        Total Conversations
                      </p>
                      <p
                        className="text-2xl font-bold text-gray-900"
                        data-oid="r2zso9:"
                      >
                        {data.analytics?.total_conversations || 0}
                      </p>
                      <p className="text-sm text-gray-500" data-oid="2j.jnjw">
                        {data.analytics?.conversations_today || 0} today
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-oid="hd68::r">
                <CardContent className="p-6" data-oid="nj-lfm4">
                  <div className="flex items-center" data-oid="afxmuoj">
                    <Users
                      className="h-8 w-8 text-green-600"
                      data-oid="81bsxum"
                    />

                    <div className="ml-4" data-oid="qa02odi">
                      <p
                        className="text-sm font-medium text-gray-600"
                        data-oid="x:o4nkw"
                      >
                        Total Leads
                      </p>
                      <p
                        className="text-2xl font-bold text-gray-900"
                        data-oid="l87sxgh"
                      >
                        {data.analytics?.total_leads || 0}
                      </p>
                      <p className="text-sm text-gray-500" data-oid="qt78ow:">
                        {data.analytics?.leads_today || 0} today
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-oid="3xwfrw4">
                <CardContent className="p-6" data-oid="x2kcskr">
                  <div className="flex items-center" data-oid="4-wzryx">
                    <AlertCircle
                      className="h-8 w-8 text-orange-600"
                      data-oid="soa8qlk"
                    />

                    <div className="ml-4" data-oid="b6zrmjd">
                      <p
                        className="text-sm font-medium text-gray-600"
                        data-oid="atj0_82"
                      >
                        Pending Escalations
                      </p>
                      <p
                        className="text-2xl font-bold text-gray-900"
                        data-oid="ue531f3"
                      >
                        {data.analytics?.pending_escalations || 0}
                      </p>
                      <p className="text-sm text-gray-500" data-oid="2b.bcjh">
                        {data.analytics?.escalations_today || 0} today
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-oid="3nkial6">
                <CardContent className="p-6" data-oid=":e:t3gf">
                  <div className="flex items-center" data-oid="gy9rd3d">
                    <TrendingUp
                      className="h-8 w-8 text-purple-600"
                      data-oid="42.ozq3"
                    />

                    <div className="ml-4" data-oid="l4fo3g4">
                      <p
                        className="text-sm font-medium text-gray-600"
                        data-oid="wq6wof."
                      >
                        Escalation Rate
                      </p>
                      <p
                        className="text-2xl font-bold text-gray-900"
                        data-oid="6jr.hki"
                      >
                        {data.analytics?.escalation_rate_percent?.toFixed(1) ||
                          0}
                        %
                      </p>
                      <p className="text-sm text-gray-500" data-oid=".5iy84k">
                        {data.analytics?.escalated_conversations || 0} escalated
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Leads */}
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
              data-oid="zysbjr:"
            >
              <Card data-oid="fgxf4be">
                <CardHeader data-oid="3.koy92">
                  <CardTitle className="flex items-center" data-oid="gb3-r7t">
                    <Users className="h-5 w-5 mr-2" data-oid="r.e19qd" />
                    Recent Leads
                  </CardTitle>
                </CardHeader>
                <CardContent data-oid="kx:qo0q">
                  <div className="space-y-4" data-oid="6agg:ni">
                    {data.recentLeads?.slice(0, 10).map((lead) => (
                      <div
                        key={lead.id}
                        className="border-b border-gray-200 pb-4 last:border-b-0"
                        data-oid="mz8xtiy"
                      >
                        <div
                          className="flex justify-between items-start"
                          data-oid="8ado_46"
                        >
                          <div className="flex-1" data-oid="-_sq8:p">
                            <h4
                              className="font-medium text-gray-900"
                              data-oid="r8omap1"
                            >
                              {lead.name || "Anonymous"}
                            </h4>
                            <div
                              className="flex items-center gap-4 mt-1 text-sm text-gray-600"
                              data-oid=".yczhyr"
                            >
                              {lead.email && (
                                <div
                                  className="flex items-center"
                                  data-oid="j69j5zw"
                                >
                                  <Mail
                                    className="h-3 w-3 mr-1"
                                    data-oid="w4ce7w4"
                                  />

                                  {lead.email}
                                </div>
                              )}
                              {lead.company && (
                                <div
                                  className="flex items-center"
                                  data-oid="3g1xoot"
                                >
                                  <Building
                                    className="h-3 w-3 mr-1"
                                    data-oid="ws6rs:i"
                                  />

                                  {lead.company}
                                </div>
                              )}
                            </div>
                            <p
                              className="text-sm text-gray-600 mt-2"
                              data-oid="apf7hxg"
                            >
                              {lead.summary}
                            </p>
                            <div
                              className="flex items-center gap-2 mt-2"
                              data-oid="zzn31iq"
                            >
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}
                                data-oid="-aqyg8c"
                              >
                                {lead.status}
                              </span>
                              <span
                                className={`text-xs font-medium ${getUrgencyColor(lead.urgency_level)}`}
                                data-oid="ikp1ujh"
                              >
                                {lead.urgency_level} priority
                              </span>
                              <span
                                className="text-xs text-gray-500"
                                data-oid="hx.yfm:"
                              >
                                Score: {lead.qualification_score}
                              </span>
                            </div>
                          </div>
                          <div
                            className="text-right text-sm text-gray-500"
                            data-oid="o_6g7t9"
                          >
                            <div
                              className="flex items-center"
                              data-oid="4uidjtf"
                            >
                              <Clock
                                className="h-3 w-3 mr-1"
                                data-oid="zgxkauq"
                              />

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
              <Card data-oid="cn6q-nh">
                <CardHeader data-oid="yb5mdc:">
                  <CardTitle className="flex items-center" data-oid="kf..7pr">
                    <AlertCircle className="h-5 w-5 mr-2" data-oid="anc_4.s" />
                    Pending Escalations
                  </CardTitle>
                </CardHeader>
                <CardContent data-oid="wbqke6:">
                  <div className="space-y-4" data-oid="e2x0dn.">
                    {data.pendingEscalations?.slice(0, 10).map((escalation) => (
                      <div
                        key={escalation.id}
                        className="border-b border-gray-200 pb-4 last:border-b-0"
                        data-oid="-ygbna7"
                      >
                        <div
                          className="flex justify-between items-start"
                          data-oid="oz4xihr"
                        >
                          <div className="flex-1" data-oid="cmeys1e">
                            <h4
                              className="font-medium text-gray-900"
                              data-oid="oocna8p"
                            >
                              {escalation.leads?.name || "Anonymous Customer"}
                            </h4>
                            <div
                              className="flex items-center gap-4 mt-1 text-sm text-gray-600"
                              data-oid="8x5df08"
                            >
                              {escalation.leads?.email && (
                                <div
                                  className="flex items-center"
                                  data-oid="_3.bn57"
                                >
                                  <Mail
                                    className="h-3 w-3 mr-1"
                                    data-oid="569bgql"
                                  />

                                  {escalation.leads.email}
                                </div>
                              )}
                              {escalation.leads?.service_interest && (
                                <span className="capitalize" data-oid="kmnz7k7">
                                  {escalation.leads.service_interest.replace(
                                    "_",
                                    " ",
                                  )}
                                </span>
                              )}
                            </div>
                            <p
                              className="text-sm text-gray-600 mt-2"
                              data-oid="_ww.n9p"
                            >
                              {escalation.escalation_reason}
                            </p>
                            <div
                              className="flex items-center gap-2 mt-2"
                              data-oid="q4ufv.."
                            >
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(escalation.status)}`}
                                data-oid="r6cspy9"
                              >
                                {escalation.status}
                              </span>
                              <span
                                className={`text-xs font-medium ${getUrgencyColor(escalation.priority)}`}
                                data-oid="p4s5sep"
                              >
                                {escalation.priority} priority
                              </span>
                            </div>
                          </div>
                          <div
                            className="text-right text-sm text-gray-500"
                            data-oid="klmcsod"
                          >
                            <div
                              className="flex items-center"
                              data-oid="x_acxt8"
                            >
                              <Clock
                                className="h-3 w-3 mr-1"
                                data-oid="lmy2xx1"
                              />

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
            <Card className="mb-8" data-oid="1pfdh.d">
              <CardHeader data-oid="zxmvm8t">
                <CardTitle data-oid=":-r-7mf">
                  Leads by Service Interest
                </CardTitle>
              </CardHeader>
              <CardContent data-oid="ow.52_s">
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                  data-oid="ut3c1gf"
                >
                  {data.leadsByService?.map((service) => (
                    <div
                      key={service.service_interest}
                      className="text-center p-4 bg-gray-50 rounded-lg"
                      data-oid="9qc80id"
                    >
                      <h4
                        className="font-medium text-gray-900 capitalize mb-2"
                        data-oid="x0gdi-n"
                      >
                        {service.service_interest?.replace("_", " ") ||
                          "General"}
                      </h4>
                      <p
                        className="text-2xl font-bold text-blue-600"
                        data-oid="xb97qyz"
                      >
                        {service.lead_count}
                      </p>
                      <p className="text-sm text-gray-600" data-oid="65i3w0:">
                        {service.percentage?.toFixed(1)}%
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Stats */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              data-oid="pfwh:f5"
            >
              <Card data-oid="l3_tt_p">
                <CardHeader data-oid="y1qwo1l">
                  <CardTitle className="text-lg" data-oid="wjjo:y2">
                    Message Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent data-oid="--t13t-">
                  <div className="space-y-3" data-oid="0jyttng">
                    <div className="flex justify-between" data-oid="tis4brb">
                      <span className="text-gray-600" data-oid="hs.0i7g">
                        Total Messages
                      </span>
                      <span className="font-medium" data-oid="_trcu27">
                        {data.analytics?.total_messages || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="cew-rqk">
                      <span className="text-gray-600" data-oid="zq:d9m_">
                        User Messages
                      </span>
                      <span className="font-medium" data-oid="xmv49.6">
                        {data.analytics?.user_messages || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="ual..h5">
                      <span className="text-gray-600" data-oid="bw58ns4">
                        Bot Messages
                      </span>
                      <span className="font-medium" data-oid="674fckr">
                        {data.analytics?.bot_messages || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="c.nkaa0">
                      <span className="text-gray-600" data-oid="9kb4ujy">
                        Messages Today
                      </span>
                      <span className="font-medium" data-oid="f::v5vs">
                        {data.analytics?.messages_today || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-oid="2_1:g9z">
                <CardHeader data-oid="5ajz_ej">
                  <CardTitle className="text-lg" data-oid="ybxpg__">
                    Lead Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent data-oid="atqadud">
                  <div className="space-y-3" data-oid="_rmj55k">
                    <div className="flex justify-between" data-oid="fcr:fzc">
                      <span className="text-gray-600" data-oid="o1sim.v">
                        New Leads
                      </span>
                      <span className="font-medium" data-oid="2bu-k9k">
                        {data.analytics?.new_leads || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="kev4htu">
                      <span className="text-gray-600" data-oid="rmetk5k">
                        Contacted
                      </span>
                      <span className="font-medium" data-oid="qzb5hoa">
                        {data.analytics?.contacted_leads || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="ecnpplr">
                      <span className="text-gray-600" data-oid="nbigvnq">
                        Qualified
                      </span>
                      <span className="font-medium" data-oid="9bcug8o">
                        {data.analytics?.qualified_leads || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="k-vn610">
                      <span className="text-gray-600" data-oid="m3:gz_r">
                        This Week
                      </span>
                      <span className="font-medium" data-oid="xfz3jcu">
                        {data.analytics?.leads_this_week || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-oid="ty04.l4">
                <CardHeader data-oid="wfvk6:r">
                  <CardTitle className="text-lg" data-oid="g06_34f">
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent data-oid="00ni0.e">
                  <div className="space-y-3" data-oid="o1rt09.">
                    <div className="flex justify-between" data-oid="2qkyrm:">
                      <span className="text-gray-600" data-oid="0zld0uh">
                        Active Conversations
                      </span>
                      <span className="font-medium" data-oid="4xx0w0a">
                        {data.analytics?.active_conversations || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="fnivy8.">
                      <span className="text-gray-600" data-oid="d84mtcf">
                        Escalated
                      </span>
                      <span className="font-medium" data-oid="l-q5g:z">
                        {data.analytics?.escalated_conversations || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="m9wbq-p">
                      <span className="text-gray-600" data-oid="i-8k7.x">
                        This Week
                      </span>
                      <span className="font-medium" data-oid="1lqwmwz">
                        {data.analytics?.conversations_this_week || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="p-7fupu">
                      <span className="text-gray-600" data-oid="ff0h4mi">
                        Escalation Rate
                      </span>
                      <span className="font-medium" data-oid="uvhgoum">
                        {data.analytics?.escalation_rate_percent?.toFixed(1) ||
                          0}
                        %
                      </span>
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
