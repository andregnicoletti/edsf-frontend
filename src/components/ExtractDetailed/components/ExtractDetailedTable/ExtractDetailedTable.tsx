import React from "react";

import { Typography } from "@cpqd-quati/react";
import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import ExtractDetailedTableBody from "../ExtractDetailedTableBody";

import { SortedCellsType } from "@/components/ExtractDetailed/ExtractDetailed.types";
import PDFPanelTitle from "@/components/PDFPanelTitle";
import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";
import { RootState } from "@/store/store";
import {
  CityExtractDetailed,
  CityExtractDetailedValuesEnum,
} from "@/types/CityExtractDetailed";
import { sortByNumber, sortByString } from "@/utils/sort";

const ROWS_PER_PAGE = 5;

const sortedCells: SortedCellsType = [
  {
    id: CityExtractDetailedValuesEnum.cityLabel,
    label: "Dashboard.detailedExtract.tableHeadMunicipality",
  },
  {
    id: CityExtractDetailedValuesEnum.totalRegistrations,
    label: "Dashboard.detailedExtract.tableHeadRegistered",
  },
  {
    id: CityExtractDetailedValuesEnum.totalCertificates,
    label: "Dashboard.detailedExtract.tableHeadCertified",
  },
  {
    id: CityExtractDetailedValuesEnum.totalProducers,
    label: "Dashboard.detailedExtract.tableHeadNumberProducers",
  },
  {
    id: CityExtractDetailedValuesEnum.producersTargetAchieved,
    label: "Dashboard.detailedExtract.tableHeadProducersTargetAchieved",
  },
];

export const ExtractDetailedTable: React.FC = () => {
  const { t } = useTranslation();
  const { detailedCitiesRef, state: stateExportPdf } = useExportPdfContext();

  const [page, setPage] = React.useState(0);
  const [orderBy, setOrderBy] = React.useState<
    CityExtractDetailedValuesEnum | ""
  >(CityExtractDetailedValuesEnum.cityLabel);
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");

  const { extractDetailedData, extractDetailedLoading } = useSelector(
    (state: RootState) => state.extractDetailed
  );

  const sortCitiesList = (
    cityA: CityExtractDetailed,
    cityB: CityExtractDetailed
  ) => {
    if (orderBy === "") return 0;
    const valueA = cityA[orderBy];
    const valueB = cityB[orderBy];
    if (orderBy === CityExtractDetailedValuesEnum.cityLabel) {
      return sortByString(valueA as string, valueB as string, order);
    } else {
      return sortByNumber(valueA as number, valueB as number, order);
    }
  };

  function onChangeOrder(id: CityExtractDetailedValuesEnum) {
    if (orderBy === id) {
      if (order === "asc") setOrder("desc");
      else setOrderBy("");
    } else {
      setOrder("asc");
      setOrderBy(id);
    }
  }

  React.useEffect(() => {
    setPage(0);
  }, [extractDetailedData]);

  const visibleRows = React.useMemo(() => {
    const pageCondition = stateExportPdf.isCreatingPDF ? 0 : page;
    return [...extractDetailedData]
      .sort(sortCitiesList)
      .slice(
        pageCondition * ROWS_PER_PAGE,
        pageCondition * ROWS_PER_PAGE + ROWS_PER_PAGE
      );
  }, [page, order, orderBy, extractDetailedData, stateExportPdf.isCreatingPDF]);

  return (
    <div ref={detailedCitiesRef}>
      <PDFPanelTitle title={t("Dashboard.detailedExtract.panelTitle")} />

      <Box className="box-card">
        <Typography variant="body" fontWeight="bold" size="md">
          {t("Dashboard.detailedExtract.municipalitiesData")}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {sortedCells.map((cell) => (
                  <TableCell key={cell.id}>
                    <TableSortLabel
                      direction={orderBy === cell.id ? order : "asc"}
                      active={orderBy === cell.id}
                      onClick={() => onChangeOrder(cell.id)}
                    >
                      {t(cell.label as any)}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <ExtractDetailedTableBody
              isLoading={extractDetailedLoading}
              visibleRows={visibleRows}
            />
          </Table>
        </TableContainer>
        {!stateExportPdf.isCreatingPDF && (
          <TablePagination
            component="div"
            count={extractDetailedData.length}
            rowsPerPageOptions={[]}
            rowsPerPage={ROWS_PER_PAGE}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
          />
        )}
      </Box>
    </div>
  );
};
