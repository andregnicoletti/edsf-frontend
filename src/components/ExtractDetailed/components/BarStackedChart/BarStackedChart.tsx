import React from "react";

import { Typography } from "@cpqd-quati/react";
import { Box } from "@mui/material";
import { BarChart, barElementClasses } from "@mui/x-charts";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { BarStackedChartProps } from "./BarStackedChart.types";

import Legend from "@/components/Legend";
import PDFPanelTitle from "@/components/PDFPanelTitle";
import apiService from "@/services/axios";
import { parseStackedDataDashboardToStackedChart } from "@/services/parseData/parseExtractDetailed";
import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";
import { RootState } from "@/store/store";
import { bottomAxisChart, marginChart } from "@/styles/charts";
import { StackedChart } from "@/types/Chart";

export const BarStackedChart: React.FC<BarStackedChartProps> = (props) => {
  const { t } = useTranslation();
  const { detailedBarChartRef } = useExportPdfContext();

  const filters = useSelector(
    (state: RootState) => state.extractDetailed.extractDetailedFilters
  );

  const [data, setData] = React.useState<StackedChart | undefined>();

  async function requestChartData() {
    try {
      const dateFrom = dayjs(filters.dateFrom);
      const dateTo = dayjs(filters.dateTo);

      const response = await apiService.requestDashboardStackedBars({
        filters: {
          sort: props.order,
          total: 10,
          courses: filters.coursesSelectedCodes,
          cities: filters.citiesFilterOptions
            .filter((cities) => filters.citiesSelectedIds.includes(cities.id))
            .map((cities) => cities.city),
          states: filters.statesSelectedIds,
          monthFrom: dateFrom.format("MM"),
          yearFrom: dateFrom.format("YYYY"),
          monthTo: dateTo.format("MM"),
          yearTo: dateTo.format("YYYY"),
        },
      });
      const parsedDataResponse =
        parseStackedDataDashboardToStackedChart(response);
      setData(parsedDataResponse);
    } catch (error) {
      console.log("[requestChartStackedData]", error);
    }
  }

  React.useEffect(() => {
    requestChartData();
  }, [
    props.order,
    filters.coursesSelectedCodes,
    filters.citiesFilterOptions,
    filters.citiesSelectedIds,
    filters.statesSelectedIds,
    filters.dateFrom,
    filters.dateTo,
  ]);

  return (
    <div
      ref={detailedBarChartRef}
      style={{ display: "flex", flex: 1, flexDirection: "column" }}
    >
      <PDFPanelTitle title={t("Dashboard.detailedExtract.panelTitle")} />

      <Box flex={1} className="box-card">
        <Typography fontWeight="bold" size="md" color="var(--neutral-800)">
          {t("Dashboard.detailedExtract.certifiedByCourse")}
        </Typography>
        <div style={{ width: "100%", height: "600px" }}>
          <BarChart
            skipAnimation
            margin={marginChart}
            bottomAxis={bottomAxisChart as any}
            dataset={data?.dataset}
            series={data?.series || []}
            xAxis={data?.xAxis}
            slotProps={{
              legend: { hidden: true },
              noDataOverlay: { message: t("General.emptyChartMessage") },
            }}
            tooltip={{
              trigger: !data || data.series.length === 0 ? "none" : undefined,
            }}
            leftAxis={{
              tickLabelStyle: {
                fontSize: "0.75rem",
              },
            }}
            height={600}
            sx={{
              [`.${barElementClasses.root}`]: {
                width: "5px",
              },
            }}
          />
        </div>

        <Legend series={data?.series || []} />
      </Box>
    </div>
  );
};
