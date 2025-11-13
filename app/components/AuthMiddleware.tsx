import { useEffect, useRef } from "react";
import { useAuth } from "~/stores/useAuth";

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const { token, user, verifyToken } = useAuth();
  const verifyStartedRef = useRef(false);

  useEffect(() => {
    if (token && !user && !verifyStartedRef.current) {
      verifyStartedRef.current = true;
      verifyToken(token).finally(() => {
        verifyStartedRef.current = false;
      });
    }
  }, [token, user]);

  return <>{children}</>;
};

export default AuthMiddleware;
