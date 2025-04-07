import React from "react";

import { IconButton, Typography } from "@cpqd-quati/react";
import { Draggable } from "@hello-pangea/dnd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import CustomDraggable from "@/components/CustomDraggable";
import SelectSimple from "@/components/CustomInputs/SelectSimple";
import DialogueNewPanelEmptyInput from "@/components/DialogueNewPanelEmptyInput";
import { useHasEmptyInputNewPanel } from "@/hooks/useHasEmptyInputNewPanel";
import {
  Attributes,
  configNewPanelActions,
  TableAttOrderType,
} from "@/store/features/ConfigNewPanel/ConfigNewPanelSlice";
import { RootState } from "@/store/store";
import { NewPanelAttributes } from "@/types/NewPanel";

import "./AttributesPanel.styles.scss";

const options = [
  {
    id: NewPanelAttributes.producer,
    label: "Dashboard.ConfigurePanel.attributes.producerAttribute",
  },
  {
    id: NewPanelAttributes.city,
    label: "Dashboard.ConfigurePanel.attributes.cityAttribute",
  },
  {
    id: NewPanelAttributes.indicator,
    label: "Dashboard.ConfigurePanel.attributes.indicatorAttribute",
  },
  {
    id: NewPanelAttributes.year,
    label: "Dashboard.ConfigurePanel.attributes.yearAttribute",
  },
  {
    id: NewPanelAttributes.goal,
    label: "Dashboard.ConfigurePanel.attributes.goalAttribute",
  },
  {
    id: NewPanelAttributes.indicatorPercent,
    label: "Dashboard.ConfigurePanel.attributes.indicatorRealizedAttribute",
  },
];

function orderButtonIcon(order: TableAttOrderType) {
  if (order === "asc") return "ArrowUp";
  if (order === "desc") return "ArrowDown";
  return "Dash";
}

export const AttributesPanel: React.FC = React.memo(function AttributesPanel() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const attributes = useSelector(
    (state: RootState) => state.configNewPanel.attributes
  );
  const { producersIdsSelected } = useSelector(
    (state: RootState) => state.configNewPanel.filters.producers
  );
  const { hasSomeInputEmpty } = useHasEmptyInputNewPanel();

  const confirmInputRef = React.useRef<() => void>(() => {});
  const [showConfirmPanel, setShowConfirmPanel] = React.useState(false);

  function onSelectOption(id: NewPanelAttributes) {
    if (!Object.keys(attributes).includes(id)) {
      dispatch(configNewPanelActions.addAttribute(id));
    }
  }

  function onRemoveOption(id: NewPanelAttributes) {
    const removeAtt = () => dispatch(configNewPanelActions.removeAttribute(id));
    if (
      attributes.length === 1 &&
      !hasSomeInputEmpty &&
      producersIdsSelected.length > 0
    ) {
      showConfirmCleanInput(removeAtt);
    } else {
      removeAtt();
    }
  }

  function showConfirmCleanInput(removeAtt: () => void) {
    setShowConfirmPanel(true);
    confirmInputRef.current = () => {
      setShowConfirmPanel(false);
      removeAtt();
    };
  }

  function onChangeOptionOrder(id: NewPanelAttributes) {
    dispatch(configNewPanelActions.onChangeOrderByAttribute(id));
  }

  function changeAllList(atts: Attributes) {
    dispatch(configNewPanelActions.onChangeAllAttribues(atts));
  }

  return (
    <div className="panel-configuration-card card-container">
      <DialogueNewPanelEmptyInput
        show={showConfirmPanel}
        onClose={() => setShowConfirmPanel(false)}
        onConfirm={confirmInputRef.current}
      />

      <Typography variant="body" fontWeight="bold" size="lg">
        {t("Dashboard.ConfigurePanel.attributes.title")}
      </Typography>

      <SelectSimple
        options={options}
        getId={(item) => item.id}
        getName={(item) => t(item.label as any)}
        label=""
        selectedOptionId={undefined}
        onChangeSelectedOptionId={(value) =>
          onSelectOption(value as NewPanelAttributes)
        }
        showDefaultOption={false}
        isOutsideLabel
      />

      <CustomDraggable
        setList={changeAllList}
        list={attributes}
        droppableId="attributes-new-panel"
      >
        {({ id, order }, index) => (
          <Draggable key={id} draggableId={id} index={index}>
            {(provided) => (
              <div
                className="attribute-container"
                ref={provided.innerRef}
                {...provided.draggableProps}
              >
                <img
                  {...provided.dragHandleProps}
                  className="attribute-drag-icon"
                  src="/dragIndicator.svg"
                  alt=""
                />
                <Typography
                  variant="body"
                  fontWeight="medium"
                  size="md"
                  color="var(--neutral-700)"
                  flex={1}
                >
                  {t(options.find((option) => option.id === id)?.label as any)}
                </Typography>
                <IconButton
                  variant="tertiary"
                  iconName={orderButtonIcon(order)}
                  size="xs"
                  aria-label="order"
                  onClick={() => onChangeOptionOrder(id)}
                />
                <IconButton
                  variant="tertiary"
                  iconName="Close"
                  size="xs"
                  aria-label="order"
                  onClick={() => onRemoveOption(id)}
                />
              </div>
            )}
          </Draggable>
        )}
      </CustomDraggable>
    </div>
  );
}, areEqual);

function areEqual() {
  return true;
}
