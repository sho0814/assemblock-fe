// src/pages/project/MyTeamPage.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SimpleHeader from "@components/shared/SimpleHeader";

import { ProjectProgress } from "@components/project/myteam/ProjectProgress";
import { ContactSection } from "@components/project/myteam/ContactSection";
import { MemberList } from "@components/project/myteam/MemberList";
import { ConfirmModal } from "@components/project/myteam/ConfirmModal";
import { CompleteModal } from "@components/project/myteam/CompleteModal";

import { getProjectDetail, completeProject } from "@api/project";

import type { Member, ProjectDetailResponse } from "@types";

import {
  Page,
  HeaderWrapper,
  HeaderTitle,
  HeaderSub,
  Counter,
  ActionButton,
} from "./MyTeamPage.styled";

const HEADER_COPY = {
  recruiting: {
    title: "팀원들 모두 수락해줄 때까지\n조금만 기다려볼까요?",
    subtitle: "모두가 수락하지 않아도 팀빌딩을 완료할 수 있어요.",
  },
  ongoing: {
    title: "즐거운 마음으로\n프로젝트를 진행해볼까요?",
    subtitle:
      "프로젝트 완료하기를 누르면 프로젝트가 끝나고,\n팀원 모두가 리뷰 블록을 작성할 수 있어요.",
  },
  done: {
    title: "우리 팀의 여정이 마무리됐어요.\n멋진 협업이었네요!",
    subtitle: "",
  },
};

export const MyTeamPage = () => {
  const navigate = useNavigate();
  const { proposalId } = useParams<{ proposalId: string }>();
  const proposalIdNum = Number(proposalId);

  const [project, setProject] = useState<ProjectDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProjectDetail(proposalIdNum);

        console.log("프로젝트 상세:", data);

        setProject(data);
      } catch (err) {
        console.error("프로젝트 조회 실패:", err);
        setError("프로젝트 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (proposalIdNum) {
      fetchProjectDetail();
    }
  }, [proposalIdNum]);

  const handleProjectFinishClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleProjectFinishConfirm = async () => {
    if (isCompleting || !project) return;

    try {
      setIsCompleting(true);
      setIsConfirmModalOpen(false);

      await completeProject(project.projectId);

      setProject({
        ...project,
        status: "done",
      });
      setAlertType("success");
      setIsAlertModalOpen(true);
    } catch (err) {
      console.error("프로젝트 완료 실패:", err);

      setAlertType("error");
      setIsAlertModalOpen(true);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalOpen(false);
  };

  const handleAlertClose = () => {
    setIsAlertModalOpen(false);
  };

  // 로딩 중
  if (isLoading) {
    return (
      <Page>
        <SimpleHeader title="내 팀 보기" />
        <p style={{ padding: "24px" }}>로딩 중...</p>
      </Page>
    );
  }

  // 에러 또는 데이터 없음
  if (error || !project) {
    return (
      <Page>
        <SimpleHeader title="내 팀 보기" />
        <p style={{ padding: "24px" }}>
          {error || "해당 프로젝트를 찾을 수 없어요."}
        </p>
      </Page>
    );
  }

  // 멤버 데이터 변환
  const members: Member[] = project.members.map((m) => ({
    userId: m.userId,
    nickname: m.nickname,
    profileType: m.profileType,
    part: m.part,
    leader: m.leader,
    responseStatus: m.responseStatus,
  }));

  // 수락한 팀원 수 계산
  const acceptedCount = members.filter(
    (m) => m.responseStatus === "accepted"
  ).length;
  const totalCount = members.length;

  // 헤더 카피
  const headerCopy = HEADER_COPY[project.status];

  const handleReviewClick = () => {
    if (!proposalId) return;
    navigate(`/Project/team/${proposalId}/review`);
  };

  return (
    <Page>
      <SimpleHeader title="내 팀 보기" />

      {/* 1. 헤더 */}
      <HeaderWrapper>
        <HeaderTitle>{headerCopy.title}</HeaderTitle>
        <HeaderSub>{headerCopy.subtitle}</HeaderSub>
      </HeaderWrapper>
      {project.status === "recruiting" && (
        <Counter>
          수락한 팀원 {acceptedCount}/{totalCount}
        </Counter>
      )}
      {/* 2. 프로젝트 진행 상태 */}
      <ProjectProgress
        status={project.status}
        startDate={project.recruitStartDate}
        endDate={project.recruitEndDate}
      />
      {/* 3. 연락 수단 안내 */}
      {(project.status === "recruiting" || project.status === "ongoing") && (
        <ContactSection contact={project.contact} />
      )}

      {/* 4. 멤버 리스트 */}
      <MemberList status={project.status} members={members} />

      {/* 5. 상태별 버튼 */}
      {project.status === "ongoing" && (
        <ActionButton
          onClick={handleProjectFinishClick}
          disabled={isCompleting}>
          프로젝트 완료하기
        </ActionButton>
      )}

      {project.status === "done" && (
        <ActionButton onClick={handleReviewClick}>
          팀원 리뷰 남기러 가기
        </ActionButton>
      )}

      {/* 모달들 */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onConfirm={handleProjectFinishConfirm}
        onCancel={handleConfirmCancel}
      />

      <CompleteModal
        isOpen={isAlertModalOpen}
        type={alertType}
        onClose={handleAlertClose}
      />
    </Page>
  );
};
