import {
  PanelByIdChartDatasets,
  PanelDataByIdResponseData,
  PanelsListResponseItem,
} from "@/services/axios/dashboard/dashboard.types";
import { ChartType } from "@/types/Chart";

export type DashboardCustomChartProps = {
  exportedRef: any;
  data: ChartType;
  customPanelInfo: PanelsListResponseItem;
  panelDataById: PanelDataByIdResponseData<PanelByIdChartDatasets>;
};
