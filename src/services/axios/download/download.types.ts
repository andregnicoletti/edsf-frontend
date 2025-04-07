export type GetCsvTemplatesData = {
  template: string;
};

export type GetCsvTemplateResponse = {
  file: Blob;
  filename: string;
};

export type GetUploadedCsvData = {
  id: string;
};
