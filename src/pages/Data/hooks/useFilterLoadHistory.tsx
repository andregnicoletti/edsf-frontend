import React, { useEffect, useMemo } from "react";

import { Dayjs } from "dayjs";
import { useSelector } from "react-redux";

import LoadFilesFilterBar from "../components/LoadFilesFilterBar";

import { RootState } from "@/store/store";
import { FileLoadDetail } from "@/types/FileLoad";

type UseFilterLoadHistoryResponse = {
  filteredRows: FileLoadDetail[];

  filterComponent: JSX.Element;
};

const useFilterLoadHistory = (): UseFilterLoadHistoryResponse => {
  const uploadDetails = useSelector(
    (state: RootState) => state.fileLoadDetails.uploadDetails
  );

  const [searchValue, setSearchValue] = React.useState("");
  const [fileType, setFileType] = React.useState("");
  const [fileTypeOptions, setFileTypeOptions] = React.useState<string[]>([]);
  const [filterFromDate, setFilterFromDate] = React.useState<Dayjs | null>(
    null
  );
  const [filterToDate, setFilterToDate] = React.useState<Dayjs | null>(null);

  const handleChangeFileType = (value: string) => {
    setFileType(value);
  };

  function getUniqueFileTypes(filesLoad: FileLoadDetail[]) {
    const uniqueFilesTypes: string[] = [];
    filesLoad.forEach((file) => {
      if (!uniqueFilesTypes.includes(file.uploadCode)) {
        uniqueFilesTypes.push(file.uploadCode);
      }
    });
    setFileTypeOptions(uniqueFilesTypes);
  }

  function filterDate(file: FileLoadDetail) {
    if (
      filterFromDate &&
      !(
        filterFromDate.isBefore(file.date, "day") ||
        filterFromDate.isSame(file.date, "day")
      )
    )
      return false;
    if (
      filterToDate &&
      !(
        filterToDate.isAfter(file.date, "day") ||
        filterToDate.isSame(file.date, "day")
      )
    )
      return false;
    return true;
  }

  function filterSearch(file: FileLoadDetail) {
    return (file.uploadFileInput || "")
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  }

  function filterCode(file: FileLoadDetail) {
    return file.uploadCode === fileType || fileType === "";
  }

  function cleanFilters() {
    setSearchValue("");
    setFileType("");
    setFilterFromDate(null);
    setFilterToDate(null);
  }

  const filteredRows = React.useMemo(() => {
    return [...uploadDetails]
      .filter(filterDate)
      .filter(filterSearch)
      .filter(filterCode);
  }, [uploadDetails, fileType, searchValue, filterFromDate, filterToDate]);

  useEffect(() => {
    getUniqueFileTypes(uploadDetails);
  }, [uploadDetails]);

  const filterComponent = useMemo(
    () => (
      <LoadFilesFilterBar
        searchValue={searchValue}
        handleSearchValue={setSearchValue}
        fileType={fileType}
        fileTypeOptions={fileTypeOptions}
        handleChangeFileType={handleChangeFileType}
        filterFromDate={filterFromDate}
        handleFilterFromDate={setFilterFromDate}
        filterToDate={filterToDate}
        handleFilterToDate={setFilterToDate}
        onCleanFilters={cleanFilters}
      />
    ),

    [fileType, fileTypeOptions, filterFromDate, filterToDate, searchValue]
  );

  return {
    filteredRows,
    filterComponent,
  };
};

export default useFilterLoadHistory;
