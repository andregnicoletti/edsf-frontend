import { SeriesChartType, XAxisType } from "@/types/Chart";

export type ChartTooltipProps = {
  series: SeriesChartType;
  index?: number | null;
  xAxis: XAxisType;
};
