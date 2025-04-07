export function sortByString(
  valueA: string,
  valueB: string,
  order: "asc" | "desc"
) {
  if (order === "asc") {
    return valueA.localeCompare(valueB);
  } else {
    return valueB.localeCompare(valueA);
  }
}

export function sortByNumber(
  valueA: number,
  valueB: number,
  order: "asc" | "desc"
) {
  if (order === "asc") {
    return valueA - valueB;
  } else {
    return valueB - valueA;
  }
}
