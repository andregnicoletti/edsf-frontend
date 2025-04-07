import React from "react";

import { useTranslation } from "react-i18next";

import SelectCheckbox from "../SelectCheckbox";

import { SelectFilterCoursesProps } from "./SelectFilterCourses.types";

import { Course } from "@/types/Course";
import { makeInputValueForMultipleItems } from "@/utils/inputs";

export const SelectFilterCourses: React.FC<SelectFilterCoursesProps> = (
  props
) => {
  const { t } = useTranslation();

  const courseInputValue = React.useMemo(
    () =>
      makeInputValueForMultipleItems(
        props.items,
        props.selectedIds,
        t("Dashboard.detailedExtract.multipleCoursesSelected"),
        (item: Course) => item.courseDescription,
        (item: Course) => item.code
      ),
    [props.selectedIds, props.items]
  );

  return (
    <div className="input-width-field-110">
      <SelectCheckbox
        items={props.items}
        selectedIds={props.selectedIds}
        getId={(item) => (item as Course).code}
        getName={(item) => (item as Course).courseDescription}
        getNameLabel={(item) => (item as Course).courseDescription}
        selectedText={courseInputValue}
        onChangeSelectedIds={props.onChangeSelectedIds}
        label={t("Dashboard.detailedExtract.filterCourseLabel")}
        loading={props.loading}
      />
    </div>
  );
};
