import { Navigation } from "../Home/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  Globe,
  Users,
  Clock,
  MousePointer,
  ExternalLink,
  MapPin,
  Monitor,
  Plus,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  getDeviceColor,
  getSiteConfig,
  normalizeUrl,
  sortDeviceBreakdown,
  sortGeoDistribution,
} from "~/lib/utils";
import { useAuth } from "~/stores/useAuth";
import type { StatsData } from "~/types/Stats";
import type { RecentActivities } from "~/types/RecentActivites";
import DashboardSkeleton from "./components/DashboardSkeleton";

const Dashboard = () => {
  const { API_BASE_URL, SITE_URL } = getSiteConfig();
  const normalizedSiteUrl = normalizeUrl(SITE_URL);
  const { token } = useAuth();
  const [recentActivity, setRecentActivity] = useState<
    RecentActivities[] | null
  >(null);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isActivityLoading, setIsActivityLoading] = useState<boolean>(true);
  const [isStatsLoading, setIsStatsLoading] = useState<boolean>(true);

  const getStats = useCallback(async () => {
    setIsStatsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard/stats`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok && data) {
        setStats(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch stats.");
      }
    } catch (error: Error | any) {
      toast.error(error.message || "Failed to load stats.");
      console.error("Error fetching stats:", error);
    } finally {
      setIsStatsLoading(false);
    }
  }, []);
  const getActivities = useCallback(async () => {
    setIsActivityLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard/activities`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok && data) {
        setRecentActivity(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch recent activities.");
      }
    } catch (error: Error | any) {
      toast.error(error.message || "Failed to load recent activities.");
      console.error("Error fetching activities:", error);
    } finally {
      setIsActivityLoading(false);
    }
  }, []);

  useEffect(() => {
    getStats();
    getActivities();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "URL_CREATED":
        return <Plus className="h-4 w-4 text-green-400" />;
      case "GEO_RULE_CREATED":
        return <Globe className="h-4 w-4 text-blue-400" />;
      case "GEO_RULE_DELETED":
        return <Globe className="h-4 w-4 text-red-400" />;
      case "URL_DELETED":
        return <TrendingDown className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getActivityBg = (type: string) => {
    switch (type) {
      case "URL_CREATED":
        return "bg-green-400/20";
      case "GEO_RULE_CREATED":
        return "bg-blue-400/20";
      case "GEO_RULE_DELETED":
        return "bg-red-400/20";
      case "URL_DELETED":
        return "bg-red-400/20";
      default:
        return "bg-gray-400/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {isStatsLoading || isActivityLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                  <p className="text-xl text-muted-foreground mt-2">
                    Welcome back! Here's what's happening with your links.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-0 bg-white/5 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Total Clicks
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                          {(
                            stats?.overview.totalClicks.value ?? 0
                          ).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 text-sm">
                          {(stats?.overview.totalClicks.change ?? 0) > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-400" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-400" />
                          )}
                          <span
                            className={
                              (stats?.overview.totalClicks.change ?? 0) > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {(stats?.overview.totalClicks.change ?? 0) > 0 ? (
                              <>+{stats?.overview.totalClicks.change}%</>
                            ) : (
                              <>
                                {Math.abs(
                                  stats?.overview.totalClicks.change ?? 0
                                )}
                                %
                              </>
                            )}
                          </span>
                          <span className="text-muted-foreground">
                            vs last month
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <MousePointer className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white/5 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Total Links
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                          {(
                            stats?.overview.totalLinks.value ?? 0
                          ).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 text-sm">
                          {(stats?.overview.totalLinks.change ?? 0) > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-400" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-400" />
                          )}
                          <span
                            className={
                              (stats?.overview.totalLinks.change ?? 0) > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {(stats?.overview.totalLinks.change ?? 0) > 0 ? (
                              <>+{stats?.overview.totalLinks.change}%</>
                            ) : (
                              <>
                                {Math.abs(
                                  stats?.overview.totalLinks.change ?? 0
                                )}
                                %
                              </>
                            )}
                          </span>
                          <span className="text-muted-foreground">
                            vs last month
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white/5 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Unique Clicks
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                          {(
                            stats?.overview.uniqueClicks.value ?? 0
                          ).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 text-sm">
                          {(stats?.overview.uniqueClicks.change ?? 0) > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-400" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-400" />
                          )}
                          <span
                            className={
                              (stats?.overview.uniqueClicks.change ?? 0) > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }
                          >
                            {(stats?.overview.uniqueClicks.change ?? 0) > 0 ? (
                              <>+{stats?.overview.uniqueClicks.change}%</>
                            ) : (
                              <>
                                {Math.abs(
                                  stats?.overview.uniqueClicks.change ?? 0
                                )}
                                %
                              </>
                            )}
                          </span>
                          <span className="text-muted-foreground">
                            vs last month
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <BarChart3 className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white/5 backdrop-blur-sm">
                  <CardContent className="p-6 h-full">
                    <div className="flex items-center justify-between">
                      <div className="space-y-5">
                        <p className="text-sm text-muted-foreground">
                          Avg. Clicks/Link
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                          {(
                            stats?.overview.avgClicksPerLink ?? 0
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-0 bg-white/5 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Today's Click Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={stats?.trends.todayClickTrend || []}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.1)"
                        />
                        <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "8px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="clicks"
                          stroke="#8b5cf6"
                          strokeWidth={3}
                          dot={{ fill: "#8b5cf6", strokeWidth: 0, r: 6 }}
                          activeDot={{
                            r: 8,
                            stroke: "#8b5cf6",
                            strokeWidth: 2,
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white/5 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-80 overflow-y-auto">
                      {recentActivity?.map((activity) => (
                        <div
                          key={activity._id}
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityBg(activity.eventType)}`}
                          >
                            {getActivityIcon(activity.eventType)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {activity.message}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-muted-foreground">
                                {activity.createdAt}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 bg-white/5 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Click Trends (7 Days)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={stats?.trends.sevenDayTrend || []}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.1)"
                        />
                        <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "8px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="clicks"
                          stackId="1"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="unique"
                          stackId="2"
                          stroke="#06b6d4"
                          fill="#06b6d4"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white/5 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <Monitor className="h-5 w-5" />
                      Device Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={sortDeviceBreakdown(
                              stats?.charts.deviceBreakdown || []
                            )}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {sortDeviceBreakdown(
                              stats?.charts.deviceBreakdown || []
                            ).map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={getDeviceColor(entry.name)}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>

                      <div className="space-y-3">
                        {sortDeviceBreakdown(
                          stats?.charts.deviceBreakdown || []
                        ).map((device, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor: getDeviceColor(device.name),
                                }}
                              />
                              <span className="text-sm text-foreground">
                                {device.name}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              {device.value}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Geographic Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {sortGeoDistribution(
                        stats?.charts.geoDistribution || []
                      ).map((country, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium text-foreground">
                                {country.country}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-medium text-foreground">
                                {country.clicks.toLocaleString()}
                              </span>
                              <span className="text-xs text-muted-foreground ml-2">
                                {country.percentage}%
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div
                              className="bg-gradient-primary h-2 rounded-full"
                              style={{ width: `${country.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={sortGeoDistribution(
                          stats?.charts.geoDistribution || []
                        )}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.1)"
                        />
                        <XAxis
                          dataKey="country"
                          stroke="rgba(255,255,255,0.5)"
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis stroke="rgba(255,255,255,0.5)" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "rgba(0,0,0,0.8)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar
                          dataKey="clicks"
                          fill="#8b5cf6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/5 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Top Performing Links
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats?.topLinks.map((link, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
                            #{index + 1}
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">
                              {link.title}
                            </h3>
                            <p className="text-sm text-muted-foreground font-mono">
                              {normalizedSiteUrl}/{link.shortCode}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">
                              {link.clicks.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              clicks
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">
                              {link.uniqueVisitors.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              unique
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="cursor-pointer"
                            onClick={() => {
                              let shortUrl = `${SITE_URL}/${link.shortCode}`;
                              if (
                                !shortUrl.startsWith("http://") &&
                                !shortUrl.startsWith("https://")
                              ) {
                                shortUrl = `https://${shortUrl}`;
                              }
                              window.open(shortUrl, "_blank");
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
