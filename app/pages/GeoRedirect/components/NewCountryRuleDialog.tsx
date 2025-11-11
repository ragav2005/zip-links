import { Plus } from "lucide-react";
import { useState } from "react";
import { Combobox } from "~/components/ComboBox";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { getData, getCode } from "country-list";
import { toast } from "sonner";
import { getSiteConfig, isValidUrl } from "~/lib/utils";
import { useAuth } from "~/stores/useAuth";
import type ShortenedUrl from "~/types/ShortenedUrl";

interface Props {
  id: string;
  children: React.ReactNode;
  setGeoRules: React.Dispatch<React.SetStateAction<ShortenedUrl[]>>;
}

const countryList = getData();

const NewCountryRuleDialog = ({ children, id, setGeoRules }: Props) => {
  const { API_BASE_URL } = getSiteConfig();
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const validate = () => {
    if (!country) {
      toast.error("Please select a country");
      return;
    }
    if (!destinationUrl || destinationUrl.trim() === "") {
      toast.error("Destination URL cannot be empty");
      return;
    }
    if (!isValidUrl(destinationUrl)) {
      toast.error("Invalid destination URL");
      return;
    }
  };

  const handleCreateRule = async () => {
    validate();
    setIsCreating(true);
    const body = {
      country: country,
      countryCode: getCode(country),
      destinationUrl: destinationUrl,
    };
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/url/${id}/add-geo-rule`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success("Country rule created successfully!");
        setCountry("");
        setDestinationUrl("");
        setGeoRules((prev) =>
          prev.map((rule) =>
            rule._id === id ? { ...rule, geoRules: data.data } : rule
          )
        );
        setOpen(false);
      } else {
        throw new Error(data.message || "Error creating country rule");
      }
    } catch (err: Error | any) {
      console.error(err);
      toast.error(err.message || "Error creating country rule");
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="glass"
          size="sm"
          className="border-white/20 cursor-pointer"
          onClick={() => {}}
        >
          <Plus className="h-4 w-4 mr-2" />
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-white/20 shadow-2xl">
        <DialogHeader className="pb-4 sm:pb-6">
          <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-2 sm:gap-3">
            <span className="leading-tight">Add Country Rule</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm text-left">
            Create a location-based redirect rule for a specific country
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-4 sm:space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                Country <span className="text-red-400">*</span>
              </label>
              <Combobox
                value={country}
                setValue={setCountry}
                options={countryList}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground flex items-center gap-1">
                Destination URL <span className="text-red-400">*</span>
              </label>
              <Input
                placeholder="https://example.com/country-specific-page"
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 transition-colors h-11 sm:h-12 text-base"
              />
              <p className="text-xs text-muted-foreground">
                Users from the selected country will be redirected to this URL
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-4 border-t border-white/10">
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              className="border-white/20 hover:bg-white/5 transition-colors px-6 cursor-pointer w-full sm:w-auto order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateRule}
              variant="gradient"
              className="px-6 shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer w-full sm:w-auto order-1 sm:order-2"
              disabled={isCreating}
            >
              {isCreating ? "Creating..." : "Create Rule"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewCountryRuleDialog;
