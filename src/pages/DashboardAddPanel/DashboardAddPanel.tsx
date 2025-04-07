import React from "react";

import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import SelectPanelType from "./components/SelectPanelType";

import Breadcrumb from "@/components/Breadcrumb";
import { RoutesPaths } from "@/routes/routesPaths";
import { PanelTypeData } from "@/services/axios/configNewPanel/configNewPanel.types";
import { configNewPanelActions } from "@/store/features/ConfigNewPanel/ConfigNewPanelSlice";

import "./DashboardAddPanel.styles.scss";

export const DashboardAddPanel: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function onSelectPanelType(panelType: PanelTypeData) {
    dispatch(configNewPanelActions.resetAll());
    dispatch(configNewPanelActions.changePanelType(panelType));
    navigate(RoutesPaths.DashboardConfigPanel);
  }

  return (
    <div className="dashboard-add-panel-container">
      <Breadcrumb
        links={[
          { name: t("Dashboard.pageTitle"), routePath: RoutesPaths.Dashboard },
        ]}
        currentRoutePath={t("Dashboard.AddPanel.pageTitle")}
      />
      <SelectPanelType onChangePanelType={onSelectPanelType} />
    </div>
  );
};
