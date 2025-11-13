import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("auth/signin", "routes/auth/signin.tsx"),
  route("auth/signup", "routes/auth/signup.tsx"),
  route("shorten", "routes/shorten.tsx"),
  route("geo-redirect", "routes/GeoRedirect.tsx"),
  route("dashboard", "routes/Dashboard.tsx"),
] satisfies RouteConfig;
