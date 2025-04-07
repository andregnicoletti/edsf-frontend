import React from "react";

import { Button, Divider, Icon } from "@cpqd-quati/react";
import { Spacing16 } from "@cpqd-quati/tokens";
import { TextField } from "@mui/material";
import { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";

import { LoadFilesFilterBarProps } from "./LoadFilesFilterBar.types";

import SelectSimple from "@/components/CustomInputs/SelectSimple";
import DatePickerFromTo from "@/components/DatePickerFromTo";

import "./LoadFilesFilterBar.styles.scss";

export const LoadFilesFilterBar: React.FC<LoadFilesFilterBarProps> = (
  props
) => {
  const { t } = useTranslation();

  function handleFilterDate(fromDate: Dayjs | null, toDate: Dayjs | null) {
    props.handleFilterFromDate(fromDate);
    props.handleFilterToDate(toDate);
  }

  const showCleanFilters = React.useMemo(() => {
    return (
      props.filterFromDate !== null ||
      props.filterToDate !== null ||
      props.searchValue !== "" ||
      props.fileType !== ""
    );
  }, [
    props.fileType,
    props.filterFromDate,
    props.filterToDate,
    props.searchValue,
  ]);

  return (
    <div className="flex load-history-filters-container">
      <div className="flex" style={{ width: "23rem" }}>
        <TextField
          type="search"
          value={props.searchValue}
          onChange={(event) => {
            event.stopPropagation();
            props.handleSearchValue(event.target.value);
          }}
          slotProps={{
            input: {
              endAdornment: (
                <Icon iconName="Search" size="sm" color="var(--primary-800)" />
              ),
            },
          }}
          fullWidth
          placeholder="Pesquisar arquivo"
        />
      </div>
      <Divider orientation="vertical" height={Spacing16} />
      <div style={{ minWidth: "6.25rem" }}>
        <SelectSimple
          label={t("Data.Data.type")}
          options={props.fileTypeOptions}
          selectedOptionId={props.fileType}
          getId={(option) => option}
          getName={(option) => option}
          onChangeSelectedOptionId={(item) =>
            props.handleChangeFileType(item as string)
          }
          variant="primary"
        />
      </div>
      <div style={{ minWidth: "15rem" }}>
        <DatePickerFromTo
          fromDate={props.filterFromDate}
          onChangeDate={handleFilterDate}
          toDate={props.filterToDate}
          label={t("Data.Data.processingDate")}
        />
      </div>
      {showCleanFilters && (
        <Button
          onClick={props.onCleanFilters}
          variant="tertiary"
          size="sm"
          color="var(--neutral-700)"
        >
          {t("General.cleanFilters")}
        </Button>
      )}
    </div>
  );
};
