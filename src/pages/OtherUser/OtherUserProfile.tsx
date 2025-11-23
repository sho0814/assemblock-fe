import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ProfileContainer,
  HeaderBar,
  HeaderSlot,
  BackButton,
  CenterTextBox,
  Profile,
  ProfileImg,
  RightColumn,
  UserInfo,
  UserIntroduction,
  Portfolio,
  PortfolioItem,
  PortfolioFileLink,
  PortfolioDivider,
  Review,
  ReviewTitle,
  ReviewTabContainer,
  ReviewTab,
  ReviewBlock,
  ReviewBlockImage,
  ReviewBlockText,
  MyBlock,
  MyBlockHeader,
  BlockdivTab,
  BlockTab,
  BlockListWrapper,
  BlockContent,
  BlockContentImage,
  BlockContentText,
  PartLabel,
} from './OtherUserProfile.styled';
import linkIcon from '@assets/MyPage/link.svg';
import folderIcon from '@assets/MyPage/folder.svg';
import ReviewBlockDefault from '@assets/MyPage/ReviewBlockDefault.svg';
import AssemBlcokDefault from '@assets/MyPage/AssemBlcokDefault.svg';
import Img1 from '@assets/common/ProfileImg/Img1.svg';
import { ProfileAct, type ProfileData } from '@components/common/ProfileAct';
import BlockList from '@components/block/MyBlockCard';
import type { Block } from '../../types/database';

export function OtherUserProfile() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId'); //사용자 ID 가져오기 (추후 연결)
  
  const [activeTab, setActiveTab] = useState<'all' | 'idea' | 'tech'>('all');
  const [activeReviewTab, setActiveReviewTab] = useState<'received' | 'sent'>('received');
  const [hasReviews, setHasReviews] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  const [otherUserProfile, setOtherUserProfile] = useState<{
    user_id: number;
    nickname: string;
    introduction: string;
    selectedParts: string[];
    portfolioUrl: string;
    fileName: string;
    fileData?: string;
  } | null>(null);
  const [hasBlocks, setHasBlocks] = useState(false);

  const parts = [
    { id: 'planning', label: '기획', color: '#35CDFF' },
    { id: 'design', label: '디자인', color: '#FF1BB3' },
    { id: 'frontend', label: '프론트엔드', color: '#FF6017' },
    { id: 'backend', label: '백엔드', color: '#B8EB00' },
    { id: 'pm', label: 'PM', color: '#6F35FF' },
  ];

  useEffect(() => {
    // 추후 연결: API에서 다른 사용자 프로필 정보 가져오기
    // const fetchUserProfile = async () => {
    //   const response = await fetch(`/api/users/${userId}`);
    //   const data = await response.json();
    //   setOtherUserProfile(data);
    // };
    
    // 임시 데이터 (추후 연결)
    const tempUserProfile = {
      user_id: 1, // 추후 연결
      nickname: '유달수',
      introduction: '한 줄 소개',
      selectedParts: ['design', 'planning'],
      portfolioUrl: '',
      fileName: '',
    };
    setOtherUserProfile(tempUserProfile);
    
    // 프로필 이미지 (추후 연결)
    const tempProfile: ProfileData = {
      id: 'img1',
      src: Img1,
      alt: 'backend',
      colorMap: {
        '#C2C1C3': '#2E3B00',
        '#F0EFF1': '#B8EB00'
      }
    };
    setSelectedProfile(tempProfile);
    
    // 추후 연결: API에서 다른 사용자의 블록 목록 가져오기
    // const fetchUserBlocks = async () => {
    //   const response = await fetch(`/api/users/${userId}/blocks`);
    //   const data = await response.json();
    //   setHasBlocks(data && data.length > 0);
    // };
    
    // 추후 연결: API에서 다른 사용자의 후기 목록 가져오기
    // const fetchUserReviews = async () => {
    //   const response = await fetch(`/api/users/${userId}/reviews`);
    //   const data = await response.json();
    //   setHasReviews(data && data.length > 0);
    //   setReviewCount(data.length);
    // };
    
    // 임시: localStorage에서 확인 (추후 연결)
    const savedBlocks = localStorage.getItem('registeredBlocks');
    if (savedBlocks) {
      try {
        const parsedBlocks = JSON.parse(savedBlocks) as Block[];
        setHasBlocks(parsedBlocks && parsedBlocks.length > 0);
      } catch (e) {
        console.error('Failed to parse saved blocks:', e);
      }
    }
    
  }, [userId]);

  return (
    <ProfileContainer>
      <HeaderBar>
        <HeaderSlot>
          <BackButton onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke="#352F36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </BackButton>
        </HeaderSlot>
        <HeaderSlot>
          <CenterTextBox>프로필</CenterTextBox>
        </HeaderSlot>
        <HeaderSlot />
      </HeaderBar>
      <Profile>
        {/* 다른 사용자 프로필과 연동 */}
        <ProfileImg>
          {selectedProfile ? (
            <ProfileAct profile={selectedProfile} isSelected={true} size="small" />
          ) : (
            <ProfileAct 
              profile={{
                id: 'img1',
                src: Img1,
                alt: 'backend',
                colorMap: {
                  '#C2C1C3': '#2E3B00',
                  '#F0EFF1': '#B8EB00'
                }
              }} 
              isSelected={true} 
              size="small" 
            />
          )}
        </ProfileImg>
        <RightColumn>
          <UserInfo>
            <strong className='l600'>{otherUserProfile?.nickname ? `${otherUserProfile.nickname}님` : 'Username 님'}</strong>
            {otherUserProfile?.selectedParts && otherUserProfile.selectedParts.length > 0 && (
              <>
                {otherUserProfile.selectedParts.map((partId) => {
                  const part = parts.find(p => p.id === partId);
                  return part ? (
                    <PartLabel key={partId} $color={part.color}>
                      {part.label}
                    </PartLabel>
                  ) : null;
                })}
              </>
            )}
          </UserInfo>
          <UserIntroduction>{otherUserProfile?.introduction || '한 줄 소개'}</UserIntroduction>
        </RightColumn>
      </Profile>
      <PortfolioDivider />
      <Portfolio>
        <PortfolioItem className="l600">{otherUserProfile?.nickname ? `${otherUserProfile.nickname}님의 포트폴리오` : '포트폴리오'}</PortfolioItem>
        <PortfolioItem className="l500" $isL500>
          <img src={linkIcon} alt="link" style={{ width: '18px', height: '18px', marginRight: '8px' }} />
          {otherUserProfile?.portfolioUrl || '아직 등록된 링크가 없어요'}
        </PortfolioItem>
        <PortfolioItem className="l500" $isL500>
          <img src={folderIcon} alt="folder" style={{ width: '18px', height: '18px', marginRight: '8px' }} />
          {otherUserProfile?.fileName ? (
            <PortfolioFileLink
              onClick={() => {
                if (otherUserProfile.fileData) {
                  try {
                    const base64Data = otherUserProfile.fileData;
                    const base64Match = base64Data.match(/^data:([^;]+);base64,(.+)$/);
                    
                    if (!base64Match) {
                      alert('파일 형식이 올바르지 않습니다.');
                      return;
                    }
                    
                    const mimeType = base64Match[1];
                    const base64String = base64Match[2];
                    const byteString = atob(base64String);
                    const ab = new ArrayBuffer(byteString.length);
                    const ia = new Uint8Array(ab);
                    
                    for (let i = 0; i < byteString.length; i++) {
                      ia[i] = byteString.charCodeAt(i);
                    }
                    
                    const blob = new Blob([ab], { type: mimeType });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = otherUserProfile.fileName;
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                  } catch (error) {
                    console.error('Error downloading file:', error);
                    alert('파일 다운로드 중 오류가 발생했습니다.');
                  }
                } else {
                  console.warn('File data is missing');
                  alert('파일 데이터가 없습니다.');
                }
              }}
            >
              {otherUserProfile.fileName}
            </PortfolioFileLink>
          ) : (
            '아직 등록된 파일이 없어요'
          )}
        </PortfolioItem>
      </Portfolio>
      <Review>
        <ReviewTitle>
          {otherUserProfile?.nickname ? `${otherUserProfile.nickname}님의 후기블록` : '후기블록'}
        </ReviewTitle>
        {hasReviews && (
          <ReviewTabContainer>
            <ReviewTab 
              $isActive={activeReviewTab === 'received'}
              onClick={() => setActiveReviewTab('received')}
            >
              받은 후기
            </ReviewTab>
            <ReviewTab 
              $isActive={activeReviewTab === 'sent'}
              onClick={() => setActiveReviewTab('sent')}
            >
              보낸 후기
            </ReviewTab>
          </ReviewTabContainer>
        )}
        {!hasReviews ? (
          <ReviewBlock>
            <ReviewBlockImage src={ReviewBlockDefault} alt="Review Block Default" />
            <ReviewBlockText>아직 받은 후기 블록이 없어요</ReviewBlockText>
          </ReviewBlock>
        ) : (
          <ReviewBlock>
            {/* 추후 연결: 받은 후기/보낸 후기 목록 렌더링 */}
            {activeReviewTab === 'received' ? (
              <ReviewBlockText>받은 후기 목록 (추후 연결)</ReviewBlockText>
            ) : (
              <ReviewBlockText>보낸 후기 목록 (추후 연결)</ReviewBlockText>
            )}
          </ReviewBlock>
        )}
      </Review>
      <MyBlock>
        <MyBlockHeader>{otherUserProfile?.nickname ? `${otherUserProfile.nickname}님의 어셈블록` : '어셈블록'}</MyBlockHeader>
        {hasBlocks && (
          <BlockdivTab>
            <BlockTab 
              $isActive={activeTab === 'all'}
              onClick={() => setActiveTab('all')}
            >
              모든 블록
            </BlockTab>
            <BlockTab 
              $isActive={activeTab === 'idea'}
              onClick={() => setActiveTab('idea')}
            >
              아이디어 블록
            </BlockTab>
            <BlockTab 
              $isActive={activeTab === 'tech'}
              onClick={() => setActiveTab('tech')}
            >
              기술 블록
            </BlockTab>
          </BlockdivTab>
        )}
        <BlockListWrapper>
          {hasBlocks ? (
            <BlockList activeTab={activeTab} />
          ) : (
            <BlockContent>
              <BlockContentImage src={AssemBlcokDefault} alt="Assem Block Default" />
              <BlockContentText>아직 등록한 어셈블록이 없어요</BlockContentText>
            </BlockContent>
          )}
        </BlockListWrapper>
      </MyBlock>
    </ProfileContainer>
  );
}

