// src/pages/project/ProjectPage.tsx
import React, { useState, useMemo } from "react";
import ProjectHeader from "@components/project/project/ProjectHeader";
import ProjectTabBar from "@components/project/project/ProjectTabBar";
import ProposalList from "@components/project/project/ProposalList";

import { MOCK_MY_TEAM_LIST } from "../../mocks/project/myTeamMocks";
import type { ProposalListItem } from "@components/project/project/ProposalList";

export function ProjectPage() {
  const [tab, setTab] = useState<"ONGOING" | "DONE">("ONGOING");

  // 1. MyTeam 리스트 → ProposalListItem[] 형태로 변환
  const allItems: ProposalListItem[] = useMemo(() => {
    return MOCK_MY_TEAM_LIST.map((team) => {
      const leader = team.members.find((m) => m.isLeader) ?? team.members[0];

      return {
        projectId: team.projectId,
        proposalId: team.proposalId,
        kind: "SENT", // 현재 화면은 전부 '보낸 제안'
        topNickname: leader.name,
        othersCount: team.members.length - 1,
        topProfileUrl: undefined, // 추후 필요하면 추가
        state: team.status === "done" ? "DONE" : "ONGOING",
      };
    });
  }, []);

  // 2. 탭 구분해서 필터링
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
