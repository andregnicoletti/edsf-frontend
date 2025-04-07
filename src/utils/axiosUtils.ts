import { InternalAxiosRequestConfig } from "axios";
import i18next from "i18next";
import Cookies from "js-cookie";

import { API_ROUTES, API_ROUTES_PROTECTED } from "@/services/axios/endpoints";
import { snackbarSliceActions } from "@/store/features/Snackbar/SnackbarSlice";
import { store } from "@/store/store";

export function handleErrorOnRequest(error: any) {
  if (error.config.url === API_ROUTES.LEADS) return;
  redirectWhenUnauthorized(error);
  manageErrorMessages(error);
}

function redirectWhenUnauthorized(error: any) {
  if (error?.response?.status === 401) {
    window.location.href = "/login";
  }
}

function manageErrorMessages(error: any) {
  let errorMessage = i18next.t("General.snackbarGenericError");
  if (checkHasTimetouOnUploadFilesRoute(error)) {
    errorMessage = i18next.t("Data.UploadData.timeoutError");
  } else if (error?.response?.data?.message) {
    errorMessage = error?.response?.data?.message;
  }
  store.dispatch(
    snackbarSliceActions.openNewSnackbar({
      message: errorMessage,
      severity: "error",
    })
  );
}

function checkHasTimetouOnUploadFilesRoute(error: any) {
  const isFilesUloadRoute = error?.config?.url.includes(
    API_ROUTES_PROTECTED.UPLOAD
  );
  const isTimeoutError = error?.code === "ECONNABORTED";
  return isFilesUloadRoute && isTimeoutError;
}

export function addTokenToAxiosConfig(config: InternalAxiosRequestConfig) {
  const configWithAuth = { ...config };
  const token = Cookies.get("token");
  if (config.url && checkIfUrlIsProtected(config.url) && token) {
    configWithAuth.headers = configWithAuth.headers || {};
    configWithAuth.headers.Authorization = token;
  }

  return configWithAuth;
}

function checkIfUrlIsProtected(requestUrl: string) {
  const isProtected = Object.values(API_ROUTES_PROTECTED).some((route) => {
    if (requestUrl.includes(route)) return true;
  });

  return isProtected;
}
