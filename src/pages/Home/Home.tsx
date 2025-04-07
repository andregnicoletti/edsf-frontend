import React from "react";

import { Button, Icon, Typography } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import HomeCard from "./components/HomeCard";

import { useHasPermission } from "@/hooks/useHasPermission";
import { RoutesPaths } from "@/routes/routesPaths";
import apiService from "@/services/axios";

import "./Home.styles.scss";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { hasPermission } = useHasPermission();

  const [isLoadingTemplates, setIsLoadingTemplates] = React.useState(false);

  function onClickProcessingButton() {
    navigate(RoutesPaths.DataUpload);
  }

  function onClickDashboardButton() {
    navigate(RoutesPaths.Dashboard);
  }

  function onClickDataButton() {
    navigate(RoutesPaths.Data);
  }

  async function handleClickTemplatesButton() {
    setIsLoadingTemplates(true);
    await apiService.onClickDownloadTemplate();
    setIsLoadingTemplates(false);
  }

  return (
    <div id="page-home">
      <div className="page-home-cards-section">
        <Typography variant="title6" fontWeight="semiBold">
          {t("Home.pageTitle")}
        </Typography>
        <div className="page-home-cards-container">
          {hasPermission(RoutesPaths.DataUpload) && <HomeCard
            title={t("Home.processingCardTitle")}
            description={t("Home.processingCardText")}
            button={
              <Button size="sm" onClick={onClickProcessingButton}>
                {t("Home.processingCardButton")}
              </Button>
            }
            icon={
              <div className="page-home-card-modules-icon-container">
                <Icon
                  iconName="FloppyDisc"
                  size="md"
                  color="var(--neutral-50)"
                />
              </div>
            }
          />}
          <HomeCard
            title={t("Home.dashboardCardTitle")}
            description={t("Home.dashboardCardText")}
            button={
              <Button onClick={onClickDashboardButton} size="sm">
                {t("Home.dashboardCardButton")}
              </Button>
            }
            icon={
              <div className="page-home-card-modules-icon-container">
                <Icon iconName="PieChart" size="md" color="var(--neutral-50)" />
              </div>
            }
          />
        </div>
      </div>
      <div className="page-home-cards-section">
        <Typography variant="body" size="xl" fontWeight="bold">
          {t("Home.shortcuts")}
        </Typography>
        <div className="page-home-cards-container">
          {hasPermission(RoutesPaths.Data) && <HomeCard
            title={t("Home.loadHistoryCardTitle")}
            button={
              <Button onClick={onClickDataButton} size="sm" variant="secondary">
                {t("Home.loadHistoryCardButton")}
              </Button>
            }
            icon={
              <div className="page-home-card-shortcuts-icon-container">
                <Icon iconName="Clock" size="md" color="var(--support-800)" />
              </div>
            }
          />}
          <HomeCard
            title={t("Home.templatesCardTitle")}
            button={
              <Button
                onClick={handleClickTemplatesButton}
                variant="secondary"
                size="sm"
                loading={isLoadingTemplates}
              >
                {t("Home.templatesCardButton")}
              </Button>
            }
            icon={
              <div className="page-home-card-shortcuts-icon-container">
                <Icon
                  iconName="TableCellsSolid"
                  size="md"
                  color="var(--support-800)"
                />
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
};
