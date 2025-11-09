import { useCallback, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Zap } from "lucide-react";
import { toast } from "sonner";
import type ShortenedUrl from "~/types/ShortenedUrl";
import { Navigation } from "../Home/components/Navigation";
import { getSiteConfig, isValidUrl, normalizeUrl } from "~/lib/utils";
import { useAuth } from "~/stores/useAuth";
import UrlCard, {
  UrlCardSkeleton,
  UrlCardNoContent,
} from "./components/UrlCard";

const Shorten = () => {
  const { API_BASE_URL, SITE_URL } = getSiteConfig();
  const normalizedSiteUrl = normalizeUrl(SITE_URL);
  const { token } = useAuth();
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShortening, setIsShortening] = useState(false);

  const fetchUrls = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/url/get-urls`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setShortenedUrls(data.data);
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

  const handleShorten = async () => {
    if (url === "" || url.trim() === "") {
      toast.error("URL cannot be empty  ");
      return;
    }

    if (!isValidUrl(url)) {
      toast.error("Invalid URL");
      return;
    }
    setIsShortening(true);
    try {
      const body: any = { defaultUrl: url, linkType: "normal" };
      if (customAlias !== "") {
        body.customAlias = customAlias;
      }
      const response = await fetch(`${API_BASE_URL}/api/url/shorten`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setShortenedUrls((prev) => [data.data, ...prev]);
        setUrl("");
        setCustomAlias("");
        toast.success("URL shortened successfully");
      } else {
        throw new Error(data.message || "Error shortening urls");
      }
    } catch (err: Error | any) {
      console.log("Error shortening urls : ", err);
      toast.error(err.message || "Error shortening urls");
    } finally {
      setIsShortening(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              URL Shortener
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create short, memorable links and track their performance with
              detailed analytics
            </p>
          </div>

          {/* shorten form */}
          <Card className="border-0 bg-white/5 backdrop-blur-sm shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-foreground">
                Create Short Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Long URL *
                  </label>
                  <Input
                    type="url"
                    placeholder="https://example.com/your-very-long-url-here"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="h-12 bg-white/10 border-white/20 text-foreground placeholder:text-muted-foreground rounded-xl"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-foreground">
                      Custom Alias (optional)
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Leave empty for auto-generated alias
                  </p>
                  <div className="flex items-center">
                    <span className="text-muted-foreground mr-2">
                      {normalizedSiteUrl}/
                    </span>
                    <Input
                      placeholder="custom-name"
                      value={customAlias}
                      onChange={(e) =>
                        setCustomAlias(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, "")
                        )
                      }
                      className="h-12 bg-white/10 border-white/20 text-foreground placeholder:text-muted-foreground rounded-xl "
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={handleShorten}
                disabled={isShortening}
                variant="gradient"
                size="lg"
                className="w-full h-12 cursor-pointer"
              >
                {isShortening ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-xl" />
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Create Short Link
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* recent links */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">
                Recent Links
              </h2>
              <div className="bg-primary/20 text-primary text-sm py-1 px-3 rounded-2xl">
                {isLoading
                  ? "Loading..."
                  : `${shortenedUrls.length} links created`}
              </div>
            </div>

            <div className="grid gap-5">
              {isLoading ? (
                <UrlCardSkeleton />
              ) : shortenedUrls.length === 0 ? (
                <UrlCardNoContent />
              ) : (
                shortenedUrls.map((item) => (
                  <UrlCard
                    key={item._id}
                    item={item}
                    setShortenedUrls={setShortenedUrls}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shorten;
