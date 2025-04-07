import React from "react";

import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";

import { TableBodySkeletonProps } from "./TableBodySkeleton.types";

export const TableBodySkeleton: React.FC<TableBodySkeletonProps> = (props) => {
  return (
    <TableBody>
      {Array.from({ length: props.rows }).map((_, index) => (
        <TableRow key={index}>
          {Array.from({ length: props.columns }).map((_, columnIndex) => (
            <TableCell key={columnIndex}>
              <Skeleton variant="text" sx={{ fontSize: "1.3rem" }} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};
