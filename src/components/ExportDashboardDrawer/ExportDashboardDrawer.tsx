import React from "react";

import { Button, Typography } from "@cpqd-quati/react";
import { Checkbox, Drawer, FormControlLabel, FormGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

import Badge from "../Badge";

import {
  ExportDashboardDrawerProps,
  SelectionControl,
} from "./ExportDashboardDrawer.types";

import { ExportDashboardDrawersNames } from "@/pages/Dashboard/components/ExportDashboard/ExportDashboard.types";
import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";

import "./ExportDashboardDrawer.styles.scss";

const panelsSelectedToExportDefault: SelectionControl = {
  [ExportDashboardDrawersNames.SUMMARY_EXTRACT]: false,
  [ExportDashboardDrawersNames.DETAILED_EXTRACT_CITIES_DATA]: false,
  [ExportDashboardDrawersNames.DETAILED_EXTRACT_BY_COURSE]: false,
  [ExportDashboardDrawersNames.DETAILED_EXTRACT_BY_MONTH]: false,
};

const parseStringArrayToPanelsSelection = (panels: Array<string>) => {
  const result: SelectionControl = { ...panelsSelectedToExportDefault };

  panels.forEach((panel) => {
    result[panel] = false;
  });

  return result;
};

export const ExportDashboardDrawer: React.FC<ExportDashboardDrawerProps> =
  React.memo(function ExportDashboardDrawer(props) {
    const { t } = useTranslation();
    const { setPanelsNamesToExport } = useExportPdfContext();

    const [panelsToExport, setPanelsToExport] =
      React.useState<SelectionControl>(
        parseStringArrayToPanelsSelection(props.customPanelsNames)
      );

    React.useEffect(() => {
      setPanelsToExport(
        parseStringArrayToPanelsSelection(props.customPanelsNames)
      );
    }, [props.customPanelsNames]);

    function selectExtractDetailed() {
      setPanelsToExport({
        ...panelsToExport,
        [ExportDashboardDrawersNames.DETAILED_EXTRACT_BY_COURSE]:
          !extractDetailedSelected,
        [ExportDashboardDrawersNames.DETAILED_EXTRACT_BY_MONTH]:
          !extractDetailedSelected,
        [ExportDashboardDrawersNames.DETAILED_EXTRACT_CITIES_DATA]:
          !extractDetailedSelected,
      });
    }

    function changePanelSelection(
      panelName: ExportDashboardDrawersNames | string
    ) {
      setPanelsToExport({
        ...panelsToExport,
        [panelName]: !panelsToExport[panelName],
      });
    }

    function changeAll() {
      const keys = Object.keys(panelsToExport);
      const newPanelsSelected = keys.reduce((acc, key) => {
        acc[key] = !allPanelsSelected;
        return acc;
      }, panelsToExport);

      setPanelsToExport({
        ...newPanelsSelected,
      });
    }

    function exportPanels(panelsToExportKeys: Array<string>) {
      let allPanels = [];

      const hasSomeExtractDetailedPanel =
        panelsToExportKeys.includes(
          ExportDashboardDrawersNames.DETAILED_EXTRACT_BY_COURSE
        ) ||
        panelsToExportKeys.includes(
          ExportDashboardDrawersNames.DETAILED_EXTRACT_BY_MONTH
        ) ||
        panelsToExportKeys.includes(
          ExportDashboardDrawersNames.DETAILED_EXTRACT_CITIES_DATA
        );

      if (hasSomeExtractDetailedPanel) {
        allPanels.push(ExportDashboardDrawersNames.DETAILED_EXTRACT);
      }
      allPanels = [...allPanels, ...panelsToExportKeys];

      setPanelsNamesToExport(allPanels);
      props.onExport(allPanels);
    }

    function onClickExport() {
      props.onClose();
      const panelsKeys = Object.keys(panelsToExport);
      const panelsSelected = panelsKeys.filter(
        (key) => panelsToExport[key] === true
      );
      exportPanels(panelsSelected);
    }

    const extractDetailedSelected = React.useMemo(() => {
      return (
        panelsToExport[
          ExportDashboardDrawersNames.DETAILED_EXTRACT_BY_COURSE
        ] &&
        panelsToExport[ExportDashboardDrawersNames.DETAILED_EXTRACT_BY_MONTH] &&
        panelsToExport[ExportDashboardDrawersNames.DETAILED_EXTRACT_CITIES_DATA]
      );
    }, [panelsToExport]);

    const allPanelsSelected = React.useMemo(() => {
      const keys = Object.keys(panelsToExport);
      const allSelectedTrue = keys.every((key) => panelsToExport[key]);

      return allSelectedTrue;
    }, [panelsToExport, props.customPanelsNames]);

    const noneSelected = React.useMemo(() => {
      const keys = Object.keys(panelsToExport);
      const hasSomeSelected = keys.some((key) => panelsToExport[key]);
      const noneSelected = !hasSomeSelected;

      return noneSelected;
    }, [panelsToExport, props.customPanelsNames]);

    return (
      <Drawer anchor="right" open={props.open} onClose={props.onClose}>
        <div className="export-dashboard-drawer-container">
          <Typography size="lg" fontWeight="bold">
            {t("Dashboard.exportData.title")}
          </Typography>
          <div className="export-dashboard-badge">
            <Badge
              text={t("Dashboard.exportData.titleBadge")}
              shape="square"
              leftIcon="Information"
              variant="info"
              size="medium"
            />
          </div>
          <div className="box-card">
            <Typography size="lg" fontWeight="medium">
              {t("Dashboard.exportData.contentTitle")}
            </Typography>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={allPanelsSelected} onClick={changeAll} />
                }
                label={t("Dashboard.exportData.allPanels")}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    disabled={allPanelsSelected}
                    checked={
                      panelsToExport[
                        ExportDashboardDrawersNames.SUMMARY_EXTRACT
                      ]
                    }
                    onClick={() =>
                      changePanelSelection(
                        ExportDashboardDrawersNames.SUMMARY_EXTRACT
                      )
                    }
                  />
                }
                label={t("Dashboard.summaryExtract.pageTitle")}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    disabled={allPanelsSelected}
                    checked={extractDetailedSelected}
                    onClick={selectExtractDetailed}
                  />
                }
                label={t("Dashboard.detailedExtract.panelTitle")}
              />

              <FormControlLabel
                style={{ marginLeft: "var(--spacing-12)" }}
                control={
                  <Checkbox
                    disabled={allPanelsSelected || extractDetailedSelected}
                    checked={
                      panelsToExport[
                        ExportDashboardDrawersNames.DETAILED_EXTRACT_CITIES_DATA
                      ]
                    }
                    onClick={() =>
                      changePanelSelection(
                        ExportDashboardDrawersNames.DETAILED_EXTRACT_CITIES_DATA
                      )
                    }
                  />
                }
                label={t("Dashboard.exportData.citiesData")}
              />

              <FormControlLabel
                style={{ marginLeft: "var(--spacing-12)" }}
                control={
                  <Checkbox
                    disabled={allPanelsSelected || extractDetailedSelected}
                    checked={
                      panelsToExport[
                        ExportDashboardDrawersNames.DETAILED_EXTRACT_BY_COURSE
                      ]
                    }
                    onClick={() =>
                      changePanelSelection(
                        ExportDashboardDrawersNames.DETAILED_EXTRACT_BY_COURSE
                      )
                    }
                  />
                }
                label={t("Dashboard.detailedExtract.certifiedByCourse")}
              />

              <FormControlLabel
                style={{ marginLeft: "var(--spacing-12)" }}
                control={
                  <Checkbox
                    disabled={allPanelsSelected || extractDetailedSelected}
                    checked={
                      panelsToExport[
                        ExportDashboardDrawersNames.DETAILED_EXTRACT_BY_MONTH
                      ]
                    }
                    onClick={() =>
                      changePanelSelection(
                        ExportDashboardDrawersNames.DETAILED_EXTRACT_BY_MONTH
                      )
                    }
                  />
                }
                label={t("Dashboard.detailedExtract.certifiedByMonth")}
              />

              {props.customPanelsNames.map((item, index) => (
                <FormControlLabel
                  key={item + index}
                  control={
                    <Checkbox
                      disabled={allPanelsSelected}
                      checked={panelsToExport[item]}
                      onClick={() => changePanelSelection(item)}
                    />
                  }
                  label={item}
                />
              ))}
            </FormGroup>
          </div>
          <div className="export-dashboard-buttons-container">
            <Button variant="secondary" onClick={props.onClose}>
              {t("General.close")}
            </Button>
            <Button
              variant="primary"
              disabled={noneSelected}
              onClick={onClickExport}
            >
              {t("General.export")}
            </Button>
          </div>
        </div>
      </Drawer>
    );
  }, arePropsEqual);

function arePropsEqual(
  prevProps: ExportDashboardDrawerProps,
  nextProps: ExportDashboardDrawerProps
) {
  return (
    prevProps.customPanelsNames.join(",") ===
      nextProps.customPanelsNames.join(",") && prevProps.open === nextProps.open
  );
}
