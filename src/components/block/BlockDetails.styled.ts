import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    margin-bottom: 36px;
    gap: 36px;
`

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const Label = styled.label`
    display: flex;
    gap: 8px;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
`

export const Dot = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 100px;
    margin-right: 8px;
    background-color: #F05C5C;
`

export const Desc = styled.div`
    font-weight: 500;
    font-size: 10px;
    color: #868286;
`

export const BlockTypeButton = styled.button<{$selected?: boolean}>`
  padding: 6px 12px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  margin-right: 10px;

  font-size: 12px;

  transition: background 0.2s;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    background: #352F36;
    color: #FAFAFA;
  }
  background: ${({ $selected }) => ($selected ? "#352F36" : "#F0EFF1")};
  color: ${({ $selected }) => ($selected ? "#FAFAFA" : "#868286")};
`;


export const Input = styled.input`
    padding: 12px;
    border: none;
    border-radius: 16px;
    background-color: #F0EFF1;
    outline: none;

    font-size: 14px;
    font-weight: 500;
    color: #868286
`;

export const Select = styled.select`
    padding: 12px;
    border: none;
    border-radius: 8px;
    outline: none;
    background-color: #F0EFF1;

    font-size: 14px;
    font-weight: 500;
    color: #868286
`;

export const NumberInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
`;

export const ChangeButton = styled.button`
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    color: #868286;
    cursor: pointer;

    font-size: 30px;
    font-weight: 300;
    text-align: center;

    transition: color 0.2s;
    &:hover {
        color: #4c4c4cff;
    }
`;

export const ValueBox = styled.input`
  background: #F0EFF1;
  border: none;
  border-radius: 16px;
  color: #868286;
  
  width: 120px;
  height: 45px;
  text-align: center;

  font-size: 14px;
  font-weight: 500;
  pointer-events: none;
  padding: 12px;
`;

export const FileInputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 78px;
  background: #F0EFF1;
  border: 1px dashed #868286;
  border-radius: 4px;
  color: #352F36;
  cursor: pointer;

  font-size: 12px;
  font-weight: 400;
  text-align: center;
  gap: 4px;
  transition: border-color 0.2s;
  &:hover {
    border-color: #3a3a3aff;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;
