import { useState, useEffect } from "react";
import { useFetchBlocks } from "@hooks";
import EmblaCarousel from '@components/home/EmblaCarousel'
import type { EmblaOptionsType } from 'embla-carousel'
import Card from "@components/home/Card";

const OPTIONS: EmblaOptionsType = { loop: true }

type RenderCategoryCardsProps = {
    category: string
}

const RenderCategoryCards: React.FC<RenderCategoryCardsProps> = ({ category }) => {
    const [isRegisterBlockActive, setIsRegisterBlockActive] = useState(true);
    const { blocks, loading, error, fetchByCategory } = useFetchBlocks();

    useEffect(() => {
        if (!category) return;
        fetchByCategory(category);
    }, [category, fetchByCategory])

    if (error) {
        return (
            <p style={{ position: 'fixed', left: '50%', top: '50%', transform: "translate(-50%, -50%)", fontSize: "16px", fontWeight: "500", color: '#868286' }}>
                {error}
            </p>
        );
    }

    if (loading) {
        return (
            <p style={{ position: 'fixed', left: '50%', top: '50%', transform: "translate(-50%, -50%)", fontSize: "16px", fontWeight: "500", color: '#868286' }}>
                블록 불러오는 중...
            </p>
        );
    }

    if (!blocks.length) {
        return (
            <p style={{ position: 'fixed', left: '50%', top: '50%', transform: "translate(-50%, -50%)", fontSize: "16px", fontWeight: "500", color: '#868286' }}>
                해당 카테고리에 등록된 블록이 없습니다.
            </p>
        );
    }

    const SLIDES = blocks.map((card) => (
        <Card key={card.blockId}
            isRegisterBlockActive={isRegisterBlockActive}
            setIsRegisterBlockActive={setIsRegisterBlockActive}
            {...card} />
    ))

    if (SLIDES.length == 1) {
        return (
            <div style={{
                position: "fixed",
                top: "55%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}>
                {SLIDES}
            </div>
        )
    } else {
        return <EmblaCarousel slides={SLIDES} options={OPTIONS} setIsRegisterBlockActive={setIsRegisterBlockActive} />
    }
}

export default RenderCategoryCards