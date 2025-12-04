import FailAlertIcon from "/assets/onBoarding/fail-alert-icon.svg";
import * as S from "./ErrorPage.styled";

export function ErrorPage() {
    return (
        <S.PageContainer>
            <S.MessageContainer>
                <S.FailureIcon src={FailAlertIcon} alt="에러 아이콘" />
                <S.MessageTitle>회원가입을 실패했어요</S.MessageTitle>
                <S.MessageSubtitle>시작 화면으로 돌아가서 다시 시도해주세요</S.MessageSubtitle>
            </S.MessageContainer>
            <S.RetryButton to="/onboarding">시작 화면으로 돌아가기</S.RetryButton>
        </S.PageContainer>

    );
}