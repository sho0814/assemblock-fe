// src/pages/home/HomePage.tsx
import { useState } from 'react'

import HomeHeader from '@components/home/HomeHeader'
import Swipe from '@components/home/Swipe'
import StoreToBoard from '@components/home/StoreToBoard'
import BlockRegisterBtn from '@components/home/BlockRegisterBtn'
import * as S from './HomePage.styled'

export function HomePage() {
    const [isSkill, setIsSkill] = useState(true);

    return (
        <>
            <HomeHeader isSkill={isSkill} setIsSkill={setIsSkill}/>
            <Swipe />
            <StoreToBoard />
            <BlockRegisterBtn />
        </>
    )
}