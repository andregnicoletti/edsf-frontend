import React from "react";

import { Box, Table, TableContainer } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import "../../Data.styles.scss";
import LoadFilesTableBody from "../LoadFilesTableBody/LoadFilesTableBody";
import LoadFilesTableHead from "../LoadFilesTableHead";

import { LastLoadProcessingProps } from "./LastLoadProcessing.types";

import PanelBase from "@/components/PanelBase";
import { RootState } from "@/store/store";

import "./LastLoadProcessing.scss";

export const LastLoadProcessing: React.FC<LastLoadProcessingProps> = (
  props
) => {
  const lastUploadDetails = useSelector(
    (state: RootState) => state.fileLoadDetails.lastUploadDetails
  );
  const { t } = useTranslation();

  return (
    <PanelBase isCollapsable headerTitle={t("Data.Data.processingOfLastLoad")}>
      <Box className="flex data-panel-content">
        <TableContainer>
          <Table>
            <LoadFilesTableHead />
            <LoadFilesTableBody
              isLoading={props.isLoading}
              filesLoad={lastUploadDetails}
            />
          </Table>
        </TableContainer>
      </Box>
    </PanelBase>
  );
};
