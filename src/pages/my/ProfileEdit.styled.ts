import styled from "styled-components";

export const ProfileEditContainer = styled.div`
  min-width: 375px;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
`;

export const HeaderBar = styled.div`
  position: relative;
  top: 0;
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
  opacity: 1;
`;

export const HeaderSlot = styled.div`
  display: flex;
  align-items: center;
  top: 0;
`;

export const CenterTextBox = styled.div`
  min-width: 70px;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #352F36;
  font-size: 16px;
  font-weight: 600;
  line-height: 150%;
`;

export const BackButton = styled.button`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
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
  padding: 8px 16px;
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

export const FileUploadArea = styled.div`
  width: 100%;
  min-height: 120px;
  border: 2px dashed #F0EFF1;
  border-radius: 16px;
  background: #F0EFF1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s;
  
  &:hover {
    border-color: #D0CFD1;
  }
`;

export const FileUploadText = styled.div`
  font-size: 14px;
  color: #352F36;
  text-align: center;
`;

export const FileName = styled.div`
  font-size: 12px;
  color: #868286;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FileRemoveButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #F0EFF1;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #868286;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const ProfileEditButton = styled.button`
  display: flex;
  width: 335px;
  padding: 12px 10px;
  justify-content: center;
  align-items: center;
  gap: 32px;
  border-radius: 16px;
  background: var(--Primary-BK, #352F36);
  margin: 32px auto 24px;
  color: #FAFAFA;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
`;

