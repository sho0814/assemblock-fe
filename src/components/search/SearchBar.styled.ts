import styled from 'styled-components';

export const Header = styled.div`
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
    rgba(250, 250, 250, 1) 95%, 
    rgba(250, 250, 250, 0.1) 100%);
`;


export const IconWrapper = styled.div`
    display: flex;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const Icon = styled.img`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const SearchBarWrapper = styled.div`
    display: flex;
    width: 85%;
    border: 1px solid #C2C1C3;
    border-radius: 8px;
    align-items: center;
    padding: 14px 15px 14px 21px;
`

export const SearchInput = styled.input`
    flex: 1;
    height: 90%;
    border: none;
    background: none;
    outline: none;
    font-size: 16px;
    font-weight: 400;
    color: #868286
`