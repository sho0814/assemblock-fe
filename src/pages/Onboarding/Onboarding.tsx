// src/pages/onBoardingOnboarding.tsx
import { useState } from "react";
import type { EmblaOptionsType } from 'embla-carousel'
import OnBoardingCarousel from "@components/login/onboardingCarousel";
import { getKakaoLoginUrl, sendKakaoCodeToBackend } from "@api";
import onBoardingStep1 from "/assets/onBoarding/onboarding-step1.svg";
import onBoardingStep2 from "/assets/onBoarding/onboarding-step2.svg";
import onBoardingStep3 from "/assets/onBoarding/onboarding-step3.svg";
import kakaoLoginIcon from "/assets/onBoarding/kakao-login-icon.svg";
import * as S from "./Onboarding.styled";

const OPTIONS: EmblaOptionsType = {}
const ONBOARDING_STEPS = [
    {
        title: "옆으로 넘겨 다양한 보드를 탐색해보세요",
        description: "원하는 블록은 위로 올려서 나만의 보드에 추가할 수 있어요",
        image: onBoardingStep1,
    },
    {
        title: "내 프로젝트 상태를 빠르게 확인하고 관리해요",
        description: "상단의 종 아이콘을 누르면 받은 제안을 확인할 수 있어요",
        image: onBoardingStep2,
    },
    {
        title: "보드를 만들어 새로운 프로젝트를 제안해요",
        description: "하단의 + 버튼을 눌러 새로운 보드를 만들어보세요",
        image: onBoardingStep3,
    },
];


export function Onboarding() {
    const [index, setIndex] = useState(0);
    const isLast = index === ONBOARDING_STEPS.length - 1;

    const handleNext = () => {
        if (isLast) return;
        setIndex((prev) => prev + 1);
    };

    const handleLogin = () => {
        const url = getKakaoLoginUrl();
        window.location.href = url;
    };

    return (
        <S.PageContainer>
            <OnBoardingCarousel slides={ONBOARDING_STEPS} options={OPTIONS} />
            {/* <S.OnboardingContent>
                <S.OnboardingTitle>{ONBOARDING_STEPS[index].title}</S.OnboardingTitle>
                <S.OnboardingDesc>{ONBOARDING_STEPS[index].description}</S.OnboardingDesc>
                <S.OnboardingImage
                    src={ONBOARDING_STEPS[index].image}
                    alt={`Onboarding Step ${index + 1}`}
                />

                <S.OnboardingIndicator>
                    {ONBOARDING_STEPS.map((_, i) => (
                        <S.Dot key={i} active={i === index} />
                    ))}
                </S.OnboardingIndicator>
            </S.OnboardingContent> */}

            {/* <S.OnboardingFooter>
                {!isLast && <S.NextButton onClick={handleNext}>다음</S.NextButton>}
                {isLast && (
                    <S.LoginButton onClick={handleLogin}>
                        <img src={kakaoLoginIcon} alt="Kakao Login" />
                        카카오톡으로 시작하기
                    </S.LoginButton>
                )}
            </S.OnboardingFooter> */}
        </S.PageContainer>
    );
}
