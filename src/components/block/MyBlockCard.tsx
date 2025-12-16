import { useNavigate } from 'react-router-dom';
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
}

export default function BlockList({ blocks = [], activeTab = 'all', isMyBlock = false }: MyBlockProps) {
  const navigate = useNavigate();

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

  return (
    <>
      {filteredBlocks.length > 0 && (
        <S.BlockListContainer>
          {filteredBlocks.map((block) => (
            <S.BlockCard 
              key={block.block_id}
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
          ))}
        </S.BlockListContainer>
      )}
    </>
  );
}

