// src/pages/project/MyTeamPage.tsx

import { useMemo } from "react";
import { useParams } from "react-router-dom";
import SimpleHeader from "@components/shared/SimpleHeader";
import styled from "styled-components";
import pattern from "@assets/project/pattern.png";

import { ProjectProgress } from "@components/project/myteam/ProjectProgress";
import { ContactSection } from "@components/project/myteam/ContactSection";
import { MemberList } from "@components/project/myteam/MemberList";
import { MyTeamHeader } from "@components/project/myteam/MyTeamHeader";

import { ProjectFinishButton } from "@components/project/myteam/ProjectFinishButton";
import { ReviewButton } from "@components/project/myteam/ReviewButton";

import type {
  Member,
  ResponseStatus,
} from "@components/project/myteam/MyTeamTypes";

import {
  MOCK_PROPOSALS,
  MOCK_PROJECTS,
  MOCK_PROPOSAL_TARGETS,
  MOCK_PROJECT_MEMBERS,
  MOCK_USERS,
  MOCK_BLOCKS,
} from "../../mocks/mockAssemblock";

const Page = styled.div`
  min-height: 100vh;
  background-color: #f9f9fb;
  background-image: url(${pattern});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
`;

export const MyTeamPage = () => {
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

  return (
    <Page>
      <SimpleHeader title="내 팀 보기" />

      {/* 1. 헤더 */}
      <MyTeamHeader
        status={status}
        acceptedCount={acceptedCount}
        totalCount={totalCount}
      />

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

      {/*  5. 상태별 버튼 */}
      {status === "ongoing" && (
        <ProjectFinishButton
          onFinish={() => {
            console.log("프로젝트 완료하기 클릭됨");
          }}
        />
      )}

      {status === "done" && <ReviewButton />}
    </Page>
  );
};
