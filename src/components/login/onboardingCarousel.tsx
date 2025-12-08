import type { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import { NextButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import { getKakaoLoginUrl, sendKakaoCodeToBackend } from "@api";
import kakaoLoginIcon from "/assets/onBoarding/kakao-login-icon.svg";
import useEmblaCarousel from 'embla-carousel-react'
import './onboarding.css'

type OnboardingStep = {
    title: string
    description: string
    image: string
}

type PropType = {
    slides: OnboardingStep[]
    options?: EmblaOptionsType
}

const OnBoardingCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
    const isLastSlide = selectedIndex === slides.length - 1

    const handleLogin = () => {
        const url = getKakaoLoginUrl();
        window.location.href = url;
    };

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <section className="onboarding__embla">
            <div className="onboarding__embla__viewport" ref={emblaRef}>
                <div className="onboarding__embla__container">
                    {slides.map((slide, index) => (
                        <div className="onboarding__embla__slide" key={index}>
                            <div className="onboarding-slide-content">
                                <div className="onboarding-slide-text">
                                    <h2 className="onboarding-slide-title">
                                        {slide.title}
                                    </h2>
                                    <p className="onboarding-slide-description">
                                        {slide.description}
                                    </p>
                                </div>
                                <img
                                    src={slide.image}
                                    alt=""
                                    className="onboarding-slide-image"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="onboarding__embla__controls">
                <div className="onboarding__embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'onboarding__embla__dot'.concat(index === selectedIndex ? ' onboarding__embla__dot--selected' : '')}
                        />
                    ))}
                </div>

                <div className="onboarding__embla__buttons">
                    {!isLastSlide && <NextButton className='onboarding__embla__button' onClick={onNextButtonClick}>다음</NextButton>}
                    {isLastSlide &&
                        <div className="onboarding__embla__login-button" onClick={handleLogin}>
                            <img src={kakaoLoginIcon} alt="Kakao Login" />
                            카카오톡으로 시작하기
                        </div>
                    }
                </div>

            </div>
        </section>
    )
}

export default OnBoardingCarousel
