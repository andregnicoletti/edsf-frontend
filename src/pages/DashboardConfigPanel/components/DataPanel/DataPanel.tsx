import React from "react";

import { Typography } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import ChartColumnCustomPanel from "@/components/ChartColumnCustomPanel";
import TableCustomPanel from "@/components/TableCustomPanel";
import { RoutesPaths } from "@/routes/routesPaths";
import { PanelTypeData } from "@/services/axios/configNewPanel/configNewPanel.types";
import { RootState } from "@/store/store";

import "./DataPanel.styles.scss";

export const DataPanel: React.FC = React.memo(function DataPanel() {
  const { t } = useTranslation();

  const {
    previewTable: dataTable,
    previewChart: dataChart,
    panelType,
    showGoal,
  } = useSelector((state: RootState) => state.configNewPanel);

  const dataTypeComponent: Record<PanelTypeData, React.ReactNode> = {
    bar_chart: (
      <div className="data-panel-container data-panel-container-chart">
        <ChartColumnCustomPanel data={dataChart} showGoals={showGoal} />
      </div>
    ),
    table: (
      <div className="data-panel-container data-panel-container-table">
        <TableCustomPanel data={dataTable} />
      </div>
    ),
  };

  if (!panelType)
    return <Navigate to={RoutesPaths.DashboardAddPanel} replace />;

  if (!dataChart && !dataTable) {
    return (
      <div className="panel-configuration-card card-container-gray">
        <div className="data-panel-container">
          <img
            src="/people-searching-chart.svg"
            alt="data-panel"
            className="data-panel-empty-icon"
          />
          <Typography variant="body" fontWeight="bold" size="lg">
            {panelType === "bar_chart"
              ? t("Dashboard.ConfigurePanel.emptyPanelChartTitle")
              : t("Dashboard.ConfigurePanel.emptyPanelTableTitle")}
          </Typography>
          <Typography variant="body" fontWeight="regular" size="md">
            {t("Dashboard.ConfigurePanel.emptyPanelSubtitle")}
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="panel-configuration-card card-container">
      {dataTypeComponent[panelType]}
    </div>
  );
}, areEqual);

function areEqual() {
  return true;
}
