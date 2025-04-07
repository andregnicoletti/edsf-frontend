import React from "react";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import PDFAppliedFilters from "@/components/PDFAppliedFilters";
import {
  FilterAppliedType,
  FilterWithSubtitleValues,
} from "@/components/PDFAppliedFilters/PDFAppliedFilters.types";
import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";
import { RootState } from "@/store/store";

export const FilterProducersToExportPdf: React.FC = () => {
  const { t } = useTranslation();
  const {
    extractSummaryFilters: { producersFilterOptions, producersSelectedCodes },
  } = useSelector((state: RootState) => state.extractSummary);

  const { summaryFiltersProducersRef } = useExportPdfContext();

  const producerFilterWithSubtitle: FilterWithSubtitleValues =
    React.useMemo(() => {
      const filteredProducers = producersFilterOptions.filter((item) =>
        producersSelectedCodes.includes(item.producerCode)
      );

      const filterByCity: { [key: string]: string[] } = {};

      filteredProducers.forEach((producer) => {
        if (!filterByCity[producer.city]) {
          filterByCity[producer.city] = [];
        }
        filterByCity[producer.city].push(producer.producerDescription);
      });

      const filterByCityKeys = Object.keys(filterByCity);

      const citiesWithSubtitle = filterByCityKeys.map((cityName) => ({
        subtitle: cityName,
        subtitledValues: filterByCity[cityName],
      }));
      return citiesWithSubtitle.filter((item) => item.subtitledValues.length);
    }, [producersSelectedCodes, producersFilterOptions]);

  const filters: FilterAppliedType = React.useMemo(() => {
    return [
      {
        name: t("PDFAppliedFilters.producers"),
        valuesWithSubtitle:
          producerFilterWithSubtitle.length > 0
            ? producerFilterWithSubtitle
            : undefined,
        values: [t("General.allSelect")],
      },
    ];
  }, [producerFilterWithSubtitle]);

  if (filters.length === 0 || filters[0].valuesWithSubtitle?.length === 0)
    return <></>;

  return (
    <PDFAppliedFilters
      pdfRef={summaryFiltersProducersRef}
      filters={filters}
      style={{ marginTop: "var(--spacing-8)" }}
      panelTitle={t("Dashboard.summaryExtract.pageTitle")}
    />
  );
};
