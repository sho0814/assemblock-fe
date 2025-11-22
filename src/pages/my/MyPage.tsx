import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MyPageContainer,
  HeaderBar,
  HeaderSlot,
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
  ReviewTabContainer,
  ReviewTab,
  ReviewBlock,
  ReviewBlockImage,
  ReviewBlockText,
  ProfileEditButton,
  MyBlock,
  MyBlockHeader,
  BlockdivTab,
  BlockTab,
  BlockListWrapper,
  BlockContent,
  BlockContentImage,
  BlockContentText,
  PartLabel,
} from './MyPage.styled';
import linkIcon from '@assets/MyPage/link.svg';
import folderIcon from '@assets/MyPage/folder.svg';
import ReviewBlockDefault from '@assets/MyPage/ReviewBlockDefault.svg';
import AssemBlcokDefault from '@assets/MyPage/AssemBlcokDefault.svg';
import Img1 from '@assets/common/ProfileImg/Img1.svg';
import { ProfileAct, type ProfileData } from '@components/common/ProfileAct';
import BlockList from '@components/block/MyBlockCard';
import type { ReviewData } from '../../types/database';

export function MyPage() {
    const [activeTab, setActiveTab] = useState<'all' | 'idea' | 'tech'>('all');
    const [activeReviewTab, setActiveReviewTab] = useState<'received' | 'sent'>('received');
    const [reviews, setReviews] = useState<ReviewData[]>([]);
    const [hasReviews, setHasReviews] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
    const [userProfile, setUserProfile] = useState<{
      nickname: string;
      introduction: string;
      selectedParts: string[];
      portfolioUrl: string;
      fileName: string;
      fileData?: string;
    } | null>(null);
    const [hasBlocks, setHasBlocks] = useState(false);
    const navigate = useNavigate();

    const parts = [
      { id: 'planning', label: '기획', color: '#35CDFF' },
      { id: 'design', label: '디자인', color: '#FF1BB3' },
      { id: 'frontend', label: '프론트엔드', color: '#FF6017' },
      { id: 'backend', label: '백엔드', color: '#B8EB00' },
      { id: 'pm', label: 'PM', color: '#6F35FF' },
    ];

    useEffect(() => {
      // localStorage에서 선택된 프로필 정보 읽기 나중에 연결하기
      const savedProfile = localStorage.getItem('selectedProfile');
      if (savedProfile) {
        try {
          const profile = JSON.parse(savedProfile) as ProfileData;
          setSelectedProfile(profile);
        } catch (e) {
          console.error('Failed to parse saved profile:', e);
        }
      }
      
      // localStorage에서 저장된 프로필 데이터 읽기 나중에 연결하기
      const savedUserProfile = localStorage.getItem('userProfile');
      if (savedUserProfile) {
        try {
          const profile = JSON.parse(savedUserProfile);
          setUserProfile(profile);
        } catch (e) {
          console.error('Failed to parse saved user profile:', e);
        }
      }
      
      // localStorage에서 저장된 블록 목록 확인
      const savedBlocks = localStorage.getItem('registeredBlocks');
      if (savedBlocks) {
        try {
          const blocks = JSON.parse(savedBlocks);
          setHasBlocks(blocks && blocks.length > 0);
        } catch (e) {
          console.error('Failed to parse saved blocks:', e);
        }
      }
      
      // localStorage에서 저장된 후기 목록 확인 (추후 연결)
      const savedReviews = localStorage.getItem('reviews');
      if (savedReviews) {
        try {
          const parsedReviews = JSON.parse(savedReviews) as ReviewData[];
          setReviews(parsedReviews);
          setHasReviews(parsedReviews && parsedReviews.length > 0);
        } catch (e) {
          console.error('Failed to parse saved reviews:', e);
        }
      }
    }, []);
    
    return (
      <MyPageContainer>
        <HeaderBar>
          <HeaderSlot />
          <HeaderSlot>
            <CenterTextBox>마이페이지</CenterTextBox>
          </HeaderSlot>
          <HeaderSlot />
        </HeaderBar>
        <Profile>
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
              <strong className='l600'>{userProfile?.nickname ? `${userProfile.nickname}님` : 'Username 님'}</strong>
              {userProfile?.selectedParts && userProfile.selectedParts.length > 0 && (
                <>
                  {userProfile.selectedParts.map((partId) => {
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
            <UserIntroduction>{userProfile?.introduction || '한 줄 소개'}</UserIntroduction>
          </RightColumn>
        </Profile>
        <ProfileEditButton onClick={() => navigate('/My/ProfileEdit')}>
          프로필 수정하기
        </ProfileEditButton>
        <PortfolioDivider />
        <Portfolio>
          <PortfolioItem className="l600">나의 포트폴리오</PortfolioItem>
          <PortfolioItem className="l500" $isL500>
            <img src={linkIcon} alt="link" style={{ width: '18px', height: '18px', marginRight: '8px' }} />
            {userProfile?.portfolioUrl || '아직 등록된 링크가 없어요'}
          </PortfolioItem>
          <PortfolioItem className="l500" $isL500>
            <img src={folderIcon} alt="folder" style={{ width: '18px', height: '18px', marginRight: '8px' }} />
            {userProfile?.fileName ? (
              <PortfolioFileLink
                onClick={() => {
                  if (userProfile.fileData) {
                    try {
                      const base64Data = userProfile.fileData;
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
                      link.download = userProfile.fileName;
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
                {userProfile.fileName}
              </PortfolioFileLink>
            ) : (
              '아직 등록된 파일이 없어요'
            )}
          </PortfolioItem>

        </Portfolio>
        <Review>나의 후기블록 
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
          <MyBlockHeader>나의 어셈블록</MyBlockHeader>
          {/*블록 등록이랑 연결해서 조건식으로 바꾸기*/}
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
      </MyPageContainer>
    )
}


