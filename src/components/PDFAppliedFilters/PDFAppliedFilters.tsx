import React from "react";

import { Typography } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";

import Badge from "../Badge";
import PDFPanelTitle from "../PDFPanelTitle";

import {
  PDFAppliedFiltersProps,
  FilterWithSubtitleValues,
} from "./PDFAppliedFilters.types";

import "./PDFAppliedFilters.styles.scss";

export const PDFAppliedFilters: React.FC<PDFAppliedFiltersProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div
      style={{ display: "flex", flex: 1, flexDirection: "column" }}
      ref={props.pdfRef}
    >
      {props.panelTitle && <PDFPanelTitle title={props.panelTitle} />}
      <div className="applied-filters-container" style={props.style}>
        <Typography
          fontWeight="bold"
          size="md"
          className="applied-filters-title"
        >
          {t("PDFAppliedFilters.title")}
        </Typography>
        {props.filters.map((filter) => {
          return (
            <div key={filter.name} className="applied-filters-item-container">
              <Typography
                className="applied-filters-item-label"
                fontWeight="medium"
                size="md"
              >
                {filter.name}
              </Typography>
              <div className="applied-filters-item-values-container">
                {filter.valuesWithSubtitle && (
                  <FilterWithSubtitle values={filter.valuesWithSubtitle} />
                )}
                {filter.values && <FilterOnlyStrings values={filter.values} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function FilterOnlyStrings({ values }: { values: string[] }) {
  return (
    <div className="applied-filters-item-values">
      {values.map((value) => (
        <Badge
          text={value}
          key={value}
          size="medium"
          variant="neutral"
          shape="square"
        />
      ))}
    </div>
  );
}

function FilterWithSubtitle({ values }: { values: FilterWithSubtitleValues }) {
  return (
    <>
      {values.map((value) => {
        return (
          <div
            key={value.subtitle}
            className="applied-filters-item-with-subtitle"
          >
            <Typography
              className="applied-filters-item-label"
              fontWeight="medium"
              size="md"
            >
              {value.subtitle}
            </Typography>

            <div className="applied-filters-item-values">
              {value.subtitledValues.map((subtitledValue, index) => (
                <Badge
                  text={subtitledValue}
                  key={subtitledValue + index}
                  size="medium"
                  variant="neutral"
                  shape="square"
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
