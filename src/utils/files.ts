import JSZip from "jszip";

import apiService from "@/services/axios";
import { templatesList } from "@/types/CsvTemplates";

type filesTypes = "application/zip" | "text/csv;charset=utf-8";

export async function onClickDownloadCsvById(id: string, fileName: string) {
  try {
    const csvResponse = await apiService.getUploadedCsv({ id });
    handleDownloadFile(csvResponse, fileName, "text/csv;charset=utf-8");
  } catch (error) {
    console.log("[onClickDownloadCsvById]", error);
  }
}

export const handleDownloadFile = (
  file: Blob,
  fileName: string,
  type: filesTypes
) => {
  const blob = new Blob([file], { type });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};

type fileToZip = {
  file: Blob;
  filename: string;
};

export const zipFiles = async (templateFiles: fileToZip[]): Promise<Blob> => {
  const zip = new JSZip();

  templateFiles.forEach((file, index) => {
    zip.file(file.filename ?? templatesList[index] + ".csv", file.file);
  });
  const zipContent = await zip.generateAsync({ type: "blob" });
  return zipContent;
};
