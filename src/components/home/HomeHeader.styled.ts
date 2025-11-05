// src/components/home/HomeHeader.styled.ts
import styled from 'styled-components';

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px; 
    padding: 16px 0px;
    background: none;
`

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 24px;
`

export const Title = styled.strong<{ $active?: boolean }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    font-size: 24px;
    font-weight: 700;
    color: ${({ $active }) => ($active ? "#49444A" : "#C2C1C3")};

    transition: color 0.2s;
`

export const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 144px;
    gap: 16px;
`

export const Icon = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    cursor: pointer;
`