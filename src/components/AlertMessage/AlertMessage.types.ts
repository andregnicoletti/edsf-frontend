export type AlertMessageProps = {
  variant?: AlertMessageVariant;
  isClosable?: boolean;
  onClose?: () => void;
  show?: boolean;
  title?: string;
  message?: string;
};

export type AlertMessageVariant = "success" | "error";

export type ClassesByVariant = Record<
  AlertMessageVariant,
  {
    container: string;
    title: string;
    message: string;
  }
>;
