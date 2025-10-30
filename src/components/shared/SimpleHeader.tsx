// src/components/shared/Header.tsx
import backArrow from '@assets/common/back-arrow.svg'
import * as S from './SimpleHeader.styled'

import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

export default function SimpleHeader({title}: HeaderProps): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <S.Header>
      
      <S.IconWrapper  onClick={() => navigate(-1)}>
        <S.Icon src={backArrow}/>
      </S.IconWrapper>

      <S.Title>
        {title}
      </S.Title>

      <S.IconWrapper />

    </S.Header>
  )
}