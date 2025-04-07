import { sendRequest } from "../axios";
import { API_ROUTES } from "../endpoints";

import { GetTermsAndPrivacyResponse } from "./termsAndPrivacy.types";

export async function getTermsAndPrivacy() {
  const response = await sendRequest<GetTermsAndPrivacyResponse>(
    API_ROUTES.TERMS
  );

  return response.data.propertiesJson;
}
