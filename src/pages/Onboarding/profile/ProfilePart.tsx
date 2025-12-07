import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleHeader from '@components/shared/SimpleHeader';
import CommonButton from '@components/shared/CommonButton';
import * as S from './ProfilePart.styled';

export function ProfilePart() {
  const navigate = useNavigate();
  const [selectedParts, setSelectedParts] = useState<string[]>([]);

  const parts = [
    { id: 'planning', label: '기획', color: '#35CDFF' },
    { id: 'design', label: '디자인', color: '#FF1BB3' },
    { id: 'frontend', label: '프론트엔드', color: '#FF6017' },
    { id: 'backend', label: '백엔드', color: '#B8EB00' },
    { id: 'pm', label: 'PM', color: '#6F35FF' },
  ];

  const togglePart = (partId: string) => {
    setSelectedParts(prev => 
      prev.includes(partId) 
        ? prev.filter(id => id !== partId)
        : [...prev, partId]
    );
  };

  const handleConfirm = () => {
    // localStorage에 선택된 파트 저장
    const savedUserProfile = localStorage.getItem('userProfile');
    let profileData = savedUserProfile ? JSON.parse(savedUserProfile) : {};
    
    profileData = {
      ...profileData,
      selectedParts: selectedParts,
    };
    
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    navigate('/Onboarding/ProfileImage');
  };

  return (
    <>
      <SimpleHeader title="프로필 설정" />
      <S.Container>
        <S.MainInstructionText>파트를 선택해주세요</S.MainInstructionText>
        <S.SubInstructionText>파트는 중복 선택할 수 있어요</S.SubInstructionText>
        
        <S.PartButtonContainer>
          {parts.map((part) => (
            <S.PartButton
              key={part.id}
              $isSelected={selectedParts.includes(part.id)}
              $color={part.color}
              onClick={() => togglePart(part.id)}
            >
              {part.label}
            </S.PartButton>
          ))}
        </S.PartButtonContainer>

        <S.Footer>
          <CommonButton
            content="확인"
            width="100%"
            onClick={handleConfirm}
            disabled={selectedParts.length === 0}
          />
        </S.Footer>
      </S.Container>
    </>
  );
}

