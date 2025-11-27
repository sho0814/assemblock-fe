import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cancelButton from '@assets/common/cancel-btn.svg'
import * as S from './RecentSearches.styled'

type HistoryItem = {
    historyId: number;
    keyword: string;
};

export default function RecentSearches() {
    const navigate = useNavigate();
    const [histories, setHistories] = useState<HistoryItem[]>([]);

    useEffect(() => {
        fetch('/dummyHistories.json')
            .then(res => res.json())
            .then(data => {
                setHistories(data || []);
            });
    }, []);

    const handleClick = (keyword:string) => {
        navigate(`/search/${encodeURIComponent(keyword)}`);
    }

    const handleRemove = (historyId: number) => {
        setHistories(histories.filter(item => item.historyId !== historyId));
    };

    const handleRemoveAll = () => {
        setHistories([]);
    };

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
                            <S.RemoveBtn src={cancelButton} onClick={() => handleRemove(historyId)} />
                        </S.Tag>
                    ))}
                </S.TagList>
            )
            }
        </S.Section>
    );
}
