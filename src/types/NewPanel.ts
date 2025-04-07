export enum NewPanelAttributes {
  producer = "producer",
  city = "city",
  indicator = "indicator",
  year = "year",
  goal = "goal",
  indicatorPercent = "indicatorPercent",
}

export type TableNewPanel = {
  headers: NewPanelAttributes[];
  rows: { [key in NewPanelAttributes]?: string | number }[];
};
