import React from "react";

import { Typography } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";

import {
  PanelTypeButtonProps,
  SelectPanelTypeProps,
} from "./SelectPanelType.types";

import { PanelTypeData } from "@/services/axios/configNewPanel/configNewPanel.types";

export const SelectPanelType: React.FC<SelectPanelTypeProps> = (props) => {
  const { t } = useTranslation();

  function onClickPanel(panelType: PanelTypeData) {
    props.onChangePanelType(panelType);
  }

  return (
    <>
      <Typography variant="title6" fontWeight="semiBold">
        {t("Dashboard.AddPanel.selectPanelType")}
      </Typography>
      <div className="dashboard-add-panel-content">
        <PanelTypeButton
          onClickPanel={() => onClickPanel("bar_chart")}
          imgSrc="/chart-columns.svg"
          label={t("Dashboard.AddPanel.panelChartColumns")}
        />
        <PanelTypeButton
          onClickPanel={() => onClickPanel("table")}
          imgSrc="/table.svg"
          label={t("Dashboard.AddPanel.table")}
        />
      </div>
    </>
  );
};

const PanelTypeButton: React.FC<PanelTypeButtonProps> = (props) => {
  return (
    <button onClick={props.onClickPanel} className="dashboard-add-panel-item">
      <div className="dashboard-add-panel-icon-container">
        <img
          className="dashboard-add-panel-icon"
          alt="close menu"
          src={props.imgSrc}
        />
      </div>
      <Typography variant="body" size="xl" fontWeight="bold">
        {props.label}
      </Typography>
    </button>
  );
};
