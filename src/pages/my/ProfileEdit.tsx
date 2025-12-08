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
  ProfileEditButton,
} from './ProfileEdit.styled';
import EditIcon from '@assets/MyPage/Edit.svg';
import CloseStrokeIcon from '@assets/MyPage/CloseStroke.svg';
import { ProfileAct, type ProfileData } from '@components/common/ProfileAct';
import { useOverlay } from '@components/common/OverlayContext';
import EditCancelModal from './EditCancelModal';

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
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    // localStorage에서 선택된 프로필 정보 읽기(추후 연결해서 수정)
    const savedProfile = localStorage.getItem('selectedProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile) as ProfileData;
        setSelectedProfile(profile);
      } catch (e) {
        console.error('Failed to parse saved profile:', e);
      }
    }
    
    // localStorage에서 저장된 프로필 데이터 읽기
    const savedUserProfile = localStorage.getItem('userProfile');
    if (savedUserProfile) {
      try {
        const profile = JSON.parse(savedUserProfile);
        setNickname(profile.nickname || '');
        setIntroduction(profile.introduction || '');
        setSelectedParts(profile.selectedParts || []);
        setPortfolioUrl(profile.portfolioUrl || '');
        setFileName(profile.fileName || '');
      } catch (e) {
        console.error('Failed to parse saved user profile:', e);
      }
    }
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
    
    // localStorage에 프로필 데이터 저장 나중에 연결하기
    let fileData = '';
    if (portfolioFile) {
      // 파일을 base64로 변환
      const reader = new FileReader();
      fileData = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to convert file to base64'));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(portfolioFile);
      });
    }
    
    const profileData = {
      nickname,
      introduction,
      selectedParts,
      portfolioUrl,
      fileName: fileName || '',
      fileData: fileData || '',
    };
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    // 저장 후 마이페이지로 이동
    navigate('/My');
  };

  return (
    <ProfileEditContainer>
      <HeaderBar>
        <HeaderSlot>
          <BackButton onClick={() => showOverlay(
            <EditCancelModal onCancel={() => navigate('/My')} />
          )}>
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
              placeholder="이전 닉네임" //추후 수정 필요 초기설정한 닉네임 받아와야함 디폴트도 유저네임이 아니라 온보딩에서 받은 네임으로...
              value={nickname}
              onChange={(e) => {
                const value = e.target.value;
                // 조합 중이 아닐 때만 필터링
                if (!isComposing) {
                  // 한/영문 및 숫자만 허용
                  const regex = /^[a-zA-Z0-9가-힣]*$/;
                  if (regex.test(value)) {
                    setNickname(value);
                  }
                } else {
                  // 조합 중일 때는 일단 허용 (조합 완료 후 검증)
                  setNickname(value);
                }
              }}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => {
                setIsComposing(false);
              }}
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
              placeholder="이전 한 줄 소개" //추후 수정 필요 초기설정한 한 줄 소개 받아와야함
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
              placeholder="이전 URL"
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
      
      <ProfileEditButton onClick={handleSave}>
        프로필 수정하기
      </ProfileEditButton>

    </ProfileEditContainer>
  );
}

