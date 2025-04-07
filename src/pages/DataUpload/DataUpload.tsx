import React from "react";

import { Typography } from "@cpqd-quati/react";
import { Spacing12, Spacing6 } from "@cpqd-quati/tokens";
import { useTranslation } from "react-i18next";

import StepFirst from "./components/StepFirst";
import StepSecond from "./components/StepSecond";
import StepThird from "./components/StepThird";

import Breadcrumb from "@/components/Breadcrumb";

import "./DataUpload.styles.scss";

export const DataUpload: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex-column">
      <Breadcrumb
        links={[{ name: t("Data.processing") }]}
        currentRoutePath={t("Data.UploadData.uploadData")}
      />
      <Typography
        marginBottom={Spacing6}
        marginTop={Spacing12}
        fontWeight="semiBold"
        variant="title6"
      >
        {t("Data.UploadData.uploadData")}
      </Typography>
      <div className="flex panels-container">
        <StepFirst />
        <StepSecond />
        <StepThird />
      </div>
    </div>
  );
};
