import React from "react";

import { Typography } from "@cpqd-quati/react";
import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Badge from "@/components/Badge";
import CardInfo from "@/components/CardInfo";
import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";
import { RootState } from "@/store/store";
import { truncateIfDecimal } from "@/utils/number";

export const IndicatorsExtractSummary: React.FC = () => {
  const { t } = useTranslation();
  const { state: stateExportPdf } = useExportPdfContext();

  const { extractSummaryData, extractSummaryLoading } = useSelector(
    (state: RootState) => state.extractSummary
  );

  const indicators = extractSummaryData?.indicators;
  const producersWhoMetGoal = indicators?.producersWhoMetGoal;

  const indicatorPercentageTitle = React.useMemo(() => {
    if (producersWhoMetGoal) {
      return `${producersWhoMetGoal.value} (${truncateIfDecimal(
        producersWhoMetGoal.percentage
      )}%)`;
    }
  }, [indicators]);

  return (
    <div
      className={
        stateExportPdf.isCreatingPDF
          ? "summary-extract-panel box-card"
          : "summary-extract-panel"
      }
    >
      <div className="summary-extract-panel-title">
        <Typography variant="body" size="md" fontWeight="bold">
          {t("Dashboard.summaryExtract.indicators.title")}
        </Typography>
        {!!indicators && (
          <Badge
            text={t("Dashboard.summaryExtract.indicators.badge")}
            variant="info"
            shape="square"
          />
        )}
      </div>
      <div className="summary-extract-panel-content">
        <div className="summary-extract-panel-content-column">
          <CardInfo
            loading={extractSummaryLoading}
            variant="support"
            iconName="Target"
            title={indicators?.targetProducers ?? 0}
            subtitle={
              indicators?.targetProducers === 1
                ? t("Dashboard.summaryExtract.targetProducersSingular")
                : t("Dashboard.summaryExtract.targetProducers")
            }
          />
          <CardInfo
            loading={extractSummaryLoading}
            iconName="Badge"
            title={indicatorPercentageTitle ?? 0}
            subtitle={t(
              (producersWhoMetGoal?.value || 0) > 1
                ? "Dashboard.summaryExtract.producersReachedTarget"
                : "Dashboard.summaryExtract.producersReachedTargetSingular"
            )}
            variant="support"
          />
          <CardInfo
            loading={extractSummaryLoading}
            iconName="Book"
            title={indicators?.availableTrainings.quantity ?? 0}
            subtitle={t(
              indicators?.availableTrainings.quantity === 1
                ? "Dashboard.summaryExtract.trainingAvailableHourSingular"
                : "Dashboard.summaryExtract.trainingAvailableHour",
              {
                hour: indicators?.availableTrainings.totalDurationHours ?? 0,
              }
            )}
            variant="support"
          />
        </div>
        {stateExportPdf.isCreatingPDF && (
          <Divider
            style={{
              marginLeft: "var(--spacing-9)",
              marginRight: "var(--spacing-9)",
            }}
            orientation="vertical"
            flexItem
          />
        )}
        <div className="summary-extract-panel-content-column">
          <CardInfo
            loading={extractSummaryLoading}
            iconName="CheckCircle"
            title={indicators?.certifiedPeople ?? 0}
            subtitle={
              indicators?.certifiedPeople === 1
                ? t("Dashboard.summaryExtract.certifiedPersonsSingular")
                : t("Dashboard.summaryExtract.certifiedPersons")
            }
            variant="support"
          />
          <CardInfo
            loading={extractSummaryLoading}
            iconName="Users"
            title={indicators?.peopleInTraining ?? 0}
            subtitle={
              indicators?.peopleInTraining === 1
                ? t("Dashboard.summaryExtract.peopleInTrainingSingular")
                : t("Dashboard.summaryExtract.peopleInTraining")
            }
            variant="support"
          />
          <CardInfo
            loading={extractSummaryLoading}
            iconName="Edit"
            title={indicators?.registeredPeople ?? 0}
            subtitle={
              indicators?.registeredPeople === 1
                ? t("Dashboard.summaryExtract.registeredPeopleSingular")
                : t("Dashboard.summaryExtract.registeredPeople")
            }
            variant="support"
          />
        </div>
      </div>
    </div>
  );
};
