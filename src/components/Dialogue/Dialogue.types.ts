export type DialogueProps = {
  open: boolean;
  title: string;
  component?: React.ReactNode;
  text: React.ReactNode;
  cancelButtonText: string;
  onPressCancel: () => void;
  confirmButtonText: string;
  onPressConfirm: () => void;
};
