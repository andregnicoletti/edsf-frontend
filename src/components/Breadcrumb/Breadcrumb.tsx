import React from "react";

import { Icon, Typography } from "@cpqd-quati/react";
import { Breadcrumbs, Link } from "@mui/material";

import { BreadcrumbType } from "./Breadcrumb.types";

import { RoutesPaths } from "@/routes/routesPaths";

import "./Breadcrumb.styles.scss";

export const Breadcrumb: React.FC<BreadcrumbType> = (props) => {
  return (
    <Breadcrumbs
      separator={<Icon iconName="ChevronRight" size="md" />}
      aria-label="breadcrumb"
    >
      <Link underline="none" href={RoutesPaths.Home}>
        <Icon
          iconName="Home"
          size="md"
          className="breadcrumb-home-icon"
          color="var(--neutral-700)"
        />
      </Link>

      {props.links.map((link) => {
        if (link.routePath) {
          return (
            <Link underline="none" href={link.routePath} key={link.name}>
              <Typography
                variant="body"
                fontWeight="regular"
                size="md"
                className={"breadcrumb-link-path"}
              >
                {link.name}
              </Typography>
            </Link>
          );
        }
        return (
          <Typography
            key={link.name}
            variant="body"
            fontWeight="regular"
            size="md"
          >
            {link.name}
          </Typography>
        );
      })}
      <Typography
        variant="body"
        fontWeight="regular"
        size="md"
        className="breadcrumb-current-path"
      >
        {props.currentRoutePath}
      </Typography>
    </Breadcrumbs>
  );
};
