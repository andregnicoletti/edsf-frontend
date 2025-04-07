import * as React from "react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ptBR } from "@mui/x-date-pickers/locales";
import "dayjs/locale/pt-br";

interface ILocalizationProviderProps {
  children: React.ReactNode;
}

const ptBrLocale =
  ptBR.components.MuiLocalizationProvider.defaultProps.localeText;
export const CustomLocalizationProvider = ({
  children,
}: ILocalizationProviderProps) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="pt-br"
      localeText={ptBrLocale}
    >
      {children}
    </LocalizationProvider>
  );
};

export default CustomLocalizationProvider;
