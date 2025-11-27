import styled from 'styled-components';
import type { CSSProperties } from 'react';

interface HeaderProps {
  style?: CSSProperties;
}

export const Header = styled.div<HeaderProps>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 112px; 
    padding: 64px 0px 16px 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    background: linear-gradient(to bottom, 
    rgba(250, 250, 250, 1) 0%, 
    rgba(250, 250, 250, 1) 70%, 
    rgba(250, 250, 250, 0.1) 100%);
`;

export const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 600;
    font-size: 16px;
`;

export const IconWrapper = styled.div`
    display: flex;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
`;

export const Icon = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;