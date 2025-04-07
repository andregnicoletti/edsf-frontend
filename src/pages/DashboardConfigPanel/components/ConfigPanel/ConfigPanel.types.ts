import { DataSelectionPerformance } from "@/services/axios/configNewPanel/configNewPanel.types";
import { Criterion } from "@/types/ConfigNewPanel";

export type SimpleOptions<T> = Array<{ id: T; label: string }>;

export const criterionOptions: SimpleOptions<Criterion> = [
  {
    id: "comparison",
    label: "Dashboard.ConfigurePanel.criterion.comparison",
  },
  {
    id: "performance",
    label: "Dashboard.ConfigurePanel.criterion.performance",
  },
];

export const performanceOptions: SimpleOptions<DataSelectionPerformance> = [
  {
    id: "producerBestResult",
    label: "Dashboard.ConfigurePanel.dataSelection.bestResults",
  },
  {
    id: "producerWorstResult",
    label: "Dashboard.ConfigurePanel.dataSelection.worstResults",
  },
];
