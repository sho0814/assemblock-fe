import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  > div > div:first-child {
    visibility: hidden;
    pointer-events: none;
  }
  
  > div {
    justify-content: center;
    padding-left: 0;
  }
  
  > div > div:nth-child(2) {
    justify-content: center;
    margin-left: 0;
  }
`;

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

export const WarningText = styled.p`
  font-family: 'Pretendard', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #726D72;
  margin: 0 0 36px 0;
  line-height: 1.5;
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
  font-size: 20px;
  font-weight: 600;
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
  font-size: 10px;
  font-weight: 400;
  color:  #868286;
  margin: 0 0 40px 0;
  line-height: 1.5;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 349px;
`;

export const LaterLink = styled.button`
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #726D72;
  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    color: #352F36;
  }
`;

