import React from "react";

import { Checkbox, Typography } from "@cpqd-quati/react";
import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { criterionOptions, performanceOptions } from "./ConfigPanel.types";

import InputLabel from "@/components/CustomInputs/InputLabel";
import SelectSimple from "@/components/CustomInputs/SelectSimple";
import DialogueNewPanelEmptyInput from "@/components/DialogueNewPanelEmptyInput";
import { useHasEmptyInputNewPanel } from "@/hooks/useHasEmptyInputNewPanel";
import apiService from "@/services/axios";
import { DataSelectionPerformance } from "@/services/axios/configNewPanel/configNewPanel.types";
import { configNewPanelActions } from "@/store/features/ConfigNewPanel/ConfigNewPanelSlice";
import { fetchIndicatorThunk } from "@/store/features/ConfigNewPanel/configNewPanelThunk";
import { AppDispatch, RootState } from "@/store/store";
import { sxInputNeutral } from "@/styles/inputStyle";
import { Criterion } from "@/types/ConfigNewPanel";

export const ConfigPanel: React.FC = React.memo(function ConfigPanel() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { hasSomeInputEmpty } = useHasEmptyInputNewPanel();

  const {
    panelType,
    criterion,
    dataSelectionComparison,
    dataSelectionPerformance,
    panelName,
    showGoal,
    filters: {
      indicator: indicatorFilter,
      producers: { producersIdsSelected },
    },
  } = useSelector((state: RootState) => state.configNewPanel);
  const [dataSelectionComparisonOptions, setDataSelectionComparisonOptions] =
    React.useState<string[]>([]);

  async function fetchYears() {
    try {
      const response = await apiService.sendRequestYearsData();
      setDataSelectionComparisonOptions(response.years);
    } catch {
      console.log("[fetchYears] error");
    }
  }

  const confirmInputRef = React.useRef<() => void>(() => {});
  const [showConfirmPanel, setShowConfirmPanel] = React.useState(false);

  function getCriterionOptions() {
    dispatch(fetchIndicatorThunk());
  }

  function showConfirmAlert(functionToExecute: () => void) {
    const canShowConfirmAlert =
      !hasSomeInputEmpty && producersIdsSelected.length > 0;
    if (canShowConfirmAlert) {
      confirmInputRef.current = () => {
        setShowConfirmPanel(false);
        functionToExecute();
      };
      setShowConfirmPanel(true);
    } else {
      functionToExecute();
    }
  }

  function selectIndicator(id: string) {
    const changeIndicatorFunction = () => {
      dispatch(configNewPanelActions.changeIndicatorIdSelected(id));
    };
    showConfirmAlert(changeIndicatorFunction);
  }

  function selectCriterion(id: Criterion | "") {
    const changeCriterionFunction = () => {
      dispatch(configNewPanelActions.changeCriterion(id));
      dispatch(configNewPanelActions.changeDataSelectionPerformance(""));
      dispatch(configNewPanelActions.changeDataSelectionComparison([]));
    };
    showConfirmAlert(changeCriterionFunction);
  }

  function changeDataSelectionComparison(ids: string[]) {
    const changeDataSelection = () =>
      dispatch(configNewPanelActions.changeDataSelectionComparison(ids));
    showConfirmAlert(changeDataSelection);
  }

  function changeDataSelectionPerformance(
    dataSelection: DataSelectionPerformance
  ) {
    dispatch(
      configNewPanelActions.changeDataSelectionPerformance(dataSelection)
    );
  }

  function changeShowGoal() {
    dispatch(configNewPanelActions.changeShowGoal());
  }

  function onChangePanelName(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(configNewPanelActions.changePanelName(event.currentTarget.value));
  }

  React.useEffect(() => {
    getCriterionOptions();
    fetchYears();
  }, []);

  return (
    <div className="panel-configuration-card card-container">
      <DialogueNewPanelEmptyInput
        show={showConfirmPanel}
        onClose={() => setShowConfirmPanel(false)}
        onConfirm={confirmInputRef.current}
      />
      <Typography variant="body" fontWeight="bold" size="lg">
        {t("Dashboard.ConfigurePanel.configPanelTitle")}
      </Typography>
      <div>
        <InputLabel>{t("Dashboard.ConfigurePanel.configNameLabel")}</InputLabel>
        <TextField
          placeholder={t("Dashboard.ConfigurePanel.configNamePlaceholder")}
          fullWidth
          defaultValue={panelName}
          onChange={onChangePanelName}
          sx={sxInputNeutral}
        ></TextField>
      </div>
      <SelectSimple
        label={t("Dashboard.ConfigurePanel.configIndicatorLabel")}
        isOutsideLabel
        options={indicatorFilter.indicatorOptions}
        selectedOptionId={indicatorFilter.indicatorIdSelected}
        getId={(item) => item.id}
        getName={(item) => item.indicatorDescription}
        onChangeSelectedOptionId={(value) => selectIndicator(value as string)}
        variant="neutral"
        defaultOptionText={t("General.emptySelect")}
      />
      <SelectSimple
        label={t("Dashboard.ConfigurePanel.configCriterionLabel")}
        isOutsideLabel
        options={criterionOptions}
        selectedOptionId={criterion}
        getId={(item) => item.id}
        getName={(item) => t(item.label as any)}
        onChangeSelectedOptionId={(value) =>
          selectCriterion(value as Criterion)
        }
        variant="neutral"
        defaultOptionText={t("General.emptySelect")}
      />
      {criterion === "comparison" && (
        <SelectSimple
          label={t("Dashboard.ConfigurePanel.configDataSelectLabel")}
          isOutsideLabel
          options={dataSelectionComparisonOptions}
          multiple
          selectedOptionId={dataSelectionComparison}
          getId={(item) => item}
          getName={(item) => item}
          onChangeSelectedOptionId={(value) => {
            changeDataSelectionComparison(value as string[]);
          }}
          maxMultipleItems={2}
          variant="neutral"
          defaultOptionText={t("General.emptySelect")}
        />
      )}
      {criterion === "performance" && (
        <SelectSimple
          label={t("Dashboard.ConfigurePanel.configDataSelectLabel")}
          isOutsideLabel
          options={performanceOptions}
          selectedOptionId={dataSelectionPerformance}
          getId={(item) => item.id}
          getName={(item) => t(item.label as any)}
          onChangeSelectedOptionId={(value) => {
            changeDataSelectionPerformance(value as DataSelectionPerformance);
          }}
          variant="neutral"
          defaultOptionText={t("General.emptySelect")}
        />
      )}
      {panelType !== "table" && (
        <Checkbox defaultChecked={showGoal} onChange={changeShowGoal}>
          <Typography variant="body" size="md" fontWeight="regular">
            {t("Dashboard.ConfigurePanel.configShowGoalLabel")}
          </Typography>
        </Checkbox>
      )}
    </div>
  );
}, areEqual);

function areEqual() {
  return true;
}
