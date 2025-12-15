// src/components/myTeam/ContactSection.tsx
import { useState } from "react";
import styled from "styled-components";
import AlarmIcon from "@assets/project/Alarm.svg";

const Box = styled.section`
  height: 26px;
  margin-bottom: 8px;
  padding: 4px 8px;
  border-radius: 8px;
  background: #f0eff1;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const ContactText = styled.span`
  flex: 1;
`;

const Icon = styled.img`
  width: 12px;
  height: 12px;
`;

/* 모달 관련 스타일 */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  width: 335px;
  min-height: 227px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  padding: 16px 18px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  font-size: 16px;
  cursor: pointer;
`;

const ModalBody = styled.div`
  flex: 1;
  padding: 32px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  text-align: center;
  line-height: 1.5;
`;

type Props = {
  contact: string;
};

export const ContactSection = ({ contact }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* 칩 / 박스 */}
      <Box onClick={handleOpen}>
        <Icon src={AlarmIcon} alt="alarm" />
        <ContactText>전달받은 연락수단으로 소통해볼까요?</ContactText>
      </Box>

      {/* 모달 */}
      {open && (
        <Overlay onClick={handleClose}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>연락 수단 확인</ModalTitle>
              <CloseButton onClick={handleClose}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <span>
                <strong>{contact}</strong> 로 연락해주세요!
              </span>
            </ModalBody>
          </Modal>
        </Overlay>
      )}
    </>
  );
};
