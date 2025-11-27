// src/pages/project/ProposalDetailPage.tsx
import SimpleHeader from "@components/shared/SimpleHeader";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { ProjectProgress } from "@components/project/myteam/ProjectProgress";
import { ProjectDescription } from "@components/project/proposal/ProjectDescription";
import { ContactMethod } from "@components/project/proposal/ContactSection";
import {
  MemberBlockList,
  type MemberBlock,
} from "@components/project/proposal/MemberBlockList";

import {
  MOCK_PROPOSALS,
  MOCK_USERS,
  MOCK_PROJECTS,
  MOCK_PROPOSAL_TARGETS,
  MOCK_BLOCKS,
} from "../../mocks/mockAssemblock";

export function ProposalDetailPage() {
  const { proposalId } = useParams<{ proposalId: string }>();
  const proposalIdNum = Number(proposalId);

  // 1) proposal 찾기
  const proposal = MOCK_PROPOSALS.find((p) => p.proposal_id === proposalIdNum);
  if (!proposal) {
    return (
      <Page>
        <SimpleHeader title="제안 상세" />
        <p style={{ padding: "24px" }}>해당 제안을 찾을 수 없어요.</p>
      </Page>
    );
  }

  // 2) proposer 찾기
  const proposer = MOCK_USERS.find((u) => u.user_id === proposal.proposer_id);

  // 3) project (optional)
  const project = MOCK_PROJECTS.find((p) => p.proposal_id === proposalIdNum);

  // 4) proposal_target
  const proposalTargets = MOCK_PROPOSAL_TARGETS.filter(
    (t) => t.proposal_id === proposalIdNum
  );

  const rawBlocks = proposalTargets
    .map((t) => MOCK_BLOCKS.find((b) => b.block_id === t.proposalblock_id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  // 5) "페이지 안에서만" MemberBlockList용으로 변환

  const viewBlocks: MemberBlock[] = rawBlocks.map((b) => ({
    blockId: b.block_id,
    imageUrl: b.result_url ?? "/placeholder-block.png",
    title: b.block_title,
    description: b.oneline_summary,
  }));

  return (
    <Page>
      <SimpleHeader title="제안 상세" />

      <Body>
        {/* 1) 프로젝트 설명 */}
        <ProjectDescription
          title={proposal.project_title}
          proposerName={proposer?.nickname ?? "익명"}
          description={proposal.project_memo}
        />

        <ContactMethod
          title="연락수단"
          description="디스코드 @asdfggg_ 로 연락주세요!"
        />

        {/* 2) 프로젝트 진행상황 (project 있을 때만) */}
        {project && (
          <>
            <SectionGap />
            <ProjectProgress
              status={project.project_status}
              startDate={proposal.recruit_start_date}
              endDate={proposal.recruit_end_date}
            />
          </>
        )}

        {/* 3) 팀원 블록 리스트 */}
        <MemberBlockList blocks={viewBlocks} />
      </Body>
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  background: #f9f9fb;
`;

const Body = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SectionGap = styled.div`
  height: 4px;
`;
