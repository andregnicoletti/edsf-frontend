import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import useSnackbar from "./useSnackbar";

import {
  ExportDashboardDrawersNames,
  PanelsToExport,
} from "@/pages/Dashboard/components/ExportDashboard/ExportDashboard.types";
import { useExportPdfContext } from "@/store/contexts/ExportPdf/useExportPdf";

const INDEX_HEADER = 0;
const INDEX_FOOTER = 2;

type UseCreateDashboardPDFResponse = {
  exportToPdf: (
    panelsToExport: Array<ExportDashboardDrawersNames | string>
  ) => Promise<void>;
};

const PAGE_MARGIN = 10;

export const useCreateDashboardPDF = (): UseCreateDashboardPDFResponse => {
  const {
    state,
    setIsCreatingPDF,
    detailedFiltersRef,
    detailedBarChartRef,
    detailedCitiesRef,
    detailedLinesChartRef,
    summaryExtractRef,
    summaryFiltersProducersRef,
    headerRef,
    footerRef,
  } = useExportPdfContext();
  const { openNewSnackbar } = useSnackbar();

  async function exportToPdf(
    panelsToExport: Array<ExportDashboardDrawersNames | string>
  ) {
    try {
      const pdf = new jsPDF({
        format: "a4",
      });
      const documents = makeAllValidDocumentsRefsArray(panelsToExport);

      await avoidBugOnPngImageGeneration(documents[0].panelRef[0]);

      for (const [index, document] of documents.entries()) {
        if (!document) continue;
        const isLastPage = index === documents.length - 1;
        let yPos = 0;
        for (const [index, ref] of document.panelRef.entries()) {
          if (index === INDEX_HEADER) {
            const imgHeight = await addImageDocumentToPdf(ref, pdf, yPos, 0);
            yPos += imgHeight;
          } else if (index === INDEX_FOOTER) {
            const imgHeight = await addFooterDocumentToPdf(ref, pdf);
            yPos += imgHeight;
          } else {
            const imgHeight = await addImageDocumentToPdf(
              ref,
              pdf,
              yPos,
              PAGE_MARGIN
            );
            yPos += imgHeight;
          }
        }
        if (!isLastPage) pdf.addPage();
      }
      pdf.save("dashboard.pdf");
    } catch (error) {
      openNewSnackbar("Erro ao gerar relatório", "error");
      console.log("[exportPdf] error", error);
    } finally {
      console.log("[exportPdf] finally");
      setIsCreatingPDF(false);
    }
  }

  async function avoidBugOnPngImageGeneration(
    document: HTMLElement
  ): Promise<void> {
    // for some reason the first generated image is the wrong size
    // so we need to generate this image first and not put it in the PDF

    await html2canvas(document, {
      allowTaint: true,
    });
  }

  async function addImageDocumentToPdf(
    document: HTMLElement,
    pdf: jsPDF,
    yPos: number,
    pageMargin: number
  ): Promise<number> {
    const { img, imgHeight, imgWidth } = await configureDocImageProps(
      document,
      pdf,
      pageMargin
    );
    pdf.addImage(img, "PNG", pageMargin, yPos, imgWidth, imgHeight, "", "FAST");
    return imgHeight;
  }

  async function addFooterDocumentToPdf(
    document: HTMLElement,
    pdf: jsPDF
  ): Promise<number> {
    const { img, imgHeight, imgWidth } = await configureDocImageProps(
      document,
      pdf,
      0
    );
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const footerPosition = pdfHeight - imgHeight + 1;
    pdf.addImage(
      img,
      "PNG",
      0,
      footerPosition,
      imgWidth,
      imgHeight,
      "",
      "FAST"
    );
    return imgHeight;
  }

  async function configureDocImageProps(
    document: HTMLElement,
    pdf: jsPDF,
    pageMargin: number
  ) {
    const dataUrlCanvas = await html2canvas(document, {
      allowTaint: true,
    });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pdfWidth - pageMargin * 2;
    const imgProps = pdf.getImageProperties(dataUrlCanvas);
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    return { imgHeight, imgWidth, img: dataUrlCanvas };
  }

  function makeAllValidDocumentsRefsArray(
    panelsToExport: Array<ExportDashboardDrawersNames | string>
  ): PanelsToExport[] {
    const includedFixedPanels = makeValidFixedPanels(panelsToExport);
    const customPanels = makeCustomPanels(panelsToExport);
    const allPanels = [...includedFixedPanels, ...customPanels];
    const panelsWithHeader = addHeaderFooterToPanelList(allPanels);

    return panelsWithHeader;
  }

  function addHeaderFooterToPanelList(panels: PanelsToExport[]) {
    return panels.map((item) => ({
      ...item,
      panelRef: [headerRef.current, ...item.panelRef, footerRef.current],
    }));
  }

  function makeCustomPanels(
    panelsToExport: Array<ExportDashboardDrawersNames | string>
  ): PanelsToExport[] {
    const customPanels: PanelsToExport[] = [];
    const customPanelKeys = Object.keys(state.customPanelsRef || {});
    customPanelKeys.forEach((key) => {
      const customPanel = state.customPanelsRef?.[Number(key)];
      if (
        !!customPanel &&
        customPanel.component &&
        panelsToExport.includes(customPanel.title)
      )
        customPanels.push({
          panelName: customPanel.title,
          panelRef: [customPanel.component],
        });
    });

    return customPanels;
  }

  function makeValidFixedPanels(
    panelsToExport: Array<ExportDashboardDrawersNames | string>
  ): PanelsToExport[] {
    const fixedPanels = [
      {
        panelName: ExportDashboardDrawersNames.SUMMARY_EXTRACT,
        panelRef: [summaryExtractRef.current],
      },
      {
        panelName: ExportDashboardDrawersNames.SUMMARY_EXTRACT,
        panelRef: [summaryFiltersProducersRef.current],
      },
      {
        panelName: ExportDashboardDrawersNames.DETAILED_EXTRACT_CITIES_DATA,
        panelRef: [detailedCitiesRef.current],
      },
      {
        panelName: ExportDashboardDrawersNames.DETAILED_EXTRACT_BY_COURSE,
        panelRef: [detailedBarChartRef.current],
      },
      {
        panelName: ExportDashboardDrawersNames.DETAILED_EXTRACT_BY_MONTH,
        panelRef: [detailedLinesChartRef.current],
      },
      {
        panelName: ExportDashboardDrawersNames.DETAILED_EXTRACT,
        panelRef: [detailedFiltersRef.current],
      },
    ];

    const validRefFixedPanels = fixedPanels.map((panel) => ({
      ...panel,
      panelRef: panel.panelRef.filter((ref) => !!ref),
    }));
    const includedFixedPanels = validRefFixedPanels.filter(
      (panel) =>
        panelsToExport.includes(panel.panelName) && panel.panelRef.length > 0
    );
    return includedFixedPanels;
  }

  return { exportToPdf };
};
