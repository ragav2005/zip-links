import { ExternalLink, Trash2, Loader2 } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { getSiteConfig } from "~/lib/utils";
import { useAuth } from "~/stores/useAuth";
import type ShortenedUrl from "~/types/ShortenedUrl";
import type { geoRule } from "~/types/ShortenedUrl";

// lazy load
const ReactCountryFlag = lazy(() =>
  import("react-country-flag").then((module) => ({
    default: module.default,
  }))
);

interface Props {
  geoRule: geoRule;
  id: string;
  setGeoRules: React.Dispatch<React.SetStateAction<ShortenedUrl[]>>;
}

const CountryRuleCard = ({ geoRule, id, setGeoRules }: Props) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { API_BASE_URL } = getSiteConfig();
  const { token } = useAuth();

  const handleDelete = async (ruleId: string) => {
    setIsDeleting(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/url/${id}/remove-geo-rule/${ruleId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok && data.success) {
        setGeoRules((prev) =>
          prev.map((rule) =>
            rule._id === id ? { ...rule, geoRules: data.data } : rule
          )
        );
        toast.success("Country rule deleted successfully");
        false;
      } else {
        throw new Error(data.message || "Error deleting url");
      }
    } catch (err: Error | any) {
      console.log("Error deleting country rule : ", err);
      toast.error(err.message || "Error deleting country rule");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <Suspense
            fallback={
              <div className="w-6 h-4 bg-white/20 rounded animate-pulse" />
            }
          >
            <ReactCountryFlag
              countryCode={geoRule.countryCode}
              svg
              style={{
                fontSize: "1.5em",
                lineHeight: "2em",
              }}
              aria-label={geoRule.country}
            />
          </Suspense>
          <span className="font-medium text-foreground">{geoRule.country}</span>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">
            {geoRule.clicks.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">clicks</p>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground truncate">
          {geoRule.destinationUrl}
        </p>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-xs bg-primary/10 hover:bg-primary/20 hover:text-primary text-primary border border-primary/20 cursor-pointer"
            onClick={() => {
              const url =
                geoRule.destinationUrl.startsWith("http://") ||
                geoRule.destinationUrl.startsWith("https://")
                  ? geoRule.destinationUrl
                  : `https://${geoRule.destinationUrl}`;
              window.open(url, "_blank");
            }}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Test
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-xs text-red-400 bg-destructive/30 hover:text-red-500 cursor-pointer hover:bg-destructive/20"
            onClick={() => handleDelete(geoRule._id)}
          >
            {isDeleting ? (
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            ) : (
              <Trash2 className="h-3 w-3 mr-1" />
            )}
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CountryRuleCard;
