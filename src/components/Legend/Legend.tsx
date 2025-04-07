import React from "react";

import { Typography } from "@cpqd-quati/react";

import { LegendProps } from "./Legend.types";

import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";

import "./Legend.styles.scss";

export const Legend: React.FC<LegendProps> = (props) => {
  const {
    state: { isCreatingPDF },
  } = useExportPdfContext();

  return (
    <div className="legend-serie-row">
      {props.series.map((serie) => {
        return (
          <div
            key={serie.label}
            className={
              isCreatingPDF ? "legend-item-generate-pdf" : "legend-item"
            }
          >
            <div
              style={{ backgroundColor: serie.color }}
              className="square-legend"
            />
            <Typography>{serie.label}</Typography>
          </div>
        );
      })}
    </div>
  );
};
