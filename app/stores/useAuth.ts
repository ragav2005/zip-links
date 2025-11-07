import { create } from "zustand";
import type User from "~/types/user";
import { toast } from "sonner";
import { devtools } from "zustand/middleware";
const API_BASE_URL = import.meta.env.VITE_NODE_URI;
if (!API_BASE_URL) {
  toast("VITE_NODE_URI is not defined");
  throw new Error("VITE_NODE_URI is not defined");
}

interface AuthState {
  user: User | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  verifyToken: (token: string) => Promise<boolean>;
  updateUser: (updates: Partial<User>) => void;
  logOut: () => void;
  isLoading: boolean;
  error: string | null;
}

export const useAuth = create<AuthState>()(
  devtools((set) => ({
    user: null,
    token:
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null,
    isLoading: false,
    error: null,

    signIn: async (email: string, password: string): Promise<boolean> => {
      set({ isLoading: true, error: null });
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log(data);
        if (!response.ok) throw new Error(data.error || "Failed to sign in");

        const { token, user: rawUser } = data.data;

        const user: User = {
          id: rawUser._id,
          email: rawUser.email,
          name: rawUser.name,
          avatar: rawUser.avatar || "",
          createdAt: rawUser.createdAt,
          updatedAt: rawUser.updatedAt,
        };

        set({
          user,
          token,
          isLoading: false,
          error: null,
        });

        localStorage.setItem("authToken", token);

        toast.success("Logged In successfully!");
        return true;
      } catch (err: Error | any) {
        console.error(err);
        toast.error(err.message);
        set({ error: err.message });
        return false;
      } finally {
        set({ isLoading: false });
      }
    },

    signUp: async (
      name: string,
      email: string,
      password: string
    ): Promise<boolean> => {
      set({ isLoading: true, error: null });

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/sign-up`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Failed to sign up");

        const { token, user: rawUser } = data.data;

        const user: User = {
          id: rawUser._id,
          email: rawUser.email,
          name: rawUser.name,
          avatar: rawUser.avatar || "",
          createdAt: rawUser.createdAt,
          updatedAt: rawUser.updatedAt,
        };

        set({
          user,
          token,
          isLoading: false,
          error: null,
        });

        localStorage.setItem("authToken", token);

        toast.success("Account created successfully!");
        return true;
      } catch (err: Error | any) {
        console.error(err);
        toast.error(err.message);
        set({ error: err.message });
        return false;
      } finally {
        set({ isLoading: false });
      }
    },

    verifyToken: async (token: string): Promise<boolean> => {
      set({ isLoading: true, error: null });

      try {
        const response = await fetch(`${API_BASE_URL}/api/user/verify-token`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok && data.success) {
          const rawUser = data.data;

          const user: User = {
            id: rawUser._id,
            email: rawUser.email,
            name: rawUser.name,
            avatar: rawUser.avatar || "",
            createdAt: rawUser.createdAt,
            updatedAt: rawUser.updatedAt,
          };

          set({
            user,
            token,
            isLoading: false,
            error: null,
          });

          return true;
        } else if (
          (response.status === 401 &&
            data.message === "Invalid token (user not found)") ||
          "Expired token" ||
          "Invalid token signature"
        ) {
          set({
            user: null,
            token: null,
            isLoading: false,
            error: "Session expired. Please sign in again.",
          });
          localStorage.removeItem("authToken");
          toast.error("Session expired. Please sign in again.");
          return false;
        } else {
          throw new Error(data.message || "Token verification failed");
        }
      } catch (err: Error | any) {
        console.error("Token verification error:", err);
        set({
          user: null,
          token: null,
          isLoading: false,
          error: err.message,
        });
        localStorage.removeItem("authToken");
        toast.error("Authentication failed. Please sign in again.");
        return false;
      }
    },

    updateUser: (updates: Partial<User>) => {
      set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      }));
    },

    logOut: () => {
      set({ user: null, token: null, isLoading: false, error: null });
      localStorage.removeItem("authToken");
      toast.success("Logged out successfully");
    },
  }))
);
