import React from "react";

import { Typography } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Badge from "@/components/Badge";
import CardInfo from "@/components/CardInfo";
import { RootState } from "@/store/store";

export const CoursesFewerInscriptions: React.FC = () => {
  const { t } = useTranslation();

  const { extractSummaryData, extractSummaryLoading } = useSelector(
    (state: RootState) => state.extractSummary
  );

  const courseFewestRegistrations =
    extractSummaryData?.courses?.courseWithFewestRegistrations;

  return (
    <div className="summary-extract-panel">
      <div className="summary-extract-panel-title">
        <Typography variant="body" size="md" fontWeight="bold">
          {t("Dashboard.summaryExtract.coursesFewerRegistrations.title")}
        </Typography>
        <Badge
          text={courseFewestRegistrations?.name}
          variant="info"
          shape="square"
        />
      </div>
      <div className="summary-extract-panel-content">
        <div className="summary-extract-panel-content-column">
          <CardInfo
            loading={extractSummaryLoading}
            iconName="CheckCircle"
            title={courseFewestRegistrations?.certifiedPeople ?? 0}
            subtitle={
              courseFewestRegistrations?.certifiedPeople === 1
                ? t("Dashboard.summaryExtract.certifiedPersonsSingular")
                : t("Dashboard.summaryExtract.certifiedPersons")
            }
            variant="danger"
          />
          <CardInfo
            loading={extractSummaryLoading}
            iconName="Users"
            title={courseFewestRegistrations?.peopleInTraining ?? 0}
            subtitle={
              courseFewestRegistrations?.peopleInTraining === 1
                ? t("Dashboard.summaryExtract.peopleInTrainingSingular")
                : t("Dashboard.summaryExtract.peopleInTraining")
            }
            variant="danger"
          />
          <CardInfo
            loading={extractSummaryLoading}
            iconName="Book"
            title={courseFewestRegistrations?.lessons.quantity ?? 0}
            subtitle={t(
              courseFewestRegistrations?.lessons.quantity === 1
                ? "Dashboard.summaryExtract.classesAverageDurationOfSingular"
                : "Dashboard.summaryExtract.classesAverageDurationOf",
              {
                classes: courseFewestRegistrations?.lessons.quantity ?? 0,
                minutes:
                  courseFewestRegistrations?.lessons.averageDurationMinutes ??
                  0,
              }
            )}
            variant="danger"
          />
        </div>
      </div>
    </div>
  );
};
