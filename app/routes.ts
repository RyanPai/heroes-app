import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("heroes", "routes/heroes/layout.tsx", [
    route(":heroId", "routes/heroes/$heroId.tsx"),
  ]),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
