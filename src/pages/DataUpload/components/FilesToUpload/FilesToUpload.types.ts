import { UploadSuccessFilesStatus } from "@/services/axios/upload/upload.types";

export type FilesToUploadProps = {
  files: File[];
  onChangeFiles: (files: File[]) => void;
  isUploadingFiles?: boolean;
  isSelectingFiles?: boolean;
  successFilesValues?: UploadSuccessFilesStatus;
  error?: boolean;
  success?: boolean;
};
