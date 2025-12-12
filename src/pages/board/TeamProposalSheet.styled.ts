import styled from "styled-components";

export const Dimmed = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
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
  z-index: 9999;
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

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  padding: 0 130px;
  color: #352f36;
  margin: 0;
  white-space: nowrap;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CloseIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const Content = styled.div`
  padding: 24px 20px 40px 20px;
`;

export const InputBox = styled.div`
  margin-bottom: 24px;
`;

export const InputLabel = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #352f36;
  margin-bottom: 2px;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 400;
  color: #352f36;
  background-color: transparent;
  box-sizing: border-box;
  border-bottom: 1px solid #f0eff1;
  padding: 5px 0;

  &::placeholder {
    color: #c2c1c3;
    font-weight: 400;
  }
`;

export const ProjectTitleInput = styled(Input)`
  font-size: 20px;
  font-weight: 600;

  &::placeholder {
    color: #c2c1c3;
    font-weight: 600;
  }
`;

export const Textarea = styled(Input)`
  min-height: 80px;
  resize: none;
`;

export const HelperText = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: #868286;
  margin-top: 8px;
  margin-bottom: 0;
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  color: #352f36;
  padding: 12px 16px;
  border-radius: 16px;
  background-color: #f8f8f8;
  box-sizing: border-box;

  &:focus {
    background-color: #f0f0f0;
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;

export const DateSeparator = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #999;
`;

export const SendButton = styled.button<{ disabled: boolean }>`
  width: 335px;
  height: 45px;
  border: none;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  margin-top: 80px;
  background-color: ${(props) => (props.disabled ? "#F0F0F0" : "#352F36")};
  color: ${(props) => (props.disabled ? "#B3B3B3" : "#FAFAFA")};

  &:active {
    transform: ${(props) => (props.disabled ? "none" : "scale(0.98)")};
  }
`;
