// src/pages/project/review/ReviewPage.tsx
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import SimpleHeader from "@components/shared/SimpleHeader";
import { ReviewQuestion } from "@components/project/review/ReviewQuestion";
import { ReviewBlocks } from "@components/project/review/ReviewBlocks";
import type { ReviewBlockValue } from "@components/project/review/ReviewBlocks";
import { ReviewConfirmModal } from "@components/project/review/ReviewConfirmModal";

import {
  getMembersByProposalId,
  getReviewTargets,
  MOCK_PROJECTS,
} from "../../mocks/mockAssemblock";

export function ReviewPage() {
  const navigate = useNavigate();
  const { proposalId } = useParams<{ proposalId: string }>();

  const proposalIdNum = Number(proposalId);

  const myUserId = 1;

  // 1) proposalId -> 프로젝트 찾기
  const project = useMemo(
    () => MOCK_PROJECTS.find((p) => p.proposal_id === proposalIdNum),
    [proposalIdNum]
  );

  const projectId = project?.project_id ?? 0;

  // 2) proposalId 기준 전체 멤버 가져오기
  const projectMembers = useMemo(
    () => getMembersByProposalId(proposalIdNum),
    [proposalIdNum]
  );

  // 3) 내가 리뷰해야 할 타겟(= 나 제외한 팀원들)
  const targets = useMemo(() => {
    if (!projectId) return [];
    return getReviewTargets(projectId, myUserId);
    // => User[] 리턴
  }, [projectId, myUserId]);

  const [remainingIds, setRemainingIds] = useState<number[]>(
    targets.map((t) => t.user_id)
  );

  const currentTargetId = remainingIds[0] ?? null;
  const currentTarget = targets.find((t) => t.user_id === currentTargetId);

  const [value, setValue] = useState<ReviewBlockValue | null>(null);

  const [pendingValue, setPendingValue] = useState<ReviewBlockValue | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [submitted, setSubmitted] = useState<
    { targetId: number; block: ReviewBlockValue }[]
  >([]);

  const handleSelectBlock = (v: ReviewBlockValue) => {
    setPendingValue(v);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (!pendingValue || currentTargetId == null) return;

    // 1) 현재 리뷰 저장
    setSubmitted((prev) => [
      ...prev,
      { targetId: currentTargetId, block: pendingValue },
    ]);

    // 2) (목업 단계 payload)
    const payload = {
      proposalId: proposalIdNum,
      projectId,
      reviewerId: myUserId,
      reviewedId: currentTargetId,
      review: pendingValue, // "Good" | "Notbad" | "Disappoint"
    };
    console.log("submit review payload:", payload);

    // 3) remaining에서 현재 target 제거
    setRemainingIds((prev) => prev.filter((id) => id !== currentTargetId));

    // 4) UI 리셋 + 모달 닫기
    setValue(null);
    setPendingValue(null);
    setIsModalOpen(false);
  };

  if (remainingIds.length === 0) {
    return (
      <Page>
        <SimpleHeader title="리뷰 블록 남기기" />
        <DoneWrapper>
          <DoneTitle>모든 팀원에게 리뷰를 남겼어요!</DoneTitle>
          <DoneDesc>프로필에서 작성한 리뷰를 확인할 수 있어요 🙂</DoneDesc>
          <DoneButton onClick={() => navigate(-1)}>돌아가기</DoneButton>
        </DoneWrapper>
      </Page>
    );
  }

  const remainingTargets = targets
    .filter((t) => remainingIds.includes(t.user_id))
    .map((t) => ({ id: t.user_id, name: t.nickname }));

  return (
    <Page>
      <SimpleHeader title="리뷰 블록 남기기" />

      <Content>
        <ReviewQuestion
          targetName={currentTarget?.nickname ?? ""}
          members={remainingTargets}
          selectedId={currentTargetId ?? 0}
          onChangeMember={(id) => {
            setRemainingIds((prev) => {
              const rest = prev.filter((x) => x !== id);
              return [id, ...rest];
            });
            setValue(null);
          }}
        />

        <ReviewBlocks value={value} onSelect={handleSelectBlock} />
      </Content>

      <ReviewConfirmModal
        isOpen={isModalOpen}
        pendingValue={pendingValue}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  background: #f9f9fb;
`;

const Content = styled.div`
  padding: 24px 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

const DoneWrapper = styled.div`
  padding: 120px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  text-align: center;
`;

const DoneTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #111827;
`;

const DoneDesc = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
`;

const DoneButton = styled.button`
  margin-top: 16px;
  width: 180px;
  height: 48px;
  border: none;
  border-radius: 999px;
  background: #111827;
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
`;
