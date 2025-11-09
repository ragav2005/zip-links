import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password: string) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("1 uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("1 lowercase letter");
  }
  if (!/\d/.test(password)) {
    errors.push("1 number");
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("1 special character");
  }

  if (errors.length === 0) {
    return null;
  } else {
    return `Password must contain atleast ${errors.join(", ")}.`;
  }
};

export const normalizeUrl = (url: string): string => {
  try {
    let normalized = url.replace(/^https?:\/\//, "");

    normalized = normalized.split("/")[0];

    normalized = normalized.split(":")[0];

    return normalized;
  } catch (error) {
    console.warn("Failed to normalize URL:", url, error);
    return url;
  }
};

export const getSiteConfig = () => {
  const siteUrl =
    (typeof window !== "undefined" &&
      (window as any)?.ZIPLINKS_CONFIG?.siteUrl) ||
    import.meta.env.VITE_SITE_URL;

  const apiUrl = import.meta.env.VITE_NODE_URI;

  if (!apiUrl) {
    toast("API URL is not configured");
    throw new Error("API URL is not configured");
  }

  if (!siteUrl) {
    toast("Site URL is not configured");
    throw new Error("Site URL is not configured");
  }

  return {
    SITE_URL: siteUrl,
    API_BASE_URL: apiUrl,
  };
};

export const isValidUrl = (string: string) => {
  try {
    const trimmedUrl = string.trim();

    if (!trimmedUrl) return false;

    const urlWithProtocol =
      trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")
        ? trimmedUrl
        : `https://${trimmedUrl}`;

    const urlObj = new URL(urlWithProtocol);

    if (
      !urlObj.hostname ||
      urlObj.hostname === "localhost" ||
      urlObj.hostname === "127.0.0.1"
    ) {
      return false;
    }

    if (!urlObj.hostname.includes(".")) {
      return false;
    }

    return true;
  } catch (_) {
    return false;
  }
};
