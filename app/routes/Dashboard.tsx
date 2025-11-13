import Dashboard from "~/pages/Dashboard/Dashboard";
import ProtectedRoute from "~/components/ProtectedRoute";
import type { Route } from "../+types/root";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "ZipLinks" },
    { name: "description", content: "Shorten Your Links!" },
  ];
}

const GeoRedirect = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
};

export default GeoRedirect;
