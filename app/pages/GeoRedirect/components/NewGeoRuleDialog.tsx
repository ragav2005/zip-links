import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import type ShortenedUrl from "~/types/ShortenedUrl";
import { getSiteConfig, isValidUrl, normalizeUrl } from "~/lib/utils";
import { useAuth } from "~/stores/useAuth";

interface Props {
  setGeoRules: React.Dispatch<React.SetStateAction<ShortenedUrl[]>>;
}

const NewGeoRuleDialog = ({ setGeoRules }: Props) => {
  const { token } = useAuth();
  const { API_BASE_URL, SITE_URL } = getSiteConfig();
  const normalizedSiteUrl = normalizeUrl(SITE_URL);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [newRuleData, setNewRuleData] = useState({
    shortCode: "",
    title: "",
    defaultUrl: "",
  });

  const handleCreateRule = async () => {
    if (newRuleData.title === "" || newRuleData.title.trim() === "") {
      toast.error("Title cannot be empty  ");
      return;
    }
    if (newRuleData.defaultUrl === "" || newRuleData.defaultUrl.trim() === "") {
      toast.error("URL cannot be empty  ");
      return;
    }
    if (!isValidUrl(newRuleData.defaultUrl)) {
      toast.error("Invalid URL");
      return;
    }
    setIsCreating(true);
    try {
      const body: any = {
        defaultUrl: newRuleData.defaultUrl,
        linkType: "geo",
        title: newRuleData.title,
      };
      if (newRuleData.shortCode !== "") {
        body.customAlias = newRuleData.shortCode;
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
        setGeoRules((prev) => [data.data, ...prev]);
        setNewRuleData({
          shortCode: "",
          title: "",
          defaultUrl: "",
        });
        setOpen(false);
        toast.success("Geo-Redirect Rule created successfully");
      } else {
        throw new Error(data.message || "Error creating Geo-Redirect Rule");
      }
    } catch (err: Error | any) {
      console.log("Error creating Geo-Redirect Rule : ", err);
      toast.error(err.message || "Error creating Geo-Redirect Rule");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="gradient"
          size="lg"
          className="shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer px-6"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Rule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-card/95 backdrop-blur-xl border-white/20 shadow-2xl">
        <DialogHeader className="space-y-3 pb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Plus className="h-5 w-5 text-primary" />
            </div>
            Create Geo-Redirect Rule
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Set up intelligent redirects based on user location
          </p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <span className="flex items-center gap-2">
                    Short Code
                    <span className="text-xs font-normal text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                      optional
                    </span>
                  </span>
                </label>
                <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-3 focus-within:border-primary/50 transition-colors">
                  <span className="text-muted-foreground font-medium mr-3">
                    {normalizedSiteUrl}/
                  </span>
                  <Input
                    placeholder="geo-rule"
                    value={newRuleData.shortCode}
                    onChange={(e) =>
                      setNewRuleData((prev) => ({
                        ...prev,
                        shortCode: e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]/g, ""),
                      }))
                    }
                    className="bg-transparent border-0 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                  Campaign Title <span className="text-red-400">*</span>
                </label>
                <Input
                  placeholder="Global Marketing Campaign"
                  value={newRuleData.title}
                  onChange={(e) =>
                    setNewRuleData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 transition-colors h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                Default URL (Fallback) <span className="text-red-400">*</span>
              </label>
              <Input
                placeholder="https://example.com/default"
                value={newRuleData.defaultUrl}
                onChange={(e) =>
                  setNewRuleData((prev) => ({
                    ...prev,
                    defaultUrl: e.target.value,
                  }))
                }
                className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 transition-colors h-12"
              />
              <p className="text-xs text-muted-foreground">
                Users from countries without specific rules will be redirected
                here
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              className="border-white/20 hover:bg-white/5 transition-colors px-6 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateRule}
              variant="gradient"
              className="px-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
            >
              Create Geo-Rule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewGeoRuleDialog;
