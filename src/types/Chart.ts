export type ChartType = {
  xAxis: Array<{
    data: string[];
    scaleType: "band";
  }>;
  series: SeriesChartType;
  goals: number[][];
};

export type SeriesChartType = Array<{
  id: string;
  label: string;
  color: string;
  data: Array<number | null>;
}>;

export type XAxisType = Array<{
  data: string[];
  scaleType: "band";
}>;

export type StackedChart = {
  series: Array<{
    dataKey: string;
    stack: "assets";
    label: string;
    color: string;
  }>;
  xAxis: Array<{ scaleType: "band"; dataKey: string }>;
  dataset: Array<Record<string, string | number>>;
};
