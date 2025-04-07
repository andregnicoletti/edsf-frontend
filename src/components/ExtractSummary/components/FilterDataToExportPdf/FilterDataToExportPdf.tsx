import React from "react";

import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import PDFAppliedFilters from "@/components/PDFAppliedFilters";
import { FilterAppliedType } from "@/components/PDFAppliedFilters/PDFAppliedFilters.types";
import { RootState } from "@/store/store";
import { renderFromToDate } from "@/utils/date";

export const FilterDataToExportPdf: React.FC = () => {
  const { t } = useTranslation();
  const {
    extractSummaryFilters: {
      indicatorsFilterOptions,
      indicatorsSelectedCodes,
      citiesFilterOptions,
      citiesSelectedIds,
      coursesFilterOptions,
      coursesSelectedCodes,
      statesSelectedIds,
      dateFrom: dateFromString,
      dateTo: dateToString,
    },
  } = useSelector((state: RootState) => state.extractSummary);

  const filters: FilterAppliedType = React.useMemo(() => {
    const dateValues = [];
    if (dateFromString && dateToString)
      dateValues.push(
        renderFromToDate(dayjs(dateFromString), dayjs(dateToString), "MM/YYYY")
      );

    const response = [
      {
        name: t("PDFAppliedFilters.period"),
        values: dateValues,
      },
      {
        name: t("PDFAppliedFilters.indicator"),

        values: indicatorsFilterOptions
          .filter((item) => indicatorsSelectedCodes.includes(item.code))
          .map((indicator) => indicator.indicatorDescription),
      },
      {
        name: t("PDFAppliedFilters.course"),
        values: coursesFilterOptions
          .filter((item) => coursesSelectedCodes.includes(item.code))
          .map((course) => course.courseDescription),
      },
      {
        name: t("PDFAppliedFilters.uf"),
        values: statesSelectedIds,
      },
      {
        name: t("PDFAppliedFilters.city"),
        values: citiesFilterOptions
          .filter((item) => citiesSelectedIds.includes(item.id))
          .map((city) => city.city),
      },
    ];

    return response.map((item) =>
      item.values.length === 0
        ? { ...item, values: [t("General.allSelect")] }
        : item
    );
  }, [
    indicatorsSelectedCodes,
    citiesSelectedIds,
    statesSelectedIds,
    coursesSelectedCodes,
    dateFromString,
    dateToString,
  ]);

  if (filters.length === 0) return <></>;

  return (
    <PDFAppliedFilters
      filters={filters}
      style={{ marginTop: "var(--spacing-8)" }}
    />
  );
};
