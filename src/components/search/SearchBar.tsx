// src/components/shared/Header.tsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { SearchBarProps } from '@types';

import backArrow from '@assets/common/back-arrow.svg'
import search from '@assets/common/search.svg'
import * as S from './SearchBar.styled'

export default function SearchBar({ PrevSearch }: SearchBarProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(PrevSearch ?? "");

    const handleClick = () => {
        navigate(`/search/${encodeURIComponent(searchTerm)}`);
    }

    return (
        <S.Header>

            <S.IconWrapper onClick={() => navigate(-1)}>
                <S.Icon src={backArrow} />
            </S.IconWrapper>

            <S.SearchBarWrapper>
                <S.SearchInput
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <S.IconWrapper>
                    <S.Icon src={search} onClick={handleClick} />
                </S.IconWrapper>
            </S.SearchBarWrapper>

        </S.Header>
    )
}
