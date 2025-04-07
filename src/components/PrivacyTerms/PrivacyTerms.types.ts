export type PrivacyTermsProps = {
  confirmButtonText?: string;
  onClickConfirmButton: (response: PrivacyRadiosValues) => void;
  onClose: () => void;
  isDialog?: boolean;
  open?: boolean;
  showAgreeOptions?: boolean;
  defaultValue?: PrivacyRadiosValues;
  isLoadingConfirm?: boolean;
};

export enum PrivacyRadiosValues {
  AGREE = "agree",
  DISAGREE = "disagree",
}
