import React from "react";

import { IconButton, Menu } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CustomPanelMenuProps } from "./CustomPanelMenu.types";

import { RoutesPaths } from "@/routes/routesPaths";
import { DataSelectionPerformance } from "@/services/axios/configNewPanel/configNewPanel.types";
import { parseAttResponseToLocalAttributes } from "@/services/parseData/parseNewPanel";
import {
  configNewPanelActions,
  ConfigNewPanelState,
} from "@/store/features/ConfigNewPanel/ConfigNewPanelSlice";
import { RootState } from "@/store/store";

export const CustomPanelMenu: React.FC<CustomPanelMenuProps> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const configPanel = useSelector((state: RootState) => state.configNewPanel);
  const { indicators } = useSelector((state: RootState) => state.indicators);

  function onClickEditPanel() {
    if (!props.customPanelInfo) return;

    const customPanelInfo = props.customPanelInfo;
    const configuration = customPanelInfo.configuration;

    const newState: ConfigNewPanelState = {
      ...configPanel,
      isEdittingPanel: true,
      panelId: customPanelInfo?.id,
      panelName: customPanelInfo.name,
      criterion: configuration.criterion,
      dataSelectionComparison:
        configuration.criterion === "comparison"
          ? configuration.dataSelection
          : [],
      dataSelectionPerformance:
        configuration.criterion === "performance"
          ? (configuration.dataSelection[0] as DataSelectionPerformance)
          : "",
      attributes: [],
      showGoal: configuration.goal,
      filters: {
        indicator: {
          indicatorOptions: indicators,
          indicatorIdSelected: configuration.indicator,
        },
        cities: {
          citiesOptions: [],
          citiesIdsSelected: configuration.filters.cities,
        },
        states: {
          statesOptions: [],
          statesIdsSelected: configuration.filters.states,
        },
        producers: {
          producersOptions: [],
          producersIdsSelected: configuration.filters.producers,
        },
      },
    };
    if (props.customPanelInfo?.type === "bar_chart") {
      newState.panelType = "bar_chart";
    } else {
      newState.panelType = "table";
      newState.attributes = parseAttResponseToLocalAttributes(
        configuration.attributes
      );
    }
    dispatch(configNewPanelActions.editPanel(newState));
    navigate(RoutesPaths.DashboardConfigPanel);
  }

  if (!props.customPanelInfo) return <></>;

  return (
    <Menu.Root>
      <Menu.Trigger as="div">
        <IconButton
          size="md"
          aria-label="collapsable-panel-button"
          variant="tertiary"
          iconName={"DotsVertical"}
          onClick={() => {}}
        />
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item onClick={onClickEditPanel} value="edit-panel">
            {t("Dashboard.excludeEditPanel.editPanelButton")}
          </Menu.Item>
          <Menu.Item onClick={props.onClickDeletePanel} value="delete-panel">
            {t("Dashboard.excludeEditPanel.deletePanelButton")}
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};
