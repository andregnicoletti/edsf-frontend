import React from "react";

import { exportPdfReducer } from "./exportPdfReducer";
import { ExportPdfKind, ExportPdfProps } from "./useExportPdf.types";

const DEFAULT_VALUE: ExportPdfProps = {} as ExportPdfProps;

const ExportPdfContext = React.createContext<ExportPdfProps>(DEFAULT_VALUE);

export const ExportPdfContextProvider: React.FC<{
  children: React.ReactElement;
}> = (props) => {
  const summaryExtractRef = React.useRef();
  const summaryFiltersProducersRef = React.useRef();
  const detailedCitiesRef = React.useRef();
  const detailedBarChartRef = React.useRef();
  const detailedLinesChartRef = React.useRef();
  const detailedFiltersRef = React.useRef();
  const headerRef = React.useRef();
  const footerRef = React.useRef();

  const [state, dispatch] = React.useReducer(exportPdfReducer, {
    loading: false,
    isCreatingPDF: false,
    panelsSelectedToExport: [],
  });

  const store = React.useMemo(
    () => ({
      state,
      setPanelsNamesToExport,
      setCustomPanelsRef,
      addCustomPanelsRef,
      setIsCreatingPDF,
      setLoading,
      summaryExtractRef,
      summaryFiltersProducersRef,
      detailedCitiesRef,
      detailedBarChartRef,
      detailedLinesChartRef,
      detailedFiltersRef,
      headerRef,
      footerRef,
    }),
    [
      state,
      summaryExtractRef,
      summaryFiltersProducersRef,
      detailedCitiesRef,
      detailedBarChartRef,
      detailedLinesChartRef,
      detailedFiltersRef,
      headerRef,
      footerRef,
    ]
  );

  function setPanelsNamesToExport(panelsSelectedToExport: string[]) {
    dispatch({
      type: ExportPdfKind.SET_PANELS_SELECTED_TO_EXPORT,
      payload: panelsSelectedToExport,
    });
  }

  function setLoading(loading: boolean) {
    dispatch({
      type: ExportPdfKind.LOADING,
      payload: loading,
    });
  }

  function setIsCreatingPDF(isCreatingPDF: boolean) {
    dispatch({
      type: ExportPdfKind.IS_CREATING_PDF,
      payload: isCreatingPDF,
    });
  }

  function addCustomPanelsRef(
    ref: {
      title: string;
      component: HTMLDivElement | undefined;
    },
    index: number
  ) {
    dispatch({
      type: ExportPdfKind.ADD_CUSTOM_PANELS_REF,
      payload: { ...ref, index },
    });
  }

  function setCustomPanelsRef(
    ref: Array<{
      title: string;
      component: HTMLDivElement | undefined;
    }>
  ) {
    dispatch({
      type: ExportPdfKind.SET_CUSTOM_PANELS_REF,
      payload: ref,
    });
  }

  return (
    <ExportPdfContext.Provider value={store}>
      {props.children}
    </ExportPdfContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useExportPdfContext = () => React.useContext(ExportPdfContext);
