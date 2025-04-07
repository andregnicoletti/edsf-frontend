import { PanelTypeData } from "@/services/axios/configNewPanel/configNewPanel.types";

export type SelectPanelTypeProps = {
  onChangePanelType: (panelType: PanelTypeData) => void;
};

export type PanelTypeButtonProps = {
  onClickPanel: () => void;
  imgSrc: string;
  label: string;
};
