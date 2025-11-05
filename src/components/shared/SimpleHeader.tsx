// src/components/shared/Header.tsx
import backArrow from '@assets/common/back-arrow.svg'
import * as S from './SimpleHeader.styled'

import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  onBackClick?: () => void;
}

export default function SimpleHeader({ title, onBackClick }: HeaderProps): React.JSX.Element {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <S.Header>
      
      <S.IconWrapper  onClick={handleBackClick}>
        <S.Icon src={backArrow}/>
      </S.IconWrapper>

      <S.Title>
        {title}
      </S.Title>

      <S.IconWrapper />

    </S.Header>
  )
}