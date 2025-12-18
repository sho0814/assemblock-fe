import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { BlockData } from '@components/block/MyBlockCard';
import * as S from '../block/BlockDetailPage.styled';
import SimpleHeader from '@components/shared/SimpleHeader';
import { ProfileAct, type ProfileData } from '@components/common/ProfileAct';
import { useOverlay } from '@components/common/OverlayContext';
import BoardSelector from '@components/home/BoardSelector';
import Img1 from '@assets/common/ProfileImg/Img1.svg';
import Img2 from '@assets/common/ProfileImg/Img2.svg';
import Img3 from '@assets/common/ProfileImg/Img3.svg';
import Img4 from '@assets/common/ProfileImg/Img4.svg';
import Img5 from '@assets/common/ProfileImg/Img5.svg';
import linkIcon from '@assets/MyPage/link.svg';
import folderIcon from '@assets/MyPage/folder.svg';
import CommonButton from '@components/shared/CommonButton';
import { getBlockDetail } from '@api/blockId';
import { getUserProfile } from '@api/profiles/profile';

// Tech_parts 매핑
const TECH_PARTS_MAP: Record<string, { name: string; color: string }> = {
  'DESIGN': { name: '디자인', color: '#FF1BB3' },
  'FRONTEND': { name: '프론트엔드', color: '#FF6017' },
  'BACKEND': { name: '백엔드', color: '#B8EB00' },
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
  const { blockId } = useParams<{ blockId: string }>();
  const { showOverlay } = useOverlay();
  
  const [block, setBlock] = useState<BlockData | null>(null);
  const [foundBlockData, setFoundBlockData] = useState<{ techPart?: string } | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  const [userProfile, setUserProfile] = useState<{
    nickname: string;
    introduction: string;
    selectedParts: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩 상태

  useEffect(() => {
    const fetchBlockData = async () => {
      setIsLoading(true); // 로딩 시작
      
      if (!blockId) {
        console.error('blockId가 없습니다.');
        navigate(-1);
        setIsLoading(false);
        return;
      }

      const blockIdNum = parseInt(blockId, 10);

      if (isNaN(blockIdNum)) {
        console.error('유효하지 않은 blockId');
        navigate(-1);
        setIsLoading(false);
        return;
      }

      try {
        // 블록 상세 정보 가져오기 (블록 정보 + 작성자 정보 포함)
        const blockDetail = await getBlockDetail(blockIdNum);
        
        // 작성자 상세 프로필 정보 가져오기
        let profileData;
        try {
          profileData = await getUserProfile(blockDetail.writerId);
        } catch (error) {
          console.warn('Failed to fetch user profile:', error);
        }

        // 작성자 정보 설정
        const roleToPartId: Record<string, string> = {
          'Plan': 'planning',
          'Design': 'design',
          'FrontEnd': 'frontend',
          'BackEnd': 'backend',
          'PM': 'pm',
        };
        
        const roles = profileData?.mainRoles || [];
        const convertedParts = roles.length > 0 
          ? roles.map((role: string) => roleToPartId[role] || role.toLowerCase())
          : [];
        
        setUserProfile({
          nickname: blockDetail.writerNickname || '',
          introduction: profileData?.introduction || '',
          selectedParts: convertedParts,
        });

        // 프로필 이미지 설정 (API 응답에 writerProfileType 포함)
        const profileType = blockDetail.writerProfileType || profileData?.profileType;
        if (profileType && profileTypeToImage[profileType]) {
          setSelectedProfile(profileTypeToImage[profileType]);
        } else {
          setSelectedProfile(profileTypeToImage['Type_1']);
        }

        // BlockDetailResponse를 BlockData 형식으로 변환
        const convertedBlock: BlockData = {
          block_id: blockDetail.blockId,
          user_id: blockDetail.writerId,
          category_name: blockDetail.categoryName,
          block_title: blockDetail.blockTitle,
          block_type: blockDetail.blockType,
          contribution_score: blockDetail.contributionScore,
          tools_text: blockDetail.toolsText || null,
          oneline_summary: blockDetail.oneLineSummary,
          improvement_point: blockDetail.improvementPoint || null,
          result_url: blockDetail.resultUrl || null,
          result_file: blockDetail.resultFile || null,
          created_at: blockDetail.createdAt || '', // API 응답에 createdAt 포함
          techparts: [], // techPart는 문자열이므로 techparts는 빈 배열로 설정
        };
        
        setBlock(convertedBlock);
        // techPart 정보를 별도로 저장 (getCategoryPath에서 사용)
        setFoundBlockData({ techPart: blockDetail.techPart || undefined });
      } catch (error) {
        console.error('Failed to fetch block data:', error);
        // API 실패 시 이전 페이지로 이동
        navigate(-1);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchBlockData();
  }, [blockId, navigate]);

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
    // 카테고리 이름에서 언더스코어를 공백으로 치환 (슬래시는 그대로 유지)
    const categoryName = (safeBlock.category_name || '').replace(/_/g, ' ');
    
    if (isTechnology && foundBlockData?.techPart) {
      // API에서 받은 techPart를 직접 사용
      const techPart = TECH_PARTS_MAP[foundBlockData.techPart];
      const partName = techPart ? techPart.name : '';
      return `기술 > ${partName} > ${categoryName}`;
    } else if (isTechnology) {
      return `기술 > ${categoryName}`;
    } else if (isIdea) {
      return `아이디어 > ${categoryName}`;
    }
    return categoryName;
  };

  // 로딩 중일 때 로딩 메시지 표시
  if (isLoading) {
    return (
      <>
        <SimpleHeader title="블록 상세" />
        <S.Container>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
            fontSize: '16px',
            fontWeight: 500,
            color: '#868286'
          }}>
            블록 상세 정보를 로딩 중입니다...
          </div>
        </S.Container>
      </>
    );
  }

  return (
    <>
      <SimpleHeader title="블록 상세" />
      <S.Container>
        <>
          <S.CategoryBreadcrumb>{getCategoryPath()}</S.CategoryBreadcrumb>
          
          <S.BlockTitle>{safeBlock.block_title}</S.BlockTitle>

          <S.ProfileSection onClick={() => {
            // block에서 user_id를 가져와서 프로필 페이지로 이동
            const userId = block?.user_id;
            if (userId) {
              navigate(`/OtherUser/Profile?userId=${userId}`);
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
            
            {!safeBlock.result_url && 
             (!safeBlock.result_file || 
              safeBlock.result_file.trim() === '' || 
              safeBlock.result_file === 'dummy-pdf-base64-string-for-testing') && (
              <S.SectionValue>아직 등록된 기존 프로젝트 결과물이 없어요</S.SectionValue>
            )}

            {safeBlock.result_url && 
             safeBlock.result_url.trim() !== '' && 
             safeBlock.result_url !== 'string' && (
              <S.Link 
                href={safeBlock.result_url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', marginBottom: (safeBlock.result_file && 
                  safeBlock.result_file.trim() !== '' && 
                  safeBlock.result_file !== 'dummy-pdf-base64-string-for-testing') ? '8px' : '0' }} 
              >
                <img src={linkIcon} alt="link" style={{ width: '18px', height: '18px', marginRight: '8px' }} ></img>
                {safeBlock.result_url}
              </S.Link>
            )}

            {safeBlock.result_file && 
             safeBlock.result_file.trim() !== '' && 
             safeBlock.result_file !== 'dummy-pdf-base64-string-for-testing' && (
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
                if (!blockId) {
                  console.error('blockId가 없습니다.');
                  return;
                }
                const blockIdNum = parseInt(blockId, 10);
                if (isNaN(blockIdNum)) {
                  console.error('유효하지 않은 blockId');
                  return;
                }
                showOverlay(
                  <BoardSelector blockId={blockIdNum} />,
                  { contentStyle: { position: 'absolute', bottom: '0', width: '100%' } }
                );
              }}
            />
          </div>
        </>
      </S.Container>
    </>
  );
}