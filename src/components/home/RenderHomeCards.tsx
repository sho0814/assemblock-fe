// src/components/home/RenderHomeCards.tsx
import { useFetchBlocks } from '@hooks'
import Card from '@components/home/Card'
import EmblaCarousel from '@components/home/EmblaCarousel'
import type { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = { loop: true }

interface RenderHomeCardsProps {
  isTech: boolean;
  setIsRegisterBlockActive: React.Dispatch<React.SetStateAction<boolean>>
  isRegisterBlockActive: boolean
}

export default function RenderHomeCards({ setIsRegisterBlockActive, isRegisterBlockActive, isTech }: RenderHomeCardsProps) {
  const cards = useFetchBlocks(isTech)

  if (!cards.length) return <p style={{ position: 'absolute', left: '25%', top: '50%', fontSize: 16, fontWeight: 500, color: '#868286' }}>카드를 불러오는 중입니다...</p>

  const slides = cards.map(card => (
    <Card
      key={card.blockId}
      isRegisterBlockActive={isRegisterBlockActive}
      setIsRegisterBlockActive={setIsRegisterBlockActive}
      {...card}
    />
  ))

  return (
    <>
      <EmblaCarousel slides={slides} options={OPTIONS} setIsRegisterBlockActive={setIsRegisterBlockActive} />
    </>

  )
}
