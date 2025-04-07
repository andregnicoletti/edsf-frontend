import { Dayjs } from "dayjs";

export type DatePickerFromToProps = {
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  onChangeDate: (fromDate: Dayjs | null, toDate: Dayjs | null) => void;
  views?: ("year" | "month" | "day")[];
  openTo?: "year" | "month" | "day";
  format?: string;
  label: string;
  clearable?: boolean;
  fromAndToInTheSameYear?: boolean;
};
