import styled from "styled-components";

export const PageContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const MessageContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const SuccessIcon = styled.img`
    width: 190px;
    height: 220px;
`   

export const FailureIcon = styled.img`
    width: 80px;
    height: 80px;
`

export const MessageTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: #352F36;
    margin-top: 16px;
`

export const MessageSubtitle = styled.div`
    font-size: 12px;
    font-weight: 400;
    color: #868286;
    margin-top: 8px;
`

export const RetryButton = styled.div`
    margin: auto 0 40px;
    padding: 12px 10px;
    background-color: #352F36;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #FAFAFA;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;

    &:hover {
        background-color: #2c262c;
    }
`