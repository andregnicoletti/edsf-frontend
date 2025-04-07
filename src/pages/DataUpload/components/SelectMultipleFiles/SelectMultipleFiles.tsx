import React, { useRef } from "react";

import { Button, Icon, Typography } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";

import { SelectMultipleFilesProps } from "./SelectMultipleFiles.types";

import "./SelectMultipleFiles.styles.scss";

export const SelectMultipleFiles: React.FC<SelectMultipleFilesProps> = (
  props
) => {
  const { t } = useTranslation();
  const inputFileRef = useRef<HTMLInputElement>(null);

  function handleMultipleChange(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    const newFiles = (event.target as HTMLInputElement).files;
    if (newFiles) props.onChangeSelectedFiles([...newFiles]);
  }

  function onDropFiles(event: React.DragEvent<HTMLInputElement>) {
    event.preventDefault();
    const newFiles = event.dataTransfer.files;
    if (newFiles) props.onChangeSelectedFiles([...newFiles]);
  }

  function onClickSearchFiles() {
    inputFileRef.current?.click();
  }

  return (
    <div
      className="flex select-multiple-files-container"
      onDrop={onDropFiles}
      onDragOver={(event) => event.preventDefault()}
    >
      <Icon iconName="UploadCloud" size="xl" color="var(--primary-600)" />
      <Typography
        className="select-multiple-files-text"
        variant="body"
        fontWeight="regular"
        size="md"
      >
        {t("Data.UploadData.dropTheFilesHere")}
      </Typography>
      <Button onClick={onClickSearchFiles}>
        <Icon iconName="Laptop" size="md" />
        {t("Data.UploadData.browseOnComputer")}
      </Button>
      <input
        ref={inputFileRef}
        className="select-multiple-files-input-file"
        type="file"
        accept=".csv"
        multiple
        onChange={handleMultipleChange}
      />
    </div>
  );
};
