import React from "react";

import { Typography } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";

import backgroundPattern from "@/assets/svgs/landingPage/patternBackgroundLandingPage.svg";
import { useCreateDashboardPDF } from "@/hooks/useCreateDashboardPDF";
import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";

import "./PDFLoadingScreen.styles.scss";

export const PDFLoadingScreen: React.FC = () => {
  const { t } = useTranslation();
  const { state: stateExportPdf } = useExportPdfContext();
  const { exportToPdf } = useCreateDashboardPDF();

  React.useEffect(() => {
    if (stateExportPdf.isCreatingPDF) {
      exportToPdf(stateExportPdf.panelsSelectedToExport);
    }
  }, [stateExportPdf.isCreatingPDF]);

  if (!stateExportPdf.isCreatingPDF) return <></>;

  return (
    <div
      className="pdf-loading-page"
      style={{ backgroundImage: `url(${backgroundPattern})` }}
    >
      <Typography className="pdf-loading-page-text" size="xl">
        {t("General.generatingReport")}
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </Typography>
    </div>
  );
};
