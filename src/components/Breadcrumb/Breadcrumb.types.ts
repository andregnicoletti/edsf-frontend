import { RoutesPaths } from "@/routes/routesPaths";

export type BreadcrumbType = {
  links: Array<{
    name: string;
    routePath?: RoutesPaths;
  }>;
  currentRoutePath: string;
};
