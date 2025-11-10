import type { Route } from "./+types/GeoRedirect";
import GeoRedirectPage from "~/pages/GeoRedirect/GeoRedirect";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "ZipLinks" },
    { name: "description", content: "Shorten Your Links!" },
  ];
}

const GeoRedirect = () => {
  return <GeoRedirectPage />;
};

export default GeoRedirect;
