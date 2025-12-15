// src/pages/project/ProposalDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimpleHeader from "@components/shared/SimpleHeader";

import { ProjectProgress } from "@components/project/myteam/ProjectProgress";
import {
  MemberBlockList,
  type MemberBlock,
} from "@components/project/proposal/MemberBlockList";

import AcceptButton from "@components/project/proposal/AcceptButton";
import RejectButton from "@components/project/proposal/RejectButton";

import { proposalApi } from "@api/proposal";
import { getUserMe } from "@api/user";
import type { ProposalDetailResponse } from "@types";

import {
  Page,
  Body,
  BottomActions,
  ProjectTitle,
  ProjectDesc,
  ContactWrapper,
  ContactTitle,
  ContactDesc,
  ProposerProfile,
  ProposerImage,
  ProposerInfo,
  ProposerName,
  ProposerRole,
} from "./ProposalDetailPage.styled";

import { proposalDetailMock } from "@mocks/proposalDetail.mock";

export function ProposalDetailPage() {
  const { proposalId } = useParams<{ proposalId: string }>();
  const proposalIdNum = Number(proposalId);

  const [myUserId, setMyUserId] = useState<number | null>(null);

  const [proposal, setProposal] = useState<ProposalDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposalDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const userInfo = await getUserMe();
        setMyUserId(userInfo.userId);

        // 데이터 들어오면 수정
        // const data = await proposalApi.getProposalDetail(proposalIdNum);
        const data = proposalDetailMock as ProposalDetailResponse;

        setProposal(data);
      } catch (err) {
        console.error("제안 상세 조회 실패:", err);
        setError("제안 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (proposalIdNum) {
      fetchProposalDetail();
    }
  }, [proposalIdNum]);

  // 로딩 중
  if (isLoading) {
    return (
      <Page>
        <SimpleHeader title="제안 상세" />
        <p style={{ padding: "24px" }}>로딩 중...</p>
      </Page>
    );
  }

  // 에러 발생 또는 데이터 없음
  if (error || !proposal) {
    return (
      <Page>
        <SimpleHeader title="제안 상세" />
        <p style={{ padding: "24px" }}>
          {error || "해당 제안을 찾을 수 없어요."}
        </p>
      </Page>
    );
  }

  // MemberBlock 형식으로 변환
  const viewBlocks: MemberBlock[] = proposal.targetBlocks.map((block) => ({
    blockId: block.blockId,
    imageUrl: block.resultUrl || "/placeholder-block.png",
    title: block.blockTitle,
    description: block.oneLineSummary,
  }));

  // 받은 제안인지 판단 (내 블록이 포함되어 있고, 제안자가 나가 아닌 경우)
  // TODO: targetBlocks에 writerId가 있다면 그걸로 판단, 없다면 다른 방법 필요
  const isProposerMe = proposal.proposerId === myUserId;
  const isReceivedProposal = !isProposerMe; // 임시: 제안자가 아니면 받은 제안으로 간주

  // 마감 전인지 판단
  const todayStr = new Date().toISOString().slice(0, 10);
  const isBeforeDeadline = proposal.recruitEndDate >= todayStr;
  const isActionActive = isReceivedProposal && isBeforeDeadline;

  const handleAccept = () => {
    if (!isActionActive) return;
    // TODO: 수락 API 연결
    console.log("제안 수락:", proposalIdNum);
  };

  const handleReject = () => {
    if (!isActionActive) return;
    // TODO: 거절 API 연결
    console.log("제안 거절:", proposalIdNum);
  };

  return (
    <Page>
      <SimpleHeader title="제안 상세" />

      <Body>
        {/* 1) 프로젝트 설명 */}
        <div>
          <ProjectTitle>{proposal.projectTitle}</ProjectTitle>

          {/* 제안자 프로필 */}
          <ProposerProfile>
            <ProposerImage
              src={"/default-profile.png"}
              alt={proposal.proposerNickname}
            />
            <ProposerInfo>
              <ProposerName>{proposal.proposerNickname}</ProposerName>
              <ProposerRole>
                {proposal.proposerTechPart || "역할 미정"}
              </ProposerRole>
            </ProposerInfo>
          </ProposerProfile>

          <ProjectDesc>{proposal.projectMemo}</ProjectDesc>
        </div>

        {/* 2) 연락수단 */}
        <ContactWrapper>
          <ContactTitle>연락수단</ContactTitle>
          <ContactDesc>
            {proposal.discordId
              ? `디스코드 ${proposal.discordId}로 연락주세요!`
              : "연락처 정보가 없습니다."}
          </ContactDesc>
        </ContactWrapper>

        {/* 3) 프로젝트 진행상황 */}
        <ProjectProgress
          status="recruiting" // TODO: 실제 상태값 필요시 API 응답에 추가
          startDate={proposal.recruitStartDate}
          endDate={proposal.recruitEndDate}
        />

        {/* 4) 팀원 블록 리스트 */}
        <MemberBlockList blocks={viewBlocks} />

        {/* 5) 받은 제안일 때만 수락/거절 버튼 노출 */}
        {isReceivedProposal && (
          <BottomActions>
            <AcceptButton disabled={!isActionActive} onClick={handleAccept} />
            <RejectButton disabled={!isActionActive} onClick={handleReject} />
          </BottomActions>
        )}
      </Body>
    </Page>
  );
}
