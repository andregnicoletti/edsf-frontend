import React from "react";

import { Typography } from "@cpqd-quati/react";

import { HomeCardProps } from "./HomeCard.types";

import "./HomeCard.styles.scss";

export const HomeCard: React.FC<HomeCardProps> = (props) => {
  if (!props.description) {
    return (
      <div className="homecard-container homecard-short-container">
        <div className="homecard-title-container">
          {props.icon}
          <Typography variant="body" fontWeight="bold" size="xl">
            {props.title}
          </Typography>
          <div className="homecard-button-container">{props.button}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="homecard-container">
      <div className="homecard-title-container">
        {props.icon}
        <Typography variant="title6" fontWeight="semiBold">
          {props.title}
        </Typography>
      </div>
      <Typography variant="body" color="var(--neutral-700)">
        {props.description}
      </Typography>
      <div className="homecard-button-container">{props.button}</div>
    </div>
  );
};
