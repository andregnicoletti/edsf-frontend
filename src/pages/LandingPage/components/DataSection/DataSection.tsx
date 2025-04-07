import React from "react";

import { Trans, useTranslation } from "react-i18next";

import { DataItemProps } from "./DataSection.types";

import chart1 from "@/assets/svgs/landingPage/chart1.svg";
import chart2 from "@/assets/svgs/landingPage/chart2.svg";
import chart3 from "@/assets/svgs/landingPage/chart3.svg";
import chart4 from "@/assets/svgs/landingPage/chart4.svg";
import chart6 from "@/assets/svgs/landingPage/chart6.svg";
import chart7 from "@/assets/svgs/landingPage/chart7.svg";
import Button from "@/pages/LandingPage/components/Button";

import "./DataSection.styles.css";

const sectionClassOpened: Record<string, string> = {
  true: "flex-column data-landing-section data-landing-section-opened",
  false: "flex-column data-landing-section",
};

const DataItem: React.FC<DataItemProps> = (props) => {
  return (
    <div className="flex data-landing-section-list-item toReveal">
      <img
        className="data-landing-section-img-chart"
        src={props.imgUrl}
        alt="generic chart"
      />
      <h3 className="landing-h3 data-landing-section-text">{props.text}</h3>
    </div>
  );
};

export const DataSection: React.FC = () => {
  const { t } = useTranslation();

  const [showMoreData, setShowMoreData] = React.useState(false);

  function onPressSeeMoreData() {
    setShowMoreData(true);
  }

  return (
    <section className={sectionClassOpened[String(showMoreData)]}>
      {!showMoreData && <div className="flex data-landing-section-closed" />}
      <div className="flex-column" id="data-landing-section-content">
        <DataItem
          imgUrl={chart1}
          text={<Trans i18nKey={"LandingPage.dataSection.firstItem"} />}
        />
        <DataItem
          imgUrl={chart2}
          text={<Trans i18nKey={"LandingPage.dataSection.secondItem"} />}
        />
        <DataItem
          imgUrl={chart3}
          text={<Trans i18nKey={"LandingPage.dataSection.thirdItem"} />}
        />
        <DataItem
          imgUrl={chart4}
          text={<Trans i18nKey={"LandingPage.dataSection.fourthItem"} />}
        />
        <DataItem
          imgUrl={chart6}
          text={<Trans i18nKey={"LandingPage.dataSection.fifthItem"} />}
        />
        <DataItem
          imgUrl={chart7}
          text={<Trans i18nKey={"LandingPage.dataSection.sixthItem"} />}
        />
        {!showMoreData && (
          <div className="flex see-more-date-button-position">
            <Button onClick={onPressSeeMoreData}>
              {t("LandingPage.dataSection.seeMoreData")}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
