import React from "react";

import dayjs from "dayjs";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import InputDrawerSelectProducers from "@/components/CustomInputs/InputDrawerSelectProducers";
import SelectFilterCities from "@/components/CustomInputs/SelectFilterCities";
import SelectFilterCourses from "@/components/CustomInputs/SelectFilterCourses";
import SelectFilterIndicators from "@/components/CustomInputs/SelectFilterIndicators";
import SelectFilterStates from "@/components/CustomInputs/SelectFilterStates";
import DatePickerFromTo from "@/components/DatePickerFromTo";
import FiltersMenuOptions from "@/components/FiltersMenuOptions";
import { useCopyFiltersContext } from "@/store/contexts/CopyFilters/useCopyFilters";
import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";
import { extractSummarySliceActions } from "@/store/features/ExtractSummary/ExtractSummarySlice";
import { fetchSummaryExtractThunk } from "@/store/features/ExtractSummary/ExtractSummaryThunk";
import { AppDispatch, RootState } from "@/store/store";
import { City } from "@/types/City";

import "./SummaryExtractFilters.styles.scss";

export const SummaryExtractFilters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { copyFilters, copiedFilters } = useCopyFiltersContext();

  const { state: stateExportPdf } = useExportPdfContext();
  const { cities } = useSelector((state: RootState) => state.cities);
  const {
    extractSummaryFilters: {
      indicatorsFilterOptions,
      indicatorsSelectedCodes,
      citiesFilterOptions,
      citiesSelectedIds,
      coursesFilterOptions,
      coursesSelectedCodes,
      statesFilterOptions,
      statesSelectedIds,
      producersFilterOptions,
      producersSelectedCodes,
      dateFrom: dateFromString,
      dateTo: dateToString,
    },
    extractSummaryLoading,
  } = useSelector((state: RootState) => state.extractSummary);

  const { cities: allCities } = useSelector((state: RootState) => state.cities);

  const dateFrom = React.useMemo(() => {
    return dayjs(dateFromString);
  }, [dateFromString]);

  const dateTo = React.useMemo(() => {
    return dayjs(dateToString);
  }, [dateToString]);

  function changeCitiesSelectedIds(value: string[]) {
    dispatch(extractSummarySliceActions.changeCitySelectedIds(value));
  }

  function changeStatesSelectedIds(value: string[]) {
    dispatch(extractSummarySliceActions.changeStateSelectedIds(value));
  }

  function changecoursesSelectedCodes(value: string[]) {
    dispatch(extractSummarySliceActions.changeCourseSelectedIds(value));
  }

  function changeindicatorsSelectedCodes(value: string[]) {
    dispatch(extractSummarySliceActions.changeIndicatorSelectedIds(value));
  }

  function changeProducersSelectedIds(value: string[]) {
    dispatch(extractSummarySliceActions.changeProducerSelectedIds(value));
  }

  function changeDate(
    _dateFrom: dayjs.Dayjs | null,
    _dateTo: dayjs.Dayjs | null
  ) {
    dispatch(
      extractSummarySliceActions.changeDateFrom(
        _dateFrom?.toString() ?? dayjs().toString()
      )
    );
    dispatch(
      extractSummarySliceActions.changeDateTo(
        _dateTo?.toString() ?? dayjs().toString()
      )
    );
  }

  function onCleanFilters() {
    dispatch(extractSummarySliceActions.cleanFilters());
  }

  async function requestSummaryData({
    citiesData,
    citiesSelectedIds,
    statesSelectedIds,
    coursesSelectedCodes,
    indicatorsSelectedCodes,
    producersSelectedCodes,
    dateFrom,
    dateTo,
  }: {
    citiesData: City[];
    citiesSelectedIds: string[];
    statesSelectedIds: string[];
    coursesSelectedCodes: string[];
    indicatorsSelectedCodes: string[];
    producersSelectedCodes: string[];
    dateFrom: dayjs.Dayjs;
    dateTo: dayjs.Dayjs;
  }) {
    dispatch(
      fetchSummaryExtractThunk({
        cities: citiesData
          .filter((city) => citiesSelectedIds.includes(city.id))
          .map((city) => city.city),
        states: statesSelectedIds,
        courses: coursesSelectedCodes,
        indicators: indicatorsSelectedCodes,
        producers: producersSelectedCodes,
        monthFrom: dateFrom.format("MM"),
        yearFrom: dateFrom.format("YYYY"),
        monthTo: dateTo.format("MM"),
        yearTo: dateTo.format("YYYY"),
      })
    );
  }

  const deboundeRequestSummaryData = React.useCallback(
    debounce(requestSummaryData, 500),
    []
  );

  React.useEffect(() => {
    if (allCities.length > 0) {
      deboundeRequestSummaryData({
        citiesData: allCities,
        citiesSelectedIds,
        statesSelectedIds,
        coursesSelectedCodes,
        indicatorsSelectedCodes,
        producersSelectedCodes,
        dateFrom,
        dateTo,
      });
    }
  }, [
    citiesSelectedIds,
    statesSelectedIds,
    coursesSelectedCodes,
    indicatorsSelectedCodes,
    producersSelectedCodes,
    dateFrom,
    dateTo,
    allCities,
  ]);

  React.useEffect(() => {
    console.log("loading", extractSummaryLoading);
  }, [extractSummaryLoading]);

  React.useLayoutEffect(() => {
    dispatch(extractSummarySliceActions.changeAllCities(cities));
    dispatch(extractSummarySliceActions.changeLoading(true));
  }, [cities]);

  const showCleanFilters = React.useMemo(() => {
    return (
      citiesSelectedIds.length > 0 ||
      statesSelectedIds.length > 0 ||
      coursesSelectedCodes.length > 0 ||
      indicatorsSelectedCodes.length > 0 ||
      producersSelectedCodes.length > 0 ||
      !!dateFrom ||
      !!dateTo
    );
  }, [
    citiesSelectedIds,
    statesSelectedIds,
    coursesSelectedCodes,
    indicatorsSelectedCodes,
    producersSelectedCodes,
    dateFrom,
    dateTo,
  ]);

  function pasteFilters() {
    const {
      citiesSelectedIds: copiedCities,
      statesSelectedIds: copiedStates,
      coursesSelectedCodes: copiedCourses,
      dateFrom: copiedDateFrom,
      dateTo: copiedDateTo,
    } = copiedFilters;

    changecoursesSelectedCodes(copiedCourses);
    changeCitiesSelectedIds(copiedCities);
    changeStatesSelectedIds(copiedStates);
    if (copiedDateFrom || copiedDateTo) {
      dispatch(extractSummarySliceActions.changeDateFrom(copiedDateFrom));
      dispatch(extractSummarySliceActions.changeDateTo(copiedDateTo));
    }
  }

  return (
    <div
      className="summary-extract-filters-container"
      style={{ display: stateExportPdf.isCreatingPDF ? "none" : "flex" }}
    >
      <div style={{ minWidth: "8rem" }}>
        <DatePickerFromTo
          fromDate={dateFrom}
          toDate={dateTo}
          onChangeDate={changeDate}
          views={["year", "month"]}
          openTo="year"
          format="MM/YYYY"
          label={t("Dashboard.dateFilter.filterPeriodLabel")}
          clearable={false}
          fromAndToInTheSameYear
        />
      </div>
      <SelectFilterIndicators
        items={indicatorsFilterOptions}
        selectedIds={indicatorsSelectedCodes}
        onChangeSelectedIds={changeindicatorsSelectedCodes}
        loading={extractSummaryLoading}
      />
      <SelectFilterCourses
        items={coursesFilterOptions}
        selectedIds={coursesSelectedCodes}
        onChangeSelectedIds={changecoursesSelectedCodes}
        loading={extractSummaryLoading}
      />
      <SelectFilterStates
        items={statesFilterOptions}
        selectedIds={statesSelectedIds}
        onChangeSelectedIds={changeStatesSelectedIds}
        loading={extractSummaryLoading}
      />
      <SelectFilterCities
        items={citiesFilterOptions}
        selectedIds={citiesSelectedIds}
        onChangeSelectedIds={changeCitiesSelectedIds}
        loading={extractSummaryLoading}
      />
      <InputDrawerSelectProducers
        producers={producersFilterOptions}
        selectedProducersIds={producersSelectedCodes}
        onChangeProducerSelectedIds={changeProducersSelectedIds}
        citiesList={citiesFilterOptions}
        selectedCitiesIds={citiesSelectedIds}
        onChangeCitiesSelectedIds={changeCitiesSelectedIds}
        fromDate={dateFrom}
        toDate={dateTo}
        onChangeDate={changeDate}
        loading={extractSummaryLoading}
      />
      <FiltersMenuOptions
        onCleanFilters={onCleanFilters}
        onCopyFilters={() =>
          copyFilters(
            citiesSelectedIds,
            statesSelectedIds,
            coursesSelectedCodes,
            dateFromString,
            dateToString
          )
        }
        onPasteFilters={pasteFilters}
        showCleanFilters={showCleanFilters}
      />
    </div>
  );
};
