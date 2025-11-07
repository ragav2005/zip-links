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
  verifyToken: (token: string) => Promise<void>;
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

    verifyToken: async (token: string) => {
      set({ isLoading: true, error: null });
      // verify token
    },
    logOut: () => {
      set({ user: null, token: null });
      localStorage.removeItem("authToken");
      toast.success("Logged out successfully");
    },
  }))
);
