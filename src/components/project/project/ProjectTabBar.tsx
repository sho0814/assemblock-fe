import styled from "styled-components";

type TabValue = "ONGOING" | "DONE";

interface Props {
  value: TabValue;
  onChange: (v: TabValue) => void;
}

const Container = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 11px;

  width: 100%;
  padding: 5px;

  background: var(--GrayScale-GR10, #f0eff1);
  border-radius: 20px;
`;
const Tab = styled.button<{ active: boolean }>`
  width: 100%;
  height: 35px;
  border: none;
  border-radius: 16px;
  background-color: ${({ active }) => (active ? "#352F36" : "transparent")};
  color: ${({ active }) => (active ? "#FFFFFF" : "#A5A1A6")};
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:not(:last-child) {
    margin-right: 11px; /* 오른쪽 탭과의 간격 */
  }

  &:hover {
    opacity: 0.9;
  }
`;

export default function ProjectTabBar({ value, onChange }: Props) {
  return (
    <Container>
      <Tab active={value === "ONGOING"} onClick={() => onChange("ONGOING")}>
        진행 중
      </Tab>
      <Tab active={value === "DONE"} onClick={() => onChange("DONE")}>
        완료
      </Tab>
    </Container>
  );
}
