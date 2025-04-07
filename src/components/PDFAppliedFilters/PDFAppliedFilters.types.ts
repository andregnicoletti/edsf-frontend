export type PDFAppliedFiltersProps = {
  filters: FilterAppliedType;
  pdfRef?: any;
  style?: React.CSSProperties;
  panelTitle?: string;
};

export type FilterAppliedType = Array<{
  name: string;
  values?: Array<string>;
  valuesWithSubtitle?: FilterWithSubtitleValues;
}>;

export type FilterWithSubtitleValues = Array<{
  subtitle: string;
  subtitledValues: Array<string>;
}>;
