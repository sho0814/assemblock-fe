import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./ErrorPage.styled";
import AssemblockLogo from "/assets/onBoarding/assemblock-logo.svg";

export function SuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const isProfileComplete = location.state?.profileComplete;
    const handleStart = () => {
        if (isProfileComplete) {
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
            {/* <S.RetryButton onClick={() => navigate('/Home')}>시작하기</S.RetryButton> */}
        </S.PageContainer>
    );
}