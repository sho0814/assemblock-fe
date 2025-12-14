import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SimpleHeader from '@components/shared/SimpleHeader';
import {
  MyPageContainer, 
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
import pattern from '@assets/project/pattern.png';
import Img1 from '@assets/common/ProfileImg/Img1.svg';
import Img2 from '@assets/common/ProfileImg/Img2.svg';
import Img3 from '@assets/common/ProfileImg/Img3.svg';
import Img4 from '@assets/common/ProfileImg/Img4.svg';
import Img5 from '@assets/common/ProfileImg/Img5.svg';
import { ProfileAct, type ProfileData } from '@components/common/ProfileAct';
import BlockList from '@components/block/MyBlockCard';
import type { BlockData } from '@components/block/MyBlockCard';
import { getUserProfile } from '@api/profiles/profile';
import { getUserReviews, type UserReview } from '@api/profiles/reviews';
import { getUserBlocks } from '@api/profiles/blocks';

export function OtherUserProfile() {
    const [activeTab, setActiveTab] = useState<'all' | 'idea' | 'tech'>('all');
    const [reviews, setReviews] = useState<UserReview[]>([]);
    const [hasReviews, setHasReviews] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
    const [userProfile, setUserProfile] = useState<{
      nickname: string;
      introduction: string;
      selectedParts: string[];
      portfolioUrl: string;
      fileName: string;
      portfolioPdfUrl?: string;
    } | null>(null);
    const [hasBlocks, setHasBlocks] = useState(false);
    const [blocks, setBlocks] = useState<BlockData[]>([]);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const parts = [
      { id: 'planning', label: '기획', color: '#35CDFF' },
      { id: 'design', label: '디자인', color: '#FF1BB3' },
      { id: 'frontend', label: '프론트엔드', color: '#FF6017' },
      { id: 'backend', label: '백엔드', color: '#B8EB00' },
      { id: 'pm', label: 'PM', color: '#6F35FF' },
    ];

    // 프로필 타입에 따른 이미지 매핑
    const profileTypeToImage: Record<string, ProfileData> = {
      'Type_1': {
        id: 'img1',
        src: Img1,
        alt: 'backend',
        colorMap: {
          '#C2C1C3': '#2E3B00',
          '#F0EFF1': '#B8EB00'
        }
      },
      'Type_2': {
        id: 'img2',
        src: Img2,
        alt: 'design',
        colorMap: {
          '#C2C1C3': '#FF1BB3',
          '#F0EFF1': '#4D0836'
        }
      },
      'Type_3': {
        id: 'img3',
        src: Img3,
        alt: 'frontend',
        colorMap: {
          '#C2C1C3': '#FF6017',
          '#F0EFF1': '#4D1D07'
        }
      },
      'Type_4': {
        id: 'img4',
        src: Img4,
        alt: 'plan',
        colorMap: {
          '#C2C1C3': '#35CDFF',
          '#F0EFF1': '#103E4D'
        }
      },
      'Type_5': {
        id: 'img5',
        src: Img5,
        alt: 'pm',
        colorMap: {
          '#C2C1C3': '#6F35FF',
          '#F0EFF1': '#22104D'
        }
      },
    };

    useEffect(() => {
      const fetchUserProfile = async () => {
        // URL에서 userId 가져오기
        const userIdParam = searchParams.get('userId');
        if (!userIdParam) {
          console.error('userId가 없습니다.');
          return;
        }

        const userId = parseInt(userIdParam, 10);
        if (isNaN(userId)) {
          console.error('유효하지 않은 userId:', userIdParam);
          return;
        }

        try {
          // API에서 프로필 정보 가져오기
          const profileData = await getUserProfile(userId);
          
          // 백엔드 mainRoles를 프론트엔드 part IDs로 변환
          const roleToPartId: Record<string, string> = {
            'Plan': 'planning',
            'Design': 'design',
            'FrontEnd': 'frontend',
            'BackEnd': 'backend',
            'PM': 'pm',
          };
          
          const convertedParts = profileData.mainRoles.length > 0 
            ? profileData.mainRoles.map((role: string) => roleToPartId[role] || role.toLowerCase())
            : [];
          
          // 파일명 추출 (portfolioPdfUrl에서)
          let portfolioFileName = '';
          if (profileData.portfolioPdfUrl) {
            try {
              const url = new URL(profileData.portfolioPdfUrl);
              const pathname = url.pathname;
              const fileNameFromUrl = pathname.split('/').pop() || '';
              if (fileNameFromUrl) {
                portfolioFileName = decodeURIComponent(fileNameFromUrl);
              }
            } catch (e) {
              const match = profileData.portfolioPdfUrl.match(/\/([^\/]+\.pdf)$/i);
              if (match) {
                portfolioFileName = decodeURIComponent(match[1]);
              }
            }
          }
          
          const convertedProfile = {
            nickname: profileData.nickname || '',
            introduction: profileData.introduction || '',
            selectedParts: convertedParts,
            portfolioUrl: profileData.portfolioUrl || '',
            fileName: portfolioFileName,
            portfolioPdfUrl: profileData.portfolioPdfUrl || '',
          };
          
          setUserProfile(convertedProfile);
          
          // 프로필 이미지 설정
          if (profileData.profileType && profileTypeToImage[profileData.profileType]) {
            setSelectedProfile(profileTypeToImage[profileData.profileType]);
          } else {
            setSelectedProfile(profileTypeToImage['Type_1']);
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          // API 실패 시 localStorage에서 가져오기 (fallback)
          const savedProfile = localStorage.getItem('selectedProfile');
          if (savedProfile) {
            try {
              setSelectedProfile(JSON.parse(savedProfile) as ProfileData);
            } catch (e) { console.error(e); }
          }
          
          const savedUserProfile = localStorage.getItem('userProfile');
          if (savedUserProfile) {
            try {
              setUserProfile(JSON.parse(savedUserProfile));
            } catch (e) { console.error(e); }
          }
        }
      };

      fetchUserProfile();
    }, [searchParams]);

    useEffect(() => {
      const fetchReviews = async () => {
        const userIdParam = searchParams.get('userId');
        if (!userIdParam) {
          return;
        }

        const userId = parseInt(userIdParam, 10);
        if (isNaN(userId)) {
          return;
        }

        try {
          // 해당 유저가 받은 후기만 가져오기 (PARTICIPATION)
          const reviewsData = await getUserReviews(userId, 'PARTICIPATION');
          setReviews(reviewsData);
          setHasReviews(reviewsData && reviewsData.length > 0);
        } catch (error) {
          console.error('Failed to fetch reviews:', error);
          // API 실패 시 빈 배열로 설정
          setReviews([]);
          setHasReviews(false);
        }
      };

      fetchReviews();
    }, [searchParams]);

    useEffect(() => {
      const fetchBlocks = async () => {
        const userIdParam = searchParams.get('userId');
        if (!userIdParam) {
          return;
        }

        const userId = parseInt(userIdParam, 10);
        if (isNaN(userId)) {
          return;
        }

        try {
          // activeTab에 따라 블록 타입 결정
          const blockType = activeTab === 'all' ? 'ALL' : activeTab === 'idea' ? 'IDEA' : 'TECHNOLOGY';
          const blocksData = await getUserBlocks(userId, blockType);
          
          // UserBlock을 BlockData 형식으로 변환
          const convertedBlocks = blocksData.map((block): BlockData => ({
            block_id: block.blockId,
            user_id: block.writerId,
            category_name: block.categoryName,
            block_title: block.blockTitle,
            block_type: block.blockType,
            contribution_score: block.contributionScore,
            tools_text: block.toolsText || null,
            oneline_summary: block.oneLineSummary,
            improvement_point: block.improvementPoint || null,
            result_url: block.resultUrl || null,
            result_file: block.resultFile || null,
            created_at: block.createdAt,
            techparts: block.techPart ? [] : [], // techPart는 문자열이므로 빈 배열로 설정 (필요시 변환 로직 추가)
          }));
          
          setBlocks(convertedBlocks);
          setHasBlocks(convertedBlocks && convertedBlocks.length > 0);
        } catch (error) {
          console.error('Failed to fetch blocks:', error);
          // API 실패 시 localStorage에서 가져오기 (fallback)
          const savedBlocks = localStorage.getItem('registeredBlocks');
          if (savedBlocks) {
            try {
              const parsedBlocks = JSON.parse(savedBlocks);
              setHasBlocks(parsedBlocks && parsedBlocks.length > 0);
            } catch (e) {
              console.error('Failed to parse saved blocks:', e);
              setHasBlocks(false);
            }
          } else {
            setHasBlocks(false);
          }
        }
      };

      fetchBlocks();
    }, [searchParams, activeTab]);
    
    return (
      <MyPageContainer>
        <SimpleHeader title="프로필" />
        
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
                  colorMap: { '#C2C1C3': '#2E3B00', '#F0EFF1': '#B8EB00' }
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
                  // 파일 다운로드 로직 (URL에서 직접 다운로드)
                  if (userProfile.portfolioPdfUrl) {
                    try {
                      const link = document.createElement('a');
                      link.href = userProfile.portfolioPdfUrl;
                      link.download = userProfile.fileName;
                      link.target = '_blank';
                      link.style.display = 'none';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    } catch (error) {
                      console.error(error);
                      alert('파일 다운로드 중 오류가 발생했습니다.');
                    }
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
          {!hasReviews ? (
            <ReviewBlock $hasReviews={false}>
              <ReviewBlockImage src={ReviewBlockDefault} alt="Review Block Default" />
              <ReviewBlockText>아직 받은 후기 블록이 없어요</ReviewBlockText>
            </ReviewBlock>
          ) : (
            <ReviewBlock $hasReviews={true} $patternImage={pattern}>
              {reviews.length > 0 ? (
                <ReviewBlockText>받은 후기 {reviews.length}개</ReviewBlockText>
              ) : (
                <ReviewBlockText>받은 후기</ReviewBlockText>
              )}
            </ReviewBlock>
          )}
        </Review>

        <MyBlock>
          <MyBlockHeader>나의 어셈블록</MyBlockHeader>
          {hasBlocks && (
            <BlockdivTab>
              <BlockTab $isActive={activeTab === 'all'} onClick={() => setActiveTab('all')}>모든 블록</BlockTab>
              <BlockTab $isActive={activeTab === 'idea'} onClick={() => setActiveTab('idea')}>아이디어 블록</BlockTab>
              <BlockTab $isActive={activeTab === 'tech'} onClick={() => setActiveTab('tech')}>기술 블록</BlockTab>
            </BlockdivTab>
          )}
          <BlockListWrapper>
            {hasBlocks ? (
              <BlockList blocks={blocks} activeTab={activeTab} />
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