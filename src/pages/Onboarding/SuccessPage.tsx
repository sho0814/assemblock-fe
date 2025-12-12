import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@stores";
import * as S from "./ErrorPage.styled";
import AssemblockLogo from "/assets/onBoarding/assemblock-logo.svg";

export function SuccessPage() {
    const navigate = useNavigate();
    const { profileComplete } = useAuthStore();
    
    const handleStart = () => {
        if (profileComplete) {
            navigate("/Home");
        } else {
            navigate("/onboarding/profileName");
        }
    };

    return (
        <S.PageContainer>
            <S.MessageContainer>
                <S.SuccessIcon src={AssemblockLogo} alt="성공 아이콘" />
                <S.MessageTitle>회원가입이 완료되었어요!</S.MessageTitle>
            </S.MessageContainer>
            <S.RetryButton onClick={handleStart}>시작하기</S.RetryButton>
        </S.PageContainer>
    );
}