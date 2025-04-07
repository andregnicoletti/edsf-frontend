export type FileLoadDetailResponse = {
  uploadId: string;
  fileName: string;
  uploadCode: string;
  uploadTotal: number;
  uploadSuccess: number;
  uploadError: number;
  date: string;
};

export type UploadSuccessFilesStatus = Array<{
  fileName: string;
  hasError: boolean;
  message?: string;
}>;

type UploadSuccessWithStatusPerFile = {
  status?: boolean;
  files?: UploadSuccessFilesStatus;
};

export type UploadResponse = {
  status: boolean;
  uploadDetails?: UploadSuccessWithStatusPerFile;
};

export type CreateUploadData = {
  files: File[];
};

export type UploadDetailResponse = {
  status: boolean;
  uploadsDetails?: {
    uploadStatus: FileLoadDetailResponse[];
    lastUploadStatus: FileLoadDetailResponse[];
  };
};

export type UploadCodesResponse = {
  codes: string[];
};
