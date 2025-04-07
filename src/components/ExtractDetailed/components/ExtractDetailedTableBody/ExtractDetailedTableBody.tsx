import React from "react";

import { TableBody, TableCell, TableRow } from "@mui/material";

import { ExtractDetailedTableBodyProps } from "./ExtractDetailedTableBody.types";

import EmptyTableBody from "@/components/EmptyTableBody";
import TableBodySkeleton from "@/components/TableBodySkeleton";
import { CityExtractDetailedValuesEnum } from "@/types/CityExtractDetailed";

export const ExtractDetailedTableBody: React.FC<
  ExtractDetailedTableBodyProps
> = (props) => {
  if (props.isLoading) {
    return <TableBodySkeleton columns={5} rows={5} />;
  }

  if (props.visibleRows.length === 0) {
    return <EmptyTableBody />;
  }

  return (
    <TableBody>
      {props.visibleRows.map((city) => {
        if (city.selected) return null;
        return (
          <TableRow key={city[CityExtractDetailedValuesEnum.cityId]}>
            <TableCell>
              {city[CityExtractDetailedValuesEnum.cityLabel]}
            </TableCell>
            <TableCell>
              {city[CityExtractDetailedValuesEnum.totalRegistrations]}
            </TableCell>
            <TableCell>
              {city[CityExtractDetailedValuesEnum.totalCertificates]}
            </TableCell>
            <TableCell>
              {city[CityExtractDetailedValuesEnum.totalProducers]}
            </TableCell>
            <TableCell>
              {city[CityExtractDetailedValuesEnum.producersTargetAchieved]}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
