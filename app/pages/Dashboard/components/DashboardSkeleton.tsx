import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="h-12 w-48 bg-white/10 rounded-lg animate-pulse"></div>
              <div className="h-6 w-96 bg-white/10 rounded-lg animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                className="border-0 bg-white/5 backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-24 bg-white/10 rounded animate-pulse"></div>
                      <div className="h-8 w-16 bg-white/10 rounded animate-pulse"></div>
                      <div className="flex items-center gap-1">
                        <div className="h-4 w-4 bg-white/10 rounded animate-pulse"></div>
                        <div className="h-4 w-12 bg-white/10 rounded animate-pulse"></div>
                        <div className="h-4 w-20 bg-white/10 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/10 animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-0 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <div className="h-5 w-40 bg-white/10 rounded animate-pulse"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[300px] bg-white/5 rounded-lg animate-pulse"></div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <div className="h-5 w-32 bg-white/10 rounded animate-pulse"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg bg-white/5"
                    >
                      <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-full bg-white/10 rounded animate-pulse"></div>
                        <div className="h-3 w-3/4 bg-white/10 rounded animate-pulse"></div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-16 bg-white/10 rounded animate-pulse"></div>
                          <div className="h-3 w-20 bg-white/10 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <div className="h-5 w-44 bg-white/10 rounded animate-pulse"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[300px] bg-white/5 rounded-lg animate-pulse"></div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <div className="h-5 w-36 bg-white/10 rounded animate-pulse"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="w-full h-[200px] bg-white/5 rounded-lg animate-pulse"></div>
                  <div className="space-y-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-white/10 animate-pulse"></div>
                          <div className="h-4 w-16 bg-white/10 rounded animate-pulse"></div>
                        </div>
                        <div className="h-4 w-8 bg-white/10 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <div className="h-5 w-48 bg-white/10 rounded animate-pulse"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 bg-white/10 rounded animate-pulse"></div>
                          <div className="h-4 w-20 bg-white/10 rounded animate-pulse"></div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-12 bg-white/10 rounded animate-pulse"></div>
                          <div className="h-3 w-8 bg-white/10 rounded animate-pulse"></div>
                        </div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 animate-pulse"></div>
                    </div>
                  ))}
                </div>
                <div className="w-full h-[300px] bg-white/5 rounded-lg animate-pulse"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-44 bg-white/10 rounded animate-pulse"></div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-white/10 rounded animate-pulse"></div>
                        <div className="h-3 w-40 bg-white/10 rounded animate-pulse"></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right space-y-1">
                        <div className="h-4 w-12 bg-white/10 rounded animate-pulse"></div>
                        <div className="h-3 w-8 bg-white/10 rounded animate-pulse"></div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="h-4 w-12 bg-white/10 rounded animate-pulse"></div>
                        <div className="h-3 w-8 bg-white/10 rounded animate-pulse"></div>
                      </div>
                      <div className="w-8 h-8 bg-white/10 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
