import React from "react";

import { useTranslation } from "react-i18next";

import logoCpqd from "@/assets/images/landingPage/logo-cpqd.png";
import logoEmbrapii from "@/assets/images/landingPage/logo-embrapii.png";
import logoJaentendi from "@/assets/images/landingPage/logo-jaentendi.png";
import logoSebrae from "@/assets/images/landingPage/logo-sebrae.png";

import "./Footer.styles.css";

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer-landing-page">
      <div className="footer-landing-first-container">
        <h6 className="landing-h6">{t("LandingPage.footer.partners")}</h6>
        <div className="partners-imgs">
          <img alt="parceiros" src={logoJaentendi} className="footer-partner" />
          <img alt="parceiros" src={logoCpqd} className="footer-partner" />
          <img alt="parceiros" src={logoEmbrapii} className="footer-partner" />
          <img alt="parceiros" src={logoSebrae} className="footer-partner" />
        </div>
      </div>
      <h6 className="landing-h6">{t("LandingPage.footer.copyright")}</h6>
    </footer>
  );
};
