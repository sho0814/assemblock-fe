import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 24px 20px;
  box-sizing: border-box;
`;

export const MainInstructionText = styled.h2`
  font-family: 'Pretendard', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #352F36;
  margin: 0 0 8px 0;
  line-height: 1.5;
`;

export const SubInstructionText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #726D72;
  margin: 0 0 36px 0;
  line-height: 1.5;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
`;

export const Label = styled.label`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #352F36;
  margin-bottom: 8px;
`;

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
`;

export const InputField = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #F0EFF1;
  padding: 8px 32px 8px 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 150%; 
  color: #352F36;
  background: transparent;
  outline: none;
  
  &::placeholder {
    color: #C2C1C3;
  }
  
  &:focus {
    border-bottom-color: #352F36;
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 16px;
    height: 16px;
    opacity: 0.6;
  }
  
  &:hover img {
    opacity: 1;
  }
`;

export const HelperText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #868286;
  margin: 0;
  line-height: 1.5;
`;

export const FileUploadArea = styled.div<{ $isUploading?: boolean }>`
  width: 100%;
  min-height: 120px;
  border-radius: 4px;
  border: 1px dashed var(--GrayScale-GR50, #868286);
  background: var(--GrayScale-GR10, #F0EFF1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  cursor: ${props => props.$isUploading ? 'default' : 'pointer'};
  position: relative;
  transition: all 0.2s;
  margin-bottom: 8px;
  
  &:hover {
    border-color: ${props => props.$isUploading ? '#F0EFF1' : '#D0CFD1'};
  }
`;

export const FileUploadText = styled.div`
  font-size: 14px;
  color: #352F36;
  text-align: center;
`;

export const FileFormatText = styled.div`
  font-size: 12px;
  color: #C2C1C3;
  text-align: center;
`;

export const UploadProgressContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ProgressText = styled.div`
  font-size: 12px;
  color: #C2C1C3;
  text-align: center;
`;

export const CancelButton = styled.button`
  width: 18px;
  height: 18px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 18px;
    height: 18px;
  }
`;

export const FileNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: center;
`;

export const FileNameText = styled.div`
  font-size: 12px;
  color: #C2C1C3;
  text-align: center;
`;

export const FileRemoveButton = styled.button`
  width: 18px;
  height: 18px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 18px;
    height: 18px;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 349px;
`;

