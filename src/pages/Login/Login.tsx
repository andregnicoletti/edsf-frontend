import React from "react";

import { Typography } from "@cpqd-quati/react";
import { jwtDecode } from "jwt-decode";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import TypeCode from "./components/TypeCode";
import TypeEmail from "./components/TypeEmail";
import { JWTDecodeType, LoginPageStateType } from "./Login.types";

import backgroundPattern from "@/assets/svgs/landingPage/patternBackgroundLandingPage.svg";
import Footer from "@/components/Footer";
import PrivacyTerms from "@/components/PrivacyTerms";
import { PrivacyRadiosValues } from "@/components/PrivacyTerms/PrivacyTerms.types";
import { RoutesPaths } from "@/routes/routesPaths";
import apiService from "@/services/axios";
import { parseUserType } from "@/services/parseData/parseUserType";
import { userSliceActions } from "@/store/features/User/userSlice";
import { removeToken, saveToken } from "@/utils/cookies";

import "./Login.styles.scss";

export const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageState, setPageState] =
    React.useState<LoginPageStateType>("typeEmail");
  const [email, setEmail] = React.useState<string>("");
  const [isLoadingSendCode, setIsLoadingSendCode] = React.useState(false);
  const [isLoadingSendEmail, setIsLoadingSendEmail] = React.useState(false);
  const [isLoadingPrivacy, setIsLoadingPrivacy] = React.useState(false);
  const [tempToken, setTempToken] = React.useState<string | null>(null);

  async function onSendEmail(email: string) {
    try {
      setIsLoadingSendEmail(true);
      removeToken();
      await apiService.sendCode({ email });
      setEmail(email);
      setPageState("typeCode");
    } catch (error) {
      console.log("[onSendEmail]", error);
    } finally {
      setIsLoadingSendEmail(false);
    }
  }

  async function onSendCode(code: string) {
    try {
      setIsLoadingSendCode(true);
      const token = await apiService.makeLogin({ email, code });
      setTempToken(token);
      const hasAcceptedTerms = await verifyTerms(token);
      if (hasAcceptedTerms) finalizeSuccessLogin(token);
      else setPageState("privacyTerms");
    } catch (error) {
      console.log("[onSendCode]", error);
    } finally {
      setIsLoadingSendCode(false);
    }
  }

  function finalizeSuccessLogin(token: string) {
    saveToken(token);
    const { companyDescription } = jwtDecode<JWTDecodeType>(token);
    dispatch(
      userSliceActions.setUser({
        email,
        organization: companyDescription,
      })
    );
    navigate(RoutesPaths.InternalPanel);
  }

  async function verifyTerms(token: string): Promise<boolean> {
    try {
      const tokenData = await apiService.verifyToken({ token });
      console.log("tokenData.role", tokenData.role);
      dispatch(userSliceActions.setUserType(parseUserType(tokenData.role)));
      return tokenData.lgpdConsent;
    } catch (error) {
      console.log("[verifyTerms]", error);
      return false;
    }
  }

  async function acceptTerms() {
    setIsLoadingPrivacy(true);
    try {
      if (!tempToken) return;
      await apiService.changeUserTerms({ terms: true, token: tempToken });
      finalizeSuccessLogin(tempToken);
    } catch (error) {
      console.log("[confirmTerms]", error);
    } finally {
      setIsLoadingPrivacy(false);
    }
  }

  async function confirmTerms(acccepted: boolean) {
    if (acccepted) {
      acceptTerms();
    } else {
      navigate(RoutesPaths.LandingPage);
    }
  }

  return (
    <div className="flex-column" id="login-page-container">
      <div
        className="flex-column"
        id="login-page-body"
        style={{ backgroundImage: `url(${backgroundPattern})` }}
      >
        <Typography
          className="login-title"
          variant="title6"
          fontWeight="semiBold"
        >
          {t("LandingPage.firstSection.menuTitle")}
        </Typography>
        {pageState === "typeEmail" && (
          <TypeEmail
            isLoading={isLoadingSendEmail}
            onSubmitEmail={onSendEmail}
          />
        )}
        {pageState === "typeCode" && (
          <TypeCode isLoading={isLoadingSendCode} onSubmitCode={onSendCode} />
        )}
        {pageState === "privacyTerms" && (
          <PrivacyTerms
            onClickConfirmButton={(value) =>
              confirmTerms(value === PrivacyRadiosValues.AGREE)
            }
            onClose={() => {}}
            showAgreeOptions
            confirmButtonText={t("General.confirmButton")}
            isLoadingConfirm={isLoadingPrivacy}
          />
        )}
      </div>
      <p className="version">Versão: 1.0.0-T50</p>
      <Footer />
    </div>
  );
};
