import React from "react";

import { Box, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

import PDFPageFooter from "../PDFPageFooter";
import PDFPageHeader from "../PDFPageHeader";
import PDFPanelTitle from "../PDFPanelTitle";

import CoursesFewerInscriptions from "./components/CoursesFewerInscriptions";
import CoursesMostIncriptions from "./components/CoursesMostIncriptions";
import FilterDataToExportPdf from "./components/FilterDataToExportPdf";
import FilterProducersToExportPdf from "./components/FilterProducersToExportPdf";
import IndicatorsExtractSummary from "./components/IndicatorsExtractSummary";
import SummaryExtractFilters from "./components/SummaryExtractFilters";

import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";

import "./ExtractSummary.styles.scss";

export const ExtractSummary: React.FC = () => {
  const { t } = useTranslation();
  const { summaryExtractRef, state: stateExportPdf } = useExportPdfContext();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {stateExportPdf.isCreatingPDF && <PDFPageHeader />}
      {stateExportPdf.isCreatingPDF && <PDFPageFooter />}
      <SummaryExtractFilters />
      <div
        style={{ display: "flex", flexDirection: "column" }}
        ref={summaryExtractRef}
      >
        <PDFPanelTitle title={t("Dashboard.summaryExtract.pageTitle")} />

        <Box className={stateExportPdf.isCreatingPDF ? "" : "box-card"}>
          <div
            className={
              stateExportPdf.isCreatingPDF
                ? "summary-extract-panels-row"
                : "summary-extract-panels"
            }
          >
            <IndicatorsExtractSummary />
            {!stateExportPdf.isCreatingPDF && (
              <Divider orientation="vertical" flexItem />
            )}
            <div
              className={
                stateExportPdf.isCreatingPDF
                  ? "summary-extract-panel-row box-card"
                  : "summary-extract-panel-row"
              }
            >
              <CoursesMostIncriptions />
              <Divider orientation="vertical" flexItem />
              <CoursesFewerInscriptions />
            </div>
          </div>
          {stateExportPdf.isCreatingPDF && <FilterDataToExportPdf />}
        </Box>
      </div>
      {stateExportPdf.isCreatingPDF && <FilterProducersToExportPdf />}
    </div>
  );
};
