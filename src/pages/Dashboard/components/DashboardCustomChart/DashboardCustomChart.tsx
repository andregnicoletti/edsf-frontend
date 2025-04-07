import React from "react";

import { useTranslation } from "react-i18next";

import { DashboardCustomChartProps } from "./DashboardCustomChart.types";

import ChartColumnCustomPanel from "@/components/ChartColumnCustomPanel";
import PDFAppliedFilters from "@/components/PDFAppliedFilters";
import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";

export const DashboardCustomChart: React.FC<DashboardCustomChartProps> = (
  props
) => {
  const { t } = useTranslation();
  const { state: stateExportPdf } = useExportPdfContext();

  function makeDataSelectionValueString() {
    let valueName = "";

    if (props.customPanelInfo.configuration.criterion === "comparison") {
      valueName = t("PDFAppliedFilters.comparison") + " ";
      valueName += props.customPanelInfo.configuration.dataSelection.join("-");
    } else {
      const dataSelection =
        props.customPanelInfo.configuration.dataSelection[0];

      if (dataSelection === "producerBestResult") {
        valueName = t("PDFAppliedFilters.bestResults");
      } else {
        valueName = t("PDFAppliedFilters.worstResults");
      }
    }

    return valueName;
  }

  const filters = React.useMemo(() => {
    const response = [
      {
        name: t("PDFAppliedFilters.dataSelection"),
        values: [makeDataSelectionValueString()],
      },
      {
        name: t("PDFAppliedFilters.uf"),
        values: props.customPanelInfo.configuration.filters.states,
      },
      {
        name: t("PDFAppliedFilters.city"),
        values: props.customPanelInfo.configuration.filters.cities.map(
          (item) =>
            props.panelDataById.filter.find((city) => city.cityId === item)
              ?.city ?? ""
        ),
      },
      {
        name: t("PDFAppliedFilters.producers"),
        values: props.customPanelInfo.configuration.filters.producers.map(
          (item) =>
            props.panelDataById.producers.find(
              (producer) => producer.producerCode === item
            )?.producerDescription ?? ""
        ),
      },
    ];

    return response.map((item) =>
      item.values.length === 0
        ? { ...item, values: [t("General.allSelect")] }
        : item
    );
  }, [props.customPanelInfo]);

  return (
    <div ref={props.exportedRef}>
      <ChartColumnCustomPanel
        data={props.data}
        showGoals={props.customPanelInfo.configuration.goal}
        panelTitle={props.customPanelInfo.name}
      />
      {stateExportPdf.isCreatingPDF && (
        <PDFAppliedFilters style={{ marginTop: "1rem" }} filters={filters} />
      )}
    </div>
  );
};
