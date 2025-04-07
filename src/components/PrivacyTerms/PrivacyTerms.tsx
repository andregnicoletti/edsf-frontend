import React, { useEffect } from "react";

import { Button, Radio, Typography } from "@cpqd-quati/react";
import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import { useTranslation } from "react-i18next";

import ParseStringToHTML from "../ParseStringToHTML/ParseStringToHTML";

import { PrivacyRadiosValues, PrivacyTermsProps } from "./PrivacyTerms.types";

import apiService from "@/services/axios";

import "./PrivacyTerms.styels.scss";

export const PrivacyTerms: React.FC<PrivacyTermsProps> = (props) => {
  if (props.isDialog)
    return (
      <Dialog
        PaperProps={{
          sx: { borderRadius: "var(--border-radius-sm)" },
        }}
        fullWidth
        open={!!props.open}
        onClose={props.onClose}
      >
        <DialogContent style={{ padding: 0 }}>
          <PrivacyTermsContent {...props} />
        </DialogContent>
      </Dialog>
    );

  return (
    <div className="privacy-terms-container">
      <PrivacyTermsContent {...props} />
    </div>
  );
};

export const PrivacyTermsContent: React.FC<PrivacyTermsProps> = (props) => {
  const { t } = useTranslation();

  const [valueSelected, setValueSelected] = React.useState<
    PrivacyRadiosValues | undefined
  >(props.defaultValue);

  return (
    <div className="privacy-terms-content-external">
      <div className="privacy-terms-content">
        <PrivacyTermsText />
        {props.showAgreeOptions && (
          <div className="privacy-terms-radios">
            <Radio
              onChange={(e) => setValueSelected(e as PrivacyRadiosValues)}
              value={valueSelected}
              options={[
                {
                  label: t("PrivacyTerms.agree"),
                  value: PrivacyRadiosValues.AGREE,
                },
                {
                  label: t("PrivacyTerms.disagree"),
                  value: PrivacyRadiosValues.DISAGREE,
                },
              ]}
            />
          </div>
        )}
        <Button
          disabled={!valueSelected && props.showAgreeOptions}
          loading={props.isLoadingConfirm}
          onClick={() =>
            props.onClickConfirmButton(valueSelected as PrivacyRadiosValues)
          }
        >
          {props.confirmButtonText}
        </Button>
      </div>
    </div>
  );
};

export const PrivacyTermsText: React.FC = () => {
  const [terms, setTerms] = React.useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = React.useState(true);

  async function getTerms() {
    try {
      const termsResponse = await apiService.getTermsAndPrivacy();
      setTerms(termsResponse);
    } catch (error) {
      console.log("[getTerms]", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTerms();
  }, []);

  if (isLoading)
    return (
      <div className="loading-container">
        <CircularProgress size={30} />
      </div>
    );

  return (
    <div className="privacy-terms-texts">
      {Object.entries(terms).map(([key, value]) => {
        if (key === "titulo")
          return (
            <Typography variant="body" size="lg" key={key}>
              <ParseStringToHTML text={value} />
            </Typography>
          );
        else if (key.includes("subtitulo")) {
          return (
            <Typography variant="body" size="md" key={key}>
              <ParseStringToHTML text={value} />
            </Typography>
          );
        } else if (key.includes("termos")) {
          return (
            <Typography variant="body" size="md" fontWeight="regular" key={key}>
              <ParseStringToHTML text={value} />
            </Typography>
          );
        }
      })}
    </div>
  );
};
