import React, { useState } from "react";

import { Button, Typography } from "@cpqd-quati/react";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { string } from "yup";

import { TypeEmailProps } from "./TypeEmail.types";

import "@/pages/Login/Login.styles.scss";
export const TypeEmail: React.FC<TypeEmailProps> = (props) => {
  const { t } = useTranslation();

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  async function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const isValid = await validateEmail(email);
    if (isValid) {
      props.onSubmitEmail(email);
    }
  }

  async function validateEmail(email: string): Promise<boolean> {
    try {
      await string().email().required().validate(email);
      setEmailError(undefined);
      return true;
    } catch {
      setEmailError(t("Login.emailInvalid"));
      return false;
    }
  }

  return (
    <div className="login-card-container">
      <div className="login-card-content">
        <form className="login-form">
          <Typography fontWeight="bold" size="lg" color="var(--neutral-800)">
            {t("Login.receiveAccessCode")}
          </Typography>
          <div className="login-input">
            <Typography color="var(--neutral-700)">
              {t("Login.emailLabel")}
            </Typography>
            <TextField
              type="email"
              value={email}
              autoFocus
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t("Login.emailPlaceholder")}
              helperText={emailError}
              error={!!emailError}
            />
          </div>
          <Button
            loading={props.isLoading}
            variant="primary"
            onClick={onSubmit}
          >
            {t("Login.sendCodeButton")}
          </Button>
        </form>
      </div>
    </div>
  );
};
