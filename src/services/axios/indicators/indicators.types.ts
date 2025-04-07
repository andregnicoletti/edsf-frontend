export type RequestIndicatorsResponse = {
  panels: Array<RequestIndicatorItem>;
};

export type RequestIndicatorItem = {
  id: string;
  indicatorDescription: string;
  code: string;
  company_id: string;
};
