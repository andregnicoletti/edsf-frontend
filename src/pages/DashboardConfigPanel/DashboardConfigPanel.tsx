import React from "react";

import { Button, Typography } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AttributesPanel from "./components/AttributesPanel";
import ConfigPanel from "./components/ConfigPanel";
import DataPanel from "./components/DataPanel";
import FilterPanel from "./components/FilterPanel";

import Breadcrumb from "@/components/Breadcrumb";
import { useRequestNewPanelPreview } from "@/hooks/useRequestNewPanelPreview";
import useSnackbar from "@/hooks/useSnackbar";
import { RoutesPaths } from "@/routes/routesPaths";
import apiService from "@/services/axios";
import { RootState } from "@/store/store";

import "./DashboardConfigPanel.styles.scss";

const MAX_PRODUCERS = 20;

export const DashboardConfigPanel: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openNewSnackbar } = useSnackbar();
  const { configPanelDataToRequest } = useRequestNewPanelPreview();

  const {
    panelType,
    isEdittingPanel,
    panelId,
    filters: { producers: producersFilter },
  } = useSelector((state: RootState) => state.configNewPanel);

  function onCancel() {
    navigate(RoutesPaths.DashboardAddPanel);
  }

  async function updatePanel() {
    if (!configPanelDataToRequest) return;
    try {
      await apiService.updateNewPanel(configPanelDataToRequest, panelId);
      navigate(RoutesPaths.Dashboard);
    } catch (error) {
      console.error("[updatePanel]", error);
    }
  }

  function isValidMaxProducersSelected() {
    const invalid = producersFilter.producersIdsSelected.length > MAX_PRODUCERS;
    if (invalid)
      openNewSnackbar(
        t("Dashboard.ConfigurePanel.maxProducersSnackbar", {
          quant: MAX_PRODUCERS,
        }),
        "error"
      );
    return invalid;
  }

  async function savePanel() {
    if (!configPanelDataToRequest || isValidMaxProducersSelected()) return;
    try {
      await apiService.saveNewPanel(configPanelDataToRequest);
      navigate(RoutesPaths.Dashboard);
    } catch (error) {
      console.error("[savePanel]", error);
    }
  }

  async function onClickSaveButton() {
    if (!configPanelDataToRequest) {
      openNewSnackbar(t("Dashboard.ConfigurePanel.errorOnSavePanel"), "error");
    } else if (isEdittingPanel) {
      updatePanel();
    } else {
      savePanel();
    }
  }

  return (
    <div className="dashboard-config-panel-container">
      <Breadcrumb
        links={[
          { name: t("Dashboard.pageTitle"), routePath: RoutesPaths.Dashboard },
        ]}
        currentRoutePath={t("Dashboard.AddPanel.pageTitle")}
      />
      <div className="panel-configuration-title-bar">
        <Typography style={{ flex: 1 }} variant="title6" fontWeight="semiBold">
          {t("Dashboard.ConfigurePanel.pageTitle")}
        </Typography>
        <Button variant="tertiary" size="sm" onClick={onCancel}>
          {t("Dashboard.ConfigurePanel.configPanelCancelButton")}
        </Button>
        <Button variant="primary" size="sm" onClick={onClickSaveButton}>
          {t("Dashboard.ConfigurePanel.configPanelSaveButton")}
        </Button>
      </div>
      <div className="panel-configuration-content">
        <div className="panel-configuration-left-column">
          <DataPanel />
          <FilterPanel maxProducers={MAX_PRODUCERS} />
        </div>
        <div className="panel-configuration-right-column">
          <ConfigPanel />
          {panelType === "table" && <AttributesPanel />}
        </div>
      </div>
    </div>
  );
};
