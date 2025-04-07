import { QuatiProvider as LibQuatiProvider } from "@cpqd-quati/react";
import "@cpqd-quati/react/assets/fonts.css";
import "@cpqd-quati/tokens/core/css/_tokens.css";

import "@/styles/global.scss";

export interface IQuatiProviderProps {
  children: React.ReactNode;
}

/**
 * Provedor de estilo do Quati
 * @author @cpqd
 * @returns
 */
export const QuatiProvider = ({ children }: IQuatiProviderProps) => {
  return <LibQuatiProvider>{children}</LibQuatiProvider>;
};

export default QuatiProvider;
