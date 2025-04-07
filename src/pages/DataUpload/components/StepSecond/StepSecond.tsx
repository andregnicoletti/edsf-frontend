import React from "react";

import { Typography } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";

import UploadPanel from "../UploadPanel";

import Badge from "@/components/Badge";
import HelperUpload from "@/components/HelperUpload";

import "./StepSecond.styles.scss";

export const StepSecond: React.FC = () => {
  const { t } = useTranslation();
  const [openHelper, setOpenHelper] = React.useState(false);

  const onChangeOpenCloseUploadHelper = () => {
    setOpenHelper((last) => !last);
  };

  return (
    <>
      <HelperUpload open={openHelper} onClose={onChangeOpenCloseUploadHelper} />
      <UploadPanel
        badgeText={t("Data.UploadData.step2")}
        title={t("Data.UploadData.step2Title")}
      >
        <Badge
          variant="info"
          size="large"
          leftIcon="Information"
          content={
            <Typography variant="body" className="info-text">
              {t("Data.UploadData.seeSome")}
              <button onClick={onChangeOpenCloseUploadHelper}>
                <u className="tips-link-button">
                  {t("Data.UploadData.tipsForHandlingCsv")}
                </u>
              </button>
            </Typography>
          }
        />
      </UploadPanel>
    </>
  );
};
