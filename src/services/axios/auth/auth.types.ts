export type SendCodeData = {
  email: string;
};

export type SendCodeResponse = {
  status: boolean;
  message?: string;
  accessCode: string;
};

export type MakeLoginData = {
  email: string;
  code: string;
};

export type MakeLoginResponse = {
  status: boolean;
  token: string;
};

export type ChangeUserTermsData = {
  terms: boolean;
  token?: string;
};

export type VerifyTokenData = {
  token: string;
};

export type UserTypeApi = "organization" | "admin";

export type VerifyTokenResponse = {
  id: string;
  email: string;
  phone: string;
  lgpdAgreementDate: string;
  lgpdConsent: boolean;
  company_id: string;
  role: UserTypeApi;
};
