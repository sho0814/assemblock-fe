// src/pages/project/ProjectPage.tsx

import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./ProjectPage.styled";
import ProposalList, {
  type ProposalListItem,
} from "@components/project/project/ProposalList";

import notificationIcon from "@assets/home/notification.svg";
import searchIcon from "@assets/home/search.svg";
import menuIcon from "@assets/home/menu.svg";

import { getOngoingProjects, getCompleteProjects } from "@api/project";
import { getUserMe } from "@api/user";
import type { ProjectListItem } from "@types";

// 데이터 들어오면 삭제
import { projectsOngoingMock } from "@mocks/projectOngoing.mock.ts";
import { projectsCompleteMock } from "@mocks/projectComplete.mock.ts";

type TabValue = "ONGOING" | "DONE";

export function ProjectPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabValue>("ONGOING");

  const [myUserId, setMyUserId] = useState<number | null>(null);

  const [ongoingProjects, setOngoingProjects] = useState<ProjectListItem[]>([]);
  const [completeProjects, setCompleteProjects] = useState<ProjectListItem[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        const userInfo = await getUserMe();
        setMyUserId(userInfo.userId);

        // TODO: 데이터 들어오면 주석 삭제
        // const [ongoing, complete] = await Promise.all([
        //   getOngoingProjects(),
        //   getCompleteProjects(),
        // ]);

        // TODO: 데이터 들어오면 삭제
        const ongoing = projectsOngoingMock as ProjectListItem[];
        const complete = projectsCompleteMock as ProjectListItem[];

        console.log("진행 중 프로젝트:", ongoing);
        console.log("완료된 프로젝트:", complete);

        setOngoingProjects(ongoing);
        setCompleteProjects(complete);
      } catch (e) {
        console.error("프로젝트 조회 실패:", e);
        setError("프로젝트 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // ProjectListItem[] → ProposalListItem[] 로 매핑
  const convertToProposalListItems = (
    projects: ProjectListItem[]
  ): ProposalListItem[] => {
    if (!myUserId) return [];

    return projects.map((proj) => {
      // 내가 리더인지 확인 (보낸 제안인지 받은 제안인지 판단)
      const myMember = proj.members.find((m) => m.userId === myUserId);
      const isSent = myMember?.leader ?? false;
      const kind: ProposalListItem["kind"] = isSent ? "SENT" : "RECEIVED";

      // 리더 찾기
      const leader = proj.members.find((m) => m.leader);
      const topNickname = leader?.nickname ?? "알 수 없음";
      const topProfileType = leader?.profileType ?? "Type_1";

      // 나를 제외한 다른 멤버 수
      const othersCount = Math.max(proj.members.length - 1, 0);

      // 프로젝트 상태 (ONGOING 탭인지 DONE 탭인지)
      const state: ProposalListItem["state"] =
        proj.status === "done" ? "DONE" : "ONGOING";

      return {
        projectId: proj.projectId,
        proposalId: proj.projectId, // proposalId가 별도로 없다면 projectId 사용
        kind,
        topNickname,
        othersCount,
        topProfileType,
        state,
      };
    });
  };

  const ongoingItems = useMemo(
    () => convertToProposalListItems(ongoingProjects),
    [ongoingProjects, myUserId]
  );

  const completeItems = useMemo(
    () => convertToProposalListItems(completeProjects),
    [completeProjects, myUserId]
  );

  const shownItems = tab === "ONGOING" ? ongoingItems : completeItems;

  if (loading) {
    return (
      <>
        <S.Header>
          <S.Title>내 프로젝트</S.Title>
          <S.IconWrapper>
            <S.Icon
              src={notificationIcon}
              onClick={() => navigate("/Home/notification")}
            />
            <S.Icon src={searchIcon} onClick={() => navigate("/Home/search")} />
            <S.Icon src={menuIcon} onClick={() => navigate("/Home/category")} />
          </S.IconWrapper>
        </S.Header>
        <div>프로젝트를 불러오는 중입니다...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <S.Header>
          <S.Title>내 프로젝트</S.Title>
          <S.IconWrapper>
            <S.Icon
              src={notificationIcon}
              onClick={() => navigate("/Home/notification")}
            />
            <S.Icon src={searchIcon} onClick={() => navigate("/Home/search")} />
            <S.Icon src={menuIcon} onClick={() => navigate("/Home/category")} />
          </S.IconWrapper>
        </S.Header>
        <div>{error}</div>
      </>
    );
  }

  return (
    <>
      <S.Header>
        <S.Title>내 프로젝트</S.Title>
        <S.IconWrapper>
          <S.Icon
            src={notificationIcon}
            onClick={() => navigate("/Home/notification")}
          />
          <S.Icon src={searchIcon} onClick={() => navigate("/Home/search")} />
          <S.Icon src={menuIcon} onClick={() => navigate("/Home/category")} />
        </S.IconWrapper>
      </S.Header>

      <div>
        <S.TabContainer>
          <S.Tab active={tab === "ONGOING"} onClick={() => setTab("ONGOING")}>
            진행 중
          </S.Tab>
          <S.Tab active={tab === "DONE"} onClick={() => setTab("DONE")}>
            완료
          </S.Tab>
        </S.TabContainer>

        <div>
          <ProposalList items={shownItems} />
        </div>
      </div>
    </>
  );
}
