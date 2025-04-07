import { ExportDashboardDrawersNames } from "@/pages/Dashboard/components/ExportDashboard/ExportDashboard.types";

export type ExportDashboardDrawerProps = {
  open: boolean;
  onClose: () => void;
  onExport: (panels: Array<ExportDashboardDrawersNames | string>) => void;
  customPanelsNames: string[];
};

export type SelectionControl = { [key: string]: boolean };
