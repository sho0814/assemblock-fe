import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleHeader from '@components/shared/SimpleHeader';
import CommonButton from '@components/shared/CommonButton';
import * as S from './ProfilePortfolio.styled';
import closeIcon from '@assets/board/close.svg';
import CloseStrokeIcon from '@assets/MyPage/CloseStroke.svg';

export function ProfilePortfolio() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

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
    // localStorage에 포트폴리오 데이터 저장 추후 연결
    const savedUserProfile = localStorage.getItem('userProfile');
    let profileData = savedUserProfile ? JSON.parse(savedUserProfile) : {};
    
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
    
    profileData = {
      ...profileData,
      portfolio_url: portfolioUrl.trim() || '', 
      portfolio_pdf_url: fileData || '', 
      fileName: fileName || '',
      fileData: fileData || '',
    };
    
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    
    // 홈페이지로 이동
    navigate('/');
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
            content="저장하기"
            width="100%"
            onClick={handleSave}
          />
        </S.Footer>
      </S.Container>
    </>
  );
}
