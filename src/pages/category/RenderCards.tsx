import { useState } from "react";
import useCardList from "@components/home/useCardList";
import EmblaCarousel from '@components/home/EmblaCarousel'
import type { EmblaOptionsType } from 'embla-carousel'
import Card from "@components/home/Card";

const OPTIONS: EmblaOptionsType = { loop: true }

type RenderCardsProps = {
    frontendCategory?: string;
    backendCategory?: string;
    designCategory?: string;
    ideaCategory?: string;
}

const RenderCards: React.FC<RenderCardsProps> = ({ frontendCategory, backendCategory, designCategory, ideaCategory, }) => {
    const [isRegisterBlockActive, setIsRegisterBlockActive] = useState(true);
    const cards = useCardList(undefined, frontendCategory, backendCategory, designCategory, ideaCategory)
    if (!cards.length) return <p>해당 카테고리에 등록된 블록이 없습니다.</p>

    const SLIDES = cards.map((card) => (
        <Card key={card.block_id}
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

export default RenderCards