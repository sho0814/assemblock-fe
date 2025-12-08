import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { categoryToSmallImageMap } from "./SmallBg";
import { searchBlocks } from "@api";
import type { SearchBlock } from "@types";
import * as S from './SearchResultsList.styled'

interface SearchResultListProps {
  keyword: string;
}

const SearchResultList: React.FC<SearchResultListProps> = ({ keyword }) => {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState<SearchBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlocks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchBlocks(keyword);
      setBlocks(data);
    } catch (err) {
      setError('검색 결과를 불러오지 못했습니다.');
      console.error('Search failed:', err);
      setBlocks([]);
    } finally {
      setLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    fetchBlocks();
  }, [fetchBlocks]);

  // 결과 없음 화면
  if (!loading && blocks.length === 0) {
    return (
      <S.EmptyResultWrapper>
        <S.EmptyMessage>검색 결과가 없어요.</S.EmptyMessage>
        <S.EmptySubMessage>
          제대로 된 블록 제목을 입력했는지 다시 한 번 확인해주세요!
        </S.EmptySubMessage>
      </S.EmptyResultWrapper>
    );
  }

  const getCategoryThumbnail = (category: string) => {
    return categoryToSmallImageMap[category] ?? "/sample.png";
  };

  const handleClick = () => {
    navigate('/block/detail');
  }

  return (
    <S.BlockListWrapper>
      {blocks.map(block => (
        <S.BlockItem key={block.blockId} onClick={handleClick}>
          <S.Thumbnail
            src={getCategoryThumbnail(block.categoryName)}
            alt="블록 썸네일"
          />
          <div>
            <S.BlockTitle>{block.title}</S.BlockTitle>
            <S.BlockSummary>{block.onelineSummary}</S.BlockSummary>
          </div>
        </S.BlockItem>
      ))}
    </S.BlockListWrapper>
  );
};

export default SearchResultList;