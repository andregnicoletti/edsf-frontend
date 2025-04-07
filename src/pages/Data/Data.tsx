import React from "react";

import { Button, Icon, Typography } from "@cpqd-quati/react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LastLoadProcessing from "./components/LastLoadProcessing";
import LoadHistory from "./components/LoadHistory";

import Badge from "@/components/Badge";
import Breadcrumb from "@/components/Breadcrumb";
import Dialogue from "@/components/Dialogue";
import { RoutesPaths } from "@/routes/routesPaths";
import apiService from "@/services/axios";
import { parseFileLoadDetailList } from "@/services/parseData/fileLoadDetail";
import { fileLoadDetailsActions } from "@/store/features/FileLoadDetails/FileLoadDetailsSlice";
import { RootState } from "@/store/store";

import "./Data.styles.scss";

export const Data: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoadingDetails, setIsLoadingDetails] = React.useState(true);
  const lastUploadDetails = useSelector(
    (state: RootState) => state.fileLoadDetails.lastUploadDetails
  );

  const [openDialogue, setOpenDialogue] = React.useState(false);

  function onClickNewLoad() {
    if (hasErrorsOnLastUpload) {
      setOpenDialogue(true);
    } else {
      navigateToDataUpload();
    }
  }

  function navigateToDataUpload() {
    navigate(RoutesPaths.DataUpload);
  }

  async function getFilesUploadHistory() {
    try {
      const response = await apiService.getUploadDetail();
      if (response.uploadsDetails) {
        const lastUploadStatusDetails = parseFileLoadDetailList(
          response.uploadsDetails.lastUploadStatus
        );
        const uploadStatusDetails = parseFileLoadDetailList(
          response.uploadsDetails.uploadStatus
        );
        dispatch(fileLoadDetailsActions.setUploadDetails(uploadStatusDetails));
        dispatch(
          fileLoadDetailsActions.setLastUploadDetails(lastUploadStatusDetails)
        );
      }
    } catch (error) {
      console.log("[getFilesUploadHistory]", error);
    } finally {
      setIsLoadingDetails(false);
    }
  }

  React.useEffect(() => {
    getFilesUploadHistory();
  }, []);

  const hasErrorsOnLastUpload = React.useMemo(
    () =>
      lastUploadDetails.some(
        (fileLoadDetail) => fileLoadDetail.uploadError > 0
      ),
    [lastUploadDetails]
  );

  return (
    <div className="flex-column">
      <Dialogue
        open={openDialogue}
        title={t("Data.Data.newLoadAlertTitle")}
        text={<Trans i18nKey="Data.Data.newLoadAlertText" />}
        component={
          <Badge
            variant="danger"
            shape="square"
            size="large"
            text={<Trans i18nKey="Data.Data.newLoadAlertBadge" />}
          />
        }
        onPressCancel={() => setOpenDialogue(false)}
        onPressConfirm={navigateToDataUpload}
        cancelButtonText={t("Data.Data.reviewErrors")}
        confirmButtonText={t("Data.Data.newLoad")}
      />
      <Breadcrumb
        links={[{ name: t("Data.processing") }]}
        currentRoutePath={t("Data.Data.pageTitle")}
      />
      <div className="flex data-title-container">
        <Typography
          className="data-title"
          variant="title6"
          fontWeight="semiBold"
        >
          {t("Data.Data.pageTitle")}
        </Typography>
        <div className="flex data-title-content">
          {hasErrorsOnLastUpload && (
            <Badge
              variant="danger"
              size="large"
              leftIcon="Information"
              shape="square"
              text={<Trans i18nKey="Data.Data.alertErrorOnLasLoad" />}
            ></Badge>
          )}
          <Button size="sm" onClick={onClickNewLoad}>
            <Icon iconName="Upload" size="sm" />
            {t("Data.Data.newLoad")}
          </Button>
        </div>
      </div>
      <div className="flex data-content">
        <LastLoadProcessing isLoading={isLoadingDetails} />
        <LoadHistory isLoading={isLoadingDetails} />
      </div>
    </div>
  );
};
