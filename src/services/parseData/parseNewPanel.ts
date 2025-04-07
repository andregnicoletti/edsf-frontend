import {
  DatasetPreviewChartPanel,
  SendPanelAttributes,
  SendPanelAttributesColumns,
  SendPanelPreviewContentResponse,
} from "../axios/configNewPanel/configNewPanel.types";
import { PanelByIdTableDatasets } from "../axios/dashboard/dashboard.types";

import {
  Attributes,
  TableAttOrderType,
} from "@/store/features/ConfigNewPanel/ConfigNewPanelSlice";
import { ChartType } from "@/types/Chart";
import { NewPanelAttributes, TableNewPanel } from "@/types/NewPanel";

const colorBySerieIndex = ["rgba(76, 133, 241, 1)", "rgba(149, 196, 127, 1)"];

export const parseNewPanelPreviewToTable = (
  data: PanelByIdTableDatasets
): TableNewPanel => {
  const tableData: TableNewPanel = {
    headers: [],
    rows: [],
  };

  data.headers.forEach((item) => {
    switch (item) {
      case "cityName":
        tableData.headers.push(NewPanelAttributes.city);
        break;
      case "producerDescription":
        tableData.headers.push(NewPanelAttributes.producer);
        break;
      case "indicator":
        tableData.headers.push(NewPanelAttributes.indicator);
        break;
      case "year":
        tableData.headers.push(NewPanelAttributes.year);
        break;
      case "value":
        tableData.headers.push(NewPanelAttributes.indicatorPercent);
        break;
      case "goal":
        tableData.headers.push(NewPanelAttributes.goal);
        break;
      default:
        break;
    }
  });

  data.rows.forEach((row) => {
    const rowParsed: { [key in NewPanelAttributes]?: string | number } = {};
    Object.keys(row).forEach((key) => {
      switch (key) {
        case "cityName":
          rowParsed[NewPanelAttributes.city] = row[key];
          if (row["state"])
            rowParsed[NewPanelAttributes.city] += "/" + row["state"];
          break;
        case "producerDescription":
          rowParsed[NewPanelAttributes.producer] = row[key];
          break;
        case "indicator":
          rowParsed[NewPanelAttributes.indicator] = row[key];
          break;
        case "year":
          rowParsed[NewPanelAttributes.year] = row[key];
          break;
        case "value": {
          const percentage = row[key] + "%";
          rowParsed[NewPanelAttributes.indicatorPercent] = percentage;
          break;
        }
        case "goal":
          rowParsed[NewPanelAttributes.goal] = row[key];
          break;
        default:
          break;
      }
    });
    tableData.rows.push(rowParsed);
  });

  return tableData;
};

export const parseNewPanelPreviewToChart = (
  data: SendPanelPreviewContentResponse<DatasetPreviewChartPanel>
): ChartType => {
  const xAxisNames: string[] = [];
  const seriesValues: Record<string, number[]> = {};
  const goals: number[][] = [];

  data.datasets.forEach((item) => {
    item.producerPerYear.forEach((item, index) => {
      if (!seriesValues[item.year]) {
        seriesValues[item.year] = [];
      }
      seriesValues[item.year].push(item.value);

      if (goals.length < index + 1) {
        goals.push([]);
      }
      goals[index].push(item.goal);
    });

    const producer = data.producers.find(
      (producer) => producer.producerId === item.producerId
    );

    if (producer) {
      const name = `${producer.producerDescription} \n ${producer.city}/${producer.state}`;
      xAxisNames.push(name);
    }
  });

  const chart: ChartType = {
    xAxis: [
      {
        data: xAxisNames,
        scaleType: "band",
      },
    ],
    series: [
      ...Object.keys(seriesValues).map((label, index) => ({
        id: label,
        label: label,
        color: colorBySerieIndex[index],
        data: seriesValues[label],
      })),
    ],
    goals,
  };

  return chart;
};

export function parseAttributesToSendPanelData(
  attributes: Attributes
): SendPanelAttributes {
  const attributesParsed = parseLocalAttributesToSendAttributes(attributes);
  let attributeOrderWithId = attributesParsed.find(
    (att) => att.order !== undefined
  );

  if (!attributeOrderWithId && attributesParsed.length > 0) {
    attributeOrderWithId = attributesParsed[0];
  }

  if (!attributeOrderWithId) return undefined;
  return {
    columnsName: attributesParsed.map((att) => att.column),
    order: attributesParsed,
  };
}

export function parseAttResponseToLocalAttributes(
  requestResponse: SendPanelAttributes
): Attributes {
  const attributes: Attributes = [];

  requestResponse?.order.forEach((att) => {
    switch (att.column) {
      case SendPanelAttributesColumns.producerDescription:
        attributes.push({ id: NewPanelAttributes.producer, order: att.order });
        break;
      case SendPanelAttributesColumns.cityName:
        attributes.push({ id: NewPanelAttributes.city, order: att.order });
        break;
      case SendPanelAttributesColumns.indicator:
        attributes.push({ id: NewPanelAttributes.indicator, order: att.order });
        break;
      case SendPanelAttributesColumns.year:
        attributes.push({ id: NewPanelAttributes.year, order: att.order });
        break;
      case SendPanelAttributesColumns.goal:
        attributes.push({ id: NewPanelAttributes.goal, order: att.order });
        break;
      case SendPanelAttributesColumns.value:
        attributes.push({
          id: NewPanelAttributes.indicatorPercent,
          order: att.order,
        });
        break;
    }
  });

  return attributes;
}

function parseLocalAttributesToSendAttributes(attributes: Attributes): {
  column: SendPanelAttributesColumns;
  order: TableAttOrderType;
}[] {
  const columnsAxiosData: {
    column: SendPanelAttributesColumns;
    order: TableAttOrderType;
  }[] = [];

  attributes.forEach((att) => {
    switch (att.id) {
      case NewPanelAttributes.producer:
        columnsAxiosData.push({
          column: SendPanelAttributesColumns.producerDescription,
          order: att.order,
        });
        break;
      case NewPanelAttributes.city:
        columnsAxiosData.push({
          column: SendPanelAttributesColumns.cityName,
          order: att.order,
        });
        columnsAxiosData.push({
          column: SendPanelAttributesColumns.state,
          order: att.order,
        });
        break;
      case NewPanelAttributes.indicator:
        columnsAxiosData.push({
          column: SendPanelAttributesColumns.indicator,
          order: att.order,
        });
        break;
      case NewPanelAttributes.year:
        columnsAxiosData.push({
          column: SendPanelAttributesColumns.year,
          order: att.order,
        });
        break;
      case NewPanelAttributes.goal:
        columnsAxiosData.push({
          column: SendPanelAttributesColumns.goal,
          order: att.order,
        });
        break;
      case NewPanelAttributes.indicatorPercent:
        columnsAxiosData.push({
          column: SendPanelAttributesColumns.value,
          order: att.order,
        });
        break;
    }
  });

  return columnsAxiosData;
}
