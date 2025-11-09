import { Link2, Sparkles, BarChart3, Rocket } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: Link2,
      step: "01",
      title: "Paste Your URL",
      description: "Simply paste any long URL into shortner, and get started.",
    },
    {
      icon: Sparkles,
      step: "02",
      title: "Customize & Create",
      description:
        "Add a custom alias, or configure geo-targeting for your link.",
    },
    {
      icon: BarChart3,
      step: "03",
      title: "Track Performance",
      description:
        "Monitor clicks, locations, devices, and user behavior with analytics.",
    },
    {
      icon: Rocket,
      step: "04",
      title: "Share & Grow",
      description:
        "Share your optimized short links and watch your engagement soar.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-white/2">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Four simple steps to create powerful short links
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/30 to-transparent " />

          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 p-8 text-center group rounded-md">
                <div className="space-y-6">
                  <div className="relative mx-auto w-20 h-20">
                    <div className="absolute inset-0 bg-gradient-primary rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <step.icon className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gray-500/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-sm font-bold text-white">
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
