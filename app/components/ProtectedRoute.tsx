import { useAuth } from "~/stores/useAuth";
import { Navigate } from "react-router";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, token, isVerifying } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isVerifying) {
      setIsReady(true);
    }
  }, [isVerifying]);

  if (isVerifying || !isReady) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 animate-pulse mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/auth/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
