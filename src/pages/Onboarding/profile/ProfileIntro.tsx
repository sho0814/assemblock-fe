import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleHeader from '@components/shared/SimpleHeader';
import CommonButton from '@components/shared/CommonButton';
import * as S from './ProfileIntro.styled';
import closeIcon from '@assets/board/close.svg';

export function ProfileIntro() {
  const navigate = useNavigate();
  const [introduction, setIntroduction] = useState('');

  const handleClear = () => {
    setIntroduction('');
  };

  const handleConfirm = () => {
    // 한 줄 소개 유효성 검사
    if (!introduction || introduction.trim().length === 0) {
      alert('한 줄 소개를 입력해주세요.');
      return;
    }
    
    if (introduction.length > 36) {
      alert('한 줄 소개는 36자까지 입력할 수 있어요.');
      return;
    }

    // localStorage에 한 줄 소개 저장 (introduction 키값 사용)
    const savedUserProfile = localStorage.getItem('userProfile');
    let profileData = savedUserProfile ? JSON.parse(savedUserProfile) : {};
    
    profileData = {
      ...profileData,
      introduction: introduction.trim(),
    };
    
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    navigate('/Onboarding/ProfilePortfolio');
  };

  const isFormValid = introduction.trim().length >= 1 && introduction.length <= 36;

  return (
    <>
      <SimpleHeader title="프로필 설정" />
      <S.Container>
        <S.MainInstructionText>자신을 한 줄로 소개해주세요</S.MainInstructionText>
        <S.WarningText>
          욕설, 비속어, 광고성 문구 등 부적절한 내용은 제한될 수 있어요
        </S.WarningText>
        
        <S.Label>한 줄 소개</S.Label>
        <S.InputContainer>
          <S.InputField
            type="text"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            maxLength={36}
            placeholder="한 줄 소개를 입력해주세요"
          />
          {introduction && (
            <S.ClearButton onClick={handleClear}>
              <img src={closeIcon} alt="clear" />
            </S.ClearButton>
          )}
        </S.InputContainer>
        <S.HelperText>한 줄 소개는 최대 36자까지 입력할 수 있어요</S.HelperText>

        <S.Footer>
          <CommonButton
            content="확인"
            width="100%"
            onClick={handleConfirm}
            disabled={!isFormValid}
          />
        </S.Footer>
      </S.Container>
    </>
  );
}

