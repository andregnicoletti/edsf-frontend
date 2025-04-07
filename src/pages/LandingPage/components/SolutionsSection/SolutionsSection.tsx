import React from "react";

import { useTranslation } from "react-i18next";

import { SolutionsItemProps, SolutionsProps } from "./SolutionsSection.types";

import itemImg1 from "@/assets/images/landingPage/solutions-1.png";
import itemImg2 from "@/assets/images/landingPage/solutions-2.png";
import itemImg3 from "@/assets/images/landingPage/solutions-3.png";
import itemImg4 from "@/assets/images/landingPage/solutions-4.png";
import itemImg5 from "@/assets/images/landingPage/solutions-5.png";
import itemImg6 from "@/assets/images/landingPage/solutions-6.png";
import Button from "@/pages/LandingPage/components/Button";

import "./SolutionsSection.styles.css";

const SolutionsItem: React.FC<SolutionsItemProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div className="flex-column solutions-landing-item">
      <div className="flex solutions-landing-item-content">
        <img
          className="solutions-item-img toReveal"
          src={props.imgUrl}
          alt={props.title}
        />
        <h3
          id="solutions-item-title"
          className="landing-h3   font-weight-700 toReveal "
        >
          {props.title}
        </h3>

        <p className="solutions-item-text font-primary toReveal">
          {props.description}
        </p>
      </div>
      <Button
        fill={window.innerWidth < 750 ? true : undefined}
        onClick={props.onClickFindOutMore}
      >
        {t("General.findOutMore")}
      </Button>
    </div>
  );
};

export const SolutionsSection: React.FC<SolutionsProps> = (props) => {
  const { t } = useTranslation();

  return (
    <div
      ref={props.solutionsRef}
      className="flex-column solutions-landing-section"
    >
      <h3 className="landing-h3 font-weight-700">
        {t("LandingPage.solutionsSection.sectionTitle")}
      </h3>
      <div className="solutions-landing-items-content">
        <SolutionsItem
          title={t("LandingPage.solutionsSection.firstItemTitle")}
          description={t("LandingPage.solutionsSection.firstItemText")}
          imgUrl={itemImg1}
          onClickFindOutMore={props.onClickFindOutMore}
        />
        <SolutionsItem
          title={t("LandingPage.solutionsSection.secondItemTitle")}
          description={t("LandingPage.solutionsSection.secondItemText")}
          imgUrl={itemImg2}
          onClickFindOutMore={props.onClickFindOutMore}
        />
        <SolutionsItem
          title={t("LandingPage.solutionsSection.thirdItemTitle")}
          description={t("LandingPage.solutionsSection.thirdItemText")}
          imgUrl={itemImg3}
          onClickFindOutMore={props.onClickFindOutMore}
        />
        <SolutionsItem
          title={t("LandingPage.solutionsSection.fourthItemTitle")}
          description={t("LandingPage.solutionsSection.fourthItemText")}
          imgUrl={itemImg4}
          onClickFindOutMore={props.onClickFindOutMore}
        />
        <SolutionsItem
          title={t("LandingPage.solutionsSection.fifthItemTitle")}
          description={t("LandingPage.solutionsSection.fifthItemText")}
          imgUrl={itemImg5}
          onClickFindOutMore={props.onClickFindOutMore}
        />
        <SolutionsItem
          title={t("LandingPage.solutionsSection.sixthItemTitle")}
          description={t("LandingPage.solutionsSection.sixthItemText")}
          imgUrl={itemImg6}
          onClickFindOutMore={props.onClickFindOutMore}
        />
      </div>
    </div>
  );
};
