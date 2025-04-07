import React from "react";

import { Box, Button, Icon } from "@cpqd-quati/react";
import { Drawer, FormControl, InputLabel, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

import SelectProducers from "../SelectProducers";

import { InputDrawerSelectProducersProps } from "./InputDrawerSelectProducers.types";

import { useInputBackgroundStyle } from "@/styles/inputStyle";
import { makeProducersSelectedText } from "@/utils/inputs";

import "./InputDrawerSelectProducers.styles.scss";

export const InputDrawerSelectProducers: React.FC<
  InputDrawerSelectProducersProps
> = (props) => {
  const { t } = useTranslation();
  const classes = useInputBackgroundStyle();

  const [tempProducersIdsSelected, setTempProducersIdsSelected] =
    React.useState<string[]>([]);
  const [isOpenProducers, setIsOpenProducers] = React.useState(false);

  function onClickProducersInput(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setTimeout(() => {
      setIsOpenProducers(true);
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
    }, 0);
  }

  function onCloseSelectProducers() {
    setIsOpenProducers(false);
    setTempProducersIdsSelected([]);
  }

  function onApplySelectProducers() {
    setIsOpenProducers(false);
    props.onChangeProducerSelectedIds(tempProducersIdsSelected);
  }

  const producersSelectedText = React.useMemo(() => {
    const quantity = tempProducersIdsSelected.length;

    return makeProducersSelectedText(quantity);
  }, [tempProducersIdsSelected]);

  React.useEffect(() => {
    setTempProducersIdsSelected(props.selectedProducersIds);
  }, [props.selectedProducersIds]);

  return (
    <>
      <Drawer
        anchor="right"
        open={isOpenProducers}
        onClose={onCloseSelectProducers}
      >
        <Box className="input-drawer-producers-container">
          <SelectProducers
            producers={props.producers}
            fromDate={props.fromDate}
            toDate={props.toDate}
            onChangeDate={props.onChangeDate}
            selectedProducersIds={tempProducersIdsSelected}
            onChangeProducerSelectedIds={setTempProducersIdsSelected}
            citiesList={props.citiesList}
            selectedCitiesIds={props.selectedCitiesIds}
            onChangeCitiesSelectedIds={props.onChangeCitiesSelectedIds}
            loading={props.loading}
          />
          <div className="input-drawer-producers-buttons">
            {/* <Button variant="secondary" onClick={onCloseSelectProducers}>
              {t("Dashboard.detailedExtract.producersSideMenuCancelar")}
            </Button> */}
            <Button variant="primary" onClick={onApplySelectProducers}>
              {t("Dashboard.detailedExtract.producersSideMenuAplly")}
            </Button>
          </div>
        </Box>
      </Drawer>
      <div className="input-width-field-150">
        <FormControl fullWidth size="small">
          <InputLabel shrink={!!producersSelectedText}>Produtores</InputLabel>
          <Select
            open={false}
            multiple
            value={[]}
            className={tempProducersIdsSelected.length > 0 ? classes.root : ""}
            onMouseDown={onClickProducersInput}
            label={"Produtores"}
            IconComponent={() => (
              <div className="input-drawer-select-icon">
                <Icon
                  iconName="SettingsSliders"
                  size="sm"
                  color="var(--primary-900)"
                />
              </div>
            )}
            renderValue={() => {
              return producersSelectedText;
            }}
            displayEmpty={!!producersSelectedText}
          />
        </FormControl>
      </div>
    </>
  );
};
