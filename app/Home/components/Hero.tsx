import { Button } from "../../components/ui/button";
import { Link2, BarChart3, Shield, Zap, Globe } from "lucide-react";

export const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center relative overflow-hidden pt-16 lg:pt-0">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl " />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/20 rounded-full blur-3xl " />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="text-center space-y-8 sm:space-y-12 lg:space-y-14 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-4  ">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm">
              <Link2 className="h-4 w-4 text-primary-glow" />
              <span className="text-foreground">The Smart URL Shortener</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
              Shorten Your Links
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Transform long, messy URLs into short, beautiful links that are
              easy to share and track. Get detailed analytics and boost your
              online presence.
            </p>
          </div>

          {/* main buttons */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-10 justify-center px-4 sm:px-0">
            <Button
              variant={"gradient"}
              className="text-lg px-4 py-4 rounded-2xl cursor-pointer h-auto group"
            >
              Start Shortening
            </Button>

            <Button
              className="text-lg px-4 py-4 rounded-2xl cursor-pointer h-auto"
              variant={"glass"}
            >
              View Analytics
            </Button>
          </div>

          {/* features grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mt-12 sm:mt-16 lg:mt-20 px-4 sm:px-0">
            <div className="space-y-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Super Fast
              </h3>
              <p className="text-muted-foreground">
                Built with optimized modern architecture and fast API responses
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Detailed Analytics
              </h3>
              <p className="text-muted-foreground">
                Track clicks, locations, and engagement with comprehensive
                analytics
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Secure & Reliable
              </h3>
              <p className="text-muted-foreground">
                Secure link management with modern authentication patterns
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Geo-Targeting
              </h3>
              <p className="text-muted-foreground">
                Redirect users to different destinations based on their
                geographic location
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
