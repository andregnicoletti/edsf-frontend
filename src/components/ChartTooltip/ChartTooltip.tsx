import React from "react";

import { Typography } from "@cpqd-quati/react";
import { Divider } from "@mui/material";

import { ChartTooltipProps } from "./ChartTooltip.types";

import "./ChartTooltip.styles.scss";

export const ChartTooltip: React.FC<ChartTooltipProps> = (props) => {
  if (props.index == null) return <></>;

  return (
    <div className="chart-tooltip-container">
      <Typography>{props.xAxis[0].data[props.index]}</Typography>
      <Divider />
      {props.series.map((serie) => {
        return (
          <div key={serie.label} className="chart-serie-row">
            <div
              className="square-serie"
              style={{ backgroundColor: serie.color }}
            />
            <Typography flex={1} color="var(--neutral-700)">
              {serie.label}
            </Typography>
            <Typography>{serie.data[props.index as number]}</Typography>
          </div>
        );
      })}
    </div>
  );
};
