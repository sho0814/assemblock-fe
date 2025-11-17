// src/pages/project/ProjectPage.tsx
import React, { useState } from "react";
import ProjectHeader from "@components/project/project/ProjectHeader";
import ProjectTabBar from "@components/project/project/ProjectTabBar";
import ProposalList from "@components/project/project/ProposalList";

import {
  mockOngoingProposals,
  mockDoneProposals,
} from "../../mocks/project/proposalMocks";

export function ProjectPage() {
  const [tab, setTab] = useState<"ONGOING" | "DONE">("ONGOING");

  const shownItems =
    tab === "ONGOING" ? mockOngoingProposals : mockDoneProposals;

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
