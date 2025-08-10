"use client"

import { useState, useEffect } from "react"
import { analyticsAPI } from "@/lib/analytics"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Globe, TrendingUp, Eye, MapPin, Clock, ArrowUp, ArrowDown } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface OverviewData {
  today: {
    totalVisits: number
    uniqueVisitors: number
    countries: number
    firstVisits: number
  }
  yesterday: {
    totalVisits: number
    uniqueVisitors: number
  }
  thisMonth: {
    totalVisits: number
    uniqueVisitors: number
    countries: number
  }
  lastMonth: {
    totalVisits: number
    uniqueVisitors: number
  }
  recentVisitors: Array<{
    _id: string
    location: {
      city: string
      country: string
      countryCode: string
    }
    createdAt: string
    ipAddress: string
    page: string
    visitDuration: number
  }>
  topCountries: Array<{
    _id: string
    count: number
    uniqueVisitors: string[]
  }>
}

const COLORS = ["#ef9343", "#603202", "#f7faf8", "#8b5a2b", "#d4a574"]

export default function AnalyticsDashboard() {
  const [overview, setOverview] = useState<OverviewData | null>(null)
  const [dailyStats, setDailyStats] = useState<any[]>([])
  const [monthlyStats, setMonthlyStats] = useState<any[]>([])
  const [countryStats, setCountryStats] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)

      // Fetch overview data
      const overviewResponse = await analyticsAPI.getOverview()
      setOverview(overviewResponse.data.data)

      // Fetch daily stats
      const dailyResponse = await analyticsAPI.getStats("daily")
      setDailyStats(dailyResponse.data.data)

      // Fetch monthly stats
      const monthlyResponse = await analyticsAPI.getStats("monthly")
      setMonthlyStats(monthlyResponse.data.data)

      // Fetch country stats
      const countryResponse = await analyticsAPI.getStats("countries")
      setCountryStats(countryResponse.data.data)
    } catch (error) {
      console.error("Failed to fetch analytics data:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculatePercentageChange = (current: number, previous: number): { value: number; isPositive: boolean } => {
    if (previous === 0) return { value: current > 0 ? 100 : 0, isPositive: current >= 0 }
    const change = ((current - previous) / previous) * 100
    return { value: Math.abs(change), isPositive: change >= 0 }
  }

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-[#ef9343]/30 border-t-[#ef9343] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#603202]">Visitor Analytics</h1>
          <p className="text-[#603202]/70 mt-2">Track and analyze your website visitors</p>
        </div>

        <div className="flex items-center space-x-2">
          {["overview", "daily", "monthly", "countries"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                activeTab === tab ? "bg-[#ef9343] text-white" : "bg-white text-[#603202] hover:bg-[#ef9343]/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && overview && (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Today's Visits */}
            <Card className="border-[#ef9343]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#603202]">Today's Visits</CardTitle>
                <Eye className="h-4 w-4 text-[#ef9343]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#603202]">{overview.today.totalVisits}</div>
                {overview.yesterday.totalVisits > 0 && (
                  <div className="flex items-center text-xs text-[#603202]/70 mt-1">
                    {(() => {
                      const change = calculatePercentageChange(
                        overview.today.totalVisits,
                        overview.yesterday.totalVisits,
                      )
                      return (
                        <>
                          {change.isPositive ? (
                            <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                          ) : (
                            <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
                          )}
                          <span className={change.isPositive ? "text-green-500" : "text-red-500"}>
                            {change.value.toFixed(1)}%
                          </span>
                          <span className="ml-1">from yesterday</span>
                        </>
                      )
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Unique Visitors */}
            <Card className="border-[#ef9343]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#603202]">Unique Visitors</CardTitle>
                <Users className="h-4 w-4 text-[#ef9343]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#603202]">{overview.today.uniqueVisitors}</div>
                <p className="text-xs text-[#603202]/70 mt-1">{overview.thisMonth.uniqueVisitors} this month</p>
              </CardContent>
            </Card>

            {/* Countries */}
            <Card className="border-[#ef9343]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#603202]">Countries</CardTitle>
                <Globe className="h-4 w-4 text-[#ef9343]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#603202]">{overview.today.countries}</div>
                <p className="text-xs text-[#603202]/70 mt-1">{overview.thisMonth.countries} this month</p>
              </CardContent>
            </Card>

            {/* First Visits */}
            <Card className="border-[#ef9343]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#603202]">New Visitors</CardTitle>
                <TrendingUp className="h-4 w-4 text-[#ef9343]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#603202]">{overview.today.firstVisits}</div>
                <p className="text-xs text-[#603202]/70 mt-1">
                  {overview.today.firstVisits > 0
                    ? `${((overview.today.firstVisits / overview.today.totalVisits) * 100).toFixed(1)}% of today's visits`
                    : "No new visitors today"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Visits Chart */}
            <Card className="border-[#ef9343]/20">
              <CardHeader>
                <CardTitle className="text-[#603202]">Monthly Visits</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyStats.slice().reverse()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ef9343/20" />
                    <XAxis dataKey="month" stroke="#603202" />
                    <YAxis stroke="#603202" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#f7faf8",
                        border: "1px solid #ef9343",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="totalVisits" fill="#ef9343" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Countries Pie Chart */}
            <Card className="border-[#ef9343]/20">
              <CardHeader>
                <CardTitle className="text-[#603202]">Top Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={overview.topCountries.slice(0, 5)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {overview.topCountries.slice(0, 5).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Visitors Table */}
          <Card className="border-[#ef9343]/20">
            <CardHeader>
              <CardTitle className="text-[#603202]">Recent Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#ef9343]/20">
                      <th className="text-left py-3 px-4 font-medium text-[#603202]">Location</th>
                      <th className="text-left py-3 px-4 font-medium text-[#603202]">Page</th>
                      <th className="text-left py-3 px-4 font-medium text-[#603202]">Duration</th>
                      <th className="text-left py-3 px-4 font-medium text-[#603202]">Time</th>
                      <th className="text-left py-3 px-4 font-medium text-[#603202]">IP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overview.recentVisitors.map((visitor) => (
                      <tr key={visitor._id} className="border-b border-[#ef9343]/10 hover:bg-[#ef9343]/5">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-[#ef9343]" />
                            <span className="text-[#603202]">
                              {visitor.location.city}, {visitor.location.country}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {visitor.location.countryCode}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#603202]">{visitor.page}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3 text-[#ef9343]" />
                            <span className="text-[#603202] text-sm">{formatDuration(visitor.visitDuration)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[#603202] text-sm">
                          {new Date(visitor.createdAt).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-[#603202]/70 text-sm font-mono">{visitor.ipAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Daily Stats Tab */}
      {activeTab === "daily" && (
        <Card className="border-[#ef9343]/20">
          <CardHeader>
            <CardTitle className="text-[#603202]">Daily Visitor Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#ef9343]/20">
                    <th className="text-left py-3 px-4 font-medium text-[#603202]">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-[#603202]">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-[#603202]">Total Visits</th>
                    <th className="text-left py-3 px-4 font-medium text-[#603202]">Unique Visitors</th>
                    <th className="text-left py-3 px-4 font-medium text-[#603202]">New Visitors</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyStats.map((stat, index) => (
                    <tr key={index} className="border-b border-[#ef9343]/10 hover:bg-[#ef9343]/5">
                      <td className="py-3 px-4 text-[#603202]">{stat.date}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-[#ef9343]" />
                          <span className="text-[#603202]">
                            {stat.city}, {stat.country}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#603202] font-semibold">{stat.count}</td>
                      <td className="py-3 px-4 text-[#603202]">{stat.uniqueVisitors}</td>
                      <td className="py-3 px-4 text-[#603202]">{stat.firstVisits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Monthly Stats Tab */}
      {activeTab === "monthly" && (
        <div className="space-y-6">
          <Card className="border-[#ef9343]/20">
            <CardHeader>
              <CardTitle className="text-[#603202]">Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyStats.slice().reverse()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ef9343/20" />
                  <XAxis dataKey="month" stroke="#603202" />
                  <YAxis stroke="#603202" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f7faf8",
                      border: "1px solid #ef9343",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="totalVisits"
                    stroke="#ef9343"
                    strokeWidth={3}
                    dot={{ fill: "#ef9343", strokeWidth: 2, r: 6 }}
                    name="Total Visits"
                  />
                  <Line
                    type="monotone"
                    dataKey="uniqueVisitors"
                    stroke="#603202"
                    strokeWidth={2}
                    dot={{ fill: "#603202", strokeWidth: 2, r: 4 }}
                    name="Unique Visitors"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-[#ef9343]/20">
            <CardHeader>
              <CardTitle className="text-[#603202]">Monthly Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#ef9343]/20">
                      <th className="text-left py-3 px-4 font-medium text-[#603202]">Month</th>
                      <th className="text-left py-3 px-4 font-medium text-[#603202]">Total Visits</th>
                      <th className="text-left py-3 px-4 font-medium text-[#603202]">Unique Visitors</th>
                      <th className="text-left py-3 px-4 font-medium text-[#603202]">Countries</th>
                      <th className="text-left py-3 px-4 font-medium text-[#603202]">New Visitors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyStats.map((stat, index) => (
                      <tr key={index} className="border-b border-[#ef9343]/10 hover:bg-[#ef9343]/5">
                        <td className="py-3 px-4 text-[#603202] font-semibold">{stat.month}</td>
                        <td className="py-3 px-4 text-[#603202]">{stat.totalVisits}</td>
                        <td className="py-3 px-4 text-[#603202]">{stat.uniqueVisitors}</td>
                        <td className="py-3 px-4 text-[#603202]">{stat.uniqueCountries}</td>
                        <td className="py-3 px-4 text-[#603202]">{stat.firstVisits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Countries Tab */}
      {activeTab === "countries" && (
        <Card className="border-[#ef9343]/20">
          <CardHeader>
            <CardTitle className="text-[#603202]">Visitors by Country</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#ef9343]/20">
                    <th className="text-left py-3 px-4 font-medium text-[#603202]">Country</th>
                    <th className="text-left py-3 px-4 font-medium text-[#603202]">Total Visits</th>
                    <th className="text-left py-3 px-4 font-medium text-[#603202]">Unique Visitors</th>
                    <th className="text-left py-3 px-4 font-medium text-[#603202]">Cities</th>
                    <th className="text-left py-3 px-4 font-medium text-[#603202]">New Visitors</th>
                  </tr>
                </thead>
                <tbody>
                  {countryStats.map((stat, index) => (
                    <tr key={index} className="border-b border-[#ef9343]/10 hover:bg-[#ef9343]/5">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">
                            {stat.countryCode === "XX"
                              ? "🌍"
                              : `https://flagcdn.com/16x12/${stat.countryCode.toLowerCase()}.png`}
                          </span>
                          <span className="text-[#603202] font-medium">{stat.country}</span>
                          <Badge variant="outline" className="text-xs">
                            {stat.countryCode}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#603202] font-semibold">{stat.totalVisits}</td>
                      <td className="py-3 px-4 text-[#603202]">{stat.uniqueVisitors}</td>
                      <td className="py-3 px-4 text-[#603202]">{stat.uniqueCities}</td>
                      <td className="py-3 px-4 text-[#603202]">{stat.firstVisits}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
