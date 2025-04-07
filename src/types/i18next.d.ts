import resources from "./resources";

import en from "@/assets/translations/en.json";
import ptBr from "@/assets/translations/pt-br.json";

export default resources;

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "pt-BR";
    resources: {
      "pt-BR": typeof ptBr;
      en: typeof en;
    };
  }
}
