import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ProfileEditContainer,
  HeaderBar,
  HeaderSlot,
  CenterTextBox,
  BackButton,
  Profile,
  EditBtn,
  FormContainer,
  RequiredLabel,
  RequiredDot,
  FormSection,
  SectionTitle,
  SectionTitleDot,
  InputWrapper,
  InputField,
  ClearButton,
  HelperText,
  PartButtonContainer,
  PartButton,
  FileUploadArea,
  FileUploadText,
  FileFormatText,
  UploadProgressContainer,
  ProgressContainer,
  ProgressText,
  CancelButton,
  FileNameContainer,
  FileNameText,
  FileRemoveButton,
  HiddenFileInput,
} from './ProfileEdit.styled';
import EditIcon from '@assets/MyPage/Edit.svg';
import CloseStrokeIcon from '@assets/MyPage/CloseStroke.svg';
import Img1 from '@assets/common/ProfileImg/Img1.svg';
import Img2 from '@assets/common/ProfileImg/Img2.svg';
import Img3 from '@assets/common/ProfileImg/Img3.svg';
import Img4 from '@assets/common/ProfileImg/Img4.svg';
import Img5 from '@assets/common/ProfileImg/Img5.svg';
import { ProfileAct, type ProfileData } from '@components/common/ProfileAct';
import { useOverlay } from '@components/common/OverlayContext';
import EditCancelModal from './EditCancelModal';
import { getMyProfile } from '@api/users/me';
import { updateMyProfile, type UpdateProfileRequest } from '@api/mypage/profile';
import { uploadFile } from '@api/mypage/upload';
import CommonButton from '@components/shared/CommonButton';

export function ProfileEdit() {
  const navigate = useNavigate();
  const { showOverlay } = useOverlay();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [nickname, setNickname] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [selectedParts, setSelectedParts] = useState<string[]>(['design', 'frontend']);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  
  // 초기 데이터 저장 (변경사항 추적용)
  const initialDataRef = useRef<{
    nickname: string;
    introduction: string;
    selectedParts: string[];
    portfolioUrl: string;
    fileName: string;
    portfolioPdfUrl?: string; // 기존 파일 URL 유지용
  } | null>(null);

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
    const fetchProfileData = async () => {
      try {
        // API에서 프로필 정보 가져오기
        const profileData = await getMyProfile();
        
        // 백엔드 roles를 프론트엔드 part IDs로 변환
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
        const portfolioUrl = profileData.portfolioUrl || '';
        
        // 파일명은 URL에서 추출 (응답에 없음)
        let portfolioFileName = '';
        const portfolioPdfUrl = profileData.portfolioPdfUrl || '';
        
        // URL에서 파일명 추출
        if (portfolioPdfUrl) {
          try {
            const url = new URL(portfolioPdfUrl);
            const pathname = url.pathname;
            const fileNameFromUrl = pathname.split('/').pop() || '';
            if (fileNameFromUrl) {
              portfolioFileName = decodeURIComponent(fileNameFromUrl);
            }
          } catch (e) {
            const match = portfolioPdfUrl.match(/\/([^\/]+\.pdf)$/i);
            if (match) {
              portfolioFileName = decodeURIComponent(match[1]);
            }
          }
        }
        
        // ProfileSelect에서 선택한 프로필이 있으면 우선 사용, 없으면 API에서 가져온 값 사용
        const savedProfileType = localStorage.getItem('selectedProfileType');
        const profileType = savedProfileType || profileData.profileType || 'Type_1';
        
        const initialData = {
          nickname: profileData.nickname || '',
          introduction: profileData.introduction || '',
          selectedParts: convertedParts,
          portfolioUrl: portfolioUrl,
          fileName: portfolioFileName,
          portfolioPdfUrl: portfolioPdfUrl,
        };
        
        // state에 초기 데이터 설정
        setNickname(initialData.nickname);
        setIntroduction(initialData.introduction);
        setSelectedParts(initialData.selectedParts);
        setPortfolioUrl(initialData.portfolioUrl);
        setFileName(initialData.fileName);
        
        // 프로필 이미지 설정: ProfileSelect에서 선택한 것이 있으면 우선 사용
        const savedProfile = localStorage.getItem('selectedProfile');
        if (savedProfile) {
          try {
            const profile = JSON.parse(savedProfile) as ProfileData;
            setSelectedProfile(profile);
          } catch (e) {
            console.error('Failed to parse saved profile:', e);
            // 파싱 실패 시 profileType으로 설정
            if (profileType && profileTypeToImage[profileType]) {
              setSelectedProfile(profileTypeToImage[profileType]);
            } else {
              setSelectedProfile(profileTypeToImage['Type_1']);
            }
          }
        } else {
          // localStorage에 없으면 profileType으로 설정
          if (profileType && profileTypeToImage[profileType]) {
            setSelectedProfile(profileTypeToImage[profileType]);
          } else {
            setSelectedProfile(profileTypeToImage['Type_1']);
          }
        }
        
        // 초기 데이터 저장 (변경사항 추적 및 placeholder용)
        initialDataRef.current = initialData;
      } catch (error) {
        console.error('Failed to fetch profile from API:', error);
        
        // API 실패 시 localStorage에서 가져오기 (fallback)
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
            const initialData = {
              nickname: profile.nickname || '',
              introduction: profile.introduction || '',
              selectedParts: profile.selectedParts || [],
              portfolioUrl: profile.portfolioUrl || '',
              fileName: profile.fileName || '',
              portfolioPdfUrl: profile.portfolioPdfUrl || '',
            };
            setNickname(initialData.nickname);
            setIntroduction(initialData.introduction);
            setSelectedParts(initialData.selectedParts);
            setPortfolioUrl(initialData.portfolioUrl);
            setFileName(initialData.fileName);
            initialDataRef.current = initialData;
          } catch (e) {
            console.error('Failed to parse saved user profile:', e);
            initialDataRef.current = {
              nickname: '',
              introduction: '',
              selectedParts: [],
              portfolioUrl: '',
              fileName: '',
              portfolioPdfUrl: '',
            };
          }
        } else {
          initialDataRef.current = {
            nickname: '',
            introduction: '',
            selectedParts: [],
            portfolioUrl: '',
            fileName: '',
            portfolioPdfUrl: '',
          };
        }
      }
    };
    
    fetchProfileData();
  }, []);

  const parts = [
    { id: 'planning', label: '기획', color: '#35CDFF' },
    { id: 'design', label: '디자인', color: '#FF1BB3' },
    { id: 'frontend', label: '프론트엔드', color: '#FF6017' },
    { id: 'backend', label: '백엔드', color: '#B8EB00' },
    { id: 'pm', label: 'PM', color: '#6F35FF' },
  ];

  const togglePart = (partId: string) => {
    setSelectedParts(prev => 
      prev.includes(partId) 
        ? prev.filter(id => id !== partId)
        : [...prev, partId]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setIsUploading(true);
      setUploadProgress(0);
      
      // 업로드 진행률 표시
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            uploadIntervalRef.current = null;
            setIsUploading(false);
            setPortfolioFile(file);
            setFileName(file.name);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      
      uploadIntervalRef.current = interval;
    } else {
      alert('PDF 파일만 업로드할 수 있어요.');
    }
  };

  const handleFileRemove = () => {
    setPortfolioFile(null);
    setFileName('');
    setUploadProgress(0);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // 파일 제거 시에도 변경사항으로 감지되도록 초기 데이터와 비교
    // (hasChanges 함수에서 fileName 비교로 자동 감지됨)
  };

  const handleCancelUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // 업로드 중단
    if (uploadIntervalRef.current) {
      clearInterval(uploadIntervalRef.current);
      uploadIntervalRef.current = null;
    }
    
    setUploadProgress(0);
    setIsUploading(false);
    setPortfolioFile(null);
    setFileName('');
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 변경사항이 있는지 확인하는 함수
  const hasChanges = (): boolean => {
    if (!initialDataRef.current) return false;
    
    const current = {
      nickname: nickname.trim(),
      introduction: introduction.trim(),
      selectedParts: [...selectedParts].sort(),
      portfolioUrl: portfolioUrl.trim(),
      fileName: fileName,
    };
    
    const initial = {
      nickname: initialDataRef.current.nickname.trim(),
      introduction: initialDataRef.current.introduction.trim(),
      selectedParts: [...initialDataRef.current.selectedParts].sort(),
      portfolioUrl: initialDataRef.current.portfolioUrl.trim(),
      fileName: initialDataRef.current.fileName,
    };
    
    return (
      current.nickname !== initial.nickname ||
      current.introduction !== initial.introduction ||
      JSON.stringify(current.selectedParts) !== JSON.stringify(initial.selectedParts) ||
      current.portfolioUrl !== initial.portfolioUrl ||
      current.fileName !== initial.fileName ||
      portfolioFile !== null // 새 파일이 업로드된 경우
    );
  };

  const handleSave = async () => {
    // 닉네임 유효성 검사
    if (!nickname || nickname.trim().length === 0) {
      alert('닉네임을 입력해주세요.');
      return;
    }
    
    if (nickname.length > 5) {
      alert('닉네임은 5자까지 입력할 수 있어요.');
      return;
    }
    
    // 한/영문 및 숫자만 허용하는지 확인
    const nicknameRegex = /^[a-zA-Z0-9가-힣]+$/;
    if (!nicknameRegex.test(nickname)) {
      alert('닉네임은 한/영문 및 숫자만 입력할 수 있어요.');
      return;
    }
    
    // 파트 선택 확인
    if (selectedParts.length === 0) {
      alert('파트를 최소 1개 이상 선택해주세요.');
      return;
    }
    
    try {
      // 변경사항이 있으면 저장
      if (hasChanges()) {
        // 프론트엔드 part ID를 백엔드 roles 형식으로 변환
        const partIdToRole: Record<string, string> = {
          'planning': 'Plan',
          'design': 'Design',
          'frontend': 'FrontEnd',
          'backend': 'BackEnd',
          'pm': 'PM',
        };
        
        const mainRoles = selectedParts.map((partId: string) => {
          return partIdToRole[partId] || partId;
        });
        
        // 프로필 이미지 ID를 userProfileType으로 변환
        let userProfileType = 'Type_1'; // 기본값
        
        if (selectedProfile) {
          const profileIdToType: Record<string, string> = {
            'img1': 'Type_1',
            'img2': 'Type_2',
            'img3': 'Type_3',
            'img4': 'Type_4',
            'img5': 'Type_5',
          };
          userProfileType = profileIdToType[selectedProfile.id] || 'Type_1';
        } else {
          // selectedProfile이 없으면 localStorage에서 가져오기
          const savedProfile = localStorage.getItem('selectedProfile');
          if (savedProfile) {
            try {
              const profile = JSON.parse(savedProfile);
              const profileIdToType: Record<string, string> = {
                'img1': 'Type_1',
                'img2': 'Type_2',
                'img3': 'Type_3',
                'img4': 'Type_4',
                'img5': 'Type_5',
              };
              userProfileType = profileIdToType[profile.id] || 'Type_1';
            } catch (e) {
              console.error('Failed to parse selected profile:', e);
            }
          }
        }
        
        // 파일이 있으면 먼저 업로드
        let portfolioPdfUrl: string | undefined = undefined;
        if (portfolioFile) {
          try {
            // 파일 크기 체크 (10MB 제한)
            const maxSize = 10 * 1024 * 1024; // 10MB
            if (portfolioFile.size > maxSize) {
              alert('파일 크기가 10MB를 초과합니다. 더 작은 파일을 선택해주세요.');
              return;
            }
            
            const uploadResult = await uploadFile(portfolioFile);
            portfolioPdfUrl = uploadResult.fileUrl || '';
          } catch (error) {
            console.error('File upload failed:', error);
            alert('파일 업로드에 실패했습니다.');
            return; // 파일 업로드 실패 시 페이지에 머물기
          }
        } else if (fileName && initialDataRef.current?.fileName === fileName) {
          // 파일명이 있고 기존 파일명과 같으면 기존 URL 유지
          portfolioPdfUrl = initialDataRef.current.portfolioPdfUrl || undefined;
        } else if (!fileName) {
          // 파일명이 없으면 파일 제거 (빈 문자열로 전송)
          portfolioPdfUrl = '';
        }
        
        // 프로필 수정 API 호출
        const updateData: UpdateProfileRequest = {
          nickname: nickname.trim(),
          introduction: introduction.trim() || undefined,
          mainRoles: mainRoles,
          profileType: userProfileType,
          portfolioUrl: portfolioUrl.trim() || undefined,
          portfolioPdfUrl: portfolioPdfUrl || undefined,
        };
        
        await updateMyProfile(updateData);
        
        // 초기 데이터 업데이트
        initialDataRef.current = {
          nickname,
          introduction,
          selectedParts,
          portfolioUrl,
          fileName: fileName || '',
          portfolioPdfUrl: portfolioPdfUrl || '',
        };
        
        // 파일 업로드 상태 리셋
        setPortfolioFile(null);
        
        // 저장 성공 후 마이페이지로 이동
        navigate('/My');
      } else {
        // 변경사항이 없으면 바로 마이페이지로 이동
        navigate('/My');
      }
    } catch (error) {
      console.error('Error in handleSave:', error);
      alert('저장 중 오류가 발생했습니다.');
      // 에러 발생 시 페이지에 머물기 (navigate 제거)
    }
  };

  const handleBack = () => {
    // 항상 모달 표시
    showOverlay(
      <EditCancelModal onCancel={() => navigate('/My')} />
    );
  };

  return (
    <ProfileEditContainer>
      <HeaderBar>
        <HeaderSlot>
          <BackButton onClick={handleBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19L8 12L15 5" stroke="#352F36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </BackButton>
        </HeaderSlot>
        <HeaderSlot>
          <CenterTextBox>내 프로필 수정</CenterTextBox>
        </HeaderSlot>
        <HeaderSlot />
      </HeaderBar>
      <Profile>
        {selectedProfile ? (
          <ProfileAct profile={selectedProfile} isSelected={true} size="medium" />
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
            <circle cx="48" cy="48" r="48" fill="#C2C1C3"/>
          </svg>
        )}
        <EditBtn onClick={() => navigate('/My/ProfileSelect')}>
          <img src={EditIcon} alt="Edit" />
        </EditBtn>
      </Profile>
      <FormContainer>
        <RequiredLabel>
        <RequiredDot /> 필수 작성 요소
        </RequiredLabel>
        
        <FormSection>
          <SectionTitle>
            닉네임
            <SectionTitleDot />
          </SectionTitle>
          <InputWrapper>
            <InputField
              type="text"
              placeholder={initialDataRef.current?.nickname || '닉네임을 입력해주세요'}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={5}
            />
            {nickname && (
              <ClearButton onClick={() => setNickname('')}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ClearButton>
            )}
          </InputWrapper>
          <HelperText>닉네임은 한/영문 및 숫자 5자까지 입력할 수 있어요</HelperText>
        </FormSection>

        <FormSection>
          <SectionTitle>
            파트
            <SectionTitleDot />
          </SectionTitle>
          <PartButtonContainer>
            {parts.map((part) => (
              <PartButton
                key={part.id}
                $isSelected={selectedParts.includes(part.id)}
                $color={part.color}
                onClick={() => togglePart(part.id)}
              >
                {part.label}
              </PartButton>
            ))}
          </PartButtonContainer>
          <HelperText>파트는 중복 선택할 수 있어요</HelperText>
        </FormSection>

        <FormSection>
          <SectionTitle>
            한 줄 소개
            <SectionTitleDot />
          </SectionTitle>
          <InputWrapper>
            <InputField
              type="text"
              placeholder={initialDataRef.current?.introduction || '한 줄 소개를 입력해주세요'}
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              maxLength={36}
            />
            {introduction && (
              <ClearButton onClick={() => setIntroduction('')}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ClearButton>
            )}
          </InputWrapper>
          <HelperText>한 줄 소개는 최대 36자까지 입력할 수 있어요</HelperText>
        </FormSection>

        <FormSection>
          <SectionTitle>포트폴리오 링크</SectionTitle>
          <InputWrapper>
            <InputField
              type="url"
              placeholder={initialDataRef.current?.portfolioUrl || '포트폴리오 URL을 입력해주세요'}
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
            />
            {portfolioUrl && (
              <ClearButton onClick={() => setPortfolioUrl('')}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ClearButton>
            )}
          </InputWrapper>
          <HelperText>포트폴리오를 URL 형태로 첨부해 주세요.</HelperText>
        </FormSection>

        <FormSection>
          <SectionTitle>포트폴리오 파일</SectionTitle>
          <FileUploadArea $isUploading={isUploading} onClick={() => !isUploading && fileInputRef.current?.click()}>
            <HiddenFileInput
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
            />
            {isUploading ? (
              <UploadProgressContainer>
                <FileUploadText>이 곳을 눌러 파일을 업로드 하세요</FileUploadText>
                <ProgressContainer>
                  <ProgressText>업로드 {uploadProgress}% 완료...</ProgressText>
                  <CancelButton onClick={handleCancelUpload}>
                    <img src={CloseStrokeIcon} alt="cancel" />
                  </CancelButton>
                </ProgressContainer>
              </UploadProgressContainer>
            ) : fileName ? (
              <>
                <FileUploadText>이 곳을 눌러 파일을 업로드 하세요</FileUploadText>
                <FileNameContainer>
                  <FileNameText>{fileName}</FileNameText>
                  <FileRemoveButton onClick={(e) => {
                    e.stopPropagation();
                    handleFileRemove();
                  }}>
                    <img src={CloseStrokeIcon} alt="remove" />
                  </FileRemoveButton>
                </FileNameContainer>
              </>
            ) : (
              <>
                <FileUploadText>이 곳을 눌러 파일을 업로드 하세요</FileUploadText>
                <FileFormatText>지원되는 형식: PDF</FileFormatText>
              </>
            )}
          </FileUploadArea>
          <HelperText>포트폴리오를 PDF 형태로 첨부해 주세요.</HelperText>
        </FormSection>
      </FormContainer>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '36px', marginBottom: '56px'}}>
        <CommonButton 
          content="프로필 수정하기"
          width="335px"
          onClick={handleSave}
        />
      </div>

    </ProfileEditContainer>
  );
}

