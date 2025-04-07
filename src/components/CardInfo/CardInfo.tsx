import React from "react";

import { Icon, Typography } from "@cpqd-quati/react";
import { Skeleton } from "@mui/material";
import { Trans } from "react-i18next";

import { cardInfoColors } from "./CardInfo.styles";
import { CardInfoProps } from "./CardInfo.types";

import "./CardInfo.styles.scss";

export const CardInfo: React.FC<CardInfoProps> = (props) => {
  return (
    <div className="card-info-container">
      <div
        className="card-info-icon-container"
        style={{
          backgroundColor: cardInfoColors[props.variant].backgroundColor,
        }}
      >
        <Icon
          iconName={props.iconName}
          size="lg"
          color={cardInfoColors[props.variant].color}
        />
      </div>
      <div className="card-info-content">
        {props.loading ? (
          <Skeleton variant="text" sx={{ fontSize: "1.19rem" }} />
        ) : (
          <Typography
            variant="title5"
            fontWeight="semiBold"
            lineHeight={1.17}
            color={cardInfoColors[props.variant].color}
          >
            <Trans i18nKey={props.title as any} />
          </Typography>
        )}
        <Typography
          variant="body"
          size="sm"
          fontWeight="semiBold"
          lineHeight={1.17}
          color="var(--neutral-700)"
        >
          <Trans i18nKey={props.subtitle as any} />
        </Typography>
      </div>
    </div>
  );
};
