// src/componenets/shared/CommonButton.styled.ts
import styled from "styled-components";

type ButtonProps = {
    width?: string;
    height?: string;
    $borderRadius?: string;
};

export const Button = styled.div<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props) => props.width || 'auto'};
    height: ${(props) => props.height || '45px'};
    border-radius: ${(props) => props.$borderRadius || '16px'};
    background-color: #352F36;
    cursor: pointer;
    
    font-weight: 500;
    font-size: 14px;
    color: #FAFAFA;
`

export const ButtonImage = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;