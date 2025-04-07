import React from "react";

import { Button } from "@cpqd-quati/react";
import { FormControl, InputLabel, Select } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";

import { DatePickerMonthYearProps } from "./DatePickerMonthYear.types";

import useOpenSelect from "@/hooks/useOpenSelect";
import { useInputBackgroundStyle } from "@/styles/inputStyle";
import { formatDayjsToMonthYear } from "@/utils/date";

import "./DatePickerMonthYear.styles.scss";

export const DatePickerMonthYear: React.FC<DatePickerMonthYearProps> = (
  props
) => {
  const { t } = useTranslation();
  const styles = useInputBackgroundStyle();

  const [date, setDate] = React.useState<Dayjs>(props.date);
  const [selectFocus, setSelectFocus] = React.useState(false);
  const floatingDivRef = React.useRef<HTMLDivElement>(null);
  const { handleClick, open, setOpen, blurSelect } = useOpenSelect({
    floatingDivRef,
  });

  function onPressConfirmButton() {
    setOpen(false);
    blurSelect();
    props.changeDate(date);
  }

  function onPressCancelButton() {
    setOpen(false);
    blurSelect();
  }

  React.useEffect(() => {
    setDate(props.date);
  }, [props.date]);

  const isHiddenLabel = React.useMemo(() => {
    return !!props.date || open || selectFocus;
  }, [props.date, open, selectFocus]);

  const renderedValue = React.useMemo(() => {
    return props.date ? formatDayjsToMonthYear(props.date) : undefined;
  }, [props.date]);

  React.useEffect(() => {
    if (!open) {
      setDate(props.date);
    }
  }, [open]);

  return (
    <div className="input-width-field-150">
      <FormControl fullWidth>
        <InputLabel shrink={isHiddenLabel} id="date-select-label">
          {t("Dashboard.dateFilter.filterDateLabel")}
        </InputLabel>
        <Select
          onMouseDown={handleClick}
          open={open}
          className={props.date ? styles.root : ""}
          onBlur={() => setSelectFocus(false)}
          onFocus={() => setSelectFocus(true)}
          labelId="date-select-label"
          label={t("Dashboard.dateFilter.filterDateLabel")}
          displayEmpty={isHiddenLabel}
          renderValue={() => renderedValue}
          fullWidth
        >
          <div
            ref={floatingDivRef}
            className="date-picker-month-year-floating-data-menu"
          >
            <DateCalendar
              defaultValue={dayjs()}
              value={date}
              onChange={(date) => setDate(date)}
              views={["month", "year"]}
              openTo="month"
              disableFuture
            />
            <div className="date-picker-month-year-floating-data-buttons">
              <Button
                variant="secondary"
                style={{ flex: 1 }}
                onClick={onPressCancelButton}
              >
                {t("InputDateFromTo.cancelButton")}
              </Button>
              <Button
                variant="primary"
                style={{ flex: 1 }}
                onClick={onPressConfirmButton}
              >
                {t("InputDateFromTo.confirmButton")}
              </Button>
            </div>
          </div>
        </Select>
      </FormControl>
    </div>
  );
};
