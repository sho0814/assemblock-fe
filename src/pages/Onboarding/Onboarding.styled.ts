import styled from "styled-components";

export const PageContainer = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #FAFAFA;
  overflow: hidden;
  margin-top: 20px;
`

export const OnboardingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OnboardingTitle = styled.div`
  font-size: 16px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 8px;
`;

export const OnboardingDesc = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #666666;
  text-align: center;
  margin-bottom: 24px;
`;

export const OnboardingImage = styled.img`
  width: 335px;
  margin: 0 auto 24px;
  display: block;
  margin-bottom: 70px;
`;

export const OnboardingIndicator = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 40px;
`;

export const Dot = styled.span<{ active?: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: ${({ active }) => (active ? "#333333" : "#dddddd")};
  transition: all 0.2s ease;
`;

export const OnboardingFooter = styled.div`
  width: 100%;
`;

export const NextButton = styled.button`
  width: 100%;
  height: 45px;
  border-radius: 16px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  background: #352F36;
  color: #FAFAFA;
  cursor: pointer;
`;

export const LoginButton = styled.button`
    width: 100%;
    height: 45px;
    background-color: #FEE500;
    border-radius: 16px;
    border: none;
    font-size: 14px;
    font-weight: 500;
    color: #000000D9;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    .img {
        width: 20px;
        height: 20px;
        margin-right: 16px;
    }
    
    &:hover {
        background-color: #FFEB00;
    }
`