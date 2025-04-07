import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import { PrivacyTerms } from "../PrivacyTerms/PrivacyTerms";
import { PrivacyRadiosValues } from "../PrivacyTerms/PrivacyTerms.types";

import SideMenu from "./components/SideMenu";
import TopMenu from "./components/TopMenu";

import { useHasPermission } from "@/hooks/useHasPermission";
import { RoutesPaths } from "@/routes/routesPaths";
import apiService from "@/services/axios";
import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";
import { fetchCitiesThunk } from "@/store/features/Cities/CitiesThunk";
import { fetchCoursesThunk } from "@/store/features/Courses/CoursesThunk";
import { fetchIndicatorsThunk } from "@/store/features/Indicators/IndicatorsThunk";
import { userSliceActions } from "@/store/features/User/userSlice";
import { AppDispatch } from "@/store/store";
import { checkToken } from "@/utils/cookies";

import "./ProtectedRoute.styles.scss";

export const ProtectedRoute: React.FC = () => {
  const token = checkToken();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const { hasPermission } = useHasPermission();
  const { state: stateExportPdf } = useExportPdfContext();

  const [privacyOpen, setPrivacyOpen] = React.useState(false);
  const [isLoadingPrivacy, setIsLoadingPrivacy] = React.useState(false);

  async function disagreeTerms() {
    setIsLoadingPrivacy(true);
    try {
      await apiService.changeUserTerms({ terms: false });
      dispatch(userSliceActions.logout());
      navigate(RoutesPaths.LandingPage);
    } catch (error) {
      console.log("[confirmTerms]", error);
    } finally {
      setIsLoadingPrivacy(false);
    }
  }

  function onClickConfirmTermsAndPrivacy(response: PrivacyRadiosValues) {
    if (response === PrivacyRadiosValues.DISAGREE) {
      disagreeTerms();
    } else {
      setPrivacyOpen(false);
    }
  }

  React.useEffect(() => {
    dispatch(fetchCitiesThunk());
    dispatch(fetchCoursesThunk());
    dispatch(fetchIndicatorsThunk());
  }, []);

  const routePermissionDenied = React.useMemo(() => {
    return hasPermission(location.pathname as RoutesPaths) === false;
  }, [location]);

  const pathIsOnlyPanel = useMemo(() => {
    return (
      location.pathname === RoutesPaths.InternalPanel ||
      location.pathname === RoutesPaths.InternalPanel + "/"
    );
  }, [location]);

  if (pathIsOnlyPanel || routePermissionDenied) {
    return <Navigate to={RoutesPaths.Home} />;
  }

  if (!token) {
    return <Navigate to={RoutesPaths.Login} />;
  }

  return (
    <div id="protected-route-container-menus">
      <TopMenu onClickTermsAndPrivacy={() => setPrivacyOpen(true)} />
      <PrivacyTerms
        onClickConfirmButton={onClickConfirmTermsAndPrivacy}
        onClose={() => setPrivacyOpen(false)}
        confirmButtonText={t("PrivacyTerms.update")}
        isDialog
        open={privacyOpen}
        showAgreeOptions={true}
        isLoadingConfirm={isLoadingPrivacy}
        defaultValue={PrivacyRadiosValues.AGREE}
      />
      <div className="flex" id="protected-route-container">
        <SideMenu />
        <div
          className="flex"
          id={
            stateExportPdf.isCreatingPDF
              ? "protected-route-content-export-pdf"
              : "protected-route-content"
          }
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
