import { PanelsListResponseItem } from "@/services/axios/dashboard/dashboard.types";

export type DraggableListItemProps = {
  id: string;
  Component: (props: { exportedRef: any }) => React.ReactNode;
  headerTitle: string;
  customPanelInfo?: PanelsListResponseItem;
};
