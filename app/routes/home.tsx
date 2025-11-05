import HomePage from "~/Home/HomePage";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ZipLinks" },
    { name: "description", content: "Shorten Your Links!" },
  ];
}

export default function Home() {
  return <HomePage />;
}
