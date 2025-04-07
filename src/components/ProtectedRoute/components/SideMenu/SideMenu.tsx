import React from "react";

import { Divider, Typography } from "@cpqd-quati/react";
import { Collapse } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import SideMenuButton from "../SideMenuButton";

import { useHasPermission } from "@/hooks/useHasPermission";
import { RoutesPaths } from "@/routes/routesPaths";
import { configsActions } from "@/store/features/Configs/configsSlice";
import { RootState } from "@/store/store";

import "./SideMenu.styles.scss";

export const SideMenu: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasPermission } = useHasPermission();
  const { sideMenuExpanded } = useSelector((state: RootState) => state.configs);
  const dispatch = useDispatch();

  function onClickMenuButton(path: RoutesPaths) {
    navigate(path);
  }

  function onClickHideMenu() {
    dispatch(configsActions.toggleSideMenu());
  }

  const menus = [
    {
      label: t("SideMenu.home"),

      iconName: "Home",
      path: RoutesPaths.Home,
    },
    {
      label: t("SideMenu.dashboard"),

      iconName: "PieChart",
      path: RoutesPaths.Dashboard,
    },
    {
      label: t("SideMenu.processing"),

      iconName: "FloppyDisc",
      path: RoutesPaths.DataUpload,
    },
  ];

  const menuFilteredByPermission = menus.filter((menu) => {
    return hasPermission(menu.path);
  });

  return (
    <div className="flex" id="side-menu-container">
      <SideMenuButton
        isExpanded={sideMenuExpanded}
        iconName={sideMenuExpanded ? "ArrowLeft" : "ArrowRight"}
        onClick={onClickHideMenu}
      >
        {t("SideMenu.hideMenu")}
      </SideMenuButton>
      <Divider orientation="horizontal" className="divider-horizontal" />
      {menuFilteredByPermission.map((menu) => (
        <SideMenuButton
          active={location.pathname.includes(menu.path)}
          key={menu.label}
          isExpanded={sideMenuExpanded}
          iconName={menu.iconName}
          onClick={() => onClickMenuButton(menu.path)}
        >
          {menu.label}
        </SideMenuButton>
      ))}
      <div id="side-menu-version">
        <Collapse in={sideMenuExpanded} orientation="horizontal">
          <Typography
            style={{ textWrap: "nowrap" }}
            variant="body"
            size="sm"
            fontWeight="regular"
          >
            Vers. 1.0.0-T50
          </Typography>
        </Collapse>
      </div>
    </div>
  );
};
