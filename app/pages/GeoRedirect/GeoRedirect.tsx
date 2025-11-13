import { useCallback, useEffect, useState } from "react";
import { Navigation } from "../Home/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Globe, MapPin, Plus, BarChart3 } from "lucide-react";
import GeoRuleCard from "./components/GeoRuleCard";
import NewGeoRuleDialog from "./components/NewGeoRuleDialog";
import type ShortenedUrl from "~/types/ShortenedUrl";
import { useAuth } from "~/stores/useAuth";
import { getSiteConfig } from "~/lib/utils";
import { GeoRuleCardSkeleton } from "./components/GeoRuleCardSkeleton";
import { toast } from "sonner";

interface Stats {
  totalGeoClicks: string;
  totalGeoRules: string;
  countriesTargeted: string[];
}

const GeoRedirect = () => {
  const { token } = useAuth();
  const { API_BASE_URL } = getSiteConfig();
  const [stats, setStats] = useState<Stats | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [geoRules, setGeoRules] = useState<ShortenedUrl[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchGeoUrls = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/url/get-geo-urls`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setGeoRules(data.data);
      } else {
        throw new Error(data.message || "Error fetching urls");
      }
    } catch (err: Error | any) {
      console.log("Error fetching urls : ", err);
      toast.error(err.message || "Error fetching urls");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getStats = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboard/geo-stats`, {
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
    }
  }, []);

  useEffect(() => {
    fetchGeoUrls();
    getStats();
  }, [fetchGeoUrls]);

  useEffect(() => {
    getStats();
  }, [refreshFlag]);

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Geo-Aware Redirects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Create intelligent links that redirect users to different
              destinations based on their geographic location
            </p>
          </div>

          <div className="flex flex-col space-y-18">
            {/* stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 bg-white/5 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {stats?.totalGeoRules ?? 0}
                  </h3>
                  <p className="text-sm text-muted-foreground">Geo-Rules</p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/5 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {stats?.countriesTargeted.length ?? 0}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Countries Targeted
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/5 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {stats?.totalGeoClicks ?? 0}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Total Geo-Clicks
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* rules grid */}
            <div className="space-y-6">
              <div className="mx-auto w-[90%] flex items-center justify-between">
                <div>
                  <h2 className="text-lg md:text-xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    Geo-Redirect Rules
                  </h2>
                  <p className="text-muted-foreground mt-2 text-md md:text-lg lg:text-xl">
                    Manage your location-based Redirects
                  </p>
                </div>
                <NewGeoRuleDialog
                  setGeoRules={setGeoRules}
                  setRefreshFlag={setRefreshFlag}
                />
              </div>

              <div className="space-y-6">
                {isLoading ? (
                  <GeoRuleCardSkeleton />
                ) : geoRules.length === 0 ? (
                  // empty state
                  <Card className="border-0 bg-white/5 backdrop-blur-sm">
                    <CardContent className="p-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <Globe className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        No Geo-Redirect Rules Yet
                      </h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Create your first geo-redirect rule to start directing
                        users to different destinations based on their location.
                      </p>
                      <NewGeoRuleDialog
                        setGeoRules={setGeoRules}
                        setRefreshFlag={setRefreshFlag}
                      />
                    </CardContent>
                  </Card>
                ) : (
                  geoRules.map((rule) => (
                    <GeoRuleCard
                      key={rule._id}
                      rule={rule}
                      setGeoRules={setGeoRules}
                      setRefreshFlag={setRefreshFlag}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoRedirect;
