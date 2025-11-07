import { clsx, type ClassValue } from "clsx";
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
