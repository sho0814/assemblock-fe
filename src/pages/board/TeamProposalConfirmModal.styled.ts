import styled from "styled-components";

export const Dimmed = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10000;
  transition: opacity 0.3s ease-in-out;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.isOpen ? "auto" : "none")};
`;

export const BottomSheet = styled.section<{ isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 390px;
  background-color: #fff;
  border-radius: 24px 24px 0 0;
  z-index: 10001;
  box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.isOpen ? "translate(-50%, 0)" : "translate(-50%, 100%)"};
  height: auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px 16px 20px;
  border-bottom: 1px solid #f0f0f0;
`;

export const HeaderSide = styled.div`
  width: 16px;  
  height: 16px;
`;

export const Title = styled.h2`
  flex: 1;
  text-align: center;

  font-size: 16px;
  font-weight: 600;
  color: #352f36;
  white-space: nowrap;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CloseIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const Content = styled.div`
  padding: 65px 20px 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled.div`
  width: 190px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TeamLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const Message = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #000000;
  text-align: center;
  margin: 36px 0 0 0;
  line-height: 1.5;
`;

export const SubMessage = styled.p`
  font-size: 14px;
  color: #000000;
  opacity: 0.5;
  text-align: center;
  margin: 4px 0 0 0;
  line-height: 1.5;
`;

export const ButtonContainer = styled.div`
  margin-top: 76.1px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ViewTeamButton = styled.button`
  width: 335px;
  height: 45px;
  border: none;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #352f36;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  align-self: stretch;

  &:active {
    transform: scale(0.98);
  }
`;

export const ConfirmButton = styled.button`
  width: 335px;
  height: 45px;
  border: none;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #fafafa;
  background-color: #352f36;
  cursor: pointer;
  transition: all 0.2s;
  align-self: stretch;

  &:active {
    transform: scale(0.98);
  }
`;
