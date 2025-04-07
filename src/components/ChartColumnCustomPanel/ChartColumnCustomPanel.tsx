import React from "react";

import { BarChart, barElementClasses, ChartsTooltip } from "@mui/x-charts";

import ChartTooltip from "../ChartTooltip";
import GoalChart from "../GoalChart";
import Legend from "../Legend";
import PDFPanelTitle from "../PDFPanelTitle";

import { ChartColumnCustomPanelProps } from "./ChartColumnCustomPanel.types";

import { bottomAxisChart, marginChart } from "@/styles/charts";
import { SeriesChartType } from "@/types/Chart";

import "./ChartColumnCustomPanel.styles.scss";

const DEFAULT_MAX_VALUE = 10;

export const ChartColumnCustomPanel: React.FC<ChartColumnCustomPanelProps> = (
  props
) => {
  function calcSeriesMaxValue() {
    const maxValuesOfEeachSerie: number[] = [];
    props.data?.series.forEach((item) => {
      const value = Math.max(...item.data.map((item) => item ?? 0));
      maxValuesOfEeachSerie.push(value);
    });
    props.data?.goals.forEach((item) => {
      maxValuesOfEeachSerie.push(Math.max(...(item || [])));
    });
    const maxValue = Math.max(...maxValuesOfEeachSerie);
    return generateMaxChartValue(maxValue);
  }

  function generateMaxChartValue(maxValue: number) {
    if (maxValue === 0) return 0;
    const integerValue = Math.trunc(maxValue);
    const integerValueString = integerValue.toString();
    const reducedValueString =
      integerValueString.slice(0, 1) + "." + integerValueString.slice(1);
    const reducedFloat = parseFloat(reducedValueString);
    const multiple = integerValue / reducedFloat;
    const roundedValue = Math.ceil(reducedFloat) * multiple;
    return roundedValue;
  }

  const maxChart = React.useMemo(
    () => calcSeriesMaxValue() || DEFAULT_MAX_VALUE,
    [props.data?.series]
  );

  const seriesToLegend: SeriesChartType = React.useMemo(() => {
    const tempSeries = [...(props.data?.series || [])];
    if (props.showGoals)
      tempSeries.push({
        id: "Meta",
        label: "Meta",
        color: "var(--indicator-danger-400)",
        data: props.data?.goals[0] || [],
      });
    return tempSeries;
  }, [props.data?.series]);

  const seriesToTooltip: SeriesChartType = React.useMemo(() => {
    const tempSeries = [...(props.data?.series || [])];
    if (props.showGoals) {
      (props.data?.series || []).forEach((item, index) => {
        tempSeries.push({
          id: "Meta " + item.label,
          label: "Meta " + item.label,
          color: "var(--indicator-danger-400)",
          data: props.data?.goals[index] || [],
        });
      });
    }

    return tempSeries;
  }, [props.data?.series]);

  if (!props.data) return <></>;
  return (
    <div className="data-panel-container" ref={props.exportedRef}>
      {props.panelTitle && <PDFPanelTitle title={props.panelTitle} />}
      <Legend series={seriesToLegend} />
      <BarChart
        skipAnimation
        margin={marginChart}
        bottomAxis={bottomAxisChart as any}
        loading={false}
        tooltip={{
          trigger: "none",
        }}
        sx={{
          [`.${barElementClasses.root}`]: {
            width: "5px",
          },
        }}
        slotProps={{
          loadingOverlay: { message: "Carregando" },
          noDataOverlay: { message: "Nenhum dado." },
          legend: { hidden: true },
        }}
        series={props.data.series}
        leftAxis={{
          tickLabelStyle: {
            fontSize: "0.75rem",
          },
        }}
        yAxis={[
          {
            max: maxChart,
          },
        ]}
        xAxis={props.data.xAxis}
      >
        <ChartsTooltip
          slots={{
            axisContent: (item) => {
              return (
                <ChartTooltip
                  index={item.dataIndex}
                  series={seriesToTooltip}
                  xAxis={props.data?.xAxis || []}
                />
              );
            },
          }}
        />
        {props.showGoals && (
          <GoalChart
            series={props.data.series}
            goalsValues={props.data.goals}
            max={maxChart}
          />
        )}
      </BarChart>
    </div>
  );
};
