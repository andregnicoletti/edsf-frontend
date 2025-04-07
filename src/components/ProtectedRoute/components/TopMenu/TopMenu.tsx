import React from "react";

import { Divider, Menu, Typography } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { TopMenuProps } from "./TopMenu.types";

import { RoutesPaths } from "@/routes/routesPaths";
import { userSliceActions } from "@/store/features/User/userSlice";
import { RootState } from "@/store/store";

import "./TopMenu.styles.scss";

export const TopMenu: React.FC<TopMenuProps> = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, organization } = useSelector((state: RootState) => state.user);

  function logout() {
    dispatch(userSliceActions.logout());
    navigate(RoutesPaths.LandingPage);
  }

  return (
    <div className="top-menu-container">
      <Typography variant="title6" color="var(--neutral-200)">
        {t("TopMenu.title")}
      </Typography>
      <div className="top-menu-container-right-buttons">
        <Menu.Root>
          <Menu.Trigger as="div">
            <button className="top-menu-email-button">
              <Typography
                fontWeight="regular"
                size="sm"
                color="var(--support-900)"
              >
                {email}
              </Typography>
            </button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item disabled value="user-name">
                <strong>{organization}</strong>
              </Menu.Item>
              <Divider className="divider-horizontal" />
              <Menu.Item
                value="privacy-policy"
                onClick={props.onClickTermsAndPrivacy}
              >
                {t("UserMenu.consentTermPrivacyPolicy")}
              </Menu.Item>
              <Divider className="divider-horizontal" />
              <Menu.Item startIcon="LogOut" value="logout" onClick={logout}>
                {t("UserMenu.logout")}
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </div>
    </div>
  );
};
