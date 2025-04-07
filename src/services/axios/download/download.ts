import { sendRequest } from "../axios";
import { API_ROUTES_PROTECTED } from "../endpoints";
import { getUploadCodes } from "../upload/upload";

import {
  GetCsvTemplateResponse,
  GetCsvTemplatesData,
  GetUploadedCsvData,
} from "./download.types";

import { handleDownloadFile, zipFiles } from "@/utils/files";

const TEMPLATES_DOWNLOAD_ZIP = "EDSF CADASTRO CSV.zip";

export async function onClickDownloadTemplate(): Promise<void> {
  try {
    const uploadCodes: string[] = (await getUploadCodes()).codes;
    const promissesArray = uploadCodes.map((template) =>
      getCsvTemplate({
        template,
      })
    );

    const templateFiles = await Promise.all(promissesArray);
    const zipContent = await zipFiles(templateFiles);
    handleDownloadFile(zipContent, TEMPLATES_DOWNLOAD_ZIP, "application/zip");
  } catch (error) {
    console.log("[onClickDownloadTemplate]", error);
  }
}

async function getCsvTemplate(
  data: GetCsvTemplatesData
): Promise<GetCsvTemplateResponse> {
  const response = await sendRequest<Blob>(
    API_ROUTES_PROTECTED.DOWNLOAD_CSV,
    data,
    "blob"
  );

  const contentDisposition = response.headers["content-disposition"];
  const regex = /filename="([^"]+)"/;
  const match = contentDisposition.match(regex);
  const filename = match[1];

  return { file: response.data, filename };
}

export async function getUploadedCsv(data: GetUploadedCsvData): Promise<Blob> {
  const response: any = await sendRequest(
    `${API_ROUTES_PROTECTED.DOWNLOAD_UPLOADED_CSV}/${data.id}`,
    {},
    "blob"
  );

  return response.data;
}
