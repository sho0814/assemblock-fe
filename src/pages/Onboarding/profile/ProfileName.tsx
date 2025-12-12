import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleHeader from '@components/shared/SimpleHeader';
import CommonButton from '@components/shared/CommonButton';
import * as S from './ProfileName.styled';
import closeIcon from '@assets/board/close.svg';

export function ProfileName() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');

  const handleClear = () => {
    setNickname('');
  };

  const handleConfirm = () => {
    // 닉네임 유효성 검사
    if (!nickname || nickname.trim().length === 0) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    
    if (nickname.length > 5) {
      alert('닉네임은 5자까지 입력할 수 있어요.');
      return;
    }
    
    // 한/영문 및 숫자만 허용하는지 확인
    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    if (!nicknameRegex.test(nickname)) {
      alert('닉네임은 한/영문 및 숫자만 입력할 수 있어요.');
      return;
    }

    // localStorage에 닉네임 저장
    const savedUserProfile = localStorage.getItem('userProfile');
    let profileData = savedUserProfile ? JSON.parse(savedUserProfile) : {};
    
    profileData = {
      ...profileData,
      nickname: nickname.trim(),
    };
    
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    
    navigate('/Onboarding/ProfilePart');
  };

  const handleLater = () => {
    navigate('/Home');
  };

  return (
    <>
      <S.HeaderWrapper>
        <SimpleHeader title="프로필 설정" />
      </S.HeaderWrapper>
      <S.Container>
        <S.MainInstructionText>닉네임을 입력해주세요</S.MainInstructionText>
        <S.WarningText>
          욕설, 비속어, 광고성 문구 등 부적절한 닉네임은 제한될 수 있어요
        </S.WarningText>
        
        <S.Label>닉네임</S.Label>
        <S.InputContainer>
          <S.InputField
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={5}
            placeholder="닉네임을 입력하세요"
          />
          {nickname && (
            <S.ClearButton onClick={handleClear}>
              <img src={closeIcon} alt="clear" />
            </S.ClearButton>
          )}
        </S.InputContainer>
        <S.HelperText>영문/한글/숫자 5자까지 입력 가능해요</S.HelperText>

        <S.Footer>
          <CommonButton
            content="확인"
            width="100%"
            onClick={handleConfirm}
          />
          <S.LaterLink onClick={handleLater}>나중에 하기</S.LaterLink>
        </S.Footer>
      </S.Container>
    </>
  );
}

