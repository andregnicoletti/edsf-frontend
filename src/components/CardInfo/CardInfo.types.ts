export type CardInfoProps = {
  variant: CardInfoVariants;
  title?: string | number;
  subtitle: string | number;
  iconName: any;
  loading?: boolean;
};

export type CardInfoVariants = "primary" | "support" | "danger";
