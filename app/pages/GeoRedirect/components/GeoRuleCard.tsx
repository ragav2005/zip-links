import React, { useState, Suspense } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Globe, Plus, Trash2, ExternalLink, Copy } from "lucide-react";
import { toast } from "sonner";
import type ShortenedUrl from "~/types/ShortenedUrl";
import CountryRuleCard from "./CountryRuleCard";
import { getSiteConfig } from "~/lib/utils";
import { useAuth } from "~/stores/useAuth";

interface Props {
  rule: ShortenedUrl;
  setGeoRules: React.Dispatch<React.SetStateAction<ShortenedUrl[]>>;
}

const GeoRuleCard = ({ rule, setGeoRules }: Props) => {
  const { token } = useAuth();
  const { API_BASE_URL } = getSiteConfig();

  const copyToClipboard = (shortCode: string) => {
    navigator.clipboard.writeText(`https://zip.ly/${shortCode}`);
    toast.success("Geo-redirect link copied to clipboard");
  };
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/url/delete/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setGeoRules((prev: ShortenedUrl[]) =>
          prev.filter((item) => item._id !== id)
        );
        toast.success("URL deleted successfully");
      } else {
        throw new Error(data.message || "Error deleting url");
      }
    } catch (err: Error | any) {
      console.log("Error deleting url : ", err);
      toast.error(err.message || "Error deleting url");
    }
  };
  return (
    <Card className="border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-foreground">
                  {rule.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="font-mono text-lg text-primary">
                  zip.ly/{rule.shortCode}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                Default: {rule.defaultUrl}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center mr-4">
                <p className="text-2xl font-bold text-foreground">
                  {rule.totalClicks.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">total clicks</p>
              </div>

              <Button
                onClick={() => copyToClipboard(rule.shortCode)}
                variant="glass"
                className="h-8 w-8"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                className="h-8 w-8 px-3 text-red-400 bg-destructive/30 hover:text-red-500 cursor-pointer hover:bg-destructive/20 border border-destructive/20 "
                onClick={() => handleDelete(rule._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {rule.geoRules && rule.geoRules.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-foreground">
                Geographic Rules
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rule.geoRules.map((geoRule, index) => (
                  <CountryRuleCard key={index} geoRule={geoRule} />
                ))}
              </div>

              <Button
                variant="glass"
                size="sm"
                className="border-white/20 cursor-pointer mt-2"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Country Rule
              </Button>
            </div>
          )}

          {rule.geoRules && rule.geoRules.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center gap-4">
              <p className="text-muted-foreground mb-4">
                <Globe className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                No geographic rules configured
              </p>
              <Button
                variant="glass"
                size="sm"
                className="border-white/20 cursor-pointer"
                onClick={() => {}}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Rule
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeoRuleCard;
