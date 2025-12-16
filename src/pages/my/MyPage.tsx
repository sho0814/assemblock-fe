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
  ReviewGridContainer,
  ReviewGridCell,
  ReviewGridBlock,
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
import pattern from '@assets/project/pattern.png';
import Img1 from '@assets/common/ProfileImg/Img1.svg';
import Img2 from '@assets/common/ProfileImg/Img2.svg';
import Img3 from '@assets/common/ProfileImg/Img3.svg';
import Img4 from '@assets/common/ProfileImg/Img4.svg';
import Img5 from '@assets/common/ProfileImg/Img5.svg';
import { ProfileAct, type ProfileData } from '@components/common/ProfileAct';
import { getReviewImage } from '@components/my/ReviewBlockImgMap';
import BlockList from '@components/block/MyBlockCard';
import type { BlockData } from '@components/block/MyBlockCard';
import { getMyProfile } from '@api/users/me';
import { type ProfileInfo } from '@api/mypage/profile';
import { getMyReviews, type MyReview } from '@api/mypage/reviews';
import { getMyBlocks, type MyBlock as MyBlockApi } from '@api/mypage/blocks';


export function MyPage() {
    const [activeTab, setActiveTab] = useState<'all' | 'idea' | 'tech'>('all');
    const [activeReviewTab, setActiveReviewTab] = useState<'received' | 'sent'>('received');
    const [reviews, setReviews] = useState<MyReview[]>([]);
    const [hasReviews, setHasReviews] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
    const [userProfile, setUserProfile] = useState<ProfileInfo | null>(null);
    const [hasBlocks, setHasBlocks] = useState(false);
    const [blocks, setBlocks] = useState<BlockData[]>([]);
    const navigate = useNavigate();

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
      const fetchData = async () => {
        try {
          // 프로필 정보 API 호출
          try {
            const profileData = await getMyProfile();
            console.log('Profile data from API:', profileData); // 디버깅용
            
            // 백엔드 응답이 snake_case일 수 있으므로 camelCase로 변환
            // mainRoles를 selectedParts로 변환 (백엔드 roles -> 프론트엔드 part IDs)
            const roleToPartId: Record<string, string> = {
              'Plan': 'planning',
              'Design': 'design',
              'FrontEnd': 'frontend',
              'BackEnd': 'backend',
              'PM': 'pm',
            };
            
            // API 응답에서 roles 사용 (UserMeResponse 타입)
            const backendRoles = profileData.roles || [];
            const convertedParts = backendRoles.length > 0 
              ? backendRoles.map((role: string) => roleToPartId[role] || role.toLowerCase())
              : [];
            
            // 필드명 변환
            const profileType = profileData.profileType || '';
            
            // portfolioPdfUrl
            const portfolioPdfUrl = profileData.portfolioPdfUrl || '';
            
            const portfolioUrl = profileData.portfolioUrl || '';
            
            // 파일명 가져오기 (API 응답에서 또는 URL에서 추출)
            let portfolioFileName = (profileData as any).portfolio_file_name 
              || (profileData as any).portfolioFileName
              || (profileData as any).fileName
              || '';
            
            // URL에서 파일명 추출 (파일명이 없을 경우)
            if (!portfolioFileName && portfolioPdfUrl) {
              try {
                const url = new URL(portfolioPdfUrl);
                const pathname = url.pathname;
                const fileNameFromUrl = pathname.split('/').pop() || '';
                if (fileNameFromUrl) {
                  portfolioFileName = decodeURIComponent(fileNameFromUrl);
                }
              } catch (e) {
                // URL 파싱 실패 시 전체 URL에서 파일명 추출 시도
                const match = portfolioPdfUrl.match(/\/([^\/]+\.pdf)$/i);
                if (match) {
                  portfolioFileName = decodeURIComponent(match[1]);
                }
              }
            }
            
            console.log('Portfolio URLs:', { portfolioUrl, portfolioPdfUrl, portfolioFileName }); // 디버깅용
            
            const convertedProfile: ProfileInfo = {
              nickname: profileData.nickname || (profileData as any).nickname || '',
              introduction: profileData.introduction || (profileData as any).introduction || '',
              selectedParts: convertedParts,
              portfolioUrl: portfolioUrl,
              portfolioPdfUrl: portfolioPdfUrl,
              portfolioFileName: portfolioFileName,
              profileType: profileType,
            };
            
            setUserProfile(convertedProfile);
            
            // API에서 받은 profileType을 기반으로 프로필 이미지 설정
            if (profileType && profileTypeToImage[profileType]) {
              setSelectedProfile(profileTypeToImage[profileType]);
            } else {
              // profileType이 없으면 기본값 (Type_1)
              setSelectedProfile(profileTypeToImage['Type_1']);
            }
          } catch (error) {
            console.error('Failed to fetch profile:', error);
            // API 실패 시 localStorage에서 가져오기 (fallback)
            const savedUserProfile = localStorage.getItem('userProfile');
            const savedProfile = localStorage.getItem('selectedProfile');
            
            if (savedUserProfile) {
              try {
                const localProfile = JSON.parse(savedUserProfile);
                setUserProfile({
                  nickname: localProfile.nickname || '',
                  introduction: localProfile.introduction || '',
                  selectedParts: localProfile.selectedParts || [],
                  portfolioUrl: localProfile.portfolioUrl || '',
                  portfolioPdfUrl: localProfile.fileData ? 'data:application/pdf;base64,' + localProfile.fileData.split(',')[1] : undefined,
                  portfolioFileName: localProfile.fileName || '',
                });
              } catch (e) {
                console.error('Failed to parse saved user profile:', e);
              }
            }
            
            // localStorage에서 프로필 이미지 가져오기 (fallback)
            if (savedProfile) {
              try {
                setSelectedProfile(JSON.parse(savedProfile) as ProfileData);
              } catch (e) {
                console.error('Failed to parse selected profile:', e);
                // 기본값 설정
                setSelectedProfile(profileTypeToImage['Type_1']);
              }
            } else {
              // 기본값 설정
              setSelectedProfile(profileTypeToImage['Type_1']);
            }
          }
          
          // 블록 목록 API 호출
          try {
            const blockType = activeTab === 'all' ? 'ALL' : activeTab === 'idea' ? 'IDEA' : 'TECHNOLOGY';
            const myBlocks = await getMyBlocks(blockType);
            
            // MyBlock[]을 BlockData[]로 변환
            const convertedBlocks: BlockData[] = myBlocks.map((block: MyBlockApi) => ({
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
              techparts: [], // techPart는 문자열이므로 techparts는 빈 배열로 설정
            }));
            
            setBlocks(convertedBlocks);
            setHasBlocks(convertedBlocks.length > 0);
          } catch (error) {
            console.error('Failed to fetch blocks:', error);
            // API 실패 시 localStorage에서 가져오기 (fallback)
            const savedBlocks = localStorage.getItem('registeredBlocks');
            if (savedBlocks) {
              try {
                const parsedBlocks = JSON.parse(savedBlocks) as BlockData[];
                setBlocks(parsedBlocks);
                setHasBlocks(parsedBlocks.length > 0);
              } catch (e) {
                console.error('Failed to parse saved blocks:', e);
                setBlocks([]);
                setHasBlocks(false);
              }
            } else {
              setBlocks([]);
              setHasBlocks(false);
            }
          }
          
          // 후기 목록 API 호출
          try {
            // 받은 후기 또는 작성한 후기 조회
            // 'PARTICIPATION' (내가 받은 제안/리뷰)
            // 'SCOUTING' (내가 보낸 제안/리뷰)
            const reviewType = activeReviewTab === 'received' ? 'PARTICIPATION' : 'SCOUTING';
            const reviewsData = await getMyReviews(reviewType);
            setReviews(reviewsData);
            setHasReviews(reviewsData && reviewsData.length > 0);
          } catch (error: any) {
            console.error('Failed to fetch reviews:', error);
            // API 실패 시 localStorage에서 가져오기 (fallback)
            const savedReviews = localStorage.getItem('reviews');
            if (savedReviews) {
              try {
                const parsedReviews = JSON.parse(savedReviews);
                setReviews(parsedReviews);
                setHasReviews(parsedReviews && parsedReviews.length > 0);
              } catch (e) {
                console.error('Failed to parse saved reviews:', e);
                setReviews([]);
                setHasReviews(false);
              }
            } else {
              setReviews([]);
              setHasReviews(false);
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, [activeTab, activeReviewTab]);

    // 블록 배치 로직: 아래에서 위로, 최하단 행부터 랜덤 배치
    const placeReviewBlocks = (receivedReviews: MyReview[]): Array<{ col: number; row: number; review: MyReview; imageSrc: string } | null> => {
      const grid: Array<{ col: number; row: number; review: MyReview; imageSrc: string } | null> = new Array(20).fill(null);
      const occupied = new Set<string>(); // "col,row" 형식으로 저장

      // 받은 후기만 처리 (activeReviewTab === 'received'일 때만)
      if (activeReviewTab !== 'received') {
        return grid;
      }

      // 현재 사용자의 mainRoles 가져오기 (받은 사용자의 역할)
      const userMainRoles = userProfile?.selectedParts || [];
      if (userMainRoles.length === 0) {
        return grid;
      }

      // 각 리뷰에 대해 이미지 결정 및 배치
      receivedReviews.forEach((review) => {
        // API 응답의 targetUserMainRole 사용 (받은 사용자의 역할)
        // targetUserMainRole은 'BackEnd', 'Design', 'FrontEnd', 'Plan', 'PM' 형식
        // TODO: rating 필드가 API 응답에 포함되면 (review as any).rating 전달
        const imageSrc = getReviewImage(review.targetUserMainRole);
        if (!imageSrc) return;

        // 배치할 위치 찾기 (아래에서 위로, 최하단 행부터)
        for (let row = 1; row <= 4; row++) {
          // 해당 행의 빈 칸 찾기
          const emptyCells: number[] = [];
          for (let col = 1; col <= 5; col++) {
            const key = `${col},${row}`;
            if (!occupied.has(key)) {
              emptyCells.push(col);
            }
          }

          // 빈 칸이 있으면 랜덤으로 하나 선택
          if (emptyCells.length > 0) {
            const randomCol = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const key = `${randomCol},${row}`;
            occupied.add(key);
            
            // 그리드 인덱스 계산 (1-based to 0-based)
            const gridIndex = (row - 1) * 5 + (randomCol - 1);
            grid[gridIndex] = { col: randomCol, row, review, imageSrc };
            break;
          }
        }

        // 모든 행이 채워져 있어도 배치하지 못한 경우는 무시
      });

      return grid;
    };

    // 받은 후기만 그리드에 표시
    const receivedReviews = activeReviewTab === 'received' ? reviews : [];
    const reviewGrid = placeReviewBlocks(receivedReviews);
    
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
                  {userProfile.selectedParts.map((partId, index) => {
                    const part = parts.find(p => p.id === partId);
                    return part ? (
                      <PartLabel key={`${partId}-${index}`} $color={part.color}>
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
            <img src={linkIcon} alt="link" style={{ width: '18px', height: '18px', flexShrink: 0 }} />
            <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {userProfile?.portfolioUrl || '아직 등록된 링크가 없어요'}
            </span>
          </PortfolioItem>
          <PortfolioItem className="l500" $isL500>
            <img src={folderIcon} alt="folder" style={{ width: '18px', height: '18px', flexShrink: 0 }} />
            {userProfile?.portfolioPdfUrl ? (
              <PortfolioFileLink
                onClick={() => {
                  // PDF URL이 있으면 새 창에서 열기
                  if (userProfile.portfolioPdfUrl) {
                    window.open(userProfile.portfolioPdfUrl, '_blank');
                  }
                }}
              >
                {userProfile.portfolioFileName || '포트폴리오 파일'}
              </PortfolioFileLink>
            ) : (
              <span style={{ flex: 1, minWidth: 0 }}>아직 등록된 파일이 없어요</span>
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
          {!hasReviews || activeReviewTab === 'sent' ? (
            <ReviewBlock $hasReviews={false}>
              <ReviewBlockImage src={ReviewBlockDefault} alt="Review Block Default" />
              <ReviewBlockText>
                {!hasReviews 
                  ? '아직 받은 후기 블록이 없어요'
                  : activeReviewTab === 'sent' 
                    ? `보낸 후기 ${reviews.length}개`
                    : '아직 받은 후기 블록이 없어요'}
              </ReviewBlockText>
            </ReviewBlock>
          ) : (
            <ReviewGridContainer $hasReviews={true} $patternImage={pattern}>
              {reviewGrid.map((block, index) => {
                const col = (index % 5) + 1;
                const row = Math.floor(index / 5) + 1;
                return (
                  <ReviewGridCell key={index} $col={col} $row={row}>
                    {block && (
                      <ReviewGridBlock src={block.imageSrc} alt={`Review block ${block.review.reviewId}`} />
                    )}
                  </ReviewGridCell>
                );
              })}
            </ReviewGridContainer>
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
              <BlockList blocks={blocks} activeTab={activeTab} isMyBlock={true} />
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