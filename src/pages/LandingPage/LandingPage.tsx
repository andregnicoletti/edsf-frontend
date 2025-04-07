import React, { useEffect } from "react";

import ContactUs from "./components/ContactUs";
import DataSection from "./components/DataSection";
import FirstSection from "./components/FirstSection";
import SolutionsSection from "./components/SolutionsSection";

import Footer from "@/components/Footer";
import "@/styles/landingPage.scss";
import { revealElements } from "@/utils/revealElements";

import "./LandingPage.styles.css";

export const LandingPage: React.FC = () => {
  const solutionsRef = React.useRef<HTMLDivElement>(null);
  const contactRef = React.useRef<HTMLDivElement>(null);

  function onClickSolutions() {
    solutionsRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function onClickContact() {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    revealElements();
  }, []);

  return (
    <div
      id="landing-page-container"
      className="flex-column component-landing-page"
    >
      <FirstSection
        onClickContactUs={onClickContact}
        onClickSolutios={onClickSolutions}
      />
      <DataSection />
      <SolutionsSection
        solutionsRef={solutionsRef}
        onClickFindOutMore={onClickContact}
      />
      <ContactUs contactRef={contactRef} />
      <Footer />
    </div>
  );
};
