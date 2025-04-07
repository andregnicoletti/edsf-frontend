import React from "react";

import { Typography } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Badge from "@/components/Badge";
import CardInfo from "@/components/CardInfo";
import { RootState } from "@/store/store";

export const CoursesMostIncriptions: React.FC = () => {
  const { t } = useTranslation();

  const { extractSummaryData, extractSummaryLoading } = useSelector(
    (state: RootState) => state.extractSummary
  );
  const courseMostRegistrations =
    extractSummaryData?.courses?.courseWithMostRegistrations;

  return (
    <div className="summary-extract-panel">
      <div className="summary-extract-panel-title">
        <Typography variant="body" size="md" fontWeight="bold">
          {t("Dashboard.summaryExtract.coursesMostRegistrations.title")}
        </Typography>
        <Badge
          text={courseMostRegistrations?.name}
          variant="info"
          shape="square"
        />
      </div>
      <div className="summary-extract-panel-content">
        <div className="summary-extract-panel-content-column">
          <CardInfo
            loading={extractSummaryLoading}
            iconName="CheckCircle"
            title={courseMostRegistrations?.certifiedPeople ?? 0}
            subtitle={
              courseMostRegistrations?.certifiedPeople === 1
                ? t("Dashboard.summaryExtract.certifiedPersonsSingular")
                : t("Dashboard.summaryExtract.certifiedPersons")
            }
            variant="primary"
          />
          <CardInfo
            loading={extractSummaryLoading}
            iconName="Users"
            title={courseMostRegistrations?.peopleInTraining ?? 0}
            subtitle={
              courseMostRegistrations?.peopleInTraining === 1
                ? t("Dashboard.summaryExtract.peopleInTrainingSingular")
                : t("Dashboard.summaryExtract.peopleInTraining")
            }
            variant="primary"
          />
          <CardInfo
            loading={extractSummaryLoading}
            iconName="Book"
            title={courseMostRegistrations?.lessons.quantity ?? 0}
            subtitle={t(
              courseMostRegistrations?.lessons.quantity === 1
                ? "Dashboard.summaryExtract.classesAverageDurationOfSingular"
                : "Dashboard.summaryExtract.classesAverageDurationOf",
              {
                classes: courseMostRegistrations?.lessons.quantity ?? 0,
                minutes:
                  courseMostRegistrations?.lessons.averageDurationMinutes ?? 0,
              }
            )}
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
};
