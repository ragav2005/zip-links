import { Button } from "../../../components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export const GetStarted = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 md:p-16">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
            <div
              className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"
              style={{ animationDelay: "1.5s" }}
            />
          </div>

          <div className="relative z-10 text-center space-y-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm text-white">
              <Sparkles className="h-4 w-4" />
              <span>Modern Web Technologies</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Ready to Get Started?
            </h2>

            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Experience fast, reliable URL shortening with powerful analytics
              and modern design. Built for performance and simplicity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="text-lg px-10 py-6 h-auto bg-white text-primary hover:bg-white/90 group rounded-3xl cursor-pointer"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <p className="text-sm text-white/70">
              Super Fast • Secure & Reliable • Modern Design
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
