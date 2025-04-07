import { Icon } from "@cpqd-quati/react";
import { TableCell, TableHead, TableRow } from "@mui/material";
import { useTranslation } from "react-i18next";

export const LoadFilesTableHead = () => {
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        <TableCell>{t("Data.Data.inputFile")}</TableCell>
        <TableCell>{t("Data.Data.type")}</TableCell>
        <TableCell>{t("Data.Data.processingDate")}</TableCell>
        <TableCell>{t("Data.Data.totalRecords")}</TableCell>
        <TableCell sx={{ color: "var(--indicator-success-300)" }}>
          {t("Data.Data.success")}
          <Icon
            className="table-head-icon"
            iconName="CheckCircleSolid"
            size="md"
            color={"var(--indicator-success-200)"}
          />
        </TableCell>
        <TableCell sx={{ color: "var(--indicator-danger-300)" }}>
          {t("Data.Data.error")}
          <Icon
            className="table-head-icon"
            iconName="CloseCircleSolid"
            size="md"
            color={"var(--indicator-danger-300)"}
          />
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
};
