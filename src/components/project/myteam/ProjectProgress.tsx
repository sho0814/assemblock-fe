// src/components/myTeam/ProjectProgress.tsx
import styled from "styled-components";
import type { ProjectStatus } from "./MyTeamTypes";

const PROGRESS_LABEL: Record<ProjectStatus, string> = {
  recruiting: "마감까지 D-6",
  ongoing: "프로젝트 진행 중",
  done: "프로젝트 완료",
};

const Wrapper = styled.section`
  margin-bottom: 16px;
  padding: 14px 16px;
  border-radius: 12px;
  background: #f6f6f6;
`;

const BarOuter = styled.div`
  margin-top: 4px;
  height: 8px;
  border-radius: 999px;
  background: #e1e1e1;
  overflow: hidden;
`;

const BarInner = styled.div<{ status: ProjectStatus }>`
  height: 100%;
  border-radius: 999px;
  background: #333;
  width: ${({ status }) =>
    status === "recruiting" ? "30%" : status === "ongoing" ? "70%" : "100%"};
`;

const DateText = styled.div`
  margin-top: 6px;
  font-size: 11px;
  color: #999;
`;

type Props = {
  status: ProjectStatus;
  startDate: string;
  endDate: string;
};

export const ProjectProgress = ({ status, startDate, endDate }: Props) => {
  const label = PROGRESS_LABEL[status];

  return (
    <Wrapper>
      <div style={{ fontSize: 13 }}>{label}</div>
      <BarOuter>
        <BarInner status={status} />
      </BarOuter>
      <DateText>
        {startDate} ~ {endDate}
      </DateText>
    </Wrapper>
  );
};
