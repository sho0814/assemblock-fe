import styled from "styled-components";

type TabValue = "ONGOING" | "DONE";

interface Props {
  value: TabValue;
  onChange: (v: TabValue) => void;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 5px;
  width: 335px;
  height: 45px;
  background-color: #f0eff1;
  border-radius: 40px;

  margin: 8px auto 16px;
`;

const Tab = styled.button<{ active: boolean }>`
  width: 156px;
  height: 35px;
  border: none;
  border-radius: 40px;
  background-color: ${({ active }) => (active ? "#352F36" : "transparent")};
  color: ${({ active }) => (active ? "#FFFFFF" : "#A5A1A6")};
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:not(:last-child) {
    margin-right: 11px;
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
