import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import { ContactUsProps } from "./ContactUs.types";
import { useContactUsValidation } from "./hooks/useContactUsValidation";
import { useCreateLead } from "./hooks/useCreateLead";

import AlertMessage from "@/components/AlertMessage";
import CheckboxPrivacyPolicy from "@/components/CheckboxPrivacyPolicy";
import PrivacyTerms from "@/components/PrivacyTerms";
import Button from "@/pages/LandingPage/components/Button";
import CustomSelect from "@/pages/LandingPage/components/CustomSelect";
import { CustomSelectOption } from "@/pages/LandingPage/components/CustomSelect/CustomSelect.types";
import Input from "@/pages/LandingPage/components/Input";
import apiService from "@/services/axios";
import { LeadsArray } from "@/services/axios/leads/leads.types";

import "./ContactUs.styles.css";

export const ContactUs: React.FC<ContactUsProps> = (props) => {
  const { t } = useTranslation();
  const defaultOption = {
    label: t("LandingPage.contactUs.knowingAboutUsDefaultOption"),
    value: "",
    default: true,
  };
  const [options, setOptions] = useState<CustomSelectOption[]>([defaultOption]);
  const [knowingAboutUs, setKnowingAboutUs] = useState<CustomSelectOption>(
    options[0]
  );
  const [isCkecked, setIsCkecked] = useState(false);
  const [successSubmit, setSuccessSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [showPrivacyTerms, setShowPrivacyTerms] = React.useState(false);
  const [errorMessageFromApi, setErrorMessageFromApi] =
    React.useState<string>("");

  const { onSubmit, loading } = useCreateLead({
    onFailure: onErrorSubmit,
    onSuccess: onSuccessSubmit,
  });
  const { formAction, errors, validated } = useContactUsValidation({
    onSuccess: onSubmit,
    isCkecked,
    knowingAboutUs: knowingAboutUs.value,
  });

  async function requestLeads() {
    try {
      const response = await apiService.getLeads();
      onSuccessGetOptions(response);
    } catch (error) {
      console.log("[requestLeads]", error);
    }
  }

  function onSuccessGetOptions(response: LeadsArray) {
    const newOptions: CustomSelectOption[] = response.map((lead) => ({
      label: lead.channelName,
      value: lead.channelName,
    }));
    setOptions([defaultOption, ...newOptions]);
  }

  function onSuccessSubmit() {
    setErrorMessageFromApi("");
    setSuccessSubmit(true);
    setErrorSubmit(false);
  }

  function onErrorSubmit(message?: string) {
    setErrorMessageFromApi(message ?? "");
    setSuccessSubmit(false);
    setErrorSubmit(true);
  }

  function onClickCheckbox() {
    setIsCkecked(!isCkecked);
  }

  function onSelectKnowingOption(option: CustomSelectOption) {
    setKnowingAboutUs(option);
  }

  React.useEffect(() => {
    requestLeads();
  }, []);

  return (
    <div
      ref={props.contactRef}
      className="flex-column contactus-landing-section"
    >
      <h3 className="landing-h3 title font-weight-700">FALE CONOSCO</h3>
      <div className="flex-column contactus-landing-content card-1-5rem">
        <AlertMessage
          isClosable={false}
          show={validated && errorSubmit && !errorMessageFromApi}
          title={t("LandingPage.contactUs.submit.errorTitle")}
          message={t("LandingPage.contactUs.submit.errorMessage")}
          variant={"error"}
        />
        <AlertMessage
          isClosable={false}
          show={validated && successSubmit}
          title={t("LandingPage.contactUs.submit.successTitle")}
          message={t("LandingPage.contactUs.submit.successMessage")}
          variant={"success"}
        />
        <AlertMessage
          isClosable={false}
          show={validated && errorSubmit && !!errorMessageFromApi}
          title={t("LandingPage.contactUs.submit.errorTitle")}
          message={errorMessageFromApi}
          variant={"error"}
        />
        <form className="contactus-form" onSubmit={formAction}>
          <Input
            for="name"
            label={t("LandingPage.contactUs.nameLabel")}
            placeholder={t("LandingPage.contactUs.namePlaceholder")}
            maxLength={100}
            error={errors.name}
          />
          <Input
            for="enterprise"
            label={t("LandingPage.contactUs.enterpriseLabel")}
            placeholder={t("LandingPage.contactUs.enterprisePlaceholder")}
            maxLength={100}
            error={errors.enterprise}
          />
          <Input
            for="phone"
            label={t("LandingPage.contactUs.phoneLabel")}
            placeholder={t("LandingPage.contactUs.phonePlaceholder")}
            mask="(__)_____-____"
            replacement={{ _: /\d/ }}
          />
          <Input
            for="email"
            label={t("LandingPage.contactUs.emailLabel")}
            placeholder={t("LandingPage.contactUs.emailPlaceholder")}
            maxLength={100}
          />
          <CustomSelect
            label={t("LandingPage.contactUs.knowingAboutUs")}
            options={options}
            onChangeOption={onSelectKnowingOption}
            selectedOption={knowingAboutUs}
          />
          <Input
            type="textarea"
            for="message"
            label={t("LandingPage.contactUs.messageLabel")}
            placeholder={t("LandingPage.contactUs.messagePlaceholder")}
            maxLength={500}
            error={errors.message}
          />
          <CheckboxPrivacyPolicy
            isChecked={isCkecked}
            handleCheckboxChange={onClickCheckbox}
            error={errors.isCkecked}
            onClickPrivacyPolicy={() => setShowPrivacyTerms(true)}
          />
          <Button
            loading={loading}
            type="submit"
            fill={true}
            onClick={() => {}}
          >
            {t("General.send")}
          </Button>
        </form>
      </div>
      <PrivacyTerms
        open={showPrivacyTerms}
        onClickConfirmButton={() => setShowPrivacyTerms(false)}
        onClose={() => setShowPrivacyTerms(false)}
        isDialog
        showAgreeOptions={false}
        confirmButtonText={t("General.understood")}
      />
    </div>
  );
};
