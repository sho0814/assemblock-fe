import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleHeader from '@components/shared/SimpleHeader';
import CommonButton from '@components/shared/CommonButton';
import * as S from './ProfilePortfolio.styled';
import closeIcon from '@assets/board/close.svg';
import CloseStrokeIcon from '@assets/MyPage/CloseStroke.svg';
import { signup, type SignupRequest } from '@api/kakaoAuth';
import { uploadFile } from '@api/mypage/upload';
import { useAuthStore } from '@stores';

export function ProfilePortfolio() {
  const navigate = useNavigate();
  const { setProfileComplete } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    try {
      setIsSubmitting(true);
      
      // localStorage에서 온보딩 데이터 수집
      const savedUserProfile = localStorage.getItem('userProfile');
      if (!savedUserProfile) {
        alert('프로필 정보를 찾을 수 없습니다. 처음부터 다시 시작해주세요.');
        navigate('/Onboarding/profileName');
        return;
      }
      
      const profileData = JSON.parse(savedUserProfile);
      
      // 필수 데이터 검증
      if (!profileData.nickname) {
        alert('닉네임이 필요합니다.');
        navigate('/Onboarding/profileName');
        return;
      }
      
      if (!profileData.selectedParts || profileData.selectedParts.length === 0) {
        alert('파트를 선택해주세요.');
        navigate('/Onboarding/ProfilePart');
        return;
      }
      
      if (!profileData.introduction) {
        alert('한 줄 소개를 입력해주세요.');
        navigate('/Onboarding/ProfileIntro');
        return;
      }
      
      // 프론트엔드 part ID를 백엔드 roles 형식으로 변환
      const partIdToRole: Record<string, string> = {
        'planning': 'Plan',
        'design': 'Design',
        'frontend': 'FrontEnd',
        'backend': 'BackEnd',
        'pm': 'PM',
      };
      
      const roles = profileData.selectedParts.map((partId: string) => {
        return partIdToRole[partId] || partId;
      });
      
      // 프로필 이미지 ID를 userProfileType으로 변환 (img1 -> Type_1)
      const selectedProfileData = localStorage.getItem('selectedProfile');
      let userProfileType = 'Type_1'; // 기본값
      
      if (selectedProfileData) {
        try {
          const profile = JSON.parse(selectedProfileData);
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
      
      // 파일이 있으면 먼저 업로드
      let portfolioPdfUrl = '';
      if (portfolioFile) {
        try {
          // 파일 크기 체크 (5MB 제한)
          const maxSize = 5 * 1024 * 1024; // 5MB
          if (portfolioFile.size > maxSize) {
            alert('파일 크기가 5MB를 초과합니다. 더 작은 파일을 선택해주세요.');
            setIsSubmitting(false);
            return;
          }
          
          const uploadResult = await uploadFile(portfolioFile);
          portfolioPdfUrl = uploadResult.fileUrl || '';
        } catch (error) {
          console.error('File upload failed:', error);
          alert('파일 업로드에 실패했습니다. 파일 없이 진행할까요?');
          // 파일 업로드 실패해도 계속 진행
        }
      }
      
      // 온보딩 완료 API 호출
      const signupData: SignupRequest = {
        nickname: profileData.nickname,
        roles: roles,
        userProfileType: userProfileType,
        introduction: profileData.introduction,
        portfolioUrl: portfolioUrl.trim() || undefined,
        portfolioPdfUrl: portfolioPdfUrl || undefined,
      };
      
      await signup(signupData);
      
      // 프로필 완성 상태 업데이트
      setProfileComplete(true);
      
      // localStorage 정리 (선택사항)
      // localStorage.removeItem('userProfile');
      // localStorage.removeItem('selectedProfile');
      
      // 홈페이지로 이동
      navigate('/Home');
    } catch (error: any) {
      console.error('Error completing signup:', error);
      
      if (error.response?.status === 400) {
        alert('입력한 정보를 확인해주세요.');
      } else if (error.response?.status === 401) {
        alert('인증이 만료되었습니다. 다시 로그인해주세요.');
        navigate('/');
      } else {
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearUrl = () => {
    setPortfolioUrl('');
  };

  return (
    <>
      <SimpleHeader title="프로필 설정" />
      <S.Container>
        <S.MainInstructionText>포트폴리오를 올려주세요</S.MainInstructionText>
        <S.SubInstructionText>선택 사항</S.SubInstructionText>
        
        <S.Section>
          <S.Label>URL</S.Label>
          <S.InputContainer>
            <S.InputField
              type="url"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              placeholder="https://www.zoripsik.com/"
            />
            {portfolioUrl && (
              <S.ClearButton onClick={handleClearUrl}>
                <img src={closeIcon} alt="clear" />
              </S.ClearButton>
            )}
          </S.InputContainer>
          <S.HelperText>포트폴리오를 URL 형태로 첨부해 주세요</S.HelperText>
        </S.Section>

        <S.Section>
          <S.Label>PDF</S.Label>
          <S.FileUploadArea $isUploading={isUploading} onClick={() => !isUploading && fileInputRef.current?.click()}>
            <S.HiddenFileInput
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
            />
            {isUploading ? (
              <S.UploadProgressContainer>
                <S.FileUploadText>이 곳을 눌러 파일을 업로드 하세요</S.FileUploadText>
                <S.ProgressContainer>
                  <S.ProgressText>업로드 {uploadProgress}% 완료...</S.ProgressText>
                  <S.CancelButton onClick={handleCancelUpload}>
                    <img src={CloseStrokeIcon} alt="cancel" />
                  </S.CancelButton>
                </S.ProgressContainer>
              </S.UploadProgressContainer>
            ) : fileName ? (
              <>
                <S.FileUploadText>이 곳을 눌러 파일을 업로드 하세요</S.FileUploadText>
                <S.FileNameContainer>
                  <S.FileNameText>{fileName}</S.FileNameText>
                  <S.FileRemoveButton onClick={(e) => {
                    e.stopPropagation();
                    handleFileRemove();
                  }}>
                    <img src={CloseStrokeIcon} alt="remove" />
                  </S.FileRemoveButton>
                </S.FileNameContainer>
              </>
            ) : (
              <>
                <S.FileUploadText>이 곳을 눌러 파일을 업로드 하세요</S.FileUploadText>
                <S.FileFormatText>지원되는 형식: PDF</S.FileFormatText>
              </>
            )}
          </S.FileUploadArea>
          <S.HelperText>포트폴리오를 PDF 형태로 첨부해 주세요</S.HelperText>
        </S.Section>

        <S.Footer>
          <CommonButton
            content={isSubmitting ? '저장 중...' : '저장하기'}
            width="100%"
            onClick={handleSave}
            disabled={isSubmitting}
          />
        </S.Footer>
      </S.Container>
    </>
  );
}
