import React from "react";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import BarStackedChart from "./components/BarStackedChart";
import ExtractDetailedTable from "./components/ExtractDetailedTable";
import FilterDetailedExtract from "./components/FilterDetailedExtract";
import FilterToExportPdf from "./components/FilterToExportPdf";
import LineCustomChart from "./components/LineChart";

import SelectSimple from "@/components/CustomInputs/SelectSimple";
import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";
import { extractDetailedSliceActions } from "@/store/features/ExtractDetailed/ExtractDetailedSlice";
import { RootState } from "@/store/store";

import "./ExtractDetailed.styles.scss";

export const ExtractDetailed: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { state: stateExportPdf } = useExportPdfContext();

  const {
    extractDetailedFilters: { visualizationOptions, visualizationSelected },
  } = useSelector((state: RootState) => state.extractDetailed);

  return (
    <>
      {stateExportPdf.isCreatingPDF && <FilterToExportPdf />}
      <FilterDetailedExtract />
      <ExtractDetailedTable />
      <div className="visualization-select-container">
        <SelectSimple
          options={visualizationOptions}
          getId={(item) => item}
          getName={(item) => item}
          label={t("Dashboard.detailedExtract.chartsVisualizationFilterLabel")}
          onChangeSelectedOptionId={(item: any) =>
            dispatch(
              extractDetailedSliceActions.changeVisualizationOption(item)
            )
          }
          showDefaultOption={false}
          selectedOptionId={visualizationSelected}
        />
      </div>
      <div
        className={
          stateExportPdf.isCreatingPDF
            ? "extract-detailed-charts-container-column"
            : "extract-detailed-charts-container"
        }
      >
        <BarStackedChart
          order={visualizationSelected === "Menos inscritos" ? "asc" : "desc"}
        />
        <LineCustomChart
          order={visualizationSelected === "Menos inscritos" ? "asc" : "desc"}
        />
      </div>
    </>
  );
};
