import React from "react";

import { Button } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import FilesToUpload from "../FilesToUpload";
import SelectMultipleFiles from "../SelectMultipleFiles";
import UploadPanel from "../UploadPanel";

import useSnackbar from "@/hooks/useSnackbar";
import { RoutesPaths } from "@/routes/routesPaths";
import apiService from "@/services/axios";
import { UploadSuccessFilesStatus } from "@/services/axios/upload/upload.types";

import "./StepThird.styles.scss";

enum StepThirdStates {
  SelectingFiles = 0,
  UploadingFiles = 1,
  SuccessUpload = 2,
  ErrorUpload = 3,
}

export const StepThird: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openNewSnackbar } = useSnackbar();

  const [files, setFiles] = React.useState<File[]>([]);
  const [successFilesValues, setSuccessFilesValues] = React.useState<
    UploadSuccessFilesStatus | undefined
  >();
  const [stepThirdState, setStepThirdState] = React.useState<StepThirdStates>(
    StepThirdStates.SelectingFiles
  );

  const onAddNewFiles = (filesToUpload: File[]) => {
    if (stepThirdState === StepThirdStates.ErrorUpload) {
      setStepThirdState(StepThirdStates.SelectingFiles);
      setFiles(filesToUpload);
      setSuccessFilesValues(undefined);
    } else {
      setFiles((lastFiles) => [...lastFiles, ...filesToUpload]);
    }
  };

  async function uploadCsvFiles() {
    try {
      await makeUploadAndUpdateStates();
    } catch (error) {
      setStepThirdState(StepThirdStates.ErrorUpload);
      console.log("[uploadCsvFiles]", error);
    }
  }

  async function makeUploadAndUpdateStates() {
    setStepThirdState(StepThirdStates.UploadingFiles);
    const uploadResponse = await apiService.createUpload({ files });
    handleUploadResponseHasFilesStatus(uploadResponse.uploadDetails?.files);
    if (verifyHasNoSuccessFiles(uploadResponse?.uploadDetails?.files)) {
      setStepThirdState(StepThirdStates.ErrorUpload);
    } else {
      setStepThirdState(StepThirdStates.SuccessUpload);
    }
  }

  function handleUploadResponseHasFilesStatus(
    uploadFilesResponse?: UploadSuccessFilesStatus
  ) {
    if (uploadFilesResponse) {
      showMultipleFilesErros(uploadFilesResponse);
      setSuccessFilesValues(uploadFilesResponse);
    }
  }

  function showMultipleFilesErros(files: UploadSuccessFilesStatus) {
    const errors = files
      .filter((file) => file.hasError && file.message)
      .map((file) => file.message as string);

    errors.forEach((error) => {
      openNewSnackbar(error, "error");
    });
  }

  function onPressConfirmButton() {
    navigate(RoutesPaths.Data);
  }

  function verifyHasNoSuccessFiles(filesStatus?: UploadSuccessFilesStatus) {
    return !filesStatus?.some((file) => !file.hasError);
  }

  const hasNoOneSuccessFile = React.useMemo(() => {
    return verifyHasNoSuccessFiles(successFilesValues);
  }, [successFilesValues]);

  return (
    <UploadPanel
      badgeText={t("Data.UploadData.step3")}
      title={t("Data.UploadData.step3Title")}
    >
      {(stepThirdState === StepThirdStates.SelectingFiles ||
        stepThirdState === StepThirdStates.ErrorUpload) && (
        <SelectMultipleFiles onChangeSelectedFiles={onAddNewFiles} />
      )}

      {files.length > 0 && (
        <FilesToUpload
          files={files}
          success={stepThirdState === StepThirdStates.SuccessUpload}
          isUploadingFiles={stepThirdState === StepThirdStates.UploadingFiles}
          isSelectingFiles={stepThirdState === StepThirdStates.SelectingFiles}
          successFilesValues={successFilesValues}
          onChangeFiles={setFiles}
          error={stepThirdState === StepThirdStates.ErrorUpload}
        />
      )}

      <div className="data-upload-buttons">
        <Button
          disabled={
            stepThirdState !== StepThirdStates.SelectingFiles ||
            files.length === 0
          }
          variant="secondary"
          onClick={uploadCsvFiles}
        >
          {t("Data.UploadData.uploadButton")}
        </Button>
        <Button disabled={hasNoOneSuccessFile} onClick={onPressConfirmButton}>
          {t("Data.UploadData.nextButton")}
        </Button>
      </div>
    </UploadPanel>
  );
};
