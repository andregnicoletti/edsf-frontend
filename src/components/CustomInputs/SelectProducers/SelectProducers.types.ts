import { Dayjs } from "dayjs";

import { City } from "@/types/City";
import { Producer } from "@/types/Producer";

export type SelectProducersProps = {
  citiesList?: City[];
  selectedCitiesIds?: string[];
  onChangeCitiesSelectedIds?: (cities: string[]) => void;
  producers: Producer[];
  selectedProducersIds: string[];
  onChangeProducerSelectedIds: (producers: string[]) => void;
  loading?: boolean;
  emptyMessage?: string;
  fromDate?: Dayjs;
  toDate?: Dayjs;
  onChangeDate?: (dateFrom: Dayjs | null, dateTo: Dayjs | null) => void;
};
