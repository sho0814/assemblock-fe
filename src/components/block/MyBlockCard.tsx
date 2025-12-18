import { useNavigate } from 'react-router-dom';
import { useOverlay } from '@components/common/OverlayContext';
import BoardSelector from '@components/home/BoardSelector';
import * as S from './MyBlockCard.styled';
import { getMediumImage } from '@constants/mediumImageMap';

export type Block = {
  block_id: number; 
  user_id: number; 
  category_name: string | null; 
  block_title: string; 
  block_type: string; 
  contribution_score: number | null; 
  tools_text: string | null; 
  oneline_summary: string; 
  improvement_point: string | null; 
  result_url: string | null; 
  result_file: string | null; 
  created_at: string | Date; 
};

export type BlockData = Block & {
  techparts?: number[]; // techpart_id 배열 (Block_techparts 테이블과 조인 시 사용)
}

interface MyBlockProps {
  blocks?: BlockData[];
  activeTab?: 'all' | 'idea' | 'tech';
  isMyBlock?: boolean; // 내 블록인지 타인의 블록인지 구분
  setIsRegisterBlockActive?: React.Dispatch<React.SetStateAction<boolean>>; // 보드에 담기 버튼 활성화 상태 관리 (선택적)
}

export default function BlockList({ blocks = [], activeTab = 'all', isMyBlock = false, setIsRegisterBlockActive }: MyBlockProps) {
  const navigate = useNavigate();
  const { showOverlay } = useOverlay();

  // 보드에 담기 버튼 클릭 핸들러
  const handleBoardOverlay = (e: React.MouseEvent, blockId: number) => {
    e.stopPropagation(); // 블록 카드 클릭 이벤트 전파 방지
    showOverlay(
      <BoardSelector blockId={blockId} setIsRegisterBlockActive={setIsRegisterBlockActive} />,
      { contentStyle: { position: 'absolute', bottom: '0', width: '100%' } }
    );
  };

  // activeTab에 따라 블록 필터링
  const filteredBlocks = blocks.filter((block) => {
    if (activeTab === 'all') {
      return true;
    } else if (activeTab === 'idea') {
      return block.block_type === 'IDEA';
    } else if (activeTab === 'tech') {
      return block.block_type === 'TECHNOLOGY';
    }
    return true;
  });

  // 필터링된 블록이 없을 때 메시지 표시
  if (filteredBlocks.length === 0) {
    return null; // 부모 컴포넌트에서 처리하도록 null 반환
  }

  return (
    <S.BlockListContainer>
      {filteredBlocks.map((block) => (
        <S.BlockCardWrapper key={block.block_id}>
          <S.BlockCard 
            onClick={() => {
              // 내 블록이면 내 블록 상세 페이지로, 타인의 블록이면 타인 블록 상세 페이지로
              const detailPath = isMyBlock 
                ? `/My/BlockDetail/${block.block_id}`
                : `/OtherUser/BlockDetail/${block.block_id}`;
              navigate(detailPath);
            }}
          >
            <S.BlockIcon>
              <img src={getMediumImage(block.category_name)} alt="Block Icon" />
            </S.BlockIcon>
            <S.BlockContent>
              <S.BlockTitle>{block.block_title}</S.BlockTitle>
            </S.BlockContent>
          </S.BlockCard>
          {/* 타인의 블록일 때만 보드에 담기 버튼 표시 */}
          {!isMyBlock && (
            <S.BoardAddButton onClick={(e) => handleBoardOverlay(e, block.block_id)}>
              보드에 담기
            </S.BoardAddButton>
          )}
        </S.BlockCardWrapper>
      ))}
    </S.BlockListContainer>
  );
}

