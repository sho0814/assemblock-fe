// src/componenets/shared/CommonButton.styled.ts
import styled, {css} from "styled-components";

type ButtonProps = {
    width?: string;
    height?: string;
    $borderRadius?: string;
    disabled?: boolean;
};

const disabledStyle = css`
  background-color: #F0EFF1;
  color: #C2C1C3;
  cursor: not-allowed;
  pointer-events: none;
`;

export const Button = styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => props.width || 'auto'};
    height: ${(props) => props.height || '45px'};
    border-radius: ${(props) => props.$borderRadius || '16px'};
    border: none;
    background-color: #352F36;
    cursor: pointer;
    
    font-weight: 500;
    font-size: 14px;
    color: #FAFAFA;

    ${(props) => props.disabled && disabledStyle}
`

export const ButtonImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;