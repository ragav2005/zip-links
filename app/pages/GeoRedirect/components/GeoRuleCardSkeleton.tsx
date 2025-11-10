import { Card, CardContent } from "~/components/ui/card";

export const GeoRuleCardSkeleton = () => {
  return (
    <Card className="border-0 bg-white/5 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="h-6 w-48 bg-white/20 rounded animate-pulse" />
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-white/20 rounded animate-pulse" />
                <div className="h-5 w-32 bg-white/20 rounded animate-pulse" />
              </div>
              <div className="h-4 w-40 bg-white/20 rounded animate-pulse" />
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center mr-4">
                <div className="h-8 w-12 bg-white/20 rounded animate-pulse mb-1" />
                <div className="h-3 w-16 bg-white/20 rounded animate-pulse" />
              </div>
              <div className="h-8 w-8 bg-white/20 rounded animate-pulse" />
              <div className="h-8 w-8 bg-white/20 rounded animate-pulse" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-6 w-40 bg-white/20 rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-white/5 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="w-6 h-4 bg-white/20 rounded animate-pulse" />
                      <div className="h-4 w-20 bg-white/20 rounded animate-pulse" />
                    </div>
                    <div className="text-right">
                      <div className="h-4 w-12 bg-white/20 rounded animate-pulse mb-1" />
                      <div className="h-3 w-10 bg-white/20 rounded animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-4 w-48 bg-white/20 rounded animate-pulse" />
                    <div className="flex items-center gap-4">
                      <div className="h-8 w-16 bg-white/20 rounded animate-pulse" />
                      <div className="h-8 w-20 bg-white/20 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
