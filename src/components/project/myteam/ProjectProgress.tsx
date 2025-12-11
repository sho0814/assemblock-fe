// src/components/myTeam/ProjectProgress.tsx
import styled from "styled-components";
import type { ProjectStatus } from "./MyTeamTypes";

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

const TOTAL_SEGMENTS = 7;

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

  // 🔹 연속 퍼센트를 “칸” 개수로 변환
  const filledSegments =
    status === "recruiting"
      ? Math.min(
          TOTAL_SEGMENTS,
          Math.max(0, Math.round((widthPercent / 100) * TOTAL_SEGMENTS))
        )
      : TOTAL_SEGMENTS;

  return (
    <Card>
      <ContentCol>
        <HeaderRow>
          <LabelText>{label}</LabelText>
          {status === "recruiting" && (
            <PeriodText>
              {startDate}~{endDate}
            </PeriodText>
          )}
        </HeaderRow>

        <ProgressBar>
          {Array.from({ length: TOTAL_SEGMENTS }).map((_, idx) => (
            <BarSegment
              key={idx}
              filled={idx < filledSegments}
              isFirst={idx === 0}
              isLast={idx === TOTAL_SEGMENTS - 1}
            />
          ))}
        </ProgressBar>
      </ContentCol>
    </Card>
  );
};

/* ======================= styled-components ======================= */

const Card = styled.section`
  width: 100%;
  padding: 20px 36px;
  background: var(--GrayScale-WT, #fafafa);
  box-shadow: 0px 4px 4px rgba(53, 47, 54, 0.1);
  border-radius: 16px;
  outline: 1px solid var(--GrayScale-GR10, #f0eff1);
  outline-offset: -1px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

const HeaderRow = styled.div`
  display: inline-flex;
  align-items: flex-end;
  gap: 8px;
`;

const LabelText = styled.span`
  color: var(--Primary-BK, #352f36);
  font-size: 16px;
  font-family: Pretendard;
  font-weight: 600;
  line-height: 24px;
`;

const PeriodText = styled.span`
  color: var(--GrayScale-GR50, #868286);
  font-size: 12px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 18px;
`;

const ProgressBar = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 2px;
`;

const BarSegment = styled.div<{
  filled: boolean;
  isFirst: boolean;
  isLast: boolean;
}>`
  flex: 1;
  height: 8px;
  background: ${({ filled }) =>
    filled ? "var(--Primary-BK, #352F36)" : "var(--GrayScale-GR10, #F0EFF1)"};

  border-top-left-radius: ${({ isFirst }) => (isFirst ? "24px" : "0")};
  border-bottom-left-radius: ${({ isFirst }) => (isFirst ? "24px" : "0")};
  border-top-right-radius: ${({ isLast }) => (isLast ? "24px" : "0")};
  border-bottom-right-radius: ${({ isLast }) => (isLast ? "24px" : "0")};
`;
