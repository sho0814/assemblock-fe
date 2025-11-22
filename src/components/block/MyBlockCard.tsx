import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './MyBlockCard.styled';

// 추후 카드 이미지와 1:1 연결
import mediumIdeaCulture from '@assets/common/medium Img/mediumIdeaCulture.svg';

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
}

export default function BlockList({ blocks, activeTab = 'all' }: MyBlockProps) {
  const navigate = useNavigate();
  const [blockList, setBlockList] = useState<BlockData[]>([]);

  useEffect(() => {
    // localStorage에서 저장된 블록 목록 읽기
    const savedBlocks = localStorage.getItem('registeredBlocks');
    if (savedBlocks) {
      try {
        const parsedBlocks = JSON.parse(savedBlocks) as BlockData[];
        setBlockList(parsedBlocks);
      } catch (e) {
        console.error('Failed to parse saved blocks:', e);
      }
    }
    
    // props로 전달된 blocks가 있으면 사용
    if (blocks && blocks.length > 0) {
      setBlockList(blocks);
    }
  }, [blocks]);

  const handleBlockClick = (blockId: string) => {
    // 추후 연결: 블록 상세 페이지로 이동
    navigate(`/Block/detail?id=${blockId}`);
  };

  // activeTab에 따라 블록 필터링
  const filteredBlocks = blockList.filter((block) => {
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
            <S.BlockCard key={block.block_id} onClick={() => handleBlockClick(block.block_id.toString())}>
              <S.BlockIcon>
                {/* 추후 카드 이미지와 1:1 연결 */}
                <img src={mediumIdeaCulture} alt="Block Icon" />
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

