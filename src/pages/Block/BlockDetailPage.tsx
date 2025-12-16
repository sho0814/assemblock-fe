import { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import type { BlockData } from '@components/block/MyBlockCard';
import * as S from './BlockDetailPage.styled';
import backArrow from '@assets/common/back-arrow.svg';
import more from '@assets/common/more.svg';
import { ProfileAct, type ProfileData } from '@components/common/ProfileAct';
import Img1 from '@assets/common/ProfileImg/Img1.svg';
import Img2 from '@assets/common/ProfileImg/Img2.svg';
import Img3 from '@assets/common/ProfileImg/Img3.svg';
import Img4 from '@assets/common/ProfileImg/Img4.svg';
import Img5 from '@assets/common/ProfileImg/Img5.svg';
import linkIcon from '@assets/MyPage/link.svg';
import folderIcon from '@assets/MyPage/folder.svg';
import OptionMenu from '@components/block/OptionMenu';
import CancelGuide from '@components/block/CancleGuide';
import { useOverlay } from '@components/common/OverlayContext';
import { getBlockDetail, deleteBlock, type BlockDetailResponse } from '@api/blockId';

// Tech_parts 매핑 (API는 문자열을 반환)
const TECH_PARTS_MAP: Record<string, { name: string; color: string }> = {
  'DESIGN': { name: '디자인', color: '#FF1BB3' },
  'FRONTEND': { name: '프론트엔드', color: '#FF6017' },
  'BACKEND': { name: '백엔드', color: '#B8EB00' },
  'Design': { name: '디자인', color: '#FF1BB3' },
  'FrontEnd': { name: '프론트엔드', color: '#FF6017' },
  'BackEnd': { name: '백엔드', color: '#B8EB00' },
};

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

export function BlockDetailPage() {
  const { blockId: blockIdParam } = useParams<{ blockId?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showOverlay } = useOverlay();
  
  const [block, setBlock] = useState<BlockData | null>(null);
  const [blockDetailResponse, setBlockDetailResponse] = useState<BlockDetailResponse | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null); 
  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  const [userProfile, setUserProfile] = useState<{
    nickname: string;
    introduction: string;
    selectedParts: string[];
  } | null>(null);

  useEffect(() => {
    const fetchBlockData = async () => {
      // 라우트 파라미터 우선, 없으면 쿼리 파라미터 사용 (하위 호환성)
      const blockId = blockIdParam || searchParams.get('id');
      if (!blockId) return;

      const blockIdNum = parseInt(blockId, 10);
      if (isNaN(blockIdNum)) {
        console.error('유효하지 않은 blockId');
        return;
      }

      try {
        // API에서 블록 상세 정보 가져오기
        const blockDetail = await getBlockDetail(blockIdNum);
        
        // BlockDetailResponse 저장 (techPart 정보 보존)
        setBlockDetailResponse(blockDetail);
        
        // BlockDetailResponse를 BlockData 형식으로 변환
        // techPart는 string | null 타입이므로 techparts는 빈 배열로 설정
        // 실제 techPart는 blockDetailResponse에 저장하여 getCategoryPath에서 사용
        const convertedBlock: BlockData = {
          block_id: blockDetail.blockId,
          user_id: blockDetail.user.userId,
          category_name: blockDetail.categoryName,
          block_title: blockDetail.blockTitle,
          block_type: blockDetail.blockType,
          contribution_score: blockDetail.contributionScore,
          tools_text: blockDetail.toolsText || null,
          oneline_summary: blockDetail.oneLineSummary,
          improvement_point: blockDetail.improvementPoint || null,
          result_url: blockDetail.resultUrl || null,
          result_file: blockDetail.resultFile || null,
          created_at: '', // API 응답에 없으므로 빈 문자열
          techparts: [], // techPart는 문자열이므로 techparts는 빈 배열로 설정
        };
        
        setBlock(convertedBlock);
        
        // user 정보 설정
        const roleToPartId: Record<string, string> = {
          'Plan': 'planning',
          'Design': 'design',
          'FrontEnd': 'frontend',
          'BackEnd': 'backend',
          'PM': 'pm',
        };
        
        const convertedParts = blockDetail.user.roles.length > 0 
          ? blockDetail.user.roles.map((role: string) => roleToPartId[role] || role.toLowerCase())
          : [];
        
        setUserProfile({
          nickname: blockDetail.user.nickname || '',
          introduction: '', // BlockDetailResponse의 user에는 introduction이 없음
          selectedParts: convertedParts,
        });
        
        // 프로필 이미지 설정 (BlockDetailResponse의 user에는 profileType이 없으므로 기본값 사용)
        // 필요시 getUserProfile API를 별도로 호출하여 profileType을 가져올 수 있음
        setSelectedProfile(profileTypeToImage['Type_1']);
      } catch (error) {
        console.error('Failed to fetch block detail:', error);
        // API 실패 시 localStorage에서 가져오기 (fallback)
        const savedBlocks = localStorage.getItem('registeredBlocks');
        if (savedBlocks) {
          try {
            const blocks = JSON.parse(savedBlocks) as BlockData[];
            const foundBlock = blocks.find(
              (b) => b.block_id.toString() === blockId
            );
            if (foundBlock) {
              setBlock(foundBlock);
            }
          } catch (e) {
            console.error('블록 데이터 찾기 실패:', e);
          }
        }
      }
    };

    fetchBlockData();
  }, [blockIdParam, searchParams]);

  useEffect(() => {
    const savedProfile = localStorage.getItem('selectedProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile) as ProfileData;
        setSelectedProfile(profile);
      } catch (e) {
        console.error('Failed to parse saved profile:', e);
      }
    }
    
    const savedUserProfile = localStorage.getItem('userProfile');
    if (savedUserProfile) {
      try {
        const profile = JSON.parse(savedUserProfile);
        setUserProfile(profile);
      } catch (e) {
        console.error('Failed to parse saved user profile:', e);
      }
    }
  }, []);

  // 데이터가 없을 때 사용할 기본값
  // 타입을 'TECHNOLOGY'로 가정하고 빈 값 채움
  const safeBlock: BlockData = block || {
    block_id: 0,
    block_title: '제목 없는 블록', // 디폴트 제목
    block_type: 'TECHNOLOGY', // 모든 섹션(기술 스택 포함)을 보여주기 위해 기본 설정
    category_name: '카테고리 없음',
    oneline_summary: '',
    contribution_score: 0,
    improvement_point: '',
    result_url: '',
    result_file: '',
    tools_text: '',
    techparts: [],
  } as unknown as BlockData; 

  // 이후 로직에서는 block 대신 safeBlock 사용
  const isTechnology = safeBlock.block_type === 'TECHNOLOGY' || safeBlock.block_type === 'technology';
  const isIdea = !isTechnology && (safeBlock.block_type === 'IDEA' || safeBlock.block_type === 'idea');

  const getCategoryPath = () => {
    // API 응답의 techPart는 string | null 타입이므로 직접 사용
    if (isTechnology && blockDetailResponse?.techPart) {
      const techPart = TECH_PARTS_MAP[blockDetailResponse.techPart];
      const partName = techPart ? techPart.name : '';
      return `기술 > ${partName} > ${safeBlock.category_name || ''}`;
    } else if (isTechnology) {
      return `기술 > ${safeBlock.category_name || ''}`;
    } else if (isIdea) {
      return `아이디어 > ${safeBlock.category_name || ''}`;
    }
    return safeBlock.category_name || '';
  };

  const handleMoreButtonClick = () => {
    setIsMenuOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        moreButtonRef.current &&
        !moreButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleEdit = () => {
    setIsMenuOpen(false);
    const blockId = blockIdParam || searchParams.get('id');
    if (blockId) {
      navigate(`/Block/edit?id=${blockId}`);
    }
  };

  const handleDelete = async () => {
    setIsMenuOpen(false);
    showOverlay(
      <CancelGuide
        title="삭제 확인"
        description={
          <>
            블록을 정말 삭제하시겠습니까? <br />
            한 번 삭제한 블록은 복구할 수 없어요
          </>
        }
        prevContent="삭제하기"
        onPrevClick={async () => {
          const blockId = blockIdParam || searchParams.get('id');
          if (!blockId) {
            navigate(-1);
            return;
          }

          const blockIdNum = parseInt(blockId, 10);
          if (isNaN(blockIdNum)) {
            console.error('유효하지 않은 blockId');
            navigate(-1);
            return;
          }

          try {
            // API로 블록 삭제
            await deleteBlock(blockIdNum);
            
            // localStorage에서도 삭제 (fallback)
            if (block) {
              const savedBlocks = localStorage.getItem('registeredBlocks');
              if (savedBlocks) {
                try {
                  const blocks = JSON.parse(savedBlocks) as BlockData[];
                  const filteredBlocks = blocks.filter(
                    (b) => b.block_id !== block.block_id
                  );
                  localStorage.setItem('registeredBlocks', JSON.stringify(filteredBlocks));
                } catch (e) {
                  console.error('localStorage 삭제 실패:', e);
                }
              }
            }
            
            // 삭제 성공 후 이전 페이지로 이동
            navigate(-1);
          } catch (error) {
            console.error('블록 삭제 실패:', error);
            alert('블록 삭제에 실패했습니다.');
            // 에러 발생 시에도 페이지에 머물기
          }
        }}
      />
    );
  };


  return (
    <>
      {isMenuOpen && <S.DimBackground onClick={() => setIsMenuOpen(false)} />}
      <S.Header>
        <S.BackButton onClick={() => navigate(-1)}>
          <S.BackIcon src={backArrow} alt="뒤로가기" />
        </S.BackButton>
        <S.HeaderTitle>블록 상세</S.HeaderTitle>
        <S.MoreButtonWrapper>
          <S.MoreButton ref={moreButtonRef} onClick={handleMoreButtonClick}>
            <S.MoreIcon src={more} alt="삭제 및 수정 더보기 버튼" />
          </S.MoreButton>
          {isMenuOpen && (
            <S.MenuWrapper ref={menuRef}>
              <OptionMenu onEdit={handleEdit} onDelete={handleDelete} />
            </S.MenuWrapper>
          )}
        </S.MoreButtonWrapper>
      </S.Header>
      <S.Container>
        <>
          <S.CategoryBreadcrumb>{getCategoryPath()}</S.CategoryBreadcrumb>
          
          <S.BlockTitle>{safeBlock.block_title}</S.BlockTitle>

          <S.ProfileSection>
            <S.ProfileImg>
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
            </S.ProfileImg>
            <S.ProfileRightColumn>
              <S.ProfileUserInfo>
                <strong className='l600'>{userProfile?.nickname ? `${userProfile.nickname}님` : 'Username 님'}</strong>
              </S.ProfileUserInfo>
              <S.ProfileUserIntroduction>{userProfile?.introduction || '한 줄 소개'}</S.ProfileUserIntroduction>
            </S.ProfileRightColumn>
          </S.ProfileSection>

          <S.ProfileDivider />

          <S.ProjectCard>
            <S.ProjectCardTitle>이전 프로젝트 기본 정보</S.ProjectCardTitle>
            <S.ProjectCardDescription>
              {safeBlock.oneline_summary || "등록된 한 줄 소개가 없어요"}
            </S.ProjectCardDescription>
            
            <S.ProjectCardDivider />

            {/* 아이디어 블록은 기술 스택 표시 안함 */}
            {isTechnology && (
              <S.TechStackSection>
                <S.TechStackLabel>기술 스택</S.TechStackLabel>
                {safeBlock.tools_text ? (
                  <S.TechStackContainer>
                    {safeBlock.tools_text.split(',').map((tool, index) => (
                      <S.TechStackTag key={index}>
                        {tool.trim()}
                      </S.TechStackTag>
                    ))}
                  </S.TechStackContainer>
                ) : (
                  <S.SectionValue style={{ marginTop: '8px' }}>
                     아직 등록된 기술 스택이 없어요
                  </S.SectionValue>
                )}
              </S.TechStackSection>
            )}

            <S.ContributionSection>
              <S.ContributionLabel>기여도</S.ContributionLabel>
              <S.ProgressBarContainer>
                {Array.from({ length: 10 }, (_, index) => {
                  const segmentValue = (index + 1) * 10;
                  // 값이 없으면 0 처리
                  const score = safeBlock.contribution_score ?? 0;
                  const isFilled = score >= segmentValue;
                  return (
                    <S.ProgressSegment
                      key={index}
                      $isFilled={isFilled}
                      $isFirst={index === 0}
                      $isLast={index === 9}
                    />
                  );
                })}
              </S.ProgressBarContainer>
            </S.ContributionSection>
          </S.ProjectCard>

          <S.Section>
            <S.SectionLabel>기존 프로젝트에서 개선하고 싶은 점</S.SectionLabel>
            <S.SectionValue>
              {safeBlock.improvement_point ? safeBlock.improvement_point : "아직 등록된 개선 방향이 없어요"}
            </S.SectionValue>
          </S.Section>

          <S.Section>
            <S.SectionLabel>{userProfile?.nickname || 'Username'}님의 포트폴리오</S.SectionLabel>
            
            {!safeBlock.result_url && !safeBlock.result_file && (
              <S.SectionValue>아직 등록된 기존 프로젝트 결과물이 없어요</S.SectionValue>
            )}

            {safeBlock.result_url && (
              <S.Link 
                href={safeBlock.result_url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', marginBottom: safeBlock.result_file ? '8px' : '0' }} 
              >
                <img src={linkIcon} alt="link" style={{ width: '18px', height: '18px', marginRight: '8px' }} ></img>
                {safeBlock.result_url}
              </S.Link>
            )}

            {safeBlock.result_file && (
              <S.FileLink
                onClick={() => {
                  console.log('Download file:', safeBlock.result_file);
                }}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <img src={folderIcon} alt="folder" style={{ width: '18px', height: '18px', marginRight: '8px' }} ></img>
                {safeBlock.result_file}
              </S.FileLink>
            )}
          </S.Section>
        </>
      </S.Container>
    </>
  );
}