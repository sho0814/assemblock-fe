// src/pages/project/ProjectPage.tsx
import React, { useState, useMemo } from "react";
import ProjectHeader from "@components/project/project/ProjectHeader";
import ProjectTabBar from "@components/project/project/ProjectTabBar";
import ProposalList, {
  type ProposalListItem,
} from "@components/project/project/ProposalList";

import {
  MOCK_PROJECTS,
  MOCK_PROJECT_MEMBERS,
  MOCK_USERS,
  MOCK_PROPOSALS,
  MOCK_PROPOSAL_TARGETS,
  MOCK_BLOCKS,
} from "../../mocks/mockAssemblock";

export function ProjectPage() {
  const [tab, setTab] = useState<"ONGOING" | "DONE">("ONGOING");

  // TODO: 나중에 로그인된 userId로 교체
  const myUserId = 1;

  // 1) 내가 속한 프로젝트 리스트 찾기
  const myProjectIds = useMemo(() => {
    return MOCK_PROJECT_MEMBERS.filter((m) => m.user_id === myUserId).map(
      (m) => m.project_id
    );
  }, [myUserId]);

  // 2) projectId 기반으로 Project 객체 가져오기
  const myProjects = useMemo(() => {
    return MOCK_PROJECTS.filter((p) => myProjectIds.includes(p.project_id));
  }, [myProjectIds]);

  // 3) Project → ProposalListItem 변환
  const allItems: ProposalListItem[] = useMemo(() => {
    return myProjects
      .map((proj) => {
        const proposal = MOCK_PROPOSALS.find(
          (p) => p.proposal_id === proj.proposal_id
        );

        if (!proposal) return null;

        const isSent = proposal.proposer_id === myUserId;

        const myBlockParticipated = MOCK_PROPOSAL_TARGETS.some((pt) => {
          if (pt.proposal_id !== proposal.proposal_id) return false;

          const block = MOCK_BLOCKS.find(
            (b) => b.block_id === pt.proposalblock_id
          );
          if (!block) return false;

          return block.user_id === myUserId;
        });

        const kind = isSent
          ? "SENT"
          : myBlockParticipated
            ? "RECEIVED"
            : "NONE";

        const members = MOCK_PROJECT_MEMBERS.filter(
          (m) => m.project_id === proj.project_id
        );
        const leader = MOCK_USERS.find((u) => u.user_id === proj.proposer_id);

        return {
          projectId: proj.project_id,
          proposalId: proj.proposal_id,
          kind,
          topNickname: leader?.nickname ?? "알 수 없음",
          othersCount: members.length - 1,
          topProfileUrl: undefined,
          state: proj.project_status === "done" ? "DONE" : "ONGOING",
        };
      })
      .filter(Boolean) as ProposalListItem[];
  }, []);

  // 4) 탭 필터링
  const shownItems = useMemo(
    () => allItems.filter((it) => it.state === tab),
    [allItems, tab]
  );

  return (
    <>
      <ProjectHeader />
      <div>
        <ProjectTabBar value={tab} onChange={setTab} />
        <div>
          <ProposalList items={shownItems} />
        </div>
      </div>
    </>
  );
}
