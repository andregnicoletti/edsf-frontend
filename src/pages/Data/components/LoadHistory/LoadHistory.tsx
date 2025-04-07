import React, { useEffect, useState } from "react";

import "@cpqd-quati/tokens/core/palettes/beija-flor.css";
import { Box, Table, TableContainer, TablePagination } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import "../../Data.styles.scss";
import useFilterLoadHistory from "../../hooks/useFilterLoadHistory";
import LoadFilesTableBody from "../LoadFilesTableBody/LoadFilesTableBody";
import LoadFilesTableHead from "../LoadFilesTableHead";

import { LoadHistoryProps } from "./LoadHistory.types";

import Badge from "@/components/Badge";
import PanelBase from "@/components/PanelBase";
import { RootState } from "@/store/store";

import "./LoadHistory.styles.scss";

export const LoadHistory: React.FC<LoadHistoryProps> = (props) => {
  const { t } = useTranslation();

  const uploadDetails = useSelector(
    (state: RootState) => state.fileLoadDetails.uploadDetails
  );

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const { filterComponent, filteredRows } = useFilterLoadHistory();

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  function onRowsPerPageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(parseInt(event.target.value, 10));
  }

  const visibleRows = React.useMemo(() => {
    return [...filteredRows].slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredRows, page, rowsPerPage]);

  useEffect(() => {
    setPage(0);
  }, [filteredRows]);

  return (
    <PanelBase
      rightComponent={
        uploadDetails.length > 0 ? (
          <Badge
            size="large"
            variant="info"
            text={<Trans i18nKey={"Data.Data.loadHistoryTip"} />}
          />
        ) : undefined
      }
      headerTitle={t("Data.Data.loadHistory")}
      isCollapsable
      defaultIsCollapsed
    >
      <Box className="flex data-panel-content">
        {filterComponent}
        <TableContainer>
          <Table>
            <LoadFilesTableHead />
            <LoadFilesTableBody
              filesLoad={visibleRows}
              isLoading={props.isLoading}
            />
          </Table>
        </TableContainer>

        <TablePagination
          count={filteredRows.length}
          component="div"
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          style={{
            overflowY: "hidden",
          }}
        />
      </Box>
    </PanelBase>
  );
};
