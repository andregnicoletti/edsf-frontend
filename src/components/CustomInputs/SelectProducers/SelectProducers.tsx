import React, { useMemo } from "react";

import { Box, IconButton, Typography } from "@cpqd-quati/react";
import { Collapse, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";

import SelectFilterCities from "../SelectFilterCities";

import { SelectProducersProps } from "./SelectProducers.types";

import Badge from "@/components/Badge";
import DatePickerFromTo from "@/components/DatePickerFromTo";
import { parseProducersByCities } from "@/services/parseData/parseProducers";
import { Producer } from "@/types/Producer";
import { selectItemFromList } from "@/utils/filters";
import { makeProducersSelectedText } from "@/utils/inputs";

import "./SelectProducers.styles.scss";

export const SelectProducers: React.FC<SelectProducersProps> = (props) => {
  const { t } = useTranslation();

  const producerByCity = useMemo(() => {
    return parseProducersByCities(props.producers);
  }, [props.producers]);

  const [citiesOpened, setCitiesOpened] = React.useState<string[]>([]);

  function onClickCity(city: string) {
    if (citiesOpened.includes(city)) {
      setCitiesOpened(citiesOpened.filter((c) => c !== city));
    } else {
      setCitiesOpened([...citiesOpened, city]);
    }
  }

  function onClickProducerCode(producer: Producer) {
    const newProducers = selectItemFromList(
      props.selectedProducersIds,
      producer,
      (item) => item.producerCode
    );
    props.onChangeProducerSelectedIds(newProducers);
  }

  const producersSelectedText = (producersList: Producer[]) => {
    const producersListSelected = producersList.filter((item) =>
      props.selectedProducersIds.includes(item.producerCode)
    );
    const quantity = producersListSelected.length;

    return makeProducersSelectedText(quantity);
  };

  return (
    <Box className="select-producers-container">
      <Typography variant="body" fontWeight="bold" size="lg">
        {t("Dashboard.detailedExtract.producersSideMenuTitle")}
      </Typography>
      <div className="select-producers-content">
        {props.selectedCitiesIds &&
          props.onChangeCitiesSelectedIds &&
          props.citiesList && (
            <div className="select-producers-filters">
              <SelectFilterCities
                items={props.citiesList}
                onChangeSelectedIds={props.onChangeCitiesSelectedIds}
                selectedIds={props.selectedCitiesIds}
              />
              {props.fromDate && props.toDate && props.onChangeDate && (
                <div style={{ minWidth: "8rem" }}>
                  <DatePickerFromTo
                    fromDate={props.fromDate}
                    toDate={props.toDate}
                    onChangeDate={props.onChangeDate}
                    views={["year", "month"]}
                    openTo="year"
                    format="MM/YYYY"
                    label={t("Dashboard.dateFilter.filterPeriodLabel")}
                    clearable={false}
                    fromAndToInTheSameYear
                  />
                </div>
              )}
            </div>
          )}

        {props.loading && (
          <>
            <Skeleton variant="rectangular" width="100%" height="3rem" />
            <Skeleton variant="rectangular" width="100%" height="3rem" />
            <Skeleton variant="rectangular" width="100%" height="3rem" />
          </>
        )}

        {!props.loading && Object.keys(producerByCity).length === 0 && (
          <div className="select-city-empty-container">
            <Typography
              variant="body"
              fontWeight="medium"
              size="md"
              color="var(--neutral-700)"
              style={{ textAlign: "center" }}
            >
              {props.emptyMessage ?? t("ProducersTab.emptyMessage")}
            </Typography>
          </div>
        )}

        {Object.keys(producerByCity).map((city) => (
          <div key={city} className="select-city-collapsable-container">
            <div className="select-city-collapsable-title-row">
              <Typography
                variant="body"
                fontWeight="medium"
                color="var(--neutral-700)"
                flex={1}
              >
                {city}
              </Typography>
              <Typography
                variant="body"
                size="sm"
                color="var(--primary-800)"
                flex={1}
              >
                {producersSelectedText(producerByCity[city])}
              </Typography>
              <IconButton
                iconName={
                  citiesOpened.includes(city) ? "ChevronUp" : "ChevronDown"
                }
                aria-label="chevron-collapsable"
                size="md"
                variant="tertiary"
                color="var(--primary-800)"
                onClick={() => onClickCity(city)}
              />
            </div>
            <Collapse in={citiesOpened.includes(city)}>
              <div className="select-city-collapsable-content">
                {producerByCity[city].map((producer) => (
                  <button
                    key={producer.producerId}
                    onClick={() => onClickProducerCode(producer)}
                  >
                    <Badge
                      text={producer.producerDescription}
                      variant="neutral"
                      type={
                        props.selectedProducersIds.includes(
                          producer.producerCode
                        )
                          ? "filled"
                          : "outline"
                      }
                      size="medium"
                      shape="square"
                      leftIcon={producer.achievement ? "Badge" : undefined}
                    />
                  </button>
                ))}
              </div>
            </Collapse>
          </div>
        ))}
      </div>
    </Box>
  );
};
