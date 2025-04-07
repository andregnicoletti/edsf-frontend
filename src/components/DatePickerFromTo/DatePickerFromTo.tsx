import React from "react";

import { Button } from "@cpqd-quati/react";
import { FormControl, InputLabel, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";

import Badge from "../Badge";

import { DatePickerFromToProps } from "./DatePickerFromTo.types";

import useOpenSelect from "@/hooks/useOpenSelect";
import { useInputBackgroundStyle } from "@/styles/inputStyle";
import { dayOfWeekFormatter, renderFromToDate } from "@/utils/date";

import "./DatePickerFromTo.styles.scss";

export const DatePickerFromTo: React.FC<DatePickerFromToProps> = (props) => {
  const { clearable = true } = props;
  const { t } = useTranslation();
  const styles = useInputBackgroundStyle();

  const [fromDateTemp, setFromDateTemp] = React.useState<Dayjs | null>(
    props.fromDate
  );
  const [toDateTemp, setToDateTemp] = React.useState<Dayjs | null>(
    props.toDate
  );
  const [selectFocus, setSelectFocus] = React.useState(false);
  const floatingDivRef = React.useRef<HTMLDivElement>(null);
  const { handleClick, open, setOpen, blurSelect } = useOpenSelect({
    floatingDivRef,
  });
  const [datesWithDifferentYears, setDatesWithDifferentYears] =
    React.useState(false);

  function onPressConfirmButton() {
    setOpen(false);
    blurSelect();

    if (toDateTemp?.isBefore(fromDateTemp)) {
      props.onChangeDate(fromDateTemp, fromDateTemp);
      setToDateTemp(fromDateTemp);
    } else {
      props.onChangeDate(fromDateTemp, toDateTemp);
    }
  }

  function changeDateTempFrom(newFromDate: Dayjs | null) {
    setFromDateTemp(newFromDate);
    if (newFromDate?.year() !== toDateTemp?.year()) {
      setDatesWithDifferentYears(true);
    } else {
      setDatesWithDifferentYears(false);
    }
  }

  function changeDateTempTo(newToDate: Dayjs | null) {
    setToDateTemp(newToDate);
    if (newToDate?.year() !== fromDateTemp?.year()) {
      setDatesWithDifferentYears(true);
    } else {
      setDatesWithDifferentYears(false);
    }
  }

  function onPressCancelButton() {
    setOpen(false);
    blurSelect();
    setFromDateTemp(props.fromDate);
    setToDateTemp(props.toDate);
  }

  const isHiddenLabel = React.useMemo(() => {
    return !!(props.fromDate || props.toDate) || open || selectFocus;
  }, [props.fromDate, props.toDate, open, selectFocus]);

  const renderedValue = React.useMemo(() => {
    return renderFromToDate(props.fromDate, props.toDate, props.format);
  }, [props.fromDate, props.toDate]);

  React.useEffect(() => {
    setFromDateTemp(props.fromDate);
    setToDateTemp(props.toDate);
  }, [props.fromDate, props.toDate]);

  return (
    <FormControl fullWidth>
      <InputLabel shrink={isHiddenLabel} id="date-select-label">
        {props.label}
      </InputLabel>
      <Select
        onMouseDown={handleClick}
        open={open}
        className={renderedValue ? styles.root : ""}
        onBlur={() => setSelectFocus(false)}
        onFocus={() => setSelectFocus(true)}
        labelId="date-select-label"
        label={props.label}
        displayEmpty={isHiddenLabel}
        renderValue={() => renderedValue}
        fullWidth
      >
        <div ref={floatingDivRef} className="load-history-floating-data-menu">
          <DatePicker
            label={t("InputDateFromTo.from")}
            defaultValue={null}
            views={props.views ?? ["year", "month", "day"]}
            format={props.format ?? "DD/MM/YYYY"}
            openTo={props.openTo ?? "day"}
            value={fromDateTemp}
            onChange={changeDateTempFrom}
            maxDate={toDateTemp ?? dayjs()}
            slotProps={{ field: { clearable } }}
            dayOfWeekFormatter={dayOfWeekFormatter}
          />
          <DatePicker
            label={t("InputDateFromTo.to")}
            defaultValue={null}
            views={props.views ?? ["year", "month", "day"]}
            format={props.format ?? "DD/MM/YYYY"}
            openTo={props.openTo ?? "day"}
            value={toDateTemp}
            onChange={changeDateTempTo}
            maxDate={dayjs()}
            minDate={fromDateTemp ?? undefined}
            slotProps={{ field: { clearable } }}
            dayOfWeekFormatter={dayOfWeekFormatter}
          />
          {props.fromAndToInTheSameYear && datesWithDifferentYears && (
            <Badge
              text={t("InputDateFromTo.datesWithDifferentYears")}
              shape="square"
              variant="danger"
              leftIcon="Error"
              toCenter={false}
              width="100%"
            />
          )}
          <div className="load-history-floating-data-buttons">
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
              disabled={props.fromAndToInTheSameYear && datesWithDifferentYears}
            >
              {t("InputDateFromTo.confirmButton")}
            </Button>
          </div>
        </div>
      </Select>
    </FormControl>
  );
};
