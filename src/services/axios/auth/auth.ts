import { createRequest } from "../axios";
import { API_ROUTES, API_ROUTES_PROTECTED } from "../endpoints";

import {
  ChangeUserTermsData,
  MakeLoginData,
  MakeLoginResponse,
  SendCodeData,
  SendCodeResponse,
  VerifyTokenData,
  VerifyTokenResponse,
} from "./auth.types";

export async function sendCode(data: SendCodeData): Promise<SendCodeResponse> {
  const response = await createRequest<SendCodeResponse>(
    API_ROUTES.SEND_CODE,
    data
  );

  return response;
}

export async function makeLogin(data: MakeLoginData): Promise<string> {
  const response = await createRequest<MakeLoginResponse>(
    API_ROUTES.LOGIN,
    data
  );

  return response.token;
}

export async function verifyToken(
  data: VerifyTokenData
): Promise<VerifyTokenResponse> {
  const response = await createRequest<VerifyTokenResponse>(
    API_ROUTES_PROTECTED.VERIFY_TOKEN,
    {},
    {
      headers: {
        Accept: "application/json",
        Authorization: data.token,
      },
    }
  );

  return response;
}

export async function changeUserTerms(
  data: ChangeUserTermsData
): Promise<void> {
  await createRequest(
    API_ROUTES_PROTECTED.USER_TERMS,
    { terms: data.terms },
    {
      headers: {
        Authorization: data.token,
      },
    }
  );
}
