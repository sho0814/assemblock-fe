import { useState, useEffect } from "react";
import type { BlockType } from "@components/home/useCardList";
import { categoryToSmallImageMap } from "./SmallBg";
import * as S from './SearchResultsList.styled'

const SearchResultList: React.FC<{ searchQuery: string }> = () => {
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [loading, setLoading] = useState(true);
  const getCategoryThumbnail = (category: string) => {
    return categoryToSmallImageMap[category] ?? "/thumb_placeholder.png";
  };

  useEffect(() => {
    fetch('/dummyBlocks.json')
      .then(res => res.json())
      .then(data => {
        setBlocks(data);
        setLoading(false);
      });
  }, []);

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

  return (
    <S.BlockListWrapper>
      {blocks.map(block => (
        <S.BlockItem key={block.block_id}>
          <S.Thumbnail
            src={getCategoryThumbnail(block.category_name)}
            alt="블록 썸네일"
          />
          <div>
            <S.BlockTitle>{block.block_title}</S.BlockTitle>
            <S.BlockSummary>{block.oneline_summary}</S.BlockSummary>
          </div>
        </S.BlockItem>
      ))}
    </S.BlockListWrapper>
  );
};

export default SearchResultList;