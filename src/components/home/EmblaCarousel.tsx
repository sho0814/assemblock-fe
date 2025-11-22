// components/home/EmblaCarousel.tsx
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useRef } from 'react'
import './embla.css'

type PropType = {
  slides: React.ReactNode[]
  options?: EmblaOptionsType
  setIsRegisterBlockActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmblaCarousel: React.FC<PropType> = ({ slides, options, setIsRegisterBlockActive }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const prevScrollProgress = useRef<number | null>(null);
  const threshold = 0.01;

   useEffect(() => {
    if (!emblaApi) return;

    const onScroll = () => {
      const currentProgress = emblaApi.scrollProgress();
      if (
        prevScrollProgress.current !== null &&
        Math.abs(currentProgress - prevScrollProgress.current) > threshold
      ) {
        setIsRegisterBlockActive(true);
      }
      prevScrollProgress.current = currentProgress;
    };

    emblaApi.on('scroll', onScroll);

    return () => {
      emblaApi.off('scroll', onScroll);
    };
  }, [emblaApi, setIsRegisterBlockActive]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className="embla__slide" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel