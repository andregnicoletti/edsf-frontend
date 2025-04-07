import dayjs, { Dayjs } from "dayjs";
import i18n from "i18next";

export function formatDateToDateAndTime(date: Date): string {
  return dayjs(date).format("DD/MM/YYYY HH:mm:ss");
}

export function formatStringToDate(date: string): Date {
  return dayjs(date).toDate();
}

export function formatDayjsToMonthYear(date: Dayjs): string {
  return date.format("MM/YYYY");
}

export function dayOfWeekFormatter(day: Dayjs): string {
  const weekDayLabel = ["D", "S", "T", "Q", "Q", "S", "S"];
  return weekDayLabel[day.get("day")];
}

export function renderFromToDate(
  fromDate: Dayjs | null,
  toDate: Dayjs | null,
  format = "DD/MM/YYYY"
) {
  const invalidDateText = i18n.t("InputDateFromTo.invalidDate");
  let label = "";
  if (fromDate) {
    if (fromDate.isValid()) {
      label = `${fromDate.format(format)}`;
    } else {
      label = invalidDateText;
    }
  }
  if (toDate) {
    if (!toDate.isValid()) {
      label = `${label} até ${invalidDateText}`;
    } else if (toDate.format(format) !== fromDate?.format(format)) {
      label = `${label} até ${toDate.format(format)}`;
    }
  }

  return label;
}
