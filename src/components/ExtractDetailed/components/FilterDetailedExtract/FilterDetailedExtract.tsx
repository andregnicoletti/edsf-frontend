import React, { useCallback, useMemo } from "react";

import dayjs, { Dayjs } from "dayjs";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import SelectFilterCities from "@/components/CustomInputs/SelectFilterCities";
import SelectFilterCourses from "@/components/CustomInputs/SelectFilterCourses";
import SelectFilterStates from "@/components/CustomInputs/SelectFilterStates";
import DatePickerFromTo from "@/components/DatePickerFromTo";
import FiltersMenuOptions from "@/components/FiltersMenuOptions";
import { useCopyFiltersContext } from "@/store/contexts/CopyFilters/useCopyFilters";
import { extractDetailedSliceActions } from "@/store/features/ExtractDetailed/ExtractDetailedSlice";
import { fetchDetailedExtractThunk } from "@/store/features/ExtractDetailed/ExtractDetailedThunk";
import { AppDispatch, RootState } from "@/store/store";
import { City } from "@/types/City";
import { parseFiltersToSendRequestDetailedExtract } from "@/utils/dashboardFilters";

import "./FilterDetailedExtract.styles.scss";

export const FilterDetailedExtract = React.memo(
  function FilterDetailedExtract() {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();
    const { copyFilters, copiedFilters } = useCopyFiltersContext();

    const { courses } = useSelector((state: RootState) => state.courses);
    const { cities } = useSelector((state: RootState) => state.cities);
    const {
      allCities,
      extractDetailedFilters: {
        citiesFilterOptions,
        citiesSelectedIds,
        coursesSelectedCodes,
        statesFilterOptions,
        statesSelectedIds,
        dateFrom: dateFromString,
        dateTo: dateToString,
      },
    } = useSelector((state: RootState) => state.extractDetailed);

    const dateFrom = React.useMemo(() => {
      return dayjs(dateFromString);
    }, [dateFromString]);

    const dateTo = React.useMemo(() => {
      return dayjs(dateToString);
    }, [dateToString]);

    function changeCourseSelectedIds(value: string[]) {
      dispatch(extractDetailedSliceActions.changeCourseSelectedIds(value));
    }

    function changeStateSelectedIds(value: string[]) {
      dispatch(extractDetailedSliceActions.changeStateSelectedIds(value));
    }

    function changeCitySelectedIds(value: string[]) {
      dispatch(extractDetailedSliceActions.changeCitySelectedIds(value));
    }

    function changeDate(valueFrom: Dayjs | null, valueTo: Dayjs | null) {
      dispatch(
        extractDetailedSliceActions.changeDateFrom(
          valueFrom?.toString() ?? dayjs().toString()
        )
      );
      dispatch(
        extractDetailedSliceActions.changeDateTo(
          valueTo?.toString() ?? dayjs().toString()
        )
      );
    }

    function onCleanFilters() {
      dispatch(extractDetailedSliceActions.cleanFilters());
    }

    const requestExtractDetailedTable = (
      _allCities: City[],
      _citiesSelectedIds: string[],
      _statesSelectedIds: string[],
      _coursesSelectedCodes: string[],
      _dateFrom: Dayjs,
      _dateTo: Dayjs
    ) => {
      const { citiesSelectedNames } = parseFiltersToSendRequestDetailedExtract(
        _allCities,
        _citiesSelectedIds
      );

      dispatch(
        fetchDetailedExtractThunk({
          cities: citiesSelectedNames.length ? citiesSelectedNames : undefined,
          states: _statesSelectedIds.length ? _statesSelectedIds : undefined,
          courses: _coursesSelectedCodes.length
            ? _coursesSelectedCodes
            : undefined,
          monthFrom: _dateFrom.format("MM"),
          yearFrom: _dateFrom.format("YYYY"),
          monthTo: _dateTo.format("MM"),
          yearTo: _dateTo.format("YYYY"),
        })
      );
    };

    const debounceRequestExtractDetailed = useCallback(
      debounce(requestExtractDetailedTable, 500),
      []
    );

    React.useEffect(() => {
      if (allCities.length > 0) {
        debounceRequestExtractDetailed(
          allCities,
          citiesSelectedIds,
          statesSelectedIds,
          coursesSelectedCodes,
          dateFrom,
          dateTo
        );
      }
    }, [
      citiesSelectedIds,
      statesSelectedIds,
      coursesSelectedCodes,
      dateFrom,
      dateTo,
      allCities,
    ]);

    React.useLayoutEffect(() => {
      dispatch(extractDetailedSliceActions.changeAllCities(cities));
      dispatch(extractDetailedSliceActions.changeLoading(true));
    }, [cities]);

    const showCleanFilters = useMemo(() => {
      return (
        citiesSelectedIds.length > 0 ||
        statesSelectedIds.length > 0 ||
        coursesSelectedCodes.length > 0 ||
        !!dateFrom ||
        !!dateTo
      );
    }, [
      citiesSelectedIds,
      statesSelectedIds,
      coursesSelectedCodes,
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

      changeCourseSelectedIds(copiedCourses);
      changeCitySelectedIds(copiedCities);
      changeStateSelectedIds(copiedStates);
      if (copiedDateFrom || copiedDateTo) {
        dispatch(extractDetailedSliceActions.changeDateFrom(copiedDateFrom));
        dispatch(extractDetailedSliceActions.changeDateTo(copiedDateTo));
      }
    }

    return (
      <div className="detailed-extract-filters-container">
        <div style={{ minWidth: "8rem" }}>
          <DatePickerFromTo
            fromDate={dateFrom}
            onChangeDate={changeDate}
            toDate={dateTo}
            views={["year", "month"]}
            openTo="year"
            format="MM/YYYY"
            label={t("Dashboard.dateFilter.filterPeriodLabel")}
            clearable={false}
            fromAndToInTheSameYear
          />
        </div>
        <SelectFilterCourses
          items={courses}
          selectedIds={coursesSelectedCodes}
          onChangeSelectedIds={changeCourseSelectedIds}
        />
        <SelectFilterStates
          items={statesFilterOptions}
          selectedIds={statesSelectedIds}
          onChangeSelectedIds={changeStateSelectedIds}
        />
        <SelectFilterCities
          items={citiesFilterOptions}
          selectedIds={citiesSelectedIds}
          onChangeSelectedIds={changeCitySelectedIds}
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
  }
);
