import React from "react";

import { Button, Icon, Typography } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import ComponentPanelDraggable from "./components/ComponentPanelDraggable";
import CustomPanelMenu from "./components/CustomPanelMenu";
import ExportDashboard from "./components/ExportDashboard";
import { DraggableListItemProps } from "./Dashboard.types";
import {
  parsePanelItemToDraggableChart,
  parsePanelItemToDraggableTable,
} from "./utils/parses";

import Breadcrumb from "@/components/Breadcrumb";
import CustomDraggable from "@/components/CustomDraggable";
import Dialogue from "@/components/Dialogue";
import ExtractDetailed from "@/components/ExtractDetailed";
import ExtractSummary from "@/components/ExtractSummary";
import PanelDraggable from "@/components/PanelDraggable";
import PDFLoadingScreen from "@/components/PDFLoadingScreen";
import { RoutesPaths } from "@/routes/routesPaths";
import apiService from "@/services/axios";
import {
  PanelByIdChartDatasets,
  PanelByIdTableDatasets,
  PanelDataByIdResponseData,
  PanelsListResponsePanels,
} from "@/services/axios/dashboard/dashboard.types";
import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";

import "./Dashboard.styles.scss";

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setCustomPanelsRef, addCustomPanelsRef, state } =
    useExportPdfContext();
  const [panelIdToDelete, setPanelIdToDelete] = React.useState<string>("");

  const initialPanels: DraggableListItemProps[] = [
    {
      id: "summaryExtract",
      Component: () => <ExtractSummary />,
      headerTitle: t("Dashboard.summaryExtract.pageTitle"),
    },
    {
      id: "detailedExtract",
      Component: () => <ExtractDetailed />,
      headerTitle: t("Dashboard.detailedExtract.panelTitle"),
    },
  ];

  const [panels, setPanels] =
    React.useState<DraggableListItemProps[]>(initialPanels);

  function onClickAddPanel() {
    navigate(RoutesPaths.DashboardAddPanel);
  }

  async function getPanels() {
    try {
      setCustomPanelsRef([]);
      const responsePanels = await apiService.requestPanelsList();
      addNewPanelsToDraggableList(responsePanels);
    } catch (error) {
      console.log("[getPanels] error", error);
    }
  }

  async function addNewPanelsToDraggableList(
    responsePanels: PanelsListResponsePanels
  ) {
    const newPanels: DraggableListItemProps[] = await Promise.all(
      responsePanels.map(async (item) => {
        const panelData = await apiService.requestPanelById(item.id);
        if (item.type === "bar_chart") {
          return parsePanelItemToDraggableChart(
            item,
            panelData as PanelDataByIdResponseData<PanelByIdChartDatasets>
          );
        } else {
          return parsePanelItemToDraggableTable(
            item,
            panelData as PanelDataByIdResponseData<PanelByIdTableDatasets>
          );
        }
      })
    );

    setPanels([...initialPanels, ...newPanels]);
  }

  const addRefToUseState = React.useCallback(
    (ref: HTMLDivElement | undefined, index: number, headerTitle: string) => {
      addCustomPanelsRef({ component: ref, title: headerTitle }, index);
    },
    [state.isCreatingPDF]
  );

  async function deletePanel() {
    try {
      await apiService.deleteNewPanel(panelIdToDelete);
      getPanels();
    } catch (error) {
      console.log("[deletePanel] error", error);
    } finally {
      setPanelIdToDelete("");
    }
  }

  const namePanelToDelete = React.useMemo(() => {
    const panel = panels.find((panel) => panel.id === panelIdToDelete);
    return panel?.headerTitle;
  }, [panelIdToDelete]);

  React.useEffect(() => {
    getPanels();
  }, []);

  return (
    <div id="dashboard-container" className="flex-column">
      <PDFLoadingScreen />
      <Dialogue
        open={!!panelIdToDelete}
        title={t("Dashboard.excludeEditPanel.titleExcludeDialogue")}
        text={t("Dashboard.excludeEditPanel.contentExcludeDialogue", {
          panelName: namePanelToDelete,
        })}
        onPressCancel={() => setPanelIdToDelete("")}
        onPressConfirm={deletePanel}
        cancelButtonText={t("Dashboard.excludeEditPanel.cancel")}
        confirmButtonText={t("Dashboard.excludeEditPanel.delete")}
      />
      <Breadcrumb links={[]} currentRoutePath={t("Dashboard.pageTitle")} />
      <div className="dashboard-title-container">
        <div className="dashboard-title-left-container">
          <Typography variant="title6" fontWeight="semiBold">
            {t("Dashboard.pageTitle")}
          </Typography>
          <ExportDashboard />
        </div>
        <Button variant="primary" onClick={onClickAddPanel}>
          <Icon iconName="Plus" size="sm" />
          {t("Dashboard.addPanel")}
        </Button>
      </div>
      <CustomDraggable
        setList={setPanels}
        list={panels}
        droppableId="dashboard"
      >
        {({ id, headerTitle, Component, customPanelInfo }, index) => {
          return (
            <PanelDraggable
              idPanel={id}
              index={index}
              key={id}
              headerTitle={headerTitle}
              rightComponent={
                <>
                  {customPanelInfo && (
                    <CustomPanelMenu
                      customPanelInfo={customPanelInfo}
                      onClickDeletePanel={() => {
                        setPanelIdToDelete(customPanelInfo.id);
                      }}
                    />
                  )}
                </>
              }
            >
              <ComponentPanelDraggable
                index={index}
                Component={Component}
                addRefToUseState={addRefToUseState}
                headerTitle={headerTitle}
              />
            </PanelDraggable>
          );
        }}
      </CustomDraggable>
    </div>
  );
};
