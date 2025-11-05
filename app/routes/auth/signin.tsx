import SignIn from "~/SignIn/SignIn";
import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign In" },
    { name: "description", content: "Sign in to your account" },
  ];
}

export default function SignInPage() {
  return <SignIn />;
}
