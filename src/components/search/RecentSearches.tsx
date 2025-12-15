// src/components/search/RecentSearches.tsx
import { useRecentSearches } from '@hooks';
import cancelButton from '@assets/common/cancel-btn.svg'
import * as S from './RecentSearches.styled'

export default function RecentSearches() {
    const {
        histories,
        loading,
        error,
        handleClick,
        handleRemove,
        handleRemoveAll,
    } = useRecentSearches();

    if (loading) {
        return (
            <S.Section>
                <S.EmptyText>로딩 중...</S.EmptyText>
            </S.Section>
        );
    }

    if (error) {
        return (
            <S.Section>
                <S.EmptyText>오류 발생: {error}</S.EmptyText>
            </S.Section>
        );
    }

    return (
        <S.Section>
            <S.HeaderWrapper>
                <S.Title>최근 검색어</S.Title>
                {histories.length > 0 && (
                    <S.ClearAll onClick={handleRemoveAll}>전체 삭제</S.ClearAll>
                )}
            </S.HeaderWrapper>
            {histories.length === 0 ? (
                <S.EmptyText>최근 검색어가 없습니다.</S.EmptyText>
            ) : (
                <S.TagList>
                    {histories.map(({ historyId, keyword }) => (
                        <S.Tag key={historyId} onClick={() => handleClick(keyword)}>
                            {keyword}
                            <S.RemoveBtn
                                src={cancelButton}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(historyId);
                                }}
                            />
                        </S.Tag>
                    ))}
                </S.TagList>
            )}
        </S.Section>
    );
}