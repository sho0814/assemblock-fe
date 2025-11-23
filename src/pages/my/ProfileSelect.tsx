import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ProfileSelectContainer,
  HeaderBar,
  HeaderSlot,
  CenterTextBox,
  BackButton,
  TextSection,
  MainText,
  SubText,
  ProfileGrid,
  ProfileItem,
  ProfileImage,
  ProfilePlaceholder,
  ConfirmBtn,
} from './ProfileSelect.styled';
import Img1 from '@assets/common/ProfileImg/Img1.svg';
import Img2 from '@assets/common/ProfileImg/Img2.svg';
import Img3 from '@assets/common/ProfileImg/Img3.svg';
import Img4 from '@assets/common/ProfileImg/Img4.svg';
import Img5 from '@assets/common/ProfileImg/Img5.svg';
import { ProfileAct, type ProfileData } from '@components/common/ProfileAct';

export function ProfileSelect() {
  const navigate = useNavigate();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const profiles: ProfileData[] = [
    { 
      id: 'img1', 
      src: Img1, 
      alt: 'backend',
      colorMap: {
        '#C2C1C3': '#2E3B00',
        '#F0EFF1': '#B8EB00'
      }
    },
    { 
      id: 'img2', 
      src: Img2, 
      alt: 'design',
      colorMap: {
        '#C2C1C3': '#FF1BB3',
        '#F0EFF1': '#4D0836'
      }
    },
    { 
      id: 'img3', 
      src: Img3, 
      alt: 'frontend',
      colorMap: {
        '#C2C1C3': '#FF6017',
        '#F0EFF1': '#4D1D07'
      }
    },
    { 
      id: 'img4', 
      src: Img4, 
      alt: 'plan',
      colorMap: {
        '#C2C1C3': '#35CDFF',
        '#F0EFF1': '#103E4D'
      }
    },
    { 
      id: 'img5', 
      src: Img5, 
      alt: 'pm',
      colorMap: {
        '#C2C1C3': '#6F35FF',
        '#F0EFF1': '#22104D'
      }
    }
  ];


  const handleSave = () => {
    if (selectedProfile) {
      const profile = profiles.find(p => p.id === selectedProfile);
      if (profile) {
        // localStorage에 선택된 프로필 정보 저장
        localStorage.setItem('selectedProfile', JSON.stringify({
          id: profile.id,
          src: profile.src,
          alt: profile.alt,
          colorMap: profile.colorMap
        }));
      }
    }
    
    // 저장 후 ProfileEdit로 이동
    navigate('/My/ProfileEdit');
  };

  return (
    <ProfileSelectContainer>
      <HeaderBar>
        <HeaderSlot>
          <BackButton onClick={() => navigate('/My/ProfileEdit')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke="#352F36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </BackButton>
        </HeaderSlot>
        <HeaderSlot>
          <CenterTextBox>프로필 이미지 설정</CenterTextBox>
        </HeaderSlot>
        <HeaderSlot />
      </HeaderBar>
      <TextSection>
        <MainText>프로필 이미지를 선택해주세요</MainText>
        <SubText>단일 선택 가능</SubText>
      </TextSection>
      <ProfileGrid>
        {profiles.map((profile) => (
          <ProfileItem
            key={profile.id}
            $selected={selectedProfile === profile.id}
            onClick={() => setSelectedProfile(profile.id)}
          >
            {profile.colorMap ? (
              <ProfileAct profile={profile} isSelected={selectedProfile === profile.id} size="large" />
            ) : (
              <ProfileImage src={profile.src} alt={profile.alt} />
            )}
          </ProfileItem>
        ))}
        <ProfilePlaceholder />
      </ProfileGrid>
      <ConfirmBtn onClick={handleSave}>
        확인
      </ConfirmBtn>
    </ProfileSelectContainer>
  );
}
