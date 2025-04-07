import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@/assets/translations/en.json";
import ptBr from "@/assets/translations/pt-br.json";

i18next.use(initReactI18next).init({
  resources: {
    "pt-BR": { translation: ptBr },
    en: { translation: en },
  },
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: "pt-BR",
});
