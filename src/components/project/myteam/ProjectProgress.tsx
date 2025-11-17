// src/components/myTeam/ProjectProgress.tsx
import styled from "styled-components";
import type { ProjectStatus } from "./MyTeamTypes";

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

const BarInner = styled.div<{ widthPercent: number }>`
  height: 100%;
  border-radius: 999px;
  background: #333;
  width: ${({ widthPercent }) => `${widthPercent}%`};
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

const diffDays = (from: Date, to: Date) => {
  const DAY = 1000 * 60 * 60 * 24;
  const fromMidnight = new Date(
    from.getFullYear(),
    from.getMonth(),
    from.getDate()
  );
  const toMidnight = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.floor((toMidnight.getTime() - fromMidnight.getTime()) / DAY);
};

export const ProjectProgress = ({ status, startDate, endDate }: Props) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  let label = "";
  let widthPercent = 0;

  if (status === "recruiting") {
    const totalDays = diffDays(start, end) + 1;
    const passedDays = diffDays(start, today) + 1;

    const clampedPassed = Math.min(Math.max(passedDays, 0), totalDays);
    widthPercent = (clampedPassed / totalDays) * 100;

    const dday = diffDays(today, end);

    if (dday < 0) label = "모집 마감";
    else if (dday === 0) label = "오늘 마감";
    else label = `마감까지 D-${dday}`;
  } else if (status === "ongoing") {
    label = "프로젝트 진행 중";
    widthPercent = 100;
  } else {
    label = "프로젝트 완료됨";
    widthPercent = 100;
  }

  return (
    <Wrapper>
      <div style={{ fontSize: 13 }}>{label}</div>
      <BarOuter>
        <BarInner widthPercent={widthPercent} />
      </BarOuter>

      {status === "recruiting" && (
        <DateText>
          {startDate} ~ {endDate}
        </DateText>
      )}
    </Wrapper>
  );
};
