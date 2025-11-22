import { useState } from "react";
import * as S from './Dropdown.styled'

import  downArrow  from '@assets/common/down-md.svg';

export interface DropDownOption {
  value: string;
}

export interface DropdownProps {
  content: string | string[];
  selected: string;
  onChange: (selected: string) => void;
  options: DropDownOption[];
}

export default function Dropdown({ content, selected, onChange, options }: DropdownProps) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(o => !o);

  const handleSelect = (value: string) => {
    if (selected === value) {
      return; 
    } else {
      onChange(value);
      setOpen(false);
    }
  };

  return (
    <S.DropdownWrapper>
      <S.DropdownButton type="button" onClick={handleToggle}>
        {content}
        <img src={downArrow} />
      </S.DropdownButton>
      <S.DropdownList open={open}>
        {options.map(opt => (
          <S.DropdownOption
            key={opt.value}
            selected={selected === opt.value}
            onClick={() => handleSelect(opt.value)}
          >
            {opt.value}
            {selected === opt.value && <S.CheckIcon />}
          </S.DropdownOption>
        ))}
      </S.DropdownList>
    </S.DropdownWrapper>
  );
}