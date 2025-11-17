// src/components/myTeam/TeamHeader.tsx
import styled from "styled-components";
import type { ProjectStatus } from "./MyTeamTypes";

const HEADER_COPY: Record<ProjectStatus, { title: string; subtitle: string }> =
  {
    recruiting: {
      title: "팀원들 모두 수락해줄 때까지\n조금만 기다려볼까요?",
      subtitle: "모두가 수락하지 않아도 팀빌딩을 완료할 수 있어요.",
    },
    ongoing: {
      title: "즐거운 마음으로\n프로젝트를 진행해볼까요?",
      subtitle:
        "프로젝트 완료하기를 누르면 프로젝트가 끝나고,\n팀원 모두가 리뷰 블록을 작성할 수 있어요.",
    },
    done: {
      title: "우리 팀의 여정이 마무리됐어요.\n멋진 협업이었네요!",
      subtitle: "아래 팀원들에게 리뷰 블록을 남겨주세요.",
    },
  };

const Wrapper = styled.section`
  margin-bottom: 24px;
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  white-space: pre-line;
`;

const HeaderSub = styled.p`
  margin-top: 8px;
  font-size: 13px;
  color: #666;
  white-space: pre-line;
`;

const Counter = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: #999;
  text-align: right;
`;

type Props = {
  status: ProjectStatus;
  acceptedCount: number;
  totalCount: number;
};

export const MyTeamHeader = ({ status, acceptedCount, totalCount }: Props) => {
  const copy = HEADER_COPY[status];

  return (
    <Wrapper>
      <HeaderTitle>{copy.title}</HeaderTitle>
      <HeaderSub>{copy.subtitle}</HeaderSub>
      {status === "recruiting" && (
        <Counter>
          수락한 팀원 {acceptedCount}/{totalCount}
        </Counter>
      )}
    </Wrapper>
  );
};
