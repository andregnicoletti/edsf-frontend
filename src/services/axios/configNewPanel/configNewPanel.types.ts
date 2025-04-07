import { TableAttOrderType } from "@/store/features/ConfigNewPanel/ConfigNewPanelSlice";
import { Criterion, Indicator } from "@/types/ConfigNewPanel";
import { Producer } from "@/types/Producer";

export type GetIndicatorResponse = {
  panels: Array<Indicator>;
};

export type PanelTypeData = "bar_chart" | "table";

export type DataSelectionPerformance =
  | "producerBestResult"
  | "producerWorstResult";

export enum SendPanelAttributesColumns {
  producerDescription = "producerDescription",
  state = "state",
  goal = "goal",
  cityName = "cityName",
  value = "value",
  indicator = "indicator",
  year = "year",
}
export type SendPanelAttributes =
  | undefined
  | {
      columnsName: SendPanelAttributesColumns[];
      order: Array<{
        column: SendPanelAttributesColumns;
        order: TableAttOrderType;
      }>;
    };

export type SendPanelPreviewData = {
  panelType: PanelTypeData;
  panelName: string;
  configuration: {
    indicator: string;
    criterion: Criterion;
    dataSelection: string[];
    goal: boolean;
    attributes: SendPanelAttributes;
    filters?: {
      states?: string[];
      cities?: string[];
      producers?: string[];
    };
  };
};

export type SendPanelPreviewResponse<T> = {
  data: SendPanelPreviewContentResponse<T>;
};

export type SendPanelPreviewContentResponse<T> = {
  filter: Array<FilterPreviewPanel>;
  producers: Array<Producer>;
  datasets: T;
};

export type FilterPreviewPanel = {
  cityId: string;
  city: string;
  state: string;
  producers: Array<{
    producerId: string;
    producerCode: string;
    achievement: boolean;
  }>;
};

export type DatasetPreviewChartPanel = Array<{
  city: string;
  state: string;
  producer: string;
  producerId: string;
  producerPerYear: Array<{
    year: number;
    goal: number;
    value: number;
  }>;
}>;

export type DatasetPreviewTablePanel = {
  headers: Array<SendPanelAttributesColumns>;
  rows: Array<Record<SendPanelAttributesColumns, string | number>>;
};

export type SaveNewPanelData = SendPanelPreviewData;

export type YearsInpuResponse = {
  years: Array<string>;
};
