import { useState } from "react";
import { useFetchBlocks } from "@hooks";
import EmblaCarousel from '@components/home/EmblaCarousel'
import type { EmblaOptionsType } from 'embla-carousel'
import Card from "@components/home/Card";

const OPTIONS: EmblaOptionsType = { loop: true }

type RenderCategoryCardsProps = {
    frontendCategory?: string;
    backendCategory?: string;
    designCategory?: string;
    ideaCategory?: string;
}

const RenderCategoryCards: React.FC<RenderCategoryCardsProps> = ({ frontendCategory, backendCategory, designCategory, ideaCategory, }) => {
    const [isRegisterBlockActive, setIsRegisterBlockActive] = useState(true);
    const cards = useFetchBlocks(undefined, frontendCategory, backendCategory, designCategory, ideaCategory)
    if (!cards.length) return <p style={{position:"absolute", left: '18%', top: '50%', fontWeight: '500', fontSize:'16px', color: '#868286'}}>해당 카테고리에 등록된 블록이 없습니다.</p>

    const SLIDES = cards.map((card) => (
        <Card key={card.blockId}
            isRegisterBlockActive={isRegisterBlockActive}
            setIsRegisterBlockActive={setIsRegisterBlockActive}
            {...card} />
    ))

    return (
        <>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} setIsRegisterBlockActive={setIsRegisterBlockActive} />
        </>
    );
}

export default RenderCategoryCards