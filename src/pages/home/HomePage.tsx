// src/pages/home/HomePage.tsx
import { useState } from 'react'
import HomeHeader from '@components/home/HomeHeader'
import RenderHomeCards from '@components/home/RenderHomeCards'
import RegisterIcon from '@assets/home/register.svg'

import * as S from './HomePage.styled'

export function HomePage() {
  const [isTechType, setIsTechType] = useState(true)
  const [isRegisterBlockActive, setIsRegisterBlockActive] = useState(true)

  return (
    <S.PageContainer>
      <S.HeaderWrapper>
        <HomeHeader isTechType={isTechType} setIsTechType={setIsTechType} />
      </S.HeaderWrapper>

      <S.EmblaWrapper>
        <RenderHomeCards
          isTechType={isTechType}
          isRegisterBlockActive={isRegisterBlockActive}
          setIsRegisterBlockActive={setIsRegisterBlockActive}
        />
      </S.EmblaWrapper>

      <S.RegisterButtonWrapper onClick={() => console.log('clicked!')}>
        {isRegisterBlockActive && (
          <S.RegisterButton to='/block/register' state={{isTech: isTechType}}>
            <img src={RegisterIcon} />
          </S.RegisterButton>
        )}
      </S.RegisterButtonWrapper>
    </S.PageContainer>
  )
}
