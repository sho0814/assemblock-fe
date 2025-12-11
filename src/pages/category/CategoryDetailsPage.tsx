import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SimpleHeader from "@components/shared/SimpleHeader";
import { CATEGORY_TECH_FRONT, CATEGORY_TECH_DESIGN, CATEGORY_TECH_BACK, CATEGORY_IDEA } from "@constants";
import RenderCategoryCards from "./RenderCategoryCards";
import * as S from './CategoryDetailsPage.styled'

const PAGE_DATA: Record<string, { title: string; options: typeof CATEGORY_TECH_FRONT }> = {
    frontend: { title: "프론트엔드", options: CATEGORY_TECH_FRONT },
    design: { title: "디자인", options: CATEGORY_TECH_DESIGN },
    backend: { title: "백엔드", options: CATEGORY_TECH_BACK },
    idea: { title: "아이디어", options: CATEGORY_IDEA },
};

function getPageInfo(techpart: string | undefined) {
    return PAGE_DATA[techpart ?? ""] || { title: "", options: [] };
}

export function CategoryDetailsPage() {
    const location = useLocation();
    const initialCategory = location.state?.category;
    const [category, setCategory] = useState(initialCategory);
    const { techpart } = useParams();
    const { title, options } = getPageInfo(techpart);

    return (
        <>
            <SimpleHeader title={title} style={{ paddingLeft: 20, paddingRight: 20 }} />
            <S.ScrollNav>
                {options.map((option: { label: string, value: string }) => (
                    <S.NavTab
                        key={option.label}
                        onClick={() => setCategory(option.label)}
                        selected={category === option.label}
                    >
                        {option.value}
                    </S.NavTab>
                ))}
            </S.ScrollNav>

            <S.CarouselWrapper>
                <RenderCategoryCards frontendCategory={category} />
            </S.CarouselWrapper>

        </>

    )
}