// src/components/project/review/MemberDropdown.tsx
import styled from "styled-components";

export interface MemberOption {
  id: number;
  name: string;
}

interface MemberDropdownProps {
  members: MemberOption[];
  selectedId: number;
  onChange: (id: number) => void;
}

export function MemberDropdown({
  members,
  selectedId,
  onChange,
}: MemberDropdownProps) {
  return (
    <SelectWrapper>
      <Select
        value={selectedId}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {members.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </Select>
      <Chevron>▾</Chevron>
    </SelectWrapper>
  );
}

const SelectWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 40px;
`;

const Select = styled.select`
  width: 100%;
  height: 100%;
  border-radius: 999px;
  border: 1.5px solid #111827;
  background: #fff;
  padding: 0 36px 0 14px;
  font-size: 14px;
  font-weight: 700;
  color: #111827;
  appearance: none; /* 기본 화살표 제거 */
  cursor: pointer;
`;

const Chevron = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 14px;
  color: #111827;
`;
