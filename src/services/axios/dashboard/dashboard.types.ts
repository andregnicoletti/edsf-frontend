import { SendPanelAttributesColumns } from "../configNewPanel/configNewPanel.types";

import { TableAttOrderType } from "@/store/features/ConfigNewPanel/ConfigNewPanelSlice";
import { Criterion } from "@/types/ConfigNewPanel";

export type DetailedExtractResponse = {
  municipioId: string;
  municipio: string;
  estado: string;
  produtoresMetaAtingida: number;
  totalCertificado: number;
  totalInscricao: number;
  totalProdutores: number;
};

export type ListDetailedExtractResponse = {
  status: boolean;
  data: DetailedExtractResponse[];
  filters: DetailedExtractResponseFilters;
};

export type DetailedExtractResponseFilters = {
  courses: Array<{
    courseCode: string;
    courseId: string;
    courseDescription: string;
  }>;
  states: Array<string>;
  cities: Array<string>;
};

export type ExtractDetailedData = {
  cities?: string[];
  states?: string[];
  courses?: string[];
  monthFrom?: string;
  yearFrom?: string;
  monthTo?: string;
  yearTo?: string;
};

export type PanelsListResponse = {
  panels: PanelsListResponsePanels;
};

export type PanelsListResponsePanels = Array<PanelsListResponseItem>;

export type PanelsListResponseItem = {
  id: string;
  type: "bar_chart";
  name: string;
  configuration: {
    indicator: string;
    criterion: Criterion;
    dataSelection:
      | Array<string>
      | Array<"producerBestResult" | "producerWorstResult">;
    goal: boolean;
    filters: {
      states: string[];
      cities: string[];
      producers: string[];
    };
    attributes: {
      columnsName: SendPanelAttributesColumns[];
      order: Array<{
        column: SendPanelAttributesColumns;
        order: TableAttOrderType;
      }>;
    };
  };
};

export type PanelDataByIdResponse<T> = {
  data: PanelDataByIdResponseData<T>;
};

export type PanelDataByIdResponseData<T> = {
  filter: Array<{
    cityId: string;
    city: string;
    state: string;
    producers: Array<{
      producerId: string;
      producerCode: string;
      achievement: boolean;
    }>;
  }>;
  producers: Array<{
    cityId: string;
    city: string;
    state: string;
    producerId: string;
    producerDescription: string;
    producerCode: string;
    achievement: boolean;
    value: number;
  }>;
  datasets: T;
};

export type PanelByIdChartDatasets = Array<{
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

export type PanelByIdTableDatasets = {
  headers: Array<SendPanelAttributesColumns>;
  rows: Array<Record<SendPanelAttributesColumns, string | number>>;
};

export type ExtractDetailedOrderCharts = "asc" | "desc";

export type DashboardStackedColumnsChartData = {
  filters: {
    sort: ExtractDetailedOrderCharts;
    total: number;
    courses?: string[];
    states?: string[];
    cities?: string[];
    monthFrom?: string;
    yearFrom?: string;
    monthTo?: string;
    yearTo?: string;
  };
};

export type DashboardStackedColumnsChartResponse = {
  filter: Array<
    StackedPropertiesOptional & {
      city: string;
      state: string;
      total: number;
    }
  >;
};

type StackedPropertiesOptional = { [key in string]: number | string };

export type DashboardLinesChartData = {
  filters: {
    sort: ExtractDetailedOrderCharts;
    total: number;
    courses?: string[];
    states?: string[];
    cities?: string[];
    monthFrom?: string;
    yearFrom?: string;
    monthTo?: string;
    yearTo?: string;
  };
};

export type DashboardLinesChartDataResponse = {
  filter: Array<{
    month: string;
    data: Array<{
      city_name: string;
      state: string;
      total_enrolled: number;
      certified: number;
      in_training: number;
    }>;
  }>;
};

export type RequestSummaryExtractData = {
  cities: string[];
  states: string[];
  courses: string[];
  indicators: string[];
  producers: string[];
  monthFrom?: string;
  yearFrom?: string;
  monthTo?: string;
  yearTo?: string;
};

export type RequestSummaryExtractResponse = {
  filter: {
    data: RequestSummaryExtractResponseData;
    filters: RequestSummaryExtractResponseFilters;
  };
};

export type RequestSummaryExtractResponseFilters = {
  indicators: Array<{
    indicatorCode: string;
    indicatorDescription: string;
    indicatorId: string;
  }>;
  courses: Array<{
    courseCode: string;
    courseId: string;
    courseDescription: string;
  }>;
  states: Array<string>;
  cities: Array<string>;
  producers: Array<{
    cityId: string;
    producerId: string;
    producerCode: string;
    producerDescription: string;
    achievement: boolean;
  }>;
};

export type RequestSummaryExtractResponseData = {
  indicators?: {
    availableTrainings: {
      quantity: number;
      totalDurationHours: string;
    };
    certifiedPeople: number;
    peopleInTraining: number;
    producersWhoMetGoal: {
      value: number;
      percentage: number;
    };
    registeredPeople: number;
    targetProducers: number;
  };
  courses?: {
    courseWithFewestRegistrations: {
      name: string;
      certifiedPeople: number;
      peopleInTraining: number;
      lessons: {
        quantity: number;
        averageDurationMinutes: number;
      };
    };
    courseWithMostRegistrations: {
      name: string;
      certifiedPeople: number;
      peopleInTraining: number;
      lessons: {
        quantity: number;
        averageDurationMinutes: number;
      };
    };
  };
};
