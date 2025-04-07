import React, { useState } from "react";

import { Button, Typography } from "@cpqd-quati/react";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

import { TypeCodeProps } from "./TypeCode.types";

import "@/pages/Login/Login.styles.scss";

export const TypeCode: React.FC<TypeCodeProps> = (props) => {
  const { t } = useTranslation();

  const [code, setCode] = useState<string>("");

  async function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    props.onSubmitCode(code);
  }

  return (
    <div className="login-card-container">
      <div className="login-card-content">
        <form className="login-form">
          <Typography fontWeight="bold" size="lg" color="var(--neutral-800)">
            {t("Login.typeAccessCode")}
          </Typography>
          <div className="login-input">
            <Typography color="var(--neutral-700)">
              {t("Login.accessCodeLabel")}
            </Typography>
            <TextField
              value={code}
              autoFocus
              onChange={(event) => setCode(event.target.value)}
            />
          </div>
          <Button
            loading={props.isLoading}
            variant="primary"
            onClick={onSubmit}
          >
            {t("Login.confirmButton")}
          </Button>
        </form>
      </div>
    </div>
  );
};
