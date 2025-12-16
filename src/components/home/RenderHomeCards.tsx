// src/components/home/RenderHomeCards.tsx
import { useEffect } from 'react'
import { useFetchBlocks } from '@hooks'
import type { BlockType } from '@types'
import Card from '@components/home/Card'
import EmblaCarousel from '@components/home/EmblaCarousel'
import type { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = { loop: true }

interface RenderHomeCardsProps {
  blockType: BlockType;
  setIsRegisterBlockActive: React.Dispatch<React.SetStateAction<boolean>>
  isRegisterBlockActive: boolean
}

export default function RenderHomeCards({ setIsRegisterBlockActive, isRegisterBlockActive, blockType }: RenderHomeCardsProps) {
  const { blocks, loading, error, fetchByType } = useFetchBlocks();

  useEffect(() => {
    fetchByType(blockType);
  }, [blockType, fetchByType])

  if (error) {
    return (
      <p style={{ position: 'fixed', left: '50%', top: '45%', transform: "translate(-50%, -50%)", fontSize: "16px", fontWeight: "500", color: '#868286' }}>
        {error}
      </p>
    );
  }

  if (loading) {
    return (
      <p style={{ position: 'fixed', left: '50%', top: '45%', transform: "translate(-50%, -50%)", fontSize: "16px", fontWeight: "500", color: '#868286' }}>
        블록 불러오는 중...
      </p>
    );
  }

  if (!blocks.length) {
    return (
      <p style={{ position: 'fixed', left: '50%', top: '45%', transform: "translate(-50%, -50%)", fontSize: "16px", fontWeight: "500", color: '#868286' }}>
        등록된 블록이 없습니다.
      </p>
    );
  }

  const SLIDES = blocks.map(card => (
    <Card
      key={card.blockId}
      isRegisterBlockActive={isRegisterBlockActive}
      setIsRegisterBlockActive={setIsRegisterBlockActive}
      {...card}
    />
  ))

  if (blocks.length == 1) {
    return (
      <div style={{
        position: "fixed",
        top: "48%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}>
        {SLIDES}
      </div>
    )
  } else {
    return <EmblaCarousel slides={SLIDES} options={OPTIONS} setIsRegisterBlockActive={setIsRegisterBlockActive} />
  }
}
