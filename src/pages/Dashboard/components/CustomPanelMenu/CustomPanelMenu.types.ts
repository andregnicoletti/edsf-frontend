import { PanelsListResponseItem } from "@/services/axios/dashboard/dashboard.types";

export type CustomPanelMenuProps = {
  customPanelInfo: PanelsListResponseItem;
  onClickDeletePanel: () => void;
};
