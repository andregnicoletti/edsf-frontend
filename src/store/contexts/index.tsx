import React from "react";

import { CopyFiltersContextProvider } from "./CopyFilters/useCopyFilters";
import { ExportPdfContextProvider } from "./ExportPdf/useExportPdf";
import CustomLocalizationProvider from "./LocalizationProvider";
import MaterialUIProvider from "./MaterialUIProvider";
import QuatiProvider from "./QuatiProvider";

const Contexts: React.FC<{
  children: React.ReactElement;
}> = (props) => {
  return (
    <QuatiProvider>
      <CustomLocalizationProvider>
        <MaterialUIProvider>
          <ExportPdfContextProvider>
            <CopyFiltersContextProvider>
              {props.children}
            </CopyFiltersContextProvider>
          </ExportPdfContextProvider>
        </MaterialUIProvider>
      </CustomLocalizationProvider>
    </QuatiProvider>
  );
};

export default Contexts;
