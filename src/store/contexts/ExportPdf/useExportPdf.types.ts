import { ExportDashboardDrawersNames } from "@/pages/Dashboard/components/ExportDashboard/ExportDashboard.types";

export type ExportPdfProps = {
  state: ExportPdfState;
  summaryExtractRef: any;
  summaryFiltersProducersRef: any;
  detailedFiltersRef: any;
  detailedCitiesRef: any;
  detailedBarChartRef: any;
  detailedLinesChartRef: any;
  headerRef: any;
  footerRef: any;
  setLoading: (loading: boolean) => void;
  setPanelsNamesToExport: (panelsSelectedToExport: string[]) => void;
  setIsCreatingPDF: (isCreatingPDF: boolean) => void;
  setCustomPanelsRef: (
    ref: Array<{
      title: string;
      component: HTMLDivElement | undefined;
    }>
  ) => void;
  addCustomPanelsRef: (
    ref: {
      title: string;
      component: HTMLDivElement | undefined;
    },
    index: number
  ) => void;
};

export enum ExportPdfKind {
  SET_CUSTOM_PANELS_REF = "SET_CUSTOM_PANELS_REF",
  ADD_CUSTOM_PANELS_REF = "ADD_CUSTOM_PANELS_REF",
  LOADING = "LOADING",
  IS_CREATING_PDF = "IS_CREATING_PDF",
  SET_PANELS_SELECTED_TO_EXPORT = "SET_PANELS_SELECTED_TO_EXPORT",
}

export type ExportPdfAction =
  | { type: ExportPdfKind.LOADING; payload: boolean }
  | { type: ExportPdfKind.IS_CREATING_PDF; payload: boolean }
  | {
      type: ExportPdfKind.SET_PANELS_SELECTED_TO_EXPORT;
      payload: Array<ExportDashboardDrawersNames | string>;
    }
  | {
      type: ExportPdfKind.ADD_CUSTOM_PANELS_REF;
      payload: {
        title: string;
        component: HTMLDivElement | undefined;
        index: number;
      };
    }
  | {
      type: ExportPdfKind.SET_CUSTOM_PANELS_REF;
      payload: Array<{
        title: string;
        component: HTMLDivElement | undefined;
      }>;
    };

export type ExportPdfState = {
  loading: boolean;
  isCreatingPDF: boolean;
  panelsSelectedToExport: Array<ExportDashboardDrawersNames | string>;
  customPanelsRef?: Record<
    number,
    {
      title: string;
      component: HTMLDivElement | undefined;
    }
  >;
};
