// src/pages/project/review/ReviewPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import SimpleHeader from "@components/shared/SimpleHeader";
import { ReviewQuestion } from "@components/project/review/ReviewQuestion";
import { ReviewBlocks } from "@components/project/review/ReviewBlocks";
import type { ReviewBlockValue } from "@components/project/review/ReviewBlocks";
import { ReviewConfirmModal } from "@components/project/review/ReviewConfirmModal";

// import { getProjectReviews, createReview } from "@api/review";
import { createReview } from "@api/review";
import { getProjectDetail } from "@api/project";
import { getUserMe } from "@api/user";
import type { ReviewRating, ProjectDetailResponse, Member } from "@types";

// 목업 데이터 (백엔드 준비 후 삭제)
import { reviewsMock } from "@mocks/review.mock";
import { projectDetailMock } from "@mocks/projectDetail.mock";

import pattern from "@assets/project/pattern.png";

export function ReviewPage() {
  const navigate = useNavigate();
  const { proposalId } = useParams<{ proposalId: string }>();
  const proposalIdNum = Number(proposalId);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [projectMembers, setProjectMembers] = useState<Member[]>([]);
  const [writtenReviewUserIds, setWrittenReviewUserIds] = useState<number[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [remainingIds, setRemainingIds] = useState<number[]>([]);
  const [value, setValue] = useState<ReviewBlockValue | null>(null);
  const [pendingValue, setPendingValue] = useState<ReviewBlockValue | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 1. 내 userId 가져오기
        const userInfo = await getUserMe();
        const userId = userInfo.userId;

        // 2. 프로젝트 상세 정보 가져오기
        // const projectData: ProjectDetailResponse =
        //   await getProjectDetail(proposalIdNum);
        const projectData = projectDetailMock as ProjectDetailResponse;
        setProjectId(projectData.projectId);

        // 3. 프로젝트 멤버 추출 (나를 제외한 팀원들)
        const otherMembers = projectData.members.filter(
          (m) => m.userId !== userId
        );
        setProjectMembers(otherMembers);

        // 4. 이미 작성한 리뷰 목록 조회
        // 목업 사용 (백엔드 준비 후 아래 주석 해제)
        const reviews = reviewsMock[projectData.projectId] || [];
        // const reviews = await getProjectReviews(projectData.projectId);

        // 5. 이미 리뷰를 작성한 사용자 ID 추출
        const reviewedUserIds = reviews
          .map((r) => {
            // nickname으로 매칭
            return otherMembers.find((m) => m.nickname === r.targetUserNickname)
              ?.userId;
          })
          .filter((id): id is number => id !== undefined);

        setWrittenReviewUserIds(reviewedUserIds);

        // 6. 아직 리뷰 작성하지 않은 팀원 ID 설정
        const notReviewedIds = otherMembers
          .filter((m) => !reviewedUserIds.includes(m.userId))
          .map((m) => m.userId);

        setRemainingIds(notReviewedIds);

        console.log("내 userId:", userId);
        console.log("프로젝트 ID:", projectData.projectId);
        console.log("프로젝트 멤버:", otherMembers);
        console.log("이미 작성한 리뷰 대상:", reviewedUserIds);
        console.log("남은 리뷰 대상:", notReviewedIds);
      } catch (err) {
        console.error("데이터 로드 실패:", err);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (proposalIdNum) {
      fetchData();
    }
  }, [proposalIdNum]);

  // 현재 리뷰 대상
  const currentTargetId = remainingIds[0] ?? null;
  const currentTarget = projectMembers.find(
    (m) => m.userId === currentTargetId
  );

  // 블록 선택 핸들러
  const handleSelectBlock = (v: ReviewBlockValue) => {
    setPendingValue(v);
    setIsModalOpen(true);
  };

  // ReviewBlockValue → ReviewRating 변환
  const mapBlockValueToRating = (
    blockValue: ReviewBlockValue
  ): ReviewRating => {
    const map: Record<ReviewBlockValue, ReviewRating> = {
      Good: "good",
      Notbad: "notbad",
      Disappoint: "disappoint",
    };
    return map[blockValue];
  };

  // 리뷰 제출 핸들러
  const handleConfirm = async () => {
    if (!pendingValue || currentTargetId === null || projectId === null) return;

    try {
      setIsSubmitting(true);

      const rating = mapBlockValueToRating(pendingValue);

      // 리뷰 작성 API 호출
      await createReview({
        projectId,
        reviewedUserId: currentTargetId,
        rating,
      });

      console.log("리뷰 작성 성공:", {
        projectId,
        reviewedUserId: currentTargetId,
        rating,
      });

      // remainingIds에서 현재 대상 제거
      setRemainingIds((prev) => prev.filter((id) => id !== currentTargetId));

      // UI 리셋 + 모달 닫기
      setValue(null);
      setPendingValue(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error("리뷰 작성 실패:", err);
      alert("리뷰 작성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 로딩 중
  if (isLoading) {
    return (
      <Page>
        <SimpleHeader title="리뷰 블록 남기기" />
        <LoadingWrapper>
          <p>로딩 중...</p>
        </LoadingWrapper>
      </Page>
    );
  }

  // 에러
  if (error) {
    return (
      <Page>
        <SimpleHeader title="리뷰 블록 남기기" />
        <ErrorWrapper>
          <p>{error}</p>
          <RetryButton onClick={() => window.location.reload()}>
            다시 시도
          </RetryButton>
        </ErrorWrapper>
      </Page>
    );
  }

  // 모든 리뷰 작성 완료
  if (remainingIds.length === 0) {
    return (
      <Page>
        <SimpleHeader title="리뷰 블록 남기기" />
        <DoneWrapper>
          <DoneTitle>모든 팀원에게 리뷰 블록을 남겼어요!</DoneTitle>
          <DoneButton onClick={() => navigate("/Home")}>
            홈으로 돌아가기
          </DoneButton>
        </DoneWrapper>
      </Page>
    );
  }

  // 남은 리뷰 대상 목록
  const remainingTargets = projectMembers
    .filter((m) => remainingIds.includes(m.userId))
    .map((m) => ({ id: m.userId, name: m.nickname }));

  return (
    <Page>
      <SimpleHeader title="리뷰 블록 남기기" />

      <Content>
        <ReviewQuestion
          targetName={currentTarget?.nickname ?? ""}
          members={remainingTargets}
          selectedId={currentTargetId ?? 0}
          onChangeMember={(id: number) => {
            // 선택한 멤버를 맨 앞으로 이동
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
        onClose={() => {
          if (!isSubmitting) {
            setIsModalOpen(false);
          }
        }}
        onConfirm={handleConfirm}
      />
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  background-color: #f9f9fb;
  background-image: url(${pattern});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
`;

const Content = styled.div`
  padding: 38px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
`;

const LoadingWrapper = styled.div`
  padding: 120px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 16px;
  color: #6b7280;
`;

const ErrorWrapper = styled.div`
  padding: 120px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
  font-size: 16px;
  color: #ef4444;
`;

const RetryButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  background: #352f36;
  color: #fafafa;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #4a4350;
  }
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
  font-weight: 600;
  color: #111827;
`;

const DoneButton = styled.button`
  margin-top: 36px;
  width: 192px;
  height: 45px;
  border: none;
  border-radius: 16px;
  background: #352f36;
  color: #fafafa;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #4a4350;
  }
`;
