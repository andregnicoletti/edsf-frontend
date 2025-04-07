export type ContactUsProps = {
  contactRef: React.RefObject<HTMLDivElement>;
};

export type ContactUsFormProps = {
  name: { value: string };
  enterprise: { value: string };
  phone: { value: string };
  email: { value: string };
  message: { value: string };
};
