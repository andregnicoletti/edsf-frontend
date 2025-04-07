import React from "react";

import { Typography } from "@cpqd-quati/react";

import { PDFPanelTitleProps } from "./PDFPanelTitle.types";

import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";

export const PDFPanelTitle: React.FC<PDFPanelTitleProps> = (props) => {
  const { state: stateExportPdf } = useExportPdfContext();

  if (stateExportPdf.isCreatingPDF) {
    return (
      <Typography
        style={{ width: "100%", marginBottom: "0.5rem" }}
        variant="body"
        size="xl"
        fontWeight="bold"
      >
        {props.title}
      </Typography>
    );
  }

  return <></>;
};
