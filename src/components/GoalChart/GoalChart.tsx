import React from "react";

import { useDrawingArea } from "@mui/x-charts";

import { GoalChartProps } from "./GoalChart.types";

const BAR_HEIGTH = 6;
export const GoalChart: React.FC<GoalChartProps> = (props) => {
  const { left, top, width, height } = useDrawingArea();

  const isComparison = props.series.length > 1;
  const numberOfItems = (props.series[0] || []).data?.length;
  const maxValue = props.max;

  function distanceTopAndBar(goalValue: number) {
    if (maxValue === 0) return 0;
    const valueBetweenBarAndMax = maxValue - goalValue;
    const avoidBottomOverflow = height - BAR_HEIGTH;
    const marginTopCalc =
      (valueBetweenBarAndMax * avoidBottomOverflow) / maxValue;

    return marginTopCalc;
  }

  function calcComparisonBarWidth() {
    const leftAndRightMargins = barLeftMargin * 2;
    const itemSpaceLeftOverForBars =
      itemWidth - leftAndRightMargins - spaceBetweenBarsComparison;
    const comparisonWidth = itemSpaceLeftOverForBars / 2;

    return comparisonWidth;
  }

  function calcBarWidth() {
    const barWidth = isComparison ? comparisonBarWidth : singleBarWidth;
    return barWidth;
  }

  function calcYPosition(goalValue: number) {
    return top + distanceTopAndBar(goalValue);
  }

  function calcXPosition(itemPosition: number, barPosition: number) {
    const xItemPosition = itemWidth * itemPosition;
    const xbarPosition =
      (calcBarWidth() + spaceBetweenBarsComparison) * barPosition;

    return left + barLeftMargin + xItemPosition + xbarPosition;
  }

  const itemWidth = width / numberOfItems;

  const spaceBetweenBarsComparison = itemWidth * 0.025;
  const barLeftMargin = itemWidth * 0.1;

  const comparisonBarWidth = calcComparisonBarWidth();
  const singleBarWidth = itemWidth * 0.8;

  return (
    <React.Fragment>
      {props.goalsValues.map((value, barPosition) => {
        return value
          .filter((goalValue) => goalValue != null)
          .map((goalValue, itemPosition) => (
            <rect
              key={`${itemPosition}-${barPosition}`}
              x={calcXPosition(itemPosition, barPosition)}
              y={calcYPosition(goalValue)}
              width={calcBarWidth()}
              height={BAR_HEIGTH}
              style={{ fill: "var(--indicator-danger-400)" }}
            />
          ));
      })}
    </React.Fragment>
  );
};
