import SignUp from "~/SignUp/SignUp";
import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up" },
    { name: "description", content: "Create a new account" },
  ];
}

export default function SignUpPage() {
  return <SignUp />;
}
