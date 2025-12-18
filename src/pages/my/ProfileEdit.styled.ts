import styled from "styled-components";

export const ProfileEditContainer = styled.div`                  
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const HeaderBar = styled.div`
  position: relative;
  top: 0;
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderSlot = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  
  &:first-child {
    justify-content: flex-start;
  }
  
  &:nth-child(2) {
    justify-content: center;
  }
  
  &:last-child {
    justify-content: flex-end;
  }
`;

export const CenterTextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #352F36;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
`;

export const Profile = styled.div`
  position: relative;
  display: block;
  margin: 16px auto 0;
  width: fit-content;
`;

export const EditBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const RequiredLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #868286;
  margin-bottom: 16px;
  justify-content: flex-end;
`;

export const RequiredDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #F05C5C;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 600;
  color: #352F36;
  margin-bottom: 8px;
`;

export const SectionTitleDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #F05C5C;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: none;
  border-radius: 16px;
  background: #F0EFF1;
  font-size: 14px;
  color: #352F36;
  outline: none;
  
  &::placeholder {
    color: #868286;
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #868286;
`;

export const HelperText = styled.div`
  font-size: 12px;
  color: #868286;
  margin-top: 4px;
`;

export const PartButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const PartButton = styled.button<{ $isSelected?: boolean; $color?: string }>`
  padding: 6px 12px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.$isSelected ? `
    background: ${props.$color || '#35CDFF'};
    color: #FAFAFA;
  ` : `
    background: #F0EFF1;
    color: #868286;
  `}
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

