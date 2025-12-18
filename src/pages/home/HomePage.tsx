// src/pages/home/HomePage.tsx
import { useState } from 'react'
import type { BlockType } from '@types'
import HomeHeader from '@components/home/HomeHeader'
import RenderHomeCards from '@components/home/RenderHomeCards'
import RegisterIcon from '@assets/home/register.svg'

import * as S from './HomePage.styled'

export function HomePage() {
  const [isTechType, setIsTechType] = useState(true)
  const [isRegisterBlockActive, setIsRegisterBlockActive] = useState(true)
  const [blocktype, setBlockType] = useState<BlockType>('TECHNOLOGY');

  return (
    <S.PageContainer>
      <S.HeaderWrapper>
        <HomeHeader isTechType={isTechType} setIsTechType={setIsTechType} setBlockType={setBlockType} />
      </S.HeaderWrapper>

      <S.EmblaWrapper>
        <RenderHomeCards
          key={isTechType ? 'tech' : 'non-tech'}
          blockType={blocktype}
          isRegisterBlockActive={isRegisterBlockActive}
          setIsRegisterBlockActive={setIsRegisterBlockActive}
        />
      </S.EmblaWrapper>

      <S.RegisterButtonWrapper>
        {isRegisterBlockActive && (
          <S.RegisterButton to='/block/register' state={{ isTech: isTechType }}>
            <img src={RegisterIcon} />
          </S.RegisterButton>
        )}
      </S.RegisterButtonWrapper>
    </S.PageContainer>
  )
}
