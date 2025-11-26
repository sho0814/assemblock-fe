import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SimpleHeader from "@components/shared/SimpleHeader";
import { CATEGORY_TECH_FRONT_OPTIONS, CATEGORY_TECH_DESIGN_OPTIONS, CATEGORY_TECH_BACK_OPTIONS, CATEGORY_IDEA_OPTIONS } from "@components/block/DropdownOptions";
import RenderCards from "./RenderCards";
import * as S from './CategoryDetailsPage.styled'

const PAGE_DATA: Record<string, { title: string; options: typeof CATEGORY_TECH_FRONT_OPTIONS }> = {
    frontend: { title: "프론트엔드", options: CATEGORY_TECH_FRONT_OPTIONS },
    design: { title: "디자인", options: CATEGORY_TECH_DESIGN_OPTIONS },
    backend: { title: "백엔드", options: CATEGORY_TECH_BACK_OPTIONS },
    idea: { title: "아이디어", options: CATEGORY_IDEA_OPTIONS },
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

    useEffect(() => console.log(category), [category])

    return (
        <>
            <SimpleHeader title={title} style={{paddingLeft: 20, paddingRight: 20}}/>
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
                <RenderCards frontendCategory={category} />
            </S.CarouselWrapper>

        </>

    )
}