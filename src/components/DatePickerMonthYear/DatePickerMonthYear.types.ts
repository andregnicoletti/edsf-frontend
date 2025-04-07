import dayjs from "dayjs";

export type DatePickerMonthYearProps = {
  date: dayjs.Dayjs;
  changeDate: (_date: dayjs.Dayjs) => void;
};
