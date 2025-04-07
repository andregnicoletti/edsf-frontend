export type ButtonProps = {
  children: string;
  fill?: boolean;
  onClick: () => void;
  shape?: "rounded" | "square";
  type?: "submit" | "reset" | "button";
  variant?: "primary" | "secondary";
  loading?: boolean;
};
