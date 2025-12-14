import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { BlockData } from '@components/block/MyBlockCard';
import * as S from '../block/BlockDetailPage.styled';
import SimpleHeader from '@components/shared/SimpleHeader';
import { ProfileAct, type ProfileData } from '@components/common/ProfileAct';
import Img1 from '@assets/common/ProfileImg/Img1.svg';
import Img2 from '@assets/common/ProfileImg/Img2.svg';
import Img3 from '@assets/common/ProfileImg/Img3.svg';
import Img4 from '@assets/common/ProfileImg/Img4.svg';
import Img5 from '@assets/common/ProfileImg/Img5.svg';
import linkIcon from '@assets/MyPage/link.svg';
import folderIcon from '@assets/MyPage/folder.svg';
import CommonButton from '@components/shared/CommonButton';
import { getUserBlocks } from '@api/profiles/blocks';
import { getUserProfile } from '@api/profiles/profile';

// Tech_parts 매핑
const TECH_PARTS_MAP: Record<string, { name: string; color: string }> = {
  'Design': { name: '디자인', color: '#FF1BB3' },
  'FrontEnd': { name: '프론트엔드', color: '#FF6017' },
  'BackEnd': { name: '백엔드', color: '#B8EB00' },
  'Plan': { name: '기획', color: '#35CDFF' },
  'PM': { name: 'PM', color: '#6F35FF' },
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

export function BlockDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [block, setBlock] = useState<BlockData | null>(null);
  const [foundBlockData, setFoundBlockData] = useState<{ techPart?: string } | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  const [userProfile, setUserProfile] = useState<{
    nickname: string;
    introduction: string;
    selectedParts: string[];
  } | null>(null);

  useEffect(() => {
    const fetchBlockData = async () => {
      const blockId = searchParams.get('id');
      const userIdParam = searchParams.get('userId');
      
      if (!blockId || !userIdParam) {
        console.error('blockId 또는 userId가 없습니다.');
        return;
      }

      const userId = parseInt(userIdParam, 10);
      const blockIdNum = parseInt(blockId, 10);
      
      if (isNaN(userId) || isNaN(blockIdNum)) {
        console.error('유효하지 않은 userId 또는 blockId');
        return;
      }

      try {
        // 사용자 프로필 정보 가져오기
        const profileData = await getUserProfile(userId);
        
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
        
        const convertedProfile = {
          nickname: profileData.nickname || '',
          introduction: profileData.introduction || '',
          selectedParts: convertedParts,
        };
        
        setUserProfile(convertedProfile);
        
        // 프로필 이미지 설정
        if (profileData.profileType && profileTypeToImage[profileData.profileType]) {
          setSelectedProfile(profileTypeToImage[profileData.profileType]);
        } else {
          setSelectedProfile(profileTypeToImage['Type_1']);
        }

        // 사용자의 블록 목록 가져오기
        const blocks = await getUserBlocks(userId, 'ALL');
        
        // 해당 blockId와 일치하는 블록 찾기
        const foundBlock = blocks.find((b) => b.blockId === blockIdNum);
        
        if (foundBlock) {
          // API 응답을 BlockData 형식으로 변환
          // techPart는 문자열이지만 techparts는 number[] 타입이므로 빈 배열로 설정
          // 실제 techPart는 getCategoryPath에서 직접 사용
          const convertedBlock: BlockData = {
            block_id: foundBlock.blockId,
            user_id: foundBlock.writerId,
            category_name: foundBlock.categoryName,
            block_title: foundBlock.blockTitle,
            block_type: foundBlock.blockType,
            contribution_score: foundBlock.contributionScore,
            tools_text: foundBlock.toolsText || null,
            oneline_summary: foundBlock.oneLineSummary,
            improvement_point: foundBlock.improvementPoint || null,
            result_url: foundBlock.resultUrl || null,
            result_file: foundBlock.resultFile || null,
            created_at: foundBlock.createdAt,
            techparts: [], // techPart는 문자열이므로 techparts는 빈 배열로 설정
          };
          
          setBlock(convertedBlock);
          // techPart 정보를 별도로 저장 (getCategoryPath에서 사용)
          setFoundBlockData({ techPart: foundBlock.techPart });
        } else {
          console.error('블록을 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('Failed to fetch block data:', error);
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
        
        const savedProfile = localStorage.getItem('selectedProfile');
        if (savedProfile) {
          try {
            setSelectedProfile(JSON.parse(savedProfile) as ProfileData);
          } catch (e) {
            console.error('Failed to parse saved profile:', e);
          }
        }
        
        const savedUserProfile = localStorage.getItem('userProfile');
        if (savedUserProfile) {
          try {
            setUserProfile(JSON.parse(savedUserProfile));
          } catch (e) {
            console.error('Failed to parse saved user profile:', e);
          }
        }
      }
    };

    fetchBlockData();
  }, [searchParams]);

  // 데이터가 없을 때 사용할 기본값
  const safeBlock: BlockData = block || {
    block_id: 0,
    block_title: '제목 없는 블록',
    block_type: 'TECHNOLOGY',
    category_name: '카테고리 없음',
    oneline_summary: '',
    contribution_score: 0,
    improvement_point: '',
    result_url: '',
    result_file: '',
    tools_text: '',
    techparts: [],
  } as unknown as BlockData; 

  const isTechnology = safeBlock.block_type === 'TECHNOLOGY' || safeBlock.block_type === 'technology';
  const isIdea = !isTechnology && (safeBlock.block_type === 'IDEA' || safeBlock.block_type === 'idea');

  const getCategoryPath = () => {
    if (isTechnology && foundBlockData?.techPart) {
      // API에서 받은 techPart를 직접 사용
      const techPart = TECH_PARTS_MAP[foundBlockData.techPart];
      const partName = techPart ? techPart.name : '';
      return `기술 > ${partName} > ${safeBlock.category_name || ''}`;
    } else if (isTechnology) {
      return `기술 > ${safeBlock.category_name || ''}`;
    } else if (isIdea) {
      return `아이디어 > ${safeBlock.category_name || ''}`;
    }
    return safeBlock.category_name || '';
  };

  return (
    <>
      <SimpleHeader title="블록 상세" />
      <S.Container>
        <>
          <S.CategoryBreadcrumb>{getCategoryPath()}</S.CategoryBreadcrumb>
          
          <S.BlockTitle>{safeBlock.block_title}</S.BlockTitle>

          <S.ProfileSection onClick={() => {
            const userIdParam = searchParams.get('userId');
            if (userIdParam) {
              navigate(`/OtherUser/Profile?userId=${userIdParam}`);
            } else {
              navigate('/OtherUser/Profile');
            }
          }}>
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

          <div style={{ marginTop: '36px'}}>
            <CommonButton 
              content="보드에 담기"
              width="335px"
              onClick={() => {
                // 보드에 담기 로직 추가
                console.log('보드에 담기');
              }}
            />
          </div>
        </>
      </S.Container>
    </>
  );
}