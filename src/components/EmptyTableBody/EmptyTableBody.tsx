import React from "react";

import { Typography } from "@cpqd-quati/react";
import { TableBody, TableCell, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";

import "./EmptyTableBody.styles.scss";

export const EmptyTableBody: React.FC = () => {
  const { t } = useTranslation();

  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={7} sx={{ backgroundColor: "var(--neutral-100)" }}>
          <Typography
            fontWeight="medium"
            color="var(--neutral-700)"
            variant="body"
            className="empty-table-typography"
          >
            {t("General.emptyTableMessage")}
          </Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
