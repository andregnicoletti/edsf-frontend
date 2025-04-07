export function truncateIfDecimal(value: number) {
  if (value % 1 !== 0) {
    return value.toFixed(2);
  }
  return value;
}
