// src/components/project/review/ReviewQuestion.tsx
import styled from "styled-components";
import { MemberDropdown } from "./MemberDropdown";
import type { MemberOption } from "./MemberDropdown";

interface ReviewQuestionProps {
  targetName: string;
  members: MemberOption[];
  selectedId: number;
  onChangeMember: (id: number) => void;
}

export function ReviewQuestion({
  targetName,
  members,
  selectedId,
  onChangeMember,
}: ReviewQuestionProps) {
  return (
    <Wrapper>
      <Title>
        <strong>{targetName}</strong> 님에게
      </Title>

      <MemberDropdown
        members={members}
        selectedId={selectedId}
        onChange={onChangeMember}
      />

      <Question>님은 어떤 팀원이었나요?</Question>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 13px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #111827;

  strong {
    font-weight: 900;
  }
`;

const Question = styled.p`
  margin-top: 6px;
  font-size: 24px;
  font-weight: 700;
  color: #111827;
`;
