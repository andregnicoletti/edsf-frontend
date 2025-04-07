import React from "react";

import { Button, Icon } from "@cpqd-quati/react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";

import { LoadFilesTableBodyProps } from "./LoadFilesTableBody.types";

import EmptyTableBody from "@/components/EmptyTableBody";
import TableBodySkeleton from "@/components/TableBodySkeleton";
import { formatDateToDateAndTime } from "@/utils/date";
import { onClickDownloadCsvById } from "@/utils/files";

const LoadFilesTableBody: React.FC<LoadFilesTableBodyProps> = (props) => {
  const { t } = useTranslation();

  if (props.isLoading) return <TableBodySkeleton columns={7} rows={6} />;

  if (props.filesLoad.length === 0) return <EmptyTableBody />;

  return (
    <TableBody>
      {props.filesLoad.map((file) => (
        <TableRow key={file.uploadId}>
          <TableCell>{file.uploadFileInput}</TableCell>
          <TableCell>{file.uploadCode}</TableCell>
          <TableCell>{formatDateToDateAndTime(new Date(file.date))}</TableCell>
          <TableCell>{file.uploadTotal}</TableCell>
          <TableCell>{file.uploadSuccess}</TableCell>
          <TableCell
            style={{
              color: file.uploadError > 0 ? "rgba(181, 0, 0, 1)" : undefined,
            }}
          >
            {file.uploadError}
          </TableCell>
          <TableCell>
            {file.uploadError > 0 && (
              <Button
                size="sm"
                variant="tertiary"
                onClick={() =>
                  onClickDownloadCsvById(file.uploadId, file.uploadFileInput)
                }
              >
                <Icon iconName="Download" size="sm" />
                {t("Data.Data.errorFile")}
              </Button>
            )}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default LoadFilesTableBody;
