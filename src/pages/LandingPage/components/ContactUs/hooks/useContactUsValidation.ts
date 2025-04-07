import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { boolean, InferType, object, string, ValidationError } from "yup";

import { ContactUsFormProps } from "@/pages/LandingPage/components/ContactUs/ContactUs.types";

export type ContactUsFormType = {
  name: string;
  enterprise: string;
  phone?: string;
  email?: string;
  knowingAboutUs?: string;
  message?: string;
};

type UseContactUsValidationProps = {
  onSuccess?: (data: ContactUsFormType) => Promise<void>;
  onFailure?: () => void;
  knowingAboutUs?: string;
  isCkecked: boolean;
};

type UseContactUsValidationResponse = {
  formAction: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  errors: Record<string, string>;
  validated: boolean;
};

export const useContactUsValidation = (
  props: UseContactUsValidationProps
): UseContactUsValidationResponse => {
  const { onFailure = () => {}, onSuccess = () => {} } = props;

  const { t } = useTranslation();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validated, setValidated] = useState(false);

  const ERROR_REQUIRED = t("LandingPage.contactUs.validation.errorRequired");

  const contactSchema = object({
    name: string().required(ERROR_REQUIRED),
    enterprise: string().required(ERROR_REQUIRED),
    phone: string().length(15, "error"),
    email: string(),
    knowingAboutUs: string(),
    message: string(),
    isCkecked: boolean().oneOf([true], ERROR_REQUIRED),
  });

  async function formAction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidated(true);

    const contactData = parseFormDataToValidate(event);
    const isValid = await validateContactUs(contactData);
    if (isValid) onSuccess(contactData);
    else onFailure();
  }

  function parseFormDataToValidate(
    event: React.FormEvent<HTMLFormElement>
  ): InferType<typeof contactSchema> {
    const form = event.currentTarget;
    const { name, enterprise, phone, email, message } =
      form.elements as typeof form.elements & ContactUsFormProps;

    const contactData: InferType<typeof contactSchema> = {
      name: name.value,
      enterprise: enterprise.value,
      phone: phone.value,
      email: email.value,
      knowingAboutUs: props.knowingAboutUs,
      message: message.value,
      isCkecked: props.isCkecked,
    };
    return contactData;
  }

  async function validateContactUs(data: InferType<typeof contactSchema>) {
    try {
      await contactSchema.validate(data, { abortEarly: false });
      setErrors({});
      return true;
    } catch (error) {
      console.log("[validateContactUs]", JSON.stringify(error));
      const errors = parsePhoneEmailErrors(error);
      if (verifyStillHasError(errors)) return false;
    }
    return true;
  }

  function verifyStillHasError(errors: Record<string, string>) {
    setErrors(errors);
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) return true;
  }

  function parsePhoneEmailErrors(error: unknown) {
    const validationError = error as ValidationError;

    const newErrors: Record<string, string> = {};
    validationError.inner.forEach((err) => {
      newErrors[err.path ?? ""] = err.message;
    });

    if (phoneOREmailAreValid(newErrors)) {
      delete newErrors["email"];
      delete newErrors["phone"];
    }

    return newErrors;
  }

  function phoneOREmailAreValid(newErrors: Record<string, string>) {
    return (
      !Object.keys(newErrors).includes("email") ||
      !Object.keys(newErrors).includes("phone")
    );
  }

  return { formAction, errors, validated };
};
