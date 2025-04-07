import { useSelector } from 'react-redux';

import { RoutesPaths } from '@/routes/routesPaths';
import { userPermissionRoutes } from '@/routes/userPermissions';
import { RootState } from '@/store/store';

export const useHasPermission = () => {
  const { userType } = useSelector((state: RootState) => state.user);

  function hasPermission(path: RoutesPaths) {
    return userPermissionRoutes[userType].includes(path);
  }

  return { hasPermission };
}
