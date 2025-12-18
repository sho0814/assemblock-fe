import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  background: #f9f9fb;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

export const SectionGap = styled.div`
  height: 3px;
`;

export const BottomActions = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 38px;
`;

export const ProjectTitle = styled.h2`
  color: var(--Primary-BK, #352f36);
  font-size: 20px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 30px;
  word-wrap: break-word;
`;

export const ProposerProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 16px 0 16px 0;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.7;
  }
`;

export const ProposerImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProposerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProposerName = styled.span`
  color: var(--GrayScale-GR90, #49444a);
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 21px;
  word-wrap: break-word;
`;

export const ProposerRole = styled.span`
  color: var(--GrayScale-GR50, #868286);
  font-size: 12px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 18px;
  word-wrap: break-word;
`;

export const ProjectDesc = styled.p`
  color: var(--GrayScale-GR50, #868286);
  font-size: 12px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 18px;
  word-wrap: break-word;
`;

export const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ContactTitle = styled.span`
  color: black;
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
`;

export const ContactDesc = styled.p`
  color: var(--GrayScale-GR50, #868286);
  font-size: 12px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 18px;
  word-wrap: break-word;
`;
