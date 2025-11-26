// src/pages/home/HomePage.tsx
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import HomeHeader from '@components/home/HomeHeader'
import RenderHomeCards from '@components/home/RenderHomeCards'
import CommonButton from '@components/shared/CommonButton'
import RegisterIcon from '@assets/home/register.svg'

import * as S from './HomePage.styled'

export function HomePage() {
  const navigate = useNavigate()
  const [isTech, setIsTech] = useState(true)
  const [isRegisterBlockActive, setIsRegisterBlockActive] = useState(true)

  return (
    <S.PageContainer>
      <S.HeaderWrapper>
        <HomeHeader isTech={isTech} setIsTech={setIsTech} />
      </S.HeaderWrapper>

      <S.EmblaWrapper>
        <RenderHomeCards
          isRegisterBlockActive={isRegisterBlockActive}
          setIsRegisterBlockActive={setIsRegisterBlockActive}
        />
      </S.EmblaWrapper>

      <S.RegisterButtonWrapper>
        {isRegisterBlockActive && (
          <CommonButton
            width="60px"
            height="60px"
            borderRadius="100px"
            onClick={() => navigate('/block/register', { state: { isTech } })}
            imgSrc={RegisterIcon}
          />
        )}
      </S.RegisterButtonWrapper>
    </S.PageContainer>
  )
}
