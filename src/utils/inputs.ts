import { t } from "i18next";

export type SelectExtendable = { selected?: boolean };

export function makeInputValueForMultipleItems<T>(
  items: T[],
  selectedIds: string[],
  textForMultipleItems: string,
  getName: (item: T) => string,
  getId: (item: T) => string
) {
  const valuesSelectedSize = selectedIds.length;
  if (valuesSelectedSize > 1) {
    return `${valuesSelectedSize} ${textForMultipleItems}`;
  } else if (valuesSelectedSize === 1) {
    const itemSelected = items.find((item) => getId(item) === selectedIds[0]);
    if (itemSelected) return getName(itemSelected);
  }
  return "";
}

export const makeProducersSelectedText = (quantity: number) => {
  if (quantity > 1)
    return `${quantity} ${t(
      "Dashboard.detailedExtract.multipleProducersSelected"
    )}`;
  else if (quantity === 1)
    return `${quantity} ${t(
      "Dashboard.detailedExtract.singleProducerSelected"
    )}`;
  return "";
};
