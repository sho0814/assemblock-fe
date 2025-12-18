// src/pages/project/ProposalDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
import type { ProposalDetailResponse, MemberPart } from "@types";
import { getProfileImage } from "@constants";

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

const getMemberPartLabel = (
  part: MemberPart | string | null | undefined
): string => {
  const partMap: Record<string, string> = {
    FRONTEND: "프론트엔드",
    BACKEND: "백엔드",
    DESIGN: "디자인",
    PLAN: "기획",
    PM: "PM",
  };

  if (!part) return "역할 미정";
  return partMap[part] || "역할 미정";
};

export function ProposalDetailPage() {
  const { proposalId } = useParams<{ proposalId: string }>();
  const proposalIdNum = Number(proposalId);
  const navigate = useNavigate();

  const [myUserId, setMyUserId] = useState<number | null>(null);

  const [proposal, setProposal] = useState<ProposalDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isFromNotification = location.state?.from === "notification";

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

  // 받은 제안인지 판단
  const isProposerMe = proposal.proposerId === myUserId;
  const isReceivedProposal = !isProposerMe;

  // 마감 전인지 판단
  const todayStr = new Date().toISOString().slice(0, 10);
  const isBeforeDeadline = proposal.recruitEndDate >= todayStr;

  //버튼 활성화 조건
  const isActionActive = isReceivedProposal && isBeforeDeadline;

  // 버튼 노출 조건: 받은 제안 + 마감 전 + 알림에서 온 경우
  const shouldShowButtons =
    isReceivedProposal && isBeforeDeadline && isFromNotification;

  const handleAccept = async () => {
    if (!isActionActive) return;

    try {
      await proposalApi.respondToProposal(proposalIdNum, "ACCEPTED");
      alert("제안을 수락했습니다!");
      navigate("/Home/notification");
    } catch (err) {
      console.error("제안 수락 실패:", err);
      alert("제안 수락에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleReject = async () => {
    if (!isActionActive) return;

    try {
      await proposalApi.respondToProposal(proposalIdNum, "REJECTED");
      alert("제안을 거절했습니다.");
      navigate("/Home/notification");
    } catch (err) {
      console.error("제안 거절 실패:", err);
      alert("제안 거절에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Page>
      <SimpleHeader title="제안 상세" />

      <Body>
        {/* 1) 프로젝트 설명 */}
        <div>
          <ProjectTitle>{proposal.projectTitle}</ProjectTitle>

          {/* 제안자 프로필 */}
          <ProposerProfile
            onClick={() => {
              navigate(`/OtherUser/Profile?userId=${proposal.proposerId}`);
            }}>
            <ProposerImage
              src={getProfileImage(proposal.proposerProfileType)}
              alt={proposal.proposerNickname}
            />
            <ProposerInfo>
              <ProposerName>{proposal.proposerNickname}</ProposerName>
              <ProposerRole>
                {getMemberPartLabel(proposal.proposerTechPart)}
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
        {shouldShowButtons && (
          <BottomActions>
            <AcceptButton disabled={!isActionActive} onClick={handleAccept} />
            <RejectButton disabled={!isActionActive} onClick={handleReject} />
          </BottomActions>
        )}
      </Body>
    </Page>
  );
}
