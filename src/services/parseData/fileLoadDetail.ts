import dayjs from "dayjs";

import { FileLoadDetailResponse } from "../axios/upload/upload.types";

import { FileLoadDetail } from "@/types/FileLoad";

export function parseFileLoadDetailList(
  files: FileLoadDetailResponse[]
): FileLoadDetail[] {
  const parsedFiles = files.map((file) => ({
    uploadId: file.uploadId,
    uploadFileInput: file.fileName,
    uploadCode: file.uploadCode,
    uploadTotal: file.uploadTotal,
    uploadSuccess: file.uploadSuccess,
    uploadError: file.uploadError,
    date: file.date,
  }));
  const descSortByDate = [...parsedFiles].sort((firstFile, secondFile) => {
    if (dayjs(firstFile.date).isAfter(dayjs(secondFile.date))) return -1;
    if (dayjs(firstFile.date).isBefore(dayjs(secondFile.date))) return 1;
    return 0;
  });
  return descSortByDate;
}
