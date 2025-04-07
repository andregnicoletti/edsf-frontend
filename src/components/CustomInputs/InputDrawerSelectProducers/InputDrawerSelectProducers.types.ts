import { Dayjs } from "dayjs";

import { City } from "@/types/City";
import { Producer } from "@/types/Producer";

export type InputDrawerSelectProducersProps = {
  citiesList?: City[];
  selectedCitiesIds: string[];
  onChangeCitiesSelectedIds: (cities: string[]) => void;
  producers: Producer[];
  selectedProducersIds: string[];
  onChangeProducerSelectedIds: (producers: string[]) => void;
  fromDate: Dayjs;
  toDate: Dayjs;
  onChangeDate: (dateFrom: Dayjs | null, dateTo: Dayjs | null) => void;
  loading?: boolean;
};
