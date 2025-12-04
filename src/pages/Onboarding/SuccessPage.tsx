import * as S from "./ErrorPage.styled";
import AssemblockLogo from "/assets/onBoarding/assemblock-logo.svg";

export function SuccessPage() {
    return (
        <S.PageContainer>
            <S.MessageContainer>
                <S.SuccessIcon src={AssemblockLogo} alt="성공 아이콘" />
                <S.MessageTitle>회원가입이 완료되었어요!</S.MessageTitle>
            </S.MessageContainer>
            <S.RetryButton to="/">시작하기</S.RetryButton>
        </S.PageContainer>
    );
}