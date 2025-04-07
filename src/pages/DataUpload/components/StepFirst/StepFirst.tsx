import React from "react";

import { Button, Icon } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";

import UploadPanel from "../UploadPanel";

import apiService from "@/services/axios";

export const StepFirst: React.FC = () => {
  const { t } = useTranslation();

  const [isLoadingTemplates, setIsLoadingTemplates] = React.useState(false);

  async function handleClickDownloadButton() {
    setIsLoadingTemplates(true);
    await apiService.onClickDownloadTemplate();
    setIsLoadingTemplates(false);
  }

  return (
    <UploadPanel
      badgeText={t("Data.UploadData.step1")}
      title={t("Data.UploadData.step1Title")}
    >
      <Button
        onClick={handleClickDownloadButton}
        style={{ width: "fit-content" }}
        variant="secondary"
        loading={isLoadingTemplates}
      >
        {!isLoadingTemplates && <Icon iconName="Download" size="sm" />}
        {t("Data.UploadData.downloadTemplates")}
      </Button>
    </UploadPanel>
  );
};
