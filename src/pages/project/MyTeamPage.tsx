// src/pages/project/MyTeamPage.tsx

import { useParams } from "react-router-dom";
import SimpleHeader from "@components/shared/SimpleHeader";
import styled from "styled-components";
import pattern from "@assets/project/pattern.png";

import { ProjectProgress } from "@components/project/myteam/ProjectProgress";
import { ContactSection } from "@components/project/myteam/ContactSection";
import { MemberList } from "@components/project/myteam/MemberList";
import { MyTeamHeader } from "@components/project/myteam/MyTeamHeader";

import { ProjectFinishButton } from "@components/project/myteam/ProjectFinishButton";
import { ReviewButton } from "@components/project/myteam/ReviewButton";

import { MOCK_MY_TEAM_LIST } from "../../mocks/project/myTeamMocks";

const Page = styled.div`
  min-height: 100vh;
  background-color: #f9f9fb;
  background-image: url(${pattern});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
`;

export const MyTeamPage = () => {
  const { proposalId } = useParams<{ proposalId: string }>();

  const project = MOCK_MY_TEAM_LIST.find(
    (item) => item.proposalId === Number(proposalId)
  );

  if (!project) {
    return (
      <Page>
        <SimpleHeader title="내 팀 보기" />
        <p style={{ padding: "24px" }}>해당 프로젝트를 찾을 수 없어요.</p>
      </Page>
    );
  }

  const { status } = project;

  return (
    <Page>
      <SimpleHeader title="내 팀 보기" />

      {/* 1. 헤더 */}
      <MyTeamHeader
        status={status}
        acceptedCount={project.acceptedCount}
        totalCount={project.totalCount}
      />

      {/* 2. 프로젝트 진행 상태 */}
      <ProjectProgress
        status={status}
        startDate={project.recruitStartDate}
        endDate={project.recruitEndDate}
      />

      {/* 3. 연락 수단 안내 */}
      {(status === "recruiting" || status === "ongoing") && (
        <ContactSection contact={project.contactMethod} />
      )}
      {/* 4. 멤버 리스트 */}
      <MemberList status={status} members={project.members} />

      {/*  5. 상태별 버튼 */}
      {status === "ongoing" && (
        <ProjectFinishButton
          onFinish={() => {
            console.log("프로젝트 완료하기 클릭됨");
          }}
        />
      )}

      {status === "done" && <ReviewButton />}
    </Page>
  );
};
