import React from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { MenuHeaderProps, SideMenuLandingPageProps } from "./MenuHeader.types";

import { RoutesPaths } from "@/routes/routesPaths";

import "./MenuHeader.styles.css";

export const MenuHeader: React.FC<MenuHeaderProps> = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = React.useState(false);

  function handleClickLogin() {
    const isMobile =
      /Android|webOs|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows Phone|opera mini|mobile/;
    if (isMobile.test(navigator.userAgent)) {
      window.alert(
        "Esta página não pode ser acessada por dispositivos móveis."
      );
    } else {
      navigate(RoutesPaths.Login);
    }
  }

  function onPressMenuButton() {
    setMenuOpen((last) => !last);
  }

  return (
    <header className="flex" id="landing-page-menu-container">
      <h4 className="landing-h4 landing-page-menu-title lading-page-menu-title-background">
        {t("LandingPage.firstSection.menuTitle")}
      </h4>
      <div className="flex" id="landing-page-menu-buttons-list">
        <button
          type="button"
          className="landing-page-menu-button"
          onClick={props.onClickSolutios}
        >
          {t("LandingPage.firstSection.menuSolutions")}
        </button>
        <button
          className="landing-page-menu-button"
          type="button"
          onClick={props.onClickContactUs}
        >
          {t("LandingPage.firstSection.menuContactUs")}
        </button>
        <button className="landing-page-menu-button" onClick={handleClickLogin}>
          {t("LandingPage.firstSection.menuLogin")}
        </button>
      </div>
      <button
        onClick={onPressMenuButton}
        className="landing-page-menu-floating"
      >
        <img className="menu-icon" alt="menu floating" src="/menu.svg" />
      </button>
      <SideMenuLandingPage
        menuIsOpen={menuOpen}
        onClickClose={onPressMenuButton}
        onClickContactUs={props.onClickContactUs}
        onClickSolutios={props.onClickSolutios}
        onClickLogin={handleClickLogin}
      />
    </header>
  );
};

const SideMenuLandingPage: React.FC<SideMenuLandingPageProps> = (props) => {
  const { t } = useTranslation();

  function onClickSolutions() {
    props.onClickClose();
    props.onClickSolutios();
  }

  function onClickContactUs() {
    props.onClickClose();
    props.onClickContactUs();
  }

  return (
    <div
      className={props.menuIsOpen ? "side-menu side-menu-open" : "side-menu"}
    >
      <div className="flex-column">
        <div className="flex side-menu-header">
          <h4 className="landing-h4 landing-page-menu-title">
            {t("LandingPage.firstSection.menuTitle")}
          </h4>
          <button onClick={props.onClickClose} className="close-menu-button">
            <img className="menu-icon" alt="close menu" src="/close.svg" />
          </button>
        </div>
        <div className="flex side-menu-buttons-container">
          <button
            type="button"
            className="side-menu-button"
            onClick={onClickSolutions}
          >
            {t("LandingPage.firstSection.menuSolutions")}
          </button>
          <button
            className="side-menu-button"
            type="button"
            onClick={onClickContactUs}
          >
            {t("LandingPage.firstSection.menuContactUs")}
          </button>
          <button className="side-menu-button" onClick={props.onClickLogin}>
            {t("LandingPage.firstSection.menuLogin")}
          </button>
        </div>
      </div>
    </div>
  );
};
