// src/components/home/Card.tsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from '@react-spring/web'
import { categoryBackground } from './CategoryBackground'
import { useOverlay } from '@components/common/OverlayContext'
import SelectBoard from './SelectBoard'
import * as S from './Card.styled'

const threshold = -70

interface CardProps {
  block_id: number
  block_title: string
  block_type: string
  oneline_summary: string
  user_id: number
  tech_part: string
  category_name: string
  user_name: string
  isRegisterBlockActive: boolean;
  setIsRegisterBlockActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card: React.FC<CardProps> = ({ block_id, block_title, oneline_summary, user_name, tech_part, category_name, isRegisterBlockActive, setIsRegisterBlockActive }: CardProps) => {
  const navigate = useNavigate();
  const { showOverlay } = useOverlay();
  const [y, setY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const prevIsActive = useRef<boolean>(false);
  const bgImage = categoryBackground[category_name];

  useEffect(() => {
    if (!prevIsActive.current && isRegisterBlockActive) {
      // false -> true로 변경된 경우
      setY(0);
    }
    prevIsActive.current = isRegisterBlockActive; // 이전 상태 업데이트
  }, [isRegisterBlockActive]);


  const getTechPartText = () => {
    if (tech_part === 'design') return '디자인'
    if (tech_part === 'frontend') return '프론트엔드'
    if (tech_part === 'backend') return '백엔드'
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

  const handleBoardOverlay = () => {
    showOverlay(
      <SelectBoard block_id={block_id} setIsRegisterBlockActive={setIsRegisterBlockActive} />,
      { contentStyle: { position: 'absolute', bottom: '0', width: '100%' } }
    );
  }

  const handleClick = () => {
    if (isDragging) return; // 드래그 중이면 클릭 무시
    navigate('/Block/detail');
  }

  return (
    <>
      <animated.div {...bind()} style={{ y: spring.y }}>
        <S.Card key={block_id} bgImage={bgImage} onClick={handleClick}>
          <S.Title>{block_title}</S.Title>
          <S.Summary>{oneline_summary}</S.Summary>
          <S.Username>{user_name} 님</S.Username>
          {techPartText && <S.TechPart>{techPartText}</S.TechPart>}
        </S.Card>
      </animated.div>
      {!isRegisterBlockActive &&
        <S.StoreToBoardBtn onClick={() => handleBoardOverlay()}>보드에 추가</S.StoreToBoardBtn>}
    </>
  )
}

export default Card
