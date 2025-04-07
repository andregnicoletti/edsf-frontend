import React, { useMemo } from "react";

import { Icon } from "@cpqd-quati/react";

import { FilesToUploadProps } from "./FilesToUpload.types";

import Badge from "@/components/Badge";

import "./FIlesToUpload.styles.scss";

export const FilesToUpload: React.FC<FilesToUploadProps> = (props) => {
  function removeFileByIndex(index: number) {
    const newFiles = [...props.files];
    newFiles.splice(index, 1);
    props.onChangeFiles(newFiles);
  }

  const badgeColor = useMemo(() => {
    if (props.error) return "danger";
    if (props.success) return "primary";
    return "neutral";
  }, [props.error, props.success]);

  if (props.successFilesValues) {
    return (
      <div className="flex files-to-upload-container">
        {props.successFilesValues?.map((file, index) => (
          <div className="flex file-row-container" key={file.fileName + index}>
            <Badge
              text={file.fileName}
              variant={file.hasError ? "danger" : "primary"}
              size="large"
              shape="square"
              leftIcon="Paperclip"
              width="100%"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex files-to-upload-container">
      {props.files?.map((file, index) => (
        <div className="flex file-row-container" key={file.name + index}>
          <Badge
            text={file.name}
            variant={badgeColor}
            size="large"
            shape="square"
            leftIcon="Paperclip"
            rightIcon={props.isSelectingFiles ? "Close" : undefined}
            onClickRightIcon={() => removeFileByIndex(index)}
            width="100%"
          />
          {props.isUploadingFiles && (
            <Icon
              className="files-to-upload-spinner"
              iconName="Spinner"
              size="md"
              color="var(--neutral-500)"
            />
          )}
        </div>
      ))}
    </div>
  );
};
