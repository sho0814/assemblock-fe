import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 12px;
  background-color: #F0EFF1;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #868286;
  font-size: 14px;
  font-weight: 500;

  .img {
    width: 18px;
    height: 18px;
  }
`;

export const DropdownList = styled.ul<{ open: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  height: 150px;
  overflow-y: auto;
  background: #F0EFF1;
  border-radius: 12px;

  padding: 12px 0;
  box-shadow: 0 4px 24px 0 rgba(44, 44, 53, 0.04);
  z-index: 10;
  display: ${({ open }) => (open ? 'block' : 'none')};
`;

export const DropdownOption = styled.li<{ selected?: boolean }>`
  padding: 8px 18px;
  
  color: #868286;
  background: ${({ selected }) => (selected ? '#E3E3E7' : 'transparent')};
  
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 7px;
  transition: background 0.13s;

  font-size: 14px;
  font-weight: ${({ selected }) => (selected ? '700' : '500')};
`;

export const CheckIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 9L8 12.5L14 6.5' stroke='%23222226' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center center no-repeat;
`;

