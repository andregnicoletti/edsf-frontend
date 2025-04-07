import { RoutesPaths } from "./routesPaths";

import { UserType } from "@/store/features/User/userSlice";

export const userPermissionRoutes = {
  [UserType.USER]: [
    RoutesPaths.InternalPanel,
    RoutesPaths.Home, 
    RoutesPaths.Dashboard, 
    RoutesPaths.DashboardAddPanel, 
    RoutesPaths.DashboardConfigPanel
  ],
  [UserType.ADMIN]: [
    RoutesPaths.InternalPanel,
    RoutesPaths.Home, 
    RoutesPaths.Dashboard, 
    RoutesPaths.DashboardAddPanel, 
    RoutesPaths.DashboardConfigPanel,
    RoutesPaths.Data,
    RoutesPaths.DataUpload
  ]
}