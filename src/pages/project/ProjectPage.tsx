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

import { getMyProjects } from "@api/project";
import type { ApiProject } from "@types";

type TabValue = "ONGOING" | "DONE";

export function ProjectPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabValue>("ONGOING");

  // TODO: 나중에 로그인된 userId로 교체
  const myUserId = 2;

  const [projects, setProjects] = useState<ApiProject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1) API 호출해서 내 프로젝트 목록 불러오기
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMyProjects();
        console.log("getMyProjects 결과:", data);
        setProjects(data);
      } catch (e) {
        setError("프로젝트 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // 2) ApiProject[] → ProposalListItem[] 로 매핑
  const allItems: ProposalListItem[] = useMemo(() => {
    return projects.map((proj) => {
      // 내가 제안자면 보낸 제안, 아니면 받은 제안
      const isSent = proj.proposer.id === myUserId;
      const kind: ProposalListItem["kind"] = isSent ? "SENT" : "RECEIVED";

      const members = proj.members;
      const othersCount = Math.max(members.length - 1, 0);

      const state: ProposalListItem["state"] =
        proj.projectStatus === "done" ? "DONE" : "ONGOING";

      return {
        projectId: proj.id,
        proposalId: proj.proposal.id,
        kind,
        topNickname: proj.proposer.nickname ?? "알 수 없음",
        othersCount,
        topProfileUrl: undefined, // 나중에 프로필 이미지 생기면 여기서 채우면 됨
        state,
      };
    });
  }, [projects, myUserId]);

  // 3) 탭 필터링 (ONGOING / DONE)
  const shownItems = useMemo(
    () => allItems.filter((it) => it.state === tab),
    [allItems, tab]
  );

  // 4) 로딩/에러/빈 상태 처리 (필요에 따라 더 꾸며도 됨)
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
          <S.Tab
            active={tab === "ONGOING"}
            onClick={() => setTab("ONGOING")}
          >
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
