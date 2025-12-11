// src/components/home/RenderHomeCards.tsx
import { useFetchBlocks } from '@hooks'
import Card from '@components/home/Card'
import EmblaCarousel from '@components/home/EmblaCarousel'
import type { EmblaOptionsType } from 'embla-carousel'

const OPTIONS: EmblaOptionsType = { loop: true }

interface RenderHomeCardsProps {
  isTechType: boolean;
  setIsRegisterBlockActive: React.Dispatch<React.SetStateAction<boolean>>
  isRegisterBlockActive: boolean
}

export default function RenderHomeCards({ setIsRegisterBlockActive, isRegisterBlockActive, isTechType }: RenderHomeCardsProps) {
  const cards = useFetchBlocks(isTechType)

  if (!cards.length)
    return (
      <p style={{ position: 'absolute', left: '25%', top: '50%', fontSize: 16, fontWeight: 500, color: '#868286' }}>
        등록된 카드가 없습니다.
      </p>
    );

  const slides = cards.map(card => (
    <Card
      key={card.blockId}
      isRegisterBlockActive={isRegisterBlockActive}
      setIsRegisterBlockActive={setIsRegisterBlockActive}
      {...card}
    />
  ))

  if (cards.length == 1)
    return slides;
  else if (cards.length == 2) {
    return (
      <>
        {slides}
      </>
    );
  }
  else {
    return <EmblaCarousel slides={slides} options={OPTIONS} setIsRegisterBlockActive={setIsRegisterBlockActive} />
  }
}
