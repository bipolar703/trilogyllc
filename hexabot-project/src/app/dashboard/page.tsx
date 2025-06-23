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
        data-oid="ivoyc8f"
      >
        <Card className="w-full max-w-md" data-oid="7i7::iy">
          <CardHeader data-oid="pvdn2jw">
            <CardTitle className="text-center" data-oid="z-lccd0">
              Trilogy Trading Dashboard
            </CardTitle>
            <p className="text-center text-gray-600" data-oid="tahiav9">
              Enter password to access analytics
            </p>
          </CardHeader>
          <CardContent className="space-y-4" data-oid="issb_nf">
            <Input
              type="password"
              placeholder="Dashboard password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && authenticate()}
              data-oid="wwou6nd"
            />

            {error && (
              <p className="text-red-600 text-sm" data-oid="cy-7iar">
                {error}
              </p>
            )}
            <Button
              onClick={authenticate}
              className="w-full"
              data-oid="807gjsc"
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
        data-oid="c_xsu6o"
      >
        <div className="text-center" data-oid="qe5idpi">
          <RefreshCw
            className="h-8 w-8 animate-spin mx-auto mb-4"
            data-oid="b3rgvi_"
          />

          <p data-oid="41041u_">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" data-oid="ou.1zzf">
      {/* Header */}
      <div className="bg-white shadow-sm border-b" data-oid="m7i4jz4">
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          data-oid="gh_zf:y"
        >
          <div
            className="flex justify-between items-center py-6"
            data-oid="m9wm--p"
          >
            <div data-oid="8_4__wf">
              <h1
                className="text-3xl font-bold text-gray-900"
                data-oid="fho9gbq"
              >
                Hexabot Analytics
              </h1>
              <p className="text-gray-600" data-oid="n3zms7w">
                Trilogy Trading LLC - AI Agent Performance Dashboard
              </p>
            </div>
            <div className="flex items-center gap-4" data-oid="zc91:9b">
              <Button
                onClick={fetchDashboardData}
                disabled={loading}
                variant="outline"
                data-oid="10ai3c0"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  data-oid="327b89q"
                />
                Refresh
              </Button>
              {data?.lastUpdated && (
                <p className="text-sm text-gray-500" data-oid="y_p61yx">
                  Last updated: {formatDate(data.lastUpdated)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        data-oid="lanwq8-"
      >
        {error && (
          <div
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            data-oid="k0exdso"
          >
            <p className="text-red-600" data-oid="h7xwcd4">
              {error}
            </p>
          </div>
        )}

        {data && (
          <>
            {/* Key Metrics */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              data-oid="hsol:rb"
            >
              <Card data-oid="903i3vu">
                <CardContent className="p-6" data-oid="588ttsf">
                  <div className="flex items-center" data-oid="c28613p">
                    <MessageSquare
                      className="h-8 w-8 text-blue-600"
                      data-oid="y:d.0_a"
                    />

                    <div className="ml-4" data-oid="oxb_7v.">
                      <p
                        className="text-sm font-medium text-gray-600"
                        data-oid="3rasihg"
                      >
                        Total Conversations
                      </p>
                      <p
                        className="text-2xl font-bold text-gray-900"
                        data-oid="z_jgx.a"
                      >
                        {data.analytics?.total_conversations || 0}
                      </p>
                      <p className="text-sm text-gray-500" data-oid="s7-d-20">
                        {data.analytics?.conversations_today || 0} today
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-oid="hofoy63">
                <CardContent className="p-6" data-oid="xi2ktg.">
                  <div className="flex items-center" data-oid="mtti9ck">
                    <Users
                      className="h-8 w-8 text-green-600"
                      data-oid="c05p7sa"
                    />

                    <div className="ml-4" data-oid="o.lxnfs">
                      <p
                        className="text-sm font-medium text-gray-600"
                        data-oid="633cnor"
                      >
                        Total Leads
                      </p>
                      <p
                        className="text-2xl font-bold text-gray-900"
                        data-oid="t4v98hr"
                      >
                        {data.analytics?.total_leads || 0}
                      </p>
                      <p className="text-sm text-gray-500" data-oid="mt7kq00">
                        {data.analytics?.leads_today || 0} today
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-oid="_txpjst">
                <CardContent className="p-6" data-oid=":x2wz.w">
                  <div className="flex items-center" data-oid="qawgr39">
                    <AlertCircle
                      className="h-8 w-8 text-orange-600"
                      data-oid="4gqfz.w"
                    />

                    <div className="ml-4" data-oid="s8vg6-g">
                      <p
                        className="text-sm font-medium text-gray-600"
                        data-oid="d4gy2t7"
                      >
                        Pending Escalations
                      </p>
                      <p
                        className="text-2xl font-bold text-gray-900"
                        data-oid="ki22i9g"
                      >
                        {data.analytics?.pending_escalations || 0}
                      </p>
                      <p className="text-sm text-gray-500" data-oid="o9ie_m6">
                        {data.analytics?.escalations_today || 0} today
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-oid="e_ldic1">
                <CardContent className="p-6" data-oid="v_24we4">
                  <div className="flex items-center" data-oid="3nswp-v">
                    <TrendingUp
                      className="h-8 w-8 text-purple-600"
                      data-oid="zz0q7:1"
                    />

                    <div className="ml-4" data-oid="eleko9y">
                      <p
                        className="text-sm font-medium text-gray-600"
                        data-oid="m6uxvo6"
                      >
                        Escalation Rate
                      </p>
                      <p
                        className="text-2xl font-bold text-gray-900"
                        data-oid="9znmmlq"
                      >
                        {data.analytics?.escalation_rate_percent?.toFixed(1) ||
                          0}
                        %
                      </p>
                      <p className="text-sm text-gray-500" data-oid="j:wm6c7">
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
              data-oid="0xhbp0x"
            >
              <Card data-oid="7m.cg0n">
                <CardHeader data-oid="3mqk.a-">
                  <CardTitle className="flex items-center" data-oid="ml8409r">
                    <Users className="h-5 w-5 mr-2" data-oid=".301s68" />
                    Recent Leads
                  </CardTitle>
                </CardHeader>
                <CardContent data-oid="jvezefn">
                  <div className="space-y-4" data-oid="kfl.4zm">
                    {data.recentLeads?.slice(0, 10).map((lead) => (
                      <div
                        key={lead.id}
                        className="border-b border-gray-200 pb-4 last:border-b-0"
                        data-oid="qn06czv"
                      >
                        <div
                          className="flex justify-between items-start"
                          data-oid="i5bm0mh"
                        >
                          <div className="flex-1" data-oid="wesy0yt">
                            <h4
                              className="font-medium text-gray-900"
                              data-oid="w.0c4m-"
                            >
                              {lead.name || "Anonymous"}
                            </h4>
                            <div
                              className="flex items-center gap-4 mt-1 text-sm text-gray-600"
                              data-oid="h_jl.1d"
                            >
                              {lead.email && (
                                <div
                                  className="flex items-center"
                                  data-oid="0spy.ex"
                                >
                                  <Mail
                                    className="h-3 w-3 mr-1"
                                    data-oid="uli.n5l"
                                  />

                                  {lead.email}
                                </div>
                              )}
                              {lead.company && (
                                <div
                                  className="flex items-center"
                                  data-oid="_6gonea"
                                >
                                  <Building
                                    className="h-3 w-3 mr-1"
                                    data-oid="d42imfz"
                                  />

                                  {lead.company}
                                </div>
                              )}
                            </div>
                            <p
                              className="text-sm text-gray-600 mt-2"
                              data-oid="xtv.z9e"
                            >
                              {lead.summary}
                            </p>
                            <div
                              className="flex items-center gap-2 mt-2"
                              data-oid="4ju.hpk"
                            >
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}
                                data-oid="_sd.y6t"
                              >
                                {lead.status}
                              </span>
                              <span
                                className={`text-xs font-medium ${getUrgencyColor(lead.urgency_level)}`}
                                data-oid=":r9x5cc"
                              >
                                {lead.urgency_level} priority
                              </span>
                              <span
                                className="text-xs text-gray-500"
                                data-oid="xy10fhh"
                              >
                                Score: {lead.qualification_score}
                              </span>
                            </div>
                          </div>
                          <div
                            className="text-right text-sm text-gray-500"
                            data-oid="mz095sc"
                          >
                            <div
                              className="flex items-center"
                              data-oid="j4y.jk8"
                            >
                              <Clock
                                className="h-3 w-3 mr-1"
                                data-oid="-0fx2jw"
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
              <Card data-oid="1367xn2">
                <CardHeader data-oid="eu9euha">
                  <CardTitle className="flex items-center" data-oid="ct7030g">
                    <AlertCircle className="h-5 w-5 mr-2" data-oid="jawwto9" />
                    Pending Escalations
                  </CardTitle>
                </CardHeader>
                <CardContent data-oid="96:v9ko">
                  <div className="space-y-4" data-oid="94fp9.j">
                    {data.pendingEscalations?.slice(0, 10).map((escalation) => (
                      <div
                        key={escalation.id}
                        className="border-b border-gray-200 pb-4 last:border-b-0"
                        data-oid="gd5no_g"
                      >
                        <div
                          className="flex justify-between items-start"
                          data-oid="gfq3x_m"
                        >
                          <div className="flex-1" data-oid="egolzcr">
                            <h4
                              className="font-medium text-gray-900"
                              data-oid="ldh7jsi"
                            >
                              {escalation.leads?.name || "Anonymous Customer"}
                            </h4>
                            <div
                              className="flex items-center gap-4 mt-1 text-sm text-gray-600"
                              data-oid="sif2j1x"
                            >
                              {escalation.leads?.email && (
                                <div
                                  className="flex items-center"
                                  data-oid="bsocq9o"
                                >
                                  <Mail
                                    className="h-3 w-3 mr-1"
                                    data-oid="tpppkav"
                                  />

                                  {escalation.leads.email}
                                </div>
                              )}
                              {escalation.leads?.service_interest && (
                                <span className="capitalize" data-oid="v-essaq">
                                  {escalation.leads.service_interest.replace(
                                    "_",
                                    " ",
                                  )}
                                </span>
                              )}
                            </div>
                            <p
                              className="text-sm text-gray-600 mt-2"
                              data-oid="rijpzio"
                            >
                              {escalation.escalation_reason}
                            </p>
                            <div
                              className="flex items-center gap-2 mt-2"
                              data-oid="mmef:ur"
                            >
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(escalation.status)}`}
                                data-oid="zol.9.q"
                              >
                                {escalation.status}
                              </span>
                              <span
                                className={`text-xs font-medium ${getUrgencyColor(escalation.priority)}`}
                                data-oid="h_1.j.y"
                              >
                                {escalation.priority} priority
                              </span>
                            </div>
                          </div>
                          <div
                            className="text-right text-sm text-gray-500"
                            data-oid="ii_f-a_"
                          >
                            <div
                              className="flex items-center"
                              data-oid=".7d5e.q"
                            >
                              <Clock
                                className="h-3 w-3 mr-1"
                                data-oid="upiw1dl"
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
            <Card className="mb-8" data-oid="h__shqp">
              <CardHeader data-oid="-xgs-x6">
                <CardTitle data-oid="x8_a13t">
                  Leads by Service Interest
                </CardTitle>
              </CardHeader>
              <CardContent data-oid="rqz5j-q">
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                  data-oid="c.jpxz3"
                >
                  {data.leadsByService?.map((service) => (
                    <div
                      key={service.service_interest}
                      className="text-center p-4 bg-gray-50 rounded-lg"
                      data-oid="i7fxm6h"
                    >
                      <h4
                        className="font-medium text-gray-900 capitalize mb-2"
                        data-oid="t.mllf5"
                      >
                        {service.service_interest?.replace("_", " ") ||
                          "General"}
                      </h4>
                      <p
                        className="text-2xl font-bold text-blue-600"
                        data-oid="p00g2ec"
                      >
                        {service.lead_count}
                      </p>
                      <p className="text-sm text-gray-600" data-oid="vc-w_6.">
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
              data-oid="ds.ngqe"
            >
              <Card data-oid="3:9.zn_">
                <CardHeader data-oid="-chvf0:">
                  <CardTitle className="text-lg" data-oid="abe8x2-">
                    Message Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent data-oid="z3fdbhi">
                  <div className="space-y-3" data-oid="ysmv9pg">
                    <div className="flex justify-between" data-oid="furtlh4">
                      <span className="text-gray-600" data-oid="idyccxt">
                        Total Messages
                      </span>
                      <span className="font-medium" data-oid="-9jkg1_">
                        {data.analytics?.total_messages || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="djmgatu">
                      <span className="text-gray-600" data-oid="abw3525">
                        User Messages
                      </span>
                      <span className="font-medium" data-oid="c0xffl1">
                        {data.analytics?.user_messages || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="ufejo81">
                      <span className="text-gray-600" data-oid="zqo63uj">
                        Bot Messages
                      </span>
                      <span className="font-medium" data-oid="4s94zb-">
                        {data.analytics?.bot_messages || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="-:hpwcp">
                      <span className="text-gray-600" data-oid="p.5_f_3">
                        Messages Today
                      </span>
                      <span className="font-medium" data-oid="tfeu4nh">
                        {data.analytics?.messages_today || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-oid="0ip61rx">
                <CardHeader data-oid="4albv3x">
                  <CardTitle className="text-lg" data-oid="t_i0ztw">
                    Lead Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent data-oid="y0ugndf">
                  <div className="space-y-3" data-oid="u__mztc">
                    <div className="flex justify-between" data-oid="vt58sjf">
                      <span className="text-gray-600" data-oid="egb:dx4">
                        New Leads
                      </span>
                      <span className="font-medium" data-oid=".cf48:z">
                        {data.analytics?.new_leads || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="opn1nd3">
                      <span className="text-gray-600" data-oid="o_os9b5">
                        Contacted
                      </span>
                      <span className="font-medium" data-oid="wsz.rkx">
                        {data.analytics?.contacted_leads || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="jy14hiu">
                      <span className="text-gray-600" data-oid="02upq7k">
                        Qualified
                      </span>
                      <span className="font-medium" data-oid="3fxc.3q">
                        {data.analytics?.qualified_leads || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="mire_rx">
                      <span className="text-gray-600" data-oid="ookeh3:">
                        This Week
                      </span>
                      <span className="font-medium" data-oid="kt4-odw">
                        {data.analytics?.leads_this_week || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-oid="uk71rah">
                <CardHeader data-oid="aocmjoe">
                  <CardTitle className="text-lg" data-oid="h2-ad26">
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent data-oid="j8lq:wk">
                  <div className="space-y-3" data-oid="fycc391">
                    <div className="flex justify-between" data-oid="grfq-hs">
                      <span className="text-gray-600" data-oid="n3387ge">
                        Active Conversations
                      </span>
                      <span className="font-medium" data-oid="w7u10ax">
                        {data.analytics?.active_conversations || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="arhsxqq">
                      <span className="text-gray-600" data-oid="5-ad9oy">
                        Escalated
                      </span>
                      <span className="font-medium" data-oid="l-rf6qw">
                        {data.analytics?.escalated_conversations || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="-vnonyx">
                      <span className="text-gray-600" data-oid="3nzahyu">
                        This Week
                      </span>
                      <span className="font-medium" data-oid="h1eb4v9">
                        {data.analytics?.conversations_this_week || 0}
                      </span>
                    </div>
                    <div className="flex justify-between" data-oid="ke862b7">
                      <span className="text-gray-600" data-oid="jjvpiea">
                        Escalation Rate
                      </span>
                      <span className="font-medium" data-oid="64vvl1o">
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
