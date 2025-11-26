// src/pages/home/HomePage.tsx
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import Card from '@components/home/Card'
import HomeHeader from '@components/home/HomeHeader'
import useCardList from '@components/home/useCardList.ts'
import EmblaCarousel from '@components/home/EmblaCarousel'
import type { EmblaOptionsType } from 'embla-carousel'
import CommonButton from '@components/shared/CommonButton'
import RegisterIcon from '@assets/home/register.svg'

import * as S from './HomePage.styled'

const OPTIONS: EmblaOptionsType = { loop: true }

export function HomePage() {
    const navigate = useNavigate();
    const [isTech, setIsTech] = useState(true);
    const [isRegisterBlockActive, setIsRegisterBlockActive] = useState(true);
    const cards = useCardList(isTech);

    if (!cards.length) return <p>Loading cards...</p>
    // Card 컴포넌트 배열 생성
    const slides = cards.map((card) => (
        <Card key={card.block_id}
            isRegisterBlockActive={isRegisterBlockActive}
            setIsRegisterBlockActive={setIsRegisterBlockActive}
            {...card} />
    ))

    return (
        <S.PageContainer>

            <S.HeaderWrapper>
                <HomeHeader isTech={isTech} setIsTech={setIsTech} />
            </S.HeaderWrapper>

            <S.EmblaWrapper>
                <EmblaCarousel slides={slides} options={OPTIONS} setIsRegisterBlockActive={setIsRegisterBlockActive}/>
            </S.EmblaWrapper>

            <S.RegisterButtonWrapper>
                {isRegisterBlockActive &&
                    <CommonButton
                        width="60px"
                        height="60px"
                        borderRadius='100px'
                        onClick={() => navigate('/block/register', { state: { isTech: isTech } })}
                        imgSrc={RegisterIcon}
                    />}

            </S.RegisterButtonWrapper>
        </ S.PageContainer>
    )
}