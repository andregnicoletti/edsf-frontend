export enum ExportDashboardDrawersNames {
  SUMMARY_EXTRACT = "summaryExtract",
  DETAILED_EXTRACT = "detailedExtract",
  DETAILED_EXTRACT_CITIES_DATA = "detailedExtractCitiesData",
  DETAILED_EXTRACT_BY_COURSE = "detailedExtractByCourse",
  DETAILED_EXTRACT_BY_MONTH = "detailedExtractByMonth",
}

export type PanelsToExport = {
  panelName: ExportDashboardDrawersNames | string;
  panelRef: HTMLDivElement[];
};
