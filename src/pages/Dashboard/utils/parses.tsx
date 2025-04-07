import DashboardCustomChart from "../components/DashboardCustomChart";
import { DraggableListItemProps } from "../Dashboard.types";

import TableCustomPanel from "@/components/TableCustomPanel";
import {
  PanelByIdChartDatasets,
  PanelByIdTableDatasets,
  PanelDataByIdResponseData,
  PanelsListResponseItem,
} from "@/services/axios/dashboard/dashboard.types";
import {
  parseNewPanelPreviewToChart,
  parseNewPanelPreviewToTable,
} from "@/services/parseData/parseNewPanel";

export function parsePanelItemToDraggableChart(
  customPanelInfo: PanelsListResponseItem,
  panelData: PanelDataByIdResponseData<PanelByIdChartDatasets>
): DraggableListItemProps {
  const panelChart = parseNewPanelPreviewToChart(panelData);

  return {
    id: customPanelInfo.id,
    Component: (props: { exportedRef: any }) => (
      <DashboardCustomChart
        exportedRef={props.exportedRef}
        data={panelChart}
        customPanelInfo={customPanelInfo}
        panelDataById={panelData}
      />
    ),
    headerTitle: customPanelInfo.name,
    customPanelInfo,
  };
}

export function parsePanelItemToDraggableTable(
  customPanelInfo: PanelsListResponseItem,
  panelData: PanelDataByIdResponseData<PanelByIdTableDatasets>
): DraggableListItemProps {
  const panelTable = parseNewPanelPreviewToTable(panelData.datasets);

  return {
    id: customPanelInfo.id,
    Component: (props: { exportedRef: any }) => (
      <TableCustomPanel
        exportedRef={props.exportedRef}
        data={panelTable}
        panelTitle={customPanelInfo.name}
      />
    ),
    headerTitle: customPanelInfo.name,
    customPanelInfo,
  };
}
