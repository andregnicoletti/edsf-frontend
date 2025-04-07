import {
  ExportPdfAction,
  ExportPdfKind,
  ExportPdfState,
} from "./useExportPdf.types";

export function exportPdfReducer(
  state: ExportPdfState,
  action: ExportPdfAction
) {
  const { type, payload } = action;

  switch (type) {
    case ExportPdfKind.IS_CREATING_PDF:
      return { ...state, isCreatingPDF: payload };
    case ExportPdfKind.SET_CUSTOM_PANELS_REF:
      return { ...state, customPanelsRef: payload };
    case ExportPdfKind.ADD_CUSTOM_PANELS_REF: {
      const tempRefs = { ...state.customPanelsRef };
      tempRefs[payload.index] = {
        component: payload.component,
        title: payload.title,
      };
      return { ...state, customPanelsRef: tempRefs };
    }
    case ExportPdfKind.LOADING:
      return { ...state, loading: payload };
    case ExportPdfKind.SET_PANELS_SELECTED_TO_EXPORT:
      return { ...state, panelsSelectedToExport: payload };
    default:
      return state;
  }
}
