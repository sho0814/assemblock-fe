import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
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

    const scrollNavRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scrollNavRef.current || !category) return;

        requestAnimationFrame(() => {
            const nav = scrollNavRef.current;
            const tabs = nav?.children as HTMLCollectionOf<HTMLElement>;

            // options 배열에서 현재 category의 index 찾기
            const currentIndex = options.findIndex(option => option.label === category);

            if (currentIndex !== -1) {
                const tab = tabs[currentIndex];
                if (nav && tab) {
                    nav.scrollLeft = tab.offsetLeft;
                }
            }
        });
    }, [category, options])

    const handleTabClick = (label: string, index: number) => {
        setCategory(label);

        // 상태 업데이트 후 DOM 반영 대기
        requestAnimationFrame(() => {
            const nav = scrollNavRef.current;
            const tabs = nav?.children as HTMLCollectionOf<HTMLElement>;
            const tab = tabs[index];

            if (nav && tab) {
                nav.scrollLeft = tab.offsetLeft;
            }
        });
    };

    return (
        <>
            <SimpleHeader title={title} style={{ paddingLeft: 20, paddingRight: 20 }} />

            <S.ScrollNav ref={scrollNavRef}>
                {options.map((option: { label: string, value: string }, index) => (
                    <S.NavTab
                        key={option.label}
                        onClick={() => handleTabClick(option.label, index)}
                        selected={category === option.label}
                    >
                        {option.value}
                    </S.NavTab>
                ))}
            </S.ScrollNav>

            <S.CarouselWrapper>
                <RenderCategoryCards category={category} />
            </S.CarouselWrapper>

        </>

    )
}