import { Dayjs } from "dayjs";

export type LoadFilesFilterBarProps = {
  fileType: string;
  fileTypeOptions: string[];
  handleChangeFileType: (value: string) => void;
  filterFromDate: Dayjs | null;
  handleFilterFromDate: (date: Dayjs | null) => void;
  filterToDate: Dayjs | null;
  handleFilterToDate: (date: Dayjs | null) => void;
  searchValue: string;
  handleSearchValue: (value: string) => void;
  onCleanFilters: () => void;
};
