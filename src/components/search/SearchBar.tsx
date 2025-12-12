// src/components/shared/Header.tsx
import { useRecentSearches } from '@hooks';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import backArrow from '@assets/common/back-arrow.svg'
import search from '@assets/common/search.svg'
import * as S from './SearchBar.styled'

type SearchBarProps = {
  PrevSearch?: string;
};

export default function SearchBar({ PrevSearch }: SearchBarProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(PrevSearch ?? "");
  const { handleClick } = useRecentSearches();

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
                    <S.Icon src={search} onClick={() => handleClick(searchTerm)} />
                </S.IconWrapper>
            </S.SearchBarWrapper>

        </S.Header>
    )
}
