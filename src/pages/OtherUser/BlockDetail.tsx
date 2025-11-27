import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { BlockData } from '@components/block/MyBlockCard';
import * as S from '../block/BlockDetailPage.styled';
import SimpleHeader from '@components/shared/SimpleHeader';
import { ProfileAct, type ProfileData } from '@components/common/ProfileAct';
import Img1 from '@assets/common/ProfileImg/Img1.svg';
import linkIcon from '@assets/MyPage/link.svg';
import folderIcon from '@assets/MyPage/folder.svg';
import CommonButton from '@components/shared/CommonButton';

// Tech_parts 매핑
const TECH_PARTS_MAP: Record<number, { name: string; color: string }> = {
  1: { name: '디자인', color: '#FF1BB3' },
  2: { name: '프론트엔드', color: '#FF6017' },
  3: { name: '백엔드', color: '#B8EB00' },
};

export function BlockDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [block, setBlock] = useState<BlockData | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  const [userProfile, setUserProfile] = useState<{
    nickname: string;
    introduction: string;
    selectedParts: string[];
  } | null>(null);

  useEffect(() => {
    const blockId = searchParams.get('id');
    if (!blockId) return;

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
  }, [searchParams]);

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
  const techParts = safeBlock.techparts || [];

  const getCategoryPath = () => {
    if (isTechnology && techParts.length > 0) {
      const techPart = TECH_PARTS_MAP[techParts[0]];
      const partName = techPart ? techPart.name : '';
      return `기술 > ${partName} > ${safeBlock.category_name || ''}`;
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

          <S.ProfileSection onClick={() => navigate('/OtherUser/Profile')}>
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