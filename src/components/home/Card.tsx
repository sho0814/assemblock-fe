// src/components/home/Card.tsx
import { useState, useEffect } from 'react'
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
  isRegisterBlockVisible: boolean;
  setIsRegisterBlockVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const Card: React.FC<CardProps> = ({ block_id, block_title, oneline_summary, user_name, tech_part: techpart_id, category_name, isRegisterBlockVisible: isStoreToBoardVisible, setIsRegisterBlockVisible: setIsStoreToBoardVisible }: CardProps) => {
  const navigate = useNavigate();
  const { showOverlay } = useOverlay();
  const [y, setY] = useState(0)
  const bgImage = categoryBackground[category_name]


  const getTechPartText = () => {
    if (techpart_id === 'design') return '디자인'
    if (techpart_id === 'frontend') return '프론트엔드'
    if (techpart_id === 'backend') return '백엔드'
    return null
  }
  const techPartText = getTechPartText()


  const spring = useSpring({ y, config: { tension: 300, friction: 20 } })

  const bind = useDrag(({ movement: [, my], last }) => {
    const constrainedY = my > 0 ? 0 : my < threshold ? threshold : my;
    setY(constrainedY)

    // 드래그 종료
    if (last) {
      // thershold(-70px)에 도달했을 경우 고정하고 IsStoreToBoardVisible 상태 변화
      if (my <= threshold) {
        setY(threshold)
        setIsStoreToBoardVisible(false)
      } else { // 도달하지 못했을 경우 제자리로
        setY(0)
        setIsStoreToBoardVisible(true)
      }
    }
  })

  useEffect(() => {
    console.log('[상태 변경] isStoreToBoardVisible:', isStoreToBoardVisible)
  }, [isStoreToBoardVisible])

  const handleBoardOverlay = () => {
    showOverlay(
      <SelectBoard block_id={block_id} />,
      { contentStyle: { position: 'absolute', bottom: '0', width: '100%' } }
    );
  }


  return (
    <>
      <animated.div {...bind()} style={{ y: spring.y }}>
        <S.Card key={block_id} bgImage={bgImage} onClick={() => navigate('/Block/detail')}>
          <S.Title>{block_title}</S.Title>
          <S.Summary>{oneline_summary}</S.Summary>
          <S.Username>{user_name} 님</S.Username>
          {techPartText && <S.TechPart>{techPartText}</S.TechPart>}
        </S.Card>
      </animated.div>
      {!isStoreToBoardVisible &&
        <S.StoreToBoardBtn onClick={() => handleBoardOverlay()}>보드에 추가</S.StoreToBoardBtn>}
    </>
  )
}

export default Card
