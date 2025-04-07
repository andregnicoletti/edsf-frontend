import React from "react";

import { ContactUsFormType } from "./useContactUsValidation";

import apiService from "@/services/axios";
import { CreateLeadData } from "@/services/axios/leads/leads.types";

type UseCreateLeadProps = {
  onSuccess: () => void;
  onFailure: (message?: string) => void;
};

type UseCreateLeadResponse = {
  onSubmit: (data: ContactUsFormType) => Promise<void>;
  loading: boolean;
};

export const useCreateLead = (
  props: UseCreateLeadProps
): UseCreateLeadResponse => {
  const [loading, setLoading] = React.useState(false);

  async function onSubmit(data: ContactUsFormType) {
    setLoading(true);
    try {
      const lead = parseFormDataToLead(data);
      await apiService.createLead(lead);
      props.onSuccess();
    } catch (error: any) {
      console.log("[onSubmit][contactUs] error, ", error);
      props.onFailure(error?.message);
    } finally {
      setLoading(false);
    }
  }

  function parseFormDataToLead(data: ContactUsFormType): CreateLeadData {
    return {
      name: data.name,
      company: data.enterprise,
      phone: data.phone,
      email: data.email,
      referralSource: data.knowingAboutUs,
      message: data.message,
    };
  }

  return { onSubmit, loading };
};
