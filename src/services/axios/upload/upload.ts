import { createRequest, sendRequest } from "../axios";
import { API_ROUTES_PROTECTED } from "../endpoints";

import {
  CreateUploadData,
  UploadCodesResponse,
  UploadDetailResponse,
  UploadResponse,
} from "./upload.types";

export async function createUpload(
  data: CreateUploadData
): Promise<UploadResponse> {
  const formData = new FormData();

  data.files.forEach((file) => {
    formData.append("file", file, file.name);
  });
  const response = await createRequest<UploadResponse>(
    API_ROUTES_PROTECTED.UPLOAD,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
}

export async function getUploadDetail(): Promise<UploadDetailResponse> {
  const response = await sendRequest<UploadDetailResponse>(
    API_ROUTES_PROTECTED.UPLOAD_DETAIL
  );
  return response.data;
}

export async function getUploadCodes(): Promise<UploadCodesResponse> {
  const response = await sendRequest<UploadCodesResponse>(
    API_ROUTES_PROTECTED.UPLOAD_CODES
  );
  return response.data;
}
