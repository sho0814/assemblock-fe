import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleHeader from "@components/shared/SimpleHeader";
import { CATEGORY_TECH_FRONT_OPTIONS, CATEGORY_TECH_DESIGN_OPTIONS, CATEGORY_TECH_BACK_OPTIONS } from "@components/block/DropdownOptions";
import * as S from "./CategoryPage.styled";
import dataVisualization from '@assets/home/category/dataVisualization.svg'

export function CategoryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const navigate = useNavigate();

  const handleClick = (techpart: string, category: string) => {
    setSelectedCategory(category);
    navigate(`/Home/Category/${encodeURIComponent(techpart)}`);
  };

  return (
    <>
      <SimpleHeader title={"카테고리"} />
      <S.CategoryContainer>
        <S.CategorySection>
          <S.CategoryTitle>프론트엔드</S.CategoryTitle>
          <S.CategoryItems>
            {CATEGORY_TECH_FRONT_OPTIONS.map((item, idx) => (
              <S.CategoryItem
                key={item.value}
                onClick={() => handleClick("frontend", item.value)}
              >
                <S.ImagePlaceholder>
                  {idx === 0 && <img src={dataVisualization} />}
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
            {CATEGORY_TECH_BACK_OPTIONS.map(item => (
              <S.CategoryItem
                key={item.value}
                onClick={() => handleClick("backend", item.value)}
              >
                <S.ImagePlaceholder />
                <S.CategoryLabel>{item.value}</S.CategoryLabel>
              </S.CategoryItem>
            ))}
          </S.CategoryItems>
        </S.CategorySection>
        <S.Divider />
        <S.CategorySection>
          <S.CategoryTitle>디자인</S.CategoryTitle>
          <S.CategoryItems>
            {CATEGORY_TECH_DESIGN_OPTIONS.map(item => (
              <S.CategoryItem
                key={item.value}
                onClick={() => handleClick("design", item.value)}
              >
                <S.ImagePlaceholder />
                <S.CategoryLabel>{item.value}</S.CategoryLabel>
              </S.CategoryItem>
            ))}
          </S.CategoryItems>
        </S.CategorySection>
      </S.CategoryContainer>
    </>
  );
}