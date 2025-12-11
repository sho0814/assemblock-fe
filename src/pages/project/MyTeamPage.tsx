// src/pages/project/MyTeamPage.tsx
import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SimpleHeader from "@components/shared/SimpleHeader";

import { ProjectProgress } from "@components/project/myteam/ProjectProgress";
import { ContactSection } from "@components/project/myteam/ContactSection";
import { MemberList } from "@components/project/myteam/MemberList";
import type {
  Member,
  ResponseStatus,
  ProjectStatus,
} from "@components/project/myteam/MyTeamTypes";
import {
  MOCK_PROPOSALS,
  MOCK_PROJECTS,
  MOCK_PROPOSAL_TARGETS,
  MOCK_PROJECT_MEMBERS,
  MOCK_USERS,
  MOCK_BLOCKS,
} from "../../mocks/mockAssemblock";
import {
  Page,
  HeaderWrapper,
  HeaderTitle,
  HeaderSub,
  Counter,
  ActionButton,
} from "./MyTeamPage.styled";

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
      subtitle: "",
    },
  };

export const MyTeamPage = () => {
  const navigate = useNavigate();
  const { proposalId } = useParams<{ proposalId: string }>();
  const proposalIdNum = Number(proposalId);

  // 1) proposal 찾기
  const proposal = useMemo(
    () => MOCK_PROPOSALS.find((p) => p.proposal_id === proposalIdNum),
    [proposalIdNum]
  );

  if (!proposal) {
    return (
      <Page>
        <SimpleHeader title="내 팀 보기" />
        <p style={{ padding: "24px" }}>해당 프로젝트를 찾을 수 없어요.</p>
      </Page>
    );
  }

  // 2) project 찾기
  const project = MOCK_PROJECTS.find((p) => p.proposal_id === proposalIdNum);
  const status = project?.project_status ?? "recruiting";

  // 3) proposal_target 조회
  const proposalTargets = MOCK_PROPOSAL_TARGETS.filter(
    (t) => t.proposal_id === proposalIdNum
  );
  const acceptedCount = proposalTargets.filter(
    (t) => t.response_status === "accepted"
  ).length;
  const totalCount = proposalTargets.length;

  // 4) 멤버 목록
  const rawMembers = project
    ? MOCK_PROJECT_MEMBERS.filter((m) => m.project_id === project.project_id)
    : [];

  const responseStatusByUserId = new Map<number, ResponseStatus>();
  proposalTargets.forEach((t) => {
    const block = MOCK_BLOCKS.find((b) => b.block_id === t.proposalblock_id);
    if (!block) return;
    responseStatusByUserId.set(block.user_id, t.response_status);
  });

  const members: Member[] = rawMembers.map((m) => {
    const user = MOCK_USERS.find((u) => u.user_id === m.user_id);
    const mappedResponseStatus: ResponseStatus = m.is_proposer
      ? "accepted"
      : (responseStatusByUserId.get(m.user_id) ?? "pending");

    return {
      id: m.user_id,
      name: user?.nickname ?? "알 수 없음",
      role: m.member_role,
      isLeader: m.is_proposer,
      responseStatus: mappedResponseStatus,
    };
  });

  // 5) 연락 수단
  const contactMethod = proposal.discord_id;

  // 6) 헤더 카피
  const headerCopy = HEADER_COPY[status];

  // 7) 버튼 핸들러
  const handleProjectFinish = () => {
    console.log("프로젝트 완료하기 클릭됨");
  };

  const handleReviewClick = () => {
    if (!proposalId) return;
    navigate(`/Project/team/${proposalId}/review`);
  };

  return (
    <Page>
      <SimpleHeader title="내 팀 보기" />

      {/* 1. 헤더 */}
      <HeaderWrapper>
        <HeaderTitle>{headerCopy.title}</HeaderTitle>
        <HeaderSub>{headerCopy.subtitle}</HeaderSub>
      </HeaderWrapper>
      {status === "recruiting" && (
        <Counter>
          수락한 팀원 {acceptedCount}/{totalCount}
        </Counter>
      )}
      {/* 2. 프로젝트 진행 상태 */}
      <ProjectProgress
        status={status}
        startDate={proposal.recruit_start_date}
        endDate={proposal.recruit_end_date}
      />

      {/* 3. 연락 수단 안내 */}
      {(status === "recruiting" || status === "ongoing") && (
        <ContactSection contact={contactMethod} />
      )}

      {/* 4. 멤버 리스트 */}
      <MemberList status={status} members={members} />

      {/* 5. 상태별 버튼 */}
      {status === "ongoing" && (
        <ActionButton onClick={handleProjectFinish}>
          프로젝트 완료하기
        </ActionButton>
      )}

      {status === "done" && (
        <ActionButton onClick={handleReviewClick}>
          팀원 리뷰 남기러 가기
        </ActionButton>
      )}
    </Page>
  );
};
