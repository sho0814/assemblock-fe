// src/components/search/SearchResultList.tsx
import { useNavigate } from "react-router-dom";
import { categoryToIconMap } from "@constants";
import { useSearchBlocks } from "@hooks";
import * as S from './SearchResultsList.styled'

interface SearchResultListProps {
  keyword: string;
}

const SearchResultList: React.FC<SearchResultListProps> = ({ keyword }) => {
  const navigate = useNavigate();
  const { blocks, loading, error } = useSearchBlocks(keyword);

  const getCategoryThumbnail = (category: string) => {
    return categoryToIconMap[category] ?? "/sample.png";
  };

  const handleClick = () => {
    navigate('/OtherUser/BlockDetail');
  }

  // 오류 or 결과 없음
  if (error || blocks.length === 0) {
    return (
      <S.EmptyResultWrapper>
        <S.EmptyMessage>검색 결과가 없어요.</S.EmptyMessage>
        <S.EmptySubMessage>
          제대로 된 블록 제목을 입력했는지 다시 한 번 확인해주세요!
        </S.EmptySubMessage>
      </S.EmptyResultWrapper>
    );
  }

  if (loading) {
    return (
      <S.BlockListWrapper>
        {Array.from({ length: 4 }).map((_, index) => (
          <S.BlockItem key={`skeleton-${index}`}>
            <S.SkeletonThumbnail />
            <div>
              <S.SkeletonBlockTitle />
              <S.SkeletonBlockSummary />
            </div>
          </S.BlockItem>
        ))}
      </S.BlockListWrapper>
    );
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
            <S.BlockTitle>{block.blockTitle}</S.BlockTitle>
            <S.BlockSummary>{block.oneLineSummary}</S.BlockSummary>
          </div>
        </S.BlockItem>
      ))}
    </S.BlockListWrapper>
  );
};

export default SearchResultList;