import {
  Copy,
  Link,
  TrendingUp,
  Calendar,
  ExternalLink,
  Trash2,
} from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { getSiteConfig, normalizeUrl } from "~/lib/utils";
import { useAuth } from "~/stores/useAuth";
import type ShortenedUrl from "~/types/ShortenedUrl";
interface Props {
  item: ShortenedUrl;
  setShortenedUrls: Dispatch<SetStateAction<ShortenedUrl[]>>;
}

const UrlCard = ({ item, setShortenedUrls }: Props) => {
  const { token } = useAuth();
  const { API_BASE_URL, SITE_URL } = getSiteConfig();
  const normalizedSiteUrl = normalizeUrl(SITE_URL);

  const copyToClipboard = (shortUrl: string) => {
    navigator.clipboard.writeText(`${SITE_URL}/${shortUrl}`);
    toast.success("Short URL copied to clipboard");
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
        setShortenedUrls((prev: ShortenedUrl[]) =>
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
    <Card className="border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
      <CardContent className="px-6 py-2">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Link className="h-4 w-4 text-primary shrink-0" />
                <span className="font-mono text-lg text-primary font-medium">
                  {normalizedSiteUrl}/{item.shortCode}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                className="cursor-pointer"
                onClick={() => copyToClipboard(item.shortCode)}
                variant="glass"
                size="sm"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="glass"
                size="sm"
                className="bg-black/60 cursor-pointer border-white/20 hover:bg-black/10"
                onClick={() => window.open(item.defaultUrl, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="cursor-pointer"
                onClick={() => handleDelete(item._id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm text-muted-foreground truncate">
              {item.defaultUrl}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium text-foreground">
                {item.totalClicks.toLocaleString()}
              </span>
              <span>clicks</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                Created {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const UrlCardSkeleton = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <Card
      key={`loading-${index}`}
      className="border-0 bg-white/5 backdrop-blur-sm"
    >
      <CardContent className="px-6 py-2">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-white/20 rounded animate-pulse" />
                <div className="h-6 w-32 bg-white/20 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-8 bg-white/20 rounded animate-pulse" />
              <div className="h-8 w-8 bg-white/20 rounded animate-pulse" />
              <div className="h-8 w-8 bg-white/20 rounded animate-pulse" />
            </div>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="h-4 w-48 bg-white/20 rounded animate-pulse" />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-white/20 rounded animate-pulse" />
              <div className="h-4 w-8 bg-white/20 rounded animate-pulse" />
              <div className="h-4 w-12 bg-white/20 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-white/20 rounded animate-pulse" />
              <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ));
};

export const UrlCardNoContent = () => {
  return (
    <Card className="border-0 bg-white/5 backdrop-blur-sm">
      <CardContent className="px-6 py-12">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Link className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              No shortened links yet
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Create your first short link above to get started. Your shortened
              URLs will appear here with management options.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default UrlCard;
