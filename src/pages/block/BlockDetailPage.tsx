import { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import type { BlockData } from '@components/block/MyBlockCard';
import * as S from './BlockDetailPage.styled';
import backArrow from '@assets/common/back-arrow.svg';
import more from '@assets/common/More.svg';
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
import { getCategoryLabel, getCategoryValue } from '@utils/getCategoryLabel';
import { getUserProfile } from '@api/profiles/profile';
import { downloadPdfFromBase64 } from '@utils/blockFileUtils';

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
  const blockIdKey = blockIdParam ?? searchParams.get('id') ?? '';
  const navigate = useNavigate();
  const { showOverlay, closeOverlay } = useOverlay();
  
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
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩 상태

  useEffect(() => {
    const fetchBlockData = async () => {
      setIsLoading(true); // 로딩 시작
      
      // 라우트 파라미터 우선, 없으면 쿼리 파라미터 사용 (하위 호환성)
      const blockId = blockIdParam || searchParams.get('id');
      if (!blockId) {
        setIsLoading(false);
        return;
      }

      const blockIdNum = parseInt(blockId, 10);
      if (isNaN(blockIdNum)) {
        console.error('유효하지 않은 blockId');
        setIsLoading(false);
        return;
      }

      try {
        // API에서 블록 상세 정보 가져오기
        const blockDetail = await getBlockDetail(blockIdNum);
        
        // API 응답 검증
        if (!blockDetail) {
          console.error('블록 상세 정보를 가져올 수 없습니다.');
          navigate(-1);
          return;
        }
        
        // BlockDetailResponse 저장 (techPart 정보 보존)
        setBlockDetailResponse(blockDetail);
        
        // 마이페이지에서 들어온 경우이므로 리다이렉트 없이 계속 진행
        // (홈페이지에서 들어온 경우는 이미 /OtherUser/BlockDetail로 라우팅됨)
        
        // 카테고리명을 label 형식으로 변환 (API는 value 형식으로 옴)
        const categoryLabel = getCategoryLabel(blockDetail.categoryName);
        
        // BlockDetailResponse를 BlockData 형식으로 변환
        // techPart는 string | null 타입이므로 techparts는 빈 배열로 설정
        // 실제 techPart는 blockDetailResponse에 저장하여 getCategoryPath에서 사용
        const convertedBlock: BlockData = {
          block_id: blockDetail.blockId,
          user_id: blockDetail.writerId,
          category_name: categoryLabel, // label 형식으로 변환된 카테고리명 사용
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
        
        // 작성자 상세 프로필 정보 가져오기 (introduction, mainRoles 등)
        let profileData;
        try {
          profileData = await getUserProfile(blockDetail.writerId);
        } catch (error) {
          console.warn('Failed to fetch user profile:', error);
          // 프로필 정보를 가져오지 못해도 계속 진행
        }
        
        // user 정보 설정
        const roleToPartId: Record<string, string> = {
          'Plan': 'planning',
          'Design': 'design',
          'FrontEnd': 'frontend',
          'BackEnd': 'backend',
          'PM': 'pm',
        };
        
        // profileData가 있으면 mainRoles 사용, 없으면 빈 배열
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
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchBlockData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockIdParam, blockIdKey]); // query(id) 변경도 감지 // searchParams는 하위 호환성을 위해 사용하지만 dependency에는 포함하지 않음

  // 블록 상세 페이지에서는 API에서 가져온 작성자 프로필을 사용하므로
  // localStorage의 userProfile은 사용하지 않음
  // (localStorage의 userProfile은 내 프로필 정보일 수 있음)
  
  // 프로필 이미지는 API에서 가져온 writerProfileType을 사용하므로
  // localStorage의 selectedProfile도 사용하지 않음

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
    // 카테고리 이름을 value 형식으로 변환 (category.ts의 value 값 사용)
    const categoryValue = getCategoryValue(safeBlock.category_name);
    
    // API 응답의 techPart는 string | null 타입이므로 직접 사용
    if (isTechnology && blockDetailResponse?.techPart) {
      const techPart = TECH_PARTS_MAP[blockDetailResponse.techPart];
      const partName = techPart ? techPart.name : '';
      return `기술 > ${partName} > ${categoryValue}`;
    } else if (isTechnology) {
      return `기술 > ${categoryValue}`;
    } else if (isIdea) {
      return `아이디어 > ${categoryValue}`;
    }
    return categoryValue;
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
          // 라우트 파라미터에서 blockId 가져오기
          const blockId = blockIdParam || searchParams.get('id');
          if (!blockId) {
            console.error('blockId가 없습니다.');
            alert('블록 ID를 찾을 수 없습니다.');
            closeOverlay();
            return;
          }

          const blockIdNum = parseInt(blockId, 10);
          if (isNaN(blockIdNum)) {
            console.error('유효하지 않은 blockId:', blockId);
            alert('유효하지 않은 블록 ID입니다.');
            closeOverlay();
            return;
          }

          try {
            // API로 블록 삭제
            console.log('블록 삭제 요청:', blockIdNum);
            console.log('삭제 요청 URL:', `/api/blocks/${blockIdNum}`);
            
            await deleteBlock(blockIdNum);
            console.log('블록 삭제 성공:', blockIdNum);
            
            // 오버레이 닫기
            closeOverlay();
            
            // localStorage에서도 삭제 (fallback)
            try {
              const savedBlocks = localStorage.getItem('registeredBlocks');
              if (savedBlocks) {
                const blocks = JSON.parse(savedBlocks) as BlockData[];
                const filteredBlocks = blocks.filter(
                  (b) => b.block_id !== blockIdNum
                );
                localStorage.setItem('registeredBlocks', JSON.stringify(filteredBlocks));
              }
            } catch (e) {
              console.warn('localStorage 삭제 실패 (무시 가능):', e);
            }
            
            // 삭제 성공 후 마이페이지로 이동
            navigate('/My');
          } catch (error: unknown) {
            console.error('블록 삭제 실패:', error);
            const axiosError = error as { response?: { status?: number; data?: { path?: string; message?: string }; statusText?: string }; message?: string; config?: { url?: string } };
            console.error('에러 전체 객체:', axiosError);
            console.error('에러 응답:', axiosError?.response);
            console.error('에러 상세 정보:', {
              status: axiosError?.response?.status,
              statusText: axiosError?.response?.statusText,
              data: axiosError?.response?.data,
              message: axiosError?.message,
              config: axiosError?.config,
            });
            
            // 오버레이 닫기
            closeOverlay();
            
            // 에러 메시지 추출
            let errorMessage = '블록 삭제에 실패했습니다.';
            const status = axiosError?.response?.status;
            const errorData = axiosError?.response?.data;
            
            if (status === 403) {
              errorMessage = '삭제 권한이 없습니다.';
            } else if (status === 404) {
              errorMessage = '블록을 찾을 수 없습니다.';
            } else if (status === 500) {
              // 500 에러는 백엔드 서버 문제
              // 백엔드 로그에서 확인된 에러: 외래키 제약 조건 위반
              // "Cannot delete or update a parent row: a foreign key constraint fails"
              // board_block 테이블에서 block_id를 참조하고 있어서 삭제할 수 없음
              const errorPath = errorData?.path || axiosError?.config?.url;
              console.error('500 에러 - 서버 응답 데이터:', errorData);
              console.error('500 에러 - 요청 경로:', errorPath);
              
          
              errorMessage = '블록을 삭제할 수 없습니다.\n\n' +
                '이 블록이 보드에 포함되어 있어서 삭제할 수 없어요.\n\n' +
                '삭제하려면:\n' +
                '1. 해당 블록이 포함된 보드를 열어주세요\n' +
                '2. 보드에서 블록을 제거해주세요\n' +
                '3. 그 다음 블록을 삭제할 수 있어요';
            } else if (errorData?.message) {
              errorMessage = errorData.message;
            } else if (axiosError?.message) {
              errorMessage = `오류: ${axiosError.message}`;
            }
            
            alert(errorMessage);
          }
        }}
      />
    );
  };


  // 로딩 중일 때 로딩 메시지 표시
  if (isLoading) {
    return (
      <>
        <S.Header>
          <S.BackButton onClick={() => navigate(-1)}>
            <S.BackIcon src={backArrow} alt="뒤로가기" />
          </S.BackButton>
          <S.HeaderTitle>블록 상세</S.HeaderTitle>
          <S.MoreButtonWrapper />
        </S.Header>
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
                  if (!safeBlock.result_file || !blockDetailResponse?.resultFile) return;
                  
                  const resultFile = blockDetailResponse.resultFile;
                  
                  // result_file이 URL이면 새 창에서 열기
                  if (resultFile.startsWith('http')) {
                    window.open(resultFile, '_blank');
                  } else {
                    // base64 문자열이면 다운로드
                    // 파일명 추출: URL이면 파일명 추출, base64면 기본 파일명 사용
                    const resultFileName = resultFile.includes('/') 
                      ? resultFile.split('/').pop() || 'document.pdf'
                      : 'document.pdf';
                    
                    downloadPdfFromBase64(resultFile, resultFileName);
                  }
                }}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              >
                <img src={folderIcon} alt="folder" style={{ width: '18px', height: '18px', marginRight: '8px' }} ></img>
                {blockDetailResponse?.resultFile && blockDetailResponse.resultFile.includes('/')
                  ? blockDetailResponse.resultFile.split('/').pop()
                  : 'document.pdf'}
              </S.FileLink>
            )}
          </S.Section>
        </>
      </S.Container>
    </>
  );
}