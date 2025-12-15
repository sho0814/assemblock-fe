// src/components/project/review/MemberDropdown.tsx
import styled from "styled-components";
import downIcon from "@assets/project/down-md.svg";

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
        onChange={(e) => onChange(Number(e.target.value))}>
        {members.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </Select>
      <Chevron src={downIcon} />
    </SelectWrapper>
  );
}

const SelectWrapper = styled.div`
  position: relative;
  width: 102px;
  height: 36px;
`;

const Select = styled.select`
  width: 100%;
  height: 100%;
  padding: 0 16px 0 20px;
  border-radius: 20px;
  border: 1px solid var(--GrayScale-GR90, #49444a);
  background: rgba(240, 239, 241, 0.5);
  font-size: 16px;
  font-weight: 600;
  color: var(--GrayScale-GR90, #49444a);
  appearance: none;
  cursor: pointer;
`;

const Chevron = styled.img`
  position: absolute;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  width: 10px;
  height: 10px;
`;
