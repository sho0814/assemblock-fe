// src/components/home/Card.tsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from '@react-spring/web'

import type { BlockData } from '@types'
import { cardBackgrounds } from '@constants'
import { useOverlay } from '@components/common/OverlayContext'
import BoardSelector from './BoardSelector'
import * as S from './Card.styled'

const threshold = -50

interface CardProps extends BlockData {
  isRegisterBlockActive: boolean;
  setIsRegisterBlockActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card: React.FC<CardProps> = ({ blockId, blockTitle, oneLineSummary, writerNickname, techPart, categoryName, isRegisterBlockActive, setIsRegisterBlockActive }: CardProps) => {
  const navigate = useNavigate();
  const { showOverlay } = useOverlay();
  const [y, setY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const prevIsActive = useRef<boolean>(false);
  const bgImage = cardBackgrounds[categoryName];

  useEffect(() => {
    if (!prevIsActive.current && isRegisterBlockActive) {
      // false -> true로 변경된 경우
      setY(0);
    }
    prevIsActive.current = isRegisterBlockActive; // 이전 상태 업데이트
  }, [isRegisterBlockActive]);


  const getTechPartText = () => {
    if (techPart === 'design') return '디자인'
    if (techPart === 'frontend') return '프론트엔드'
    if (techPart === 'backend') return '백엔드'
    return null
  }
  const techPartText = getTechPartText();

  const spring = useSpring({ y, config: { tension: 300, friction: 20 } })

  const bind = useDrag(({ movement: [, my], last, first }) => {

    if (first) setIsDragging(true); // 드래그 시작
    const constrainedY = my > 0 ? 0 : my < threshold ? threshold : my;
    setY(constrainedY);

    // 드래그 종료
    if (last) {
      // thershold(-70px)에 도달했을 경우 고정하고 IsStoreToBoardVisible 상태 변화
      if (my <= threshold) {
        setY(threshold)
        setIsRegisterBlockActive(false)
      } else { // 도달하지 못했을 경우 제자리로
        setY(0)
        setIsRegisterBlockActive(true)
      }
      setIsDragging(false);
    }
  })

  const handleBoardOverlay = (blockId: number) => {
    showOverlay(
      <BoardSelector blockId={blockId} setIsRegisterBlockActive={setIsRegisterBlockActive} />,
      { contentStyle: { position: 'absolute', bottom: '0', width: '100%' } }
    );
  }

  const handleClick = (blockId: number) => {
    if (isDragging) return;
    navigate(`/OtherUser/BlockDetail/${encodeURIComponent(blockId)}`);
  }

  return (
    <>
      <animated.div {...bind()} style={{ y: spring.y }}>
        <S.Card key={blockId} bgImage={bgImage} onClick={() => handleClick(blockId)}>
          <S.Title>{blockTitle}</S.Title>
          <S.Summary>{oneLineSummary}</S.Summary>
          <S.Username>{writerNickname} 님</S.Username>
          {techPartText && <S.TechPart>{techPartText}</S.TechPart>}
        </S.Card>
      </animated.div>
      {!isRegisterBlockActive &&
        <S.StoreToBoardBtn onClick={() => handleBoardOverlay(blockId)}>보드에 추가</S.StoreToBoardBtn>}
    </>
  )
}

export default Card
