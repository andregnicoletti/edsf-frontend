import {
  DashboardLinesChartDataResponse,
  DashboardStackedColumnsChartResponse,
  DetailedExtractResponse,
} from "../axios/dashboard/dashboard.types";

import { ChartType, StackedChart } from "@/types/Chart";
import { CityExtractDetailed } from "@/types/CityExtractDetailed";
import { getRandomColors } from "@/utils/colors";

export function parseExtractDetailedRequestData(
  data: DetailedExtractResponse[]
): CityExtractDetailed[] {
  const parsedData: CityExtractDetailed[] = data.map((item) => ({
    id: item.municipioId,
    city: item.municipio,
    cityLabel: `${item.municipio}/${item.estado}`,
    state: item.estado,
    producersTargetAchieved: item.produtoresMetaAtingida,
    totalCertificates: item.totalCertificado,
    totalProducers: item.totalProdutores,
    totalRegistrations: item.totalInscricao,
    selected: false,
  }));

  return parsedData;
}

export function parseStackedDataDashboardToStackedChart(
  data: DashboardStackedColumnsChartResponse
): StackedChart {
  if (data.filter.length === 0)
    return {
      dataset: [],
      series: [],
      xAxis: [],
    };

  const dataset = data.filter.map((item) => ({
    cityState: item.city + "/" + item.state,
    Inscrições: item.total,
    ...item,
  }));

  const dataKeysList: string[] = [];

  data.filter.forEach((item) => {
    const itemKeys = Object.keys(item).filter(
      (item) => item !== "city" && item !== "state" && item !== "total"
    );
    itemKeys.forEach((key) => {
      if (!dataKeysList.includes(key)) dataKeysList.push(key);
    });
  });
  dataKeysList.push("Inscrições");

  const colors = getRandomColors(dataKeysList.length);

  const parsedData: StackedChart = {
    dataset,
    series: dataKeysList.map((key, index) => ({
      dataKey: key,
      label: key,
      stack: "assets",
      color: colors[index],
    })),
    xAxis: [
      {
        dataKey: "cityState",
        scaleType: "band",
      },
    ],
  };
  return parsedData;
}

function cityAndStateToString(city: string, state: string) {
  return `${city}/${state}`;
}

export function parseLinesDataDashboardToLinesChart(
  data: DashboardLinesChartDataResponse
): ChartType {
  const chartData: ChartType = {
    series: [],
    xAxis: [
      {
        data: [],
        scaleType: "band",
      },
    ],
    goals: [],
  };

  const allCitiesStates: string[] = [];

  data.filter.forEach((item) => {
    item.data.forEach((dataItem) => {
      if (
        !allCitiesStates.includes(
          cityAndStateToString(dataItem.city_name, dataItem.state)
        )
      )
        allCitiesStates.push(
          cityAndStateToString(dataItem.city_name, dataItem.state)
        );
    });
  });

  const seriesValues: Record<string, Array<number | null>> = {};

  data.filter
    .filter((item) => item.data.length > 0)
    .forEach((filterItem) => {
      chartData.xAxis[0].data.push(filterItem.month);
      filterItem.data.forEach((dataItem) => {
        const cityStateName = cityAndStateToString(
          dataItem.city_name,
          dataItem.state
        );
        if (seriesValues[cityStateName] === undefined)
          seriesValues[cityStateName] = [];
        seriesValues[cityStateName].push(dataItem.certified);
      });

      const citiesStatesIncluded = filterItem.data.map((item) =>
        cityAndStateToString(item.city_name, item.state)
      );
      allCitiesStates.forEach((cityState) => {
        if (!citiesStatesIncluded.includes(cityState)) {
          if (seriesValues[cityState] === undefined)
            seriesValues[cityState] = [];
          seriesValues[cityState].push(null);
        }
      });
    });

  const colors = getRandomColors(Object.keys(seriesValues).length);

  chartData.series = Object.keys(seriesValues).map((key, index) => ({
    id: key,
    label: key,
    data: seriesValues[key],
    color: colors[index],
  }));

  return chartData;
}
