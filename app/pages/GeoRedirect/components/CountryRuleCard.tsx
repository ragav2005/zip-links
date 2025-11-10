import { ExternalLink, Trash2 } from "lucide-react";
import { lazy, Suspense } from "react";
import { Button } from "~/components/ui/button";
import type { geoRule } from "~/types/ShortenedUrl";

// lazy load
const ReactCountryFlag = lazy(() =>
  import("react-country-flag").then((module) => ({
    default: module.default,
  }))
);

const CountryRuleCard = ({ geoRule }: { geoRule: geoRule }) => {
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
            onClick={() => {}}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CountryRuleCard;
