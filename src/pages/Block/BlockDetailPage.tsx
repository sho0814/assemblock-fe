import { useEffect, useState, useRef } from 'react';
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
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
import {
  getBlockDetail,
  deleteBlock,
  type BlockDetailResponse,
} from '@api/blockId';
import { getCategoryLabel } from '@utils/getCategoryLabel';
import { getUserProfile } from '@api/profiles/profile';
 //추가 휴지통 아이콘
import trashIcon from "@assets/board/nav/trash.svg";

// 추가: 보드에서만 제거 API
import { removeBlockFromBoard } from '@api';

// Tech_parts 매핑 (API는 문자열을 반환)
const TECH_PARTS_MAP: Record<string, { name: string; color: string }> = {
  DESIGN: { name: '디자인', color: '#FF1BB3' },
  FRONTEND: { name: '프론트엔드', color: '#FF6017' },
  BACKEND: { name: '백엔드', color: '#B8EB00' },
  Design: { name: '디자인', color: '#FF1BB3' },
  FrontEnd: { name: '프론트엔드', color: '#FF6017' },
  BackEnd: { name: '백엔드', color: '#B8EB00' },
};

// 프로필 타입에 따른 이미지 매핑
const profileTypeToImage: Record<string, ProfileData> = {
  Type_1: {
    id: 'img1',
    src: Img1,
    alt: 'backend',
    colorMap: { '#C2C1C3': '#2E3B00', '#F0EFF1': '#B8EB00' },
  },
  Type_2: {
    id: 'img2',
    src: Img2,
    alt: 'design',
    colorMap: { '#C2C1C3': '#FF1BB3', '#F0EFF1': '#4D0836' },
  },
  Type_3: {
    id: 'img3',
    src: Img3,
    alt: 'frontend',
    colorMap: { '#C2C1C3': '#FF6017', '#F0EFF1': '#4D1D07' },
  },
  Type_4: {
    id: 'img4',
    src: Img4,
    alt: 'plan',
    colorMap: { '#C2C1C3': '#35CDFF', '#F0EFF1': '#103E4D' },
  },
  Type_5: {
    id: 'img5',
    src: Img5,
    alt: 'pm',
    colorMap: { '#C2C1C3': '#6F35FF', '#F0EFF1': '#22104D' },
  },
};

// 추가: 보드에서 넘어온 state 타입
type LocationState = {
  fromBoardDetail?: boolean;
  boardId?: number;
};

export function BlockDetailPage() {
  const { blockId: blockIdParam } = useParams<{ blockId?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { showOverlay, closeOverlay } = useOverlay();

  // 추가: 보드에서 넘어온 여부 + boardId
  const { fromBoardDetail, boardId } = (location.state || {}) as LocationState;

  const [block, setBlock] = useState<BlockData | null>(null);
  const [blockDetailResponse, setBlockDetailResponse] =
    useState<BlockDetailResponse | null>(null);

  // 기존 더보기 메뉴 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(
    null
  );
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
        const blockDetail = await getBlockDetail(blockIdNum);

        if (!blockDetail) {
          console.error('블록 상세 정보를 가져올 수 없습니다.');
          navigate(-1);
          return;
        }

        setBlockDetailResponse(blockDetail);

        // 마이페이지/보드 등 진입 경로에 따라 리다이렉트 없이 상세 데이터를 그대로 사용
        // (홈에서 들어온 타인 블록은 이미 /OtherUser/BlockDetail로 라우팅됨)

        // 카테고리명을 label 형식으로 변환 (API는 value 형식으로 옴)
        const categoryLabel = getCategoryLabel(blockDetail.categoryName);

        const convertedBlock: BlockData = {
          block_id: blockDetail.blockId,
          user_id: blockDetail.writerId,
          category_name: categoryLabel,
          block_title: blockDetail.blockTitle,
          block_type: blockDetail.blockType,
          contribution_score: blockDetail.contributionScore,
          tools_text: blockDetail.toolsText || null,
          oneline_summary: blockDetail.oneLineSummary,
          improvement_point: blockDetail.improvementPoint || null,
          result_url: blockDetail.resultUrl || null,
          result_file: blockDetail.resultFile || null,
          created_at: blockDetail.createdAt || '',
          techparts: [],
        };

        setBlock(convertedBlock);

        let profileData;
        try {
          profileData = await getUserProfile(blockDetail.writerId);
        } catch (error) {
          console.warn('Failed to fetch user profile:', error);
        }

        const roleToPartId: Record<string, string> = {
          Plan: 'planning',
          Design: 'design',
          FrontEnd: 'frontend',
          BackEnd: 'backend',
          PM: 'pm',
        };

        const roles = profileData?.mainRoles || [];
        const convertedParts =
          roles.length > 0
            ? roles.map((role: string) => roleToPartId[role] || role.toLowerCase())
            : [];

        setUserProfile({
          nickname: blockDetail.writerNickname || '',
          introduction: profileData?.introduction || '',
          selectedParts: convertedParts,
        });

        const profileType = blockDetail.writerProfileType || profileData?.profileType;
        if (profileType && profileTypeToImage[profileType]) {
          setSelectedProfile(profileTypeToImage[profileType]);
        } else {
          setSelectedProfile(profileTypeToImage['Type_1']);
        }
      } catch (error) {
        console.error('Failed to fetch block detail:', error);

        const savedBlocks = localStorage.getItem('registeredBlocks');
        if (savedBlocks) {
          try {
            const blocks = JSON.parse(savedBlocks) as BlockData[];
            const id = blockIdParam || searchParams.get('id');
            const foundBlock = blocks.find((b) => b.block_id.toString() === id);
            if (foundBlock) setBlock(foundBlock);
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
  }, [blockIdParam, fromBoardDetail, boardId]);

  // 데이터가 없을 때 사용할 기본값
  const safeBlock: BlockData =
    block ||
    ({
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
    } as unknown as BlockData);

  const isTechnology =
    safeBlock.block_type === 'TECHNOLOGY' || safeBlock.block_type === 'technology';
  const isIdea =
    !isTechnology &&
    (safeBlock.block_type === 'IDEA' || safeBlock.block_type === 'idea');

  const getCategoryPath = () => {
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
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    // 보드에서 들어온 경우: 더보기 메뉴 자체를 안 쓰므로 이벤트도 스킵
    if (fromBoardDetail) return;

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

    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, fromBoardDetail]);

  const handleEdit = () => {
    setIsMenuOpen(false);
    const blockId = blockIdParam || searchParams.get('id');
    if (blockId) {
      navigate(`/Block/edit?id=${blockId}`);
    }
  };

  // 보드에서 들어온 경우엔 "보드에서만 제거"
  const handleDelete = async () => {
    setIsMenuOpen(false);

    showOverlay(
      <CancelGuide
        title="삭제 확인"
        description={
          <>
            {fromBoardDetail ? (
              <>
                이 블록을 <b>보드에서</b> 제거하시겠습니까? <br />
                한 번 제거하면 복구할 수 없어요
              </>
            ) : (
              <>
                블록을 정말 삭제하시겠습니까? <br />
                한 번 삭제한 블록은 복구할 수 없어요
              </>
            )}
          </>
        }
        prevContent={fromBoardDetail ? '보드에서 제거' : '삭제하기'}
        onPrevClick={async () => {
          const blockId = blockIdParam || searchParams.get('id');
          if (!blockId) {
            alert('블록 ID를 찾을 수 없습니다.');
            closeOverlay();
            return;
          }

          const blockIdNum = parseInt(blockId, 10);
          if (isNaN(blockIdNum)) {
            alert('유효하지 않은 블록 ID입니다.');
            closeOverlay();
            return;
          }

          try {
            if (fromBoardDetail) {
              if (!boardId) {
                alert('보드 ID를 찾을 수 없습니다.');
                closeOverlay();
                return;
              }

              await removeBlockFromBoard(boardId, blockIdNum);

              closeOverlay();
              navigate(-1); // 보드 상세로 돌아가기
              return;
            }

            // 기존 동작 유지: 블록 자체 삭제
            await deleteBlock(blockIdNum);
            closeOverlay();
            navigate('/My');
          } catch (error: unknown) {
            // develop 작성자 로직 유지 (디버깅 로그 + 상세 메시지)
            console.error(fromBoardDetail ? '보드에서 블록 제거 실패:' : '블록 삭제 실패:', error);

            const axiosError = error as {
              response?: { status?: number; data?: { path?: string; message?: string } };
              message?: string;
              config?: { url?: string };
            };

            console.error('에러 전체 객체:', axiosError);
            console.error('에러 응답:', axiosError?.response);
            console.error('에러 상세 정보:', {
              status: axiosError?.response?.status,
              data: axiosError?.response?.data,
              message: axiosError?.message,
              config: axiosError?.config,
            });

            // 오버레이 닫기
            closeOverlay();

            // 에러 메시지 추출
            let errorMessage = fromBoardDetail
              ? '보드에서 블록 제거에 실패했습니다.'
              : '블록 삭제에 실패했습니다.';

            const status = axiosError?.response?.status;
            const errorData = axiosError?.response?.data;

            if (status === 403) {
              errorMessage = fromBoardDetail ? '제거 권한이 없습니다.' : '삭제 권한이 없습니다.';
            } else if (status === 404) {
              errorMessage = fromBoardDetail ? '대상을 찾을 수 없습니다.' : '블록을 찾을 수 없습니다.';
            } else if (status === 500) {
              // 500 메시지는 "블록 삭제"일 때만 FK 안내가 의미 있음
              if (!fromBoardDetail) {
                const errorPath = errorData?.path || axiosError?.config?.url;
                console.error('500 에러 - 서버 응답 데이터:', errorData);
                console.error('500 에러 - 요청 경로:', errorPath);

                errorMessage =
                  '블록을 삭제할 수 없습니다.\n\n' +
                  '이 블록이 보드에 포함되어 있어서 삭제할 수 없어요.\n\n' +
                  '삭제하려면:\n' +
                  '1. 해당 블록이 포함된 보드를 열어주세요\n' +
                  '2. 보드에서 블록을 제거해주세요\n' +
                  '3. 그 다음 블록을 삭제할 수 있어요';
              } else {
                // 보드에서 제거 중 500이면 그냥 일반 실패 메시지
                errorMessage = '보드에서 블록 제거에 실패했습니다.';
              }
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
      {/* 보드에서 온 경우: 더보기 메뉴를 안 쓰므로 dim도 안 띄움 */}
      {!fromBoardDetail && isMenuOpen && (
        <S.DimBackground onClick={() => setIsMenuOpen(false)} />
      )}

      <S.Header>
        <S.BackButton onClick={() => navigate(-1)}>
          <S.BackIcon src={backArrow} alt="뒤로가기" />
        </S.BackButton>

        <S.HeaderTitle>블록 상세</S.HeaderTitle>

        {/* 보드에서 온 경우엔 휴지통만 / 아니면 기존 more 메뉴 */}
        {fromBoardDetail ? (
          <S.MoreButtonWrapper>
            <S.MoreButton onClick={handleDelete} aria-label="보드에서 제거">
              <img src={trashIcon} alt="휴지통" style={{ width: 24, height: 24 }} />
            </S.MoreButton>
          </S.MoreButtonWrapper>
        ) : (
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
        )}
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
                    colorMap: { '#C2C1C3': '#2E3B00', '#F0EFF1': '#B8EB00' },
                  }}
                  isSelected={true}
                  size="small"
                />
              )}
            </S.ProfileImg>

            <S.ProfileRightColumn>
              <S.ProfileUserInfo>
                <strong className="l600">
                  {userProfile?.nickname ? `${userProfile.nickname}님` : 'Username 님'}
                </strong>
              </S.ProfileUserInfo>
              <S.ProfileUserIntroduction>
                {userProfile?.introduction || '한 줄 소개'}
              </S.ProfileUserIntroduction>
            </S.ProfileRightColumn>
          </S.ProfileSection>

          <S.ProfileDivider />

          <S.ProjectCard>
            <S.ProjectCardTitle>이전 프로젝트 기본 정보</S.ProjectCardTitle>
            <S.ProjectCardDescription>
              {safeBlock.oneline_summary || '등록된 한 줄 소개가 없어요'}
            </S.ProjectCardDescription>

            <S.ProjectCardDivider />

            {isTechnology && (
              <S.TechStackSection>
                <S.TechStackLabel>기술 스택</S.TechStackLabel>
                {safeBlock.tools_text ? (
                  <S.TechStackContainer>
                    {safeBlock.tools_text.split(',').map((tool, index) => (
                      <S.TechStackTag key={index}>{tool.trim()}</S.TechStackTag>
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
              {safeBlock.improvement_point
                ? safeBlock.improvement_point
                : '아직 등록된 개선 방향이 없어요'}
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
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom:
                      safeBlock.result_file &&
                      safeBlock.result_file.trim() !== '' &&
                      safeBlock.result_file !== 'dummy-pdf-base64-string-for-testing'
                        ? '8px'
                        : '0',
                  }}
                >
                  <img
                    src={linkIcon}
                    alt="link"
                    style={{ width: '18px', height: '18px', marginRight: '8px' }}
                  />
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
                  <img
                    src={folderIcon}
                    alt="folder"
                    style={{ width: '18px', height: '18px', marginRight: '8px' }}
                  />
                  {safeBlock.result_file}
                </S.FileLink>
              )}
          </S.Section>
        </>
      </S.Container>
    </>
  );
}