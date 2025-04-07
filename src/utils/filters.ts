import { toLowerCaseNoAccents } from "./strings";

import { Course } from "@/types/Course";

export function selectItemFromList<T>(
  selectedIds: string[],
  itemToSelect: T,
  getId: (item: T) => string
): string[] {
  const selectedIndex = selectedIds.findIndex(
    (id) => getId(itemToSelect) === id
  );
  if (selectedIndex === -1) {
    return [...selectedIds, getId(itemToSelect)];
  } else {
    return selectedIds.filter((_, index) => index !== selectedIndex);
  }
}

export function setFiltersListToUnselected<T>(items: T[]) {
  return items.map((item) => {
    return {
      ...item,
      selected: false,
    };
  });
}

export function searchFilterItemList<T>(
  text: string,
  items: T[],
  getName: (item: T) => string
) {
  const textNoAccents = toLowerCaseNoAccents(text);
  const filteredItems = items.filter((item) =>
    toLowerCaseNoAccents(getName(item)).includes(textNoAccents ?? "")
  );
  const sortedItems = [...filteredItems].sort((a, b) => {
    const posA = toLowerCaseNoAccents(getName(a)).indexOf(textNoAccents);
    const posB = toLowerCaseNoAccents(getName(b)).indexOf(textNoAccents);
    return posA - posB;
  });

  return sortedItems;
}

export function getCourseCodesByCourseItemCheckbox<T>(
  courses: Course[],
  items: T[]
) {
  const coursesCodes: string[] = [];

  items.forEach((item) => {
    const course = courses.find((course) => course.id === (item as any).id);
    if (course) {
      coursesCodes.push(course.code);
    }
  });

  return coursesCodes;
}
