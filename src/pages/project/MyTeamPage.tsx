// src/pages/project/MyTeamPage.tsx

// import { useParams } from "react-router-dom";
import SimpleHeader from "@components/shared/SimpleHeader";
import styled from "styled-components";
import pattern from "@assets/project/pattern.png";

import type {
  Member,
  MyTeamProject,
} from "@components/project/myteam/MyTeamTypes";
import { ProjectProgress } from "@components/project/myteam/ProjectProgress";
import { ContactSection } from "@components/project/myteam/ContactSection";
import { MemberList } from "@components/project/myteam/MemberList";
import { MyTeamHeader } from "@components/project/myteam/MyTeamHeader";

// 목업 데이터
const MOCK_MEMBERS: Member[] = [
  {
    id: 1,
    name: "송현서",
    role: "디자인",
    isLeader: true,
    responseStatus: "accepted",
  },
  {
    id: 2,
    name: "정다운",
    role: "기획",
    isLeader: false,
    responseStatus: "pending",
  },
  {
    id: 3,
    name: "설호",
    role: "프론트엔드",
    isLeader: false,
    responseStatus: "pending",
  },
  {
    id: 4,
    name: "국채원",
    role: "백엔드",
    isLeader: false,
    responseStatus: "rejected",
  },
  {
    id: 5,
    name: "김예린",
    role: "PM",
    isLeader: false,
    responseStatus: "accepted",
  },
];

const MOCK_PROJECT: MyTeamProject = {
  id: 1,
  status: "recruiting", // 'recruiting' | 'ongoing' | 'done'
  recruitStartDate: "2025-10-24",
  recruitEndDate: "2025-10-27",
  acceptedCount: 2,
  totalCount: 5,
  contactMethod: "discord: kkimsxu#1234",
  members: MOCK_MEMBERS,
};

const Page = styled.div`
  min-height: 100vh;
  background-color: #f9f9fb;
  background-image: url(${pattern});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
`;

export const MyTeamPage = () => {
  // const { projectId } = useParams();

  const project: MyTeamProject = MOCK_PROJECT; // 임시
  const { status } = project;

  return (
    <>
      <Page>
        <SimpleHeader title="내 팀 보기" />

        {/* 1. 헤더 */}
        <MyTeamHeader
          status={status}
          acceptedCount={project.acceptedCount}
          totalCount={project.totalCount}
        />

        {/* 2. 프로젝트 진행 상태*/}
        <ProjectProgress
          status={status}
          startDate={project.recruitStartDate}
          endDate={project.recruitEndDate}
        />

        {/* 3. 연락 수단 안내 */}
        <ContactSection status={status} contact={project.contactMethod} />

        {/* 4. 멤버 리스트 */}
        <MemberList status={status} members={project.members} />
      </Page>
    </>
  );
};
