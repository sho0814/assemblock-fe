// src/pages/home/HomePage.tsx
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import HomeHeader from '@components/home/HomeHeader'
import Swipe from '@components/home/Swipe'
import StoreToBoard from '@components/home/StoreToBoard'
import CommonButton from '@components/shared/CommonButton'
import RegisterIcon from '@assets/home/register.svg'

import * as S from './HomePage.styled'


export function HomePage() {
    const navigate = useNavigate();
    const [isSkill, setIsSkill] = useState(true);
    console.log(isSkill);
    return (
        <>
            <HomeHeader isSkill={isSkill} setIsSkill={setIsSkill} />

            <S.SwipeContainer>
                <Swipe />
                <StoreToBoard />
            </S.SwipeContainer>

            <S.RegisterButtonContainer>
                <CommonButton
                    width="60px"
                    height="60px"
                    borderRadius='100px'
                    onClick={() => navigate('/block/register', { state: { isSkill }})}
                    imgSrc={RegisterIcon}
                />
            </S.RegisterButtonContainer>
        </>
    )
}