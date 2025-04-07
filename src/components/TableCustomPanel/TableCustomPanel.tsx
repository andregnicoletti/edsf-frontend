import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import PDFPanelTitle from "../PDFPanelTitle";

import { TableCustomPanelProps } from "./TableCustomPanel.types";

import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";
import { NewPanelAttributes } from "@/types/NewPanel";

// import { Container } from './styles';

const ROWS_PER_PAGE = 10;

const cellsHead: Record<NewPanelAttributes, string> = {
  [NewPanelAttributes.producer]:
    "Dashboard.ConfigurePanel.attributes.producerTable",
  [NewPanelAttributes.city]: "Dashboard.ConfigurePanel.attributes.cityTable",
  [NewPanelAttributes.indicator]:
    "Dashboard.ConfigurePanel.attributes.indicatorTable",
  [NewPanelAttributes.year]: "Dashboard.ConfigurePanel.attributes.yearTable",
  [NewPanelAttributes.goal]: "Dashboard.ConfigurePanel.attributes.goalTable",
  [NewPanelAttributes.indicatorPercent]:
    "Dashboard.ConfigurePanel.attributes.indicatorRealizedTable",
};

export const TableCustomPanel: React.FC<TableCustomPanelProps> = (props) => {
  const { t } = useTranslation();
  const { state: stateExportPdf } = useExportPdfContext();

  const [page, setPage] = React.useState(0);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const visibleRows = React.useMemo(() => {
    const pageCondition = stateExportPdf.isCreatingPDF ? 0 : page;
    return [...(props.data?.rows || [])].slice(
      pageCondition * ROWS_PER_PAGE,
      pageCondition * ROWS_PER_PAGE + ROWS_PER_PAGE
    );
  }, [props.data?.rows, page, stateExportPdf.isCreatingPDF]);

  if (!props.data) return <></>;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      ref={props.exportedRef}
    >
      {props.panelTitle && <PDFPanelTitle title={props.panelTitle} />}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {props.data.headers.map((att) => (
                <TableCell key={att}>{t(cellsHead[att] as any)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row, index) => {
              const cells: NewPanelAttributes[] = Object.keys(
                row
              ) as NewPanelAttributes[];

              return (
                <TableRow key={index}>
                  {cells.map((key) => (
                    <TableCell key={key}>{row[key]}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {!stateExportPdf.isCreatingPDF && (
        <TablePagination
          component="div"
          count={props.data?.rows.length}
          rowsPerPageOptions={[]}
          rowsPerPage={ROWS_PER_PAGE}
          page={page}
          onPageChange={handleChangePage}
        />
      )}
    </div>
  );
};
