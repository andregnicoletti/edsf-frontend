import React from "react";

import { Button, Icon } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";

import ExportDashboardDrawer from "@/components/ExportDashboardDrawer";
import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";

export const ExportDashboard: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { t } = useTranslation();

  const { state, setIsCreatingPDF } = useExportPdfContext();

  function onClickExportButtonToOpenDrawer() {
    setDrawerOpen(true);
  }

  const customPanelsIds: string[] = React.useMemo(() => {
    const keys = Object.keys(state.customPanelsRef || {});
    const refs = keys.map((key) => state.customPanelsRef?.[Number(key)]);
    const validRefs = refs?.filter((ref) => !!ref) || [];
    const titlesIds = validRefs.map((ref) => ref?.title);
    return titlesIds;
  }, [state.customPanelsRef]);

  return (
    <>
      <Button variant="secondary" onClick={onClickExportButtonToOpenDrawer}>
        <Icon iconName="Download" size="sm" />
        {t("General.export")}
      </Button>
      <ExportDashboardDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onExport={() => setIsCreatingPDF(true)}
        customPanelsNames={customPanelsIds}
      />
    </>
  );
};
