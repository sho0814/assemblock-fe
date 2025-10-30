import styled from 'styled-components';

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px; 
    padding: 16px 0px;
    background: none;
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