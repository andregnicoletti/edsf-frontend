import {
  DetailedExtractResponseFilters,
  RequestSummaryExtractResponseFilters,
} from "../axios/dashboard/dashboard.types";

import { City } from "@/types/City";
import { Indicator } from "@/types/ConfigNewPanel";
import { Course } from "@/types/Course";
import { Producer } from "@/types/Producer";
import { State } from "@/types/State";

export function parseSummaryRequestToFilters(
  filters: RequestSummaryExtractResponseFilters,
  allCities: City[]
) {
  console.log("filters", filters);

  const cities: Array<City> = allCities.filter((item) =>
    filters.cities.includes(item.id)
  );
  const states: Array<State> = filters.states.map((item) => ({
    state_id: item,
  }));
  const indicators: Array<Indicator> = filters.indicators.map((item) => ({
    id: item.indicatorId,
    code: item.indicatorCode,
    indicatorDescription: item.indicatorDescription,
  }));

  const courses: Array<Course> = filters.courses.map((item) => ({
    id: item.courseId,
    code: item.courseCode,
    courseDescription: item.courseDescription,
  }));

  const producers: Array<Producer> = filters.producers
    .map((item) => ({
      producerId: item.producerId,
      producerCode: item.producerCode,
      producerDescription: item.producerDescription,
      cityId: item.cityId,
      city: allCities.find((city) => city.id === item.cityId)?.city ?? "",
      achievement: item.achievement,
    }))

  return {
    cities,
    states,
    indicators,
    courses,
    producers,
  };
}

export function parseDetailedRequestToFilters(
  filters: DetailedExtractResponseFilters,
  allCities: City[]
) {
  const cities: Array<City> = allCities.filter((item) =>
    filters.cities.includes(item.id)
  );
  const states: Array<State> = filters.states.map((item) => ({
    state_id: item,
  }));

  const courses: Array<Course> = filters.courses.map((item) => ({
    id: item.courseId,
    code: item.courseCode,
    courseDescription: item.courseDescription,
  }));

  return {
    cities,
    states,
    courses,
  };
}
