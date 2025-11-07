import { useEffect } from "react";
import { useAuth } from "~/stores/useAuth";

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const { token, user, verifyToken, isLoading } = useAuth();

  useEffect(() => {
    if (token && !user && !isLoading) {
      verifyToken(token);
    }
  }, [token, user, verifyToken, isLoading]);

  return <>{children}</>;
};

export default AuthMiddleware;
