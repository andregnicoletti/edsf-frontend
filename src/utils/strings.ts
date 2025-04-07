export function removeAccents(text: string): string {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function toLowerCaseNoAccents(text: string): string {
  return removeAccents(text.toLocaleLowerCase());
}
