// src/components/myTeam/ContactSection.tsx
import styled from "styled-components";
import type { ProjectStatus } from "./MyTeamTypes";

const CONTACT_TEXT: Record<ProjectStatus, string> = {
  recruiting: "전달받은 연락수단으로 소통해볼까요?",
  ongoing: "진행 관련해서 궁금한 점이 있다면 연락수단으로 소통해요.",
  done: "프로젝트는 끝났지만, 연락은 계속 이어가 볼까요?",
};

const Box = styled.section`
  margin-bottom: 16px;
  padding: 10px 12px;
  border-radius: 999px;
  background: #f0f0f0;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ContactText = styled.span`
  flex: 1;
`;

const ContactValue = styled.span`
  font-weight: 500;
`;

type Props = {
  status: ProjectStatus;
  contact: string;
};

export const ContactSection = ({ status, contact }: Props) => {
  return (
    <Box>
      <span>💬</span>
      <ContactText>{CONTACT_TEXT[status]}</ContactText>
      <ContactValue>{contact}</ContactValue>
    </Box>
  );
};
