import React from "react";

import { IconButton, Menu } from "@cpqd-quati/react";
import { useTranslation } from "react-i18next";

import { FiltersMenuOptionsProps } from "./FiltersMenuOptions.types";

export const FiltersMenuOptions: React.FC<FiltersMenuOptionsProps> = (
  props
) => {
  const { t } = useTranslation();

  return (
    <Menu.Root>
      <Menu.Trigger as="div">
        <IconButton
          size="md"
          aria-label="FiltersMenuOptions"
          iconName="DotsVertical"
          variant="tertiary"
        />
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item onClick={props.onCopyFilters} value="copy-filters">
            {t("General.copyFilters")}
          </Menu.Item>
          <Menu.Item onClick={props.onPasteFilters} value="paste-filters">
            {t("General.pasteFilters")}
          </Menu.Item>
          {props.showCleanFilters && (
            <Menu.Item onClick={props.onCleanFilters} value="clean-filters">
              {t("General.cleanFilters")}
            </Menu.Item>
          )}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};
