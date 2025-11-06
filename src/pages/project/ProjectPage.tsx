// src/pages/project/ProjectPage.tsx
import React, { useState } from "react";
import ProjectHeader from "@components/project/project/ProjectHeader";
import ProjectTabBar from "@components/project/project/ProjectTabBar";
import ProposalList from "@components/project/project/ProposalList";
import type { ProposalListItem } from "@components/project/project/ProposalList";
import ProposalCTA from "@components/project/project/ProposalCTA";

export function ProjectPage() {
  const [tab, setTab] = useState<"ONGOING" | "DONE">("ONGOING");

  // 목업 데이터
  const mockSent: ProposalListItem[] = [
    {
      proposalId: 1,
      kind: "SENT",
      topNickname: "공룡",
      othersCount: 4,
      topProfileUrl: "",
      onClickTeam: () => {
        /* navigate */
      },
      state: "ONGOING",
    },
    {
      proposalId: 3,
      kind: "SENT",
      topNickname: "도도",
      othersCount: 2,
      topProfileUrl: "",
      onClickTeam: () => {},
      state: "DONE",
    },
  ];

  const mockReceived: ProposalListItem[] = [
    {
      proposalId: 2,
      kind: "RECEIVED",
      topNickname: "보라",
      othersCount: 3,
      topProfileUrl: "",
      onClickTeam: () => {},
      state: "ONGOING",
    },
  ];

  const shownSent = mockSent.filter((v) =>
    tab === "ONGOING" ? v.state !== "DONE" : v.state === "DONE"
  );
  const shownRecv = mockReceived.filter((v) =>
    tab === "ONGOING" ? v.state !== "DONE" : v.state === "DONE"
  );

  return (
    <>
      <ProjectHeader />
      <div>
        <ProjectTabBar value={tab} onChange={setTab} />

        {tab === "ONGOING" ? (
          <div>
            <ProposalList sentItems={shownSent} receivedItems={shownRecv} />
            <ProposalCTA />
          </div>
        ) : (
          <div>
            <ProposalList sentItems={shownSent} receivedItems={shownRecv} />
            <ProposalCTA />
          </div>
        )}
      </div>
    </>
  );
}
