import React from "react";

import { Typography } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";
import { RootState } from "@/store/store";
import { formatDateToDateAndTime } from "@/utils/date";

import "./PDFPageHeader.styles.scss";

export const PDFPageHeader: React.FC = () => {
  const { t } = useTranslation();
  const { email, organization } = useSelector((state: RootState) => state.user);
  const { state: stateExportPdf, headerRef } = useExportPdfContext();

  const dataReportWithDate = React.useMemo(() => {
    const formattedDate = formatDateToDateAndTime(new Date());
    const dataReport = t("PDFHeader.dataReport");
    return `${dataReport} - ${formattedDate}`;
  }, [stateExportPdf.isCreatingPDF]);

  return (
    <div ref={headerRef} className="pdf-page-header-container">
      <div className="pdf-page-header-content">
        <Typography fontWeight="bold" size="lg">
          {t("TopMenu.title")}
        </Typography>
        <Typography size="md">{dataReportWithDate}</Typography>
      </div>
      <div className="pdf-page-header-content">
        <Typography fontWeight="bold" size="md">
          {email}
        </Typography>
        <Typography size="md">{organization}</Typography>
      </div>
    </div>
  );
};
