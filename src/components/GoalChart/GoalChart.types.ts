import { SeriesChartType } from "@/types/Chart";

export type GoalChartProps = {
  series: SeriesChartType;
  goalsValues: number[][];
  max: number;
};
