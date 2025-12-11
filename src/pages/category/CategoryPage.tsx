import { useNavigate } from "react-router-dom";
import SimpleHeader from "@components/shared/SimpleHeader";
import { CATEGORY_TECH_FRONT, CATEGORY_TECH_DESIGN, CATEGORY_TECH_BACK, CATEGORY_IDEA } from "@constants";

import * as S from "./CategoryPage.styled";
import backAi from '@assets/category/backAi.svg'
import backBack from '@assets/category/backBack.svg'
import designBrand from '@assets/category/designBrand.svg'
import designIcon from '@assets/category/designIcon.svg'
import designMotionInteraction from '@assets/category/designMotionInteraction.svg'
import designUIUX from '@assets/category/designUiux.svg'
import designVisualGraphic from '@assets/category/designVisualGraphic.svg'
import frontAPIIntegration from '@assets/category/frontAPIintegration.svg'
import frontInteractionAnimation from '@assets/category/frontInteractionAnimation.svg'
import frontDatavisualization from '@assets/category/frontDatavisualization.svg'
import frontLayoutGrid from '@assets/category/frontLayoutGrid.svg'
import frontPerformanceOptimization from '@assets/category/frontPerformanceOptimization.svg'
import frontStateManagement from '@assets/category/frontStateManagement.svg'
import ideaCulture from '@assets/category/ideaCulture.svg'
import ideaEducation from '@assets/category/ideaEducation.svg'
import ideaEnvironment from '@assets/category/ideaEnvironment.svg'
import ideaEtc from '@assets/category/ideaEtc.svg'
import ideaFinance from '@assets/category/ideaFinance.svg'
import ideaHealth from '@assets/category/ideaHealth.svg'
import ideaHousing from '@assets/category/ideaHousing.svg'
import ideaParenting from '@assets/category/ideaParenting.svg'
import ideaRelationShips from '@assets/category/ideaRelationships.svg'
import ideaSocialCommunity from '@assets/category/ideaSocialCommunity.svg'
import ideaTechnologyAI from '@assets/category/ideaTechnologyAI.svg'



export function CategoryPage() {
  const navigate = useNavigate();
  const handleClick = (
    techpart: string,
    category: string) => {
    navigate(`/category/${encodeURIComponent(techpart)}`, { state: { category } });
  };

  return (
    <>
      <SimpleHeader title={"카테고리"} />
      <S.CategoryContainer>
        <S.CategorySection>
          <S.CategoryTitle>프론트엔드</S.CategoryTitle>
          <S.CategoryItems>
            {CATEGORY_TECH_FRONT.map((item, idx) => (
              <S.CategoryItem
                key={item.value}
                onClick={() => handleClick("frontend", item.label)}
              >
                <S.ImagePlaceholder>
                  {idx === 0 && <img src={frontAPIIntegration} />}
                  {idx === 1 && <img src={frontDatavisualization} />}
                  {idx === 2 && <img src={frontInteractionAnimation} />}
                  {idx === 3 && <img src={frontLayoutGrid} />}
                  {idx === 4 && <img src={frontPerformanceOptimization} />}
                  {idx === 5 && <img src={frontStateManagement} />}
                </S.ImagePlaceholder>
                <S.CategoryLabel>{item.value}</S.CategoryLabel>
              </S.CategoryItem>
            ))}
          </S.CategoryItems>
        </S.CategorySection>
        <S.Divider />
        <S.CategorySection>
          <S.CategoryTitle>백엔드</S.CategoryTitle>
          <S.CategoryItems>
            {CATEGORY_TECH_BACK.map((item, idx) => (
              <S.CategoryItem
                key={item.value}
                onClick={() => handleClick("backend", item.label)}
              >
                <S.ImagePlaceholder>
                  {idx === 0 && <img src={backAi} />}
                  {idx === 1 && <img src={backBack} />}
                </S.ImagePlaceholder>
                <S.CategoryLabel>{item.value}</S.CategoryLabel>
              </S.CategoryItem>
            ))}
          </S.CategoryItems>
        </S.CategorySection>
        <S.Divider />
        <S.CategorySection>
          <S.CategoryTitle>디자인</S.CategoryTitle>
          <S.CategoryItems>
            {CATEGORY_TECH_DESIGN.map((item, idx) => (
              <S.CategoryItem
                key={item.value}
                onClick={() => handleClick("design", item.label)}
              >
                <S.ImagePlaceholder>
                  {idx === 0 && <img src={designUIUX} />}
                  {idx === 1 && <img src={designVisualGraphic} />}
                  {idx === 2 && <img src={designBrand} />}
                  {idx === 3 && <img src={designIcon} />}
                  {idx === 4 && <img src={designMotionInteraction} />}

                </S.ImagePlaceholder>
                <S.CategoryLabel>{item.value}</S.CategoryLabel>
              </S.CategoryItem>
            ))}
          </S.CategoryItems>
        </S.CategorySection>
        <S.Divider />
        <S.CategorySection>
          <S.CategoryTitle>아이디어</S.CategoryTitle>
          <S.CategoryItems>
            {CATEGORY_IDEA.map((item, idx) => (
              <S.CategoryItem
                key={item.value}
                onClick={() => handleClick("idea", item.label)}
              >
                <S.ImagePlaceholder>               
                  {idx === 0 && <img src={ideaCulture} />}
                  {idx === 1 && <img src={ideaEducation} />}
                  {idx === 2 && <img src={ideaEnvironment} />}
                  {idx === 3 && <img src={ideaFinance} />}
                  {idx === 4 && <img src={ideaHealth} />}
                  {idx === 5 && <img src={ideaHousing} />}
                  {idx === 6 && <img src={ideaParenting} />}
                  {idx === 7 && <img src={ideaRelationShips} />}
                  {idx === 8 && <img src={ideaSocialCommunity} />}
                  {idx === 9 && <img src={ideaTechnologyAI} />}
                  {idx === 10 && <img src={ideaEtc} />}

                </S.ImagePlaceholder>
                <S.CategoryLabel>{item.value}</S.CategoryLabel>
              </S.CategoryItem>
            ))}
          </S.CategoryItems>
        </S.CategorySection>
      </S.CategoryContainer>
    </>
  );
}