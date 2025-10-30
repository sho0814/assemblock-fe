// src/components/block/Header.tsx
import backArrow from '@assets/common/back-arrow.svg'
import * as S from './BlockHeader.styled'

import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

export default function BlockHeader({title}: HeaderProps): React.JSX.Element {
  const navigate = useNavigate();

  return (
    <S.Header>
      
      <S.IconWrapper  onClick={() => navigate(-1)}>
        <img src={backArrow}/>
      </S.IconWrapper>

      <S.Title className='h3'>
        {title}
      </S.Title>

      <S.IconWrapper />

    </S.Header>
  )
}