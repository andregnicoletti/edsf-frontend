import React from "react";

import { Typography } from "@cpqd-quati/react";

import logoCpqd from "@/assets/images/landingPage/logo-cpqd-black.png";
import logoEmbrapii from "@/assets/images/landingPage/logo-embrapii-black.png";
import logoJaEntendi from "@/assets/images/landingPage/logo-jaentendi-black.png";
import logoSebrae from "@/assets/images/landingPage/logo-sebrae-black.png";
import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";

import "./PDFPageFooter.styles.scss";

export const PDFPageFooter: React.FC = () => {
  const { footerRef } = useExportPdfContext();

  return (
    <div ref={footerRef} className="pdf-page-footer-container">
      <div className="pdf-page-footer-content">
        <Typography size="md" style={{ marginTop: "-1rem" }}>
          impacto.jaentendiagro.com.br
        </Typography>

        <div className="pdf-page-footer-logomarcas">
          <img className="pdf-page-logo" src={logoEmbrapii} alt="logomarcas" />
          <img className="pdf-page-logo" src={logoCpqd} alt="logomarcas" />
          <img className="pdf-page-logo" src={logoSebrae} alt="logomarcas" />
          <img className="pdf-page-logo" src={logoJaEntendi} alt="logomarcas" />
        </div>
      </div>
    </div>
  );
};
