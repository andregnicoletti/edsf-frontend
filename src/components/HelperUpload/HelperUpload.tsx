import React from "react";

import { Button, Typography } from "@cpqd-quati/react";
import { Drawer } from "@mui/material";
import { useTranslation } from "react-i18next";

import ParseStringToHTML from "../ParseStringToHTML/ParseStringToHTML";

import { HelperUploadProps, TopicNumberProps } from "./HelperUpload.types";

import apiService from "@/services/axios";

import "./HelperUpload.styles.scss";

export const HelperUpload: React.FC<HelperUploadProps> = (props) => {
  const { t } = useTranslation();

  const [helpTexts, setHelpTexts] = React.useState<Record<string, string>>({});

  async function getHelp() {
    try {
      const response = await apiService.getHelpInfo();
      setHelpTexts(response);
    } catch (error) {
      console.log("[getHelp]", error);
    }
  }

  React.useEffect(() => {
    getHelp();
  }, []);

  return (
    <Drawer anchor="right" open={props.open} onClose={props.onClose}>
      <div className="flex helper-upload-container">
        <Typography
          className="helper-upload-title"
          size="lg"
          variant="body"
          fontWeight="bold"
        >
          {t("Data.UploadHelp.title")}
        </Typography>
        <div className="flex helper-upload-content">
          {Object.entries(helpTexts).map(([key, value], index) => {
            if (key.includes("ajuda")) {
              return (
                <div className="flex helper-topic" key={key}>
                  <TopicNumber number={index + 1} />
                  <Typography className="helper-upload-topic-text">
                    <ParseStringToHTML text={value} />
                  </Typography>
                </div>
              );
            }
            return <></>;
          })}
        </div>
        <Button
          onClick={props.onClose}
          className="helper-upload-close-button"
          variant="secondary"
        >
          {t("General.close")}
        </Button>
      </div>
    </Drawer>
  );
};

export const TopicNumber: React.FC<TopicNumberProps> = (props) => {
  return (
    <div className="flex helper-upload-topic-number-container">
      <Typography
        className="helper-upload-topic-number"
        variant="title6"
        fontWeight="semiBold"
      >
        {props.number}
      </Typography>
    </div>
  );
};
