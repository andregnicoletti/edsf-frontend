import React from "react";

import { Route, Routes } from "react-router-dom";

import { RoutesPaths } from "./routesPaths";

import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import DashboardAddPanel from "@/pages/DashboardAddPanel";
import DashboardConfigPanel from "@/pages/DashboardConfigPanel";
import Data from "@/pages/Data";
import DataUpload from "@/pages/DataUpload";
import Home from "@/pages/Home";
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";

const Router = () => {
  const { state: stateExportPdf } = useExportPdfContext();

  function updateZoomWhenGeneratingPdf() {
    if (stateExportPdf.isCreatingPDF) {
      document.documentElement.style.fontSize = "28px";
    } else {
      document.documentElement.style.fontSize = "calc(0.2rem + 1.45vh)";
    }
  }

  React.useEffect(() => {
    updateZoomWhenGeneratingPdf();
  }, [stateExportPdf.isCreatingPDF]);

  return (
    <Routes>
      <Route path={RoutesPaths.LandingPage} element={<LandingPage />} />
      <Route path={RoutesPaths.Login} element={<Login />} />
      <Route path={RoutesPaths.InternalPanel} element={<ProtectedRoute />}>
        <Route path={RoutesPaths.Home} element={<Home />} />
        <Route path={RoutesPaths.Dashboard}>
          <Route index element={<Dashboard />} />
          <Route
            path={RoutesPaths.DashboardAddPanel}
            element={<DashboardAddPanel />}
          />
          <Route
            path={RoutesPaths.DashboardConfigPanel}
            element={<DashboardConfigPanel />}
          />
        </Route>
        {<Route path={RoutesPaths.Data}>
          <Route index element={<Data />} />
          <Route path={RoutesPaths.DataUpload} element={<DataUpload />} />
        </Route>}
      </Route>
    </Routes>
  );
};

export default Router;
