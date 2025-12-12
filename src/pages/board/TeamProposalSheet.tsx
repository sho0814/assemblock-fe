import React, { useState } from "react";
import closeIcon from "@assets/board/close.svg";
import * as S from "./TeamProposalSheet.styled";
import { TeamProposalConfirmModal } from "./TeamProposalConfirmModal";

interface TeamProposalSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeamProposalSheet: React.FC<TeamProposalSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [contact, setContact] = useState("");
  const [recruitmentPeriod, setRecruitmentPeriod] = useState("");
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isMemoFocused, setIsMemoFocused] = useState(false);
  const [isContactFocused, setIsContactFocused] = useState(false);
  const [isPeriodFocused, setIsPeriodFocused] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const isSendEnabled =
    projectTitle.trim().length > 0 && recruitmentPeriod.trim().length > 0;

  const handleClose = () => {
    setProjectTitle("");
    setMemo("");
    setContact("");
    setRecruitmentPeriod("");
    setIsTitleFocused(false);
    setIsMemoFocused(false);
    setIsContactFocused(false);
    setIsPeriodFocused(false);
    onClose();
  };

  const handleSend = () => {
    if (!isSendEnabled) return;

    // TODO: 팀 제안 전송 로직
    console.log({
      projectTitle,
      memo,
      contact,
      recruitmentPeriod,
    });

    // 확인 모달 열기
    setIsConfirmModalOpen(true);
    handleClose();
  };

  const handleViewTeam = () => {
    // TODO: 내 팀 보기 페이지로 이동
    console.log("내 팀 보기");
    setIsConfirmModalOpen(false);
  };

  const handleConfirmClose = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      {/* 바텀시트 배경 딤드 */}
      <S.Dimmed isOpen={isOpen} onClick={handleClose} />

      {/* 팀 제안 보내기 바텀시트 */}
      <S.BottomSheet isOpen={isOpen}>
        <S.Header>
          <S.HeaderSide /> {/* 왼쪽 공간 맞추기용 */}
          <S.Title>팀 제안 보내기</S.Title>
          <S.CloseButton type="button" onClick={handleClose} aria-label="닫기">
            <S.CloseIcon src={closeIcon} alt="닫기" />
          </S.CloseButton>
        </S.Header>

        <S.Content>
          {/* 프로젝트 제목 */}
          <S.InputBox>
            <S.InputLabel>프로젝트 제목</S.InputLabel>
            <S.ProjectTitleInput
              type="text"
              placeholder={isTitleFocused ? "" : "프로젝트 제목을 입력하세요"}
              maxLength={14}
              value={projectTitle}
              onChange={(e) => {
                const raw = e.target.value;
                const filtered = raw.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9\s]/g, "");
                setProjectTitle(filtered.slice(0, 14));
              }}
              onFocus={() => setIsTitleFocused(true)}
              onBlur={(e) => {
                if (!e.target.value.trim()) {
                  setIsTitleFocused(false);
                }
              }}
            />
            <S.HelperText>영문/한글/숫자로 14자까지 입력 가능해요</S.HelperText>
          </S.InputBox>

          {/* 메모 */}
          <S.InputBox>
            <S.InputLabel>메모</S.InputLabel>
            <S.Input
              type="text"
              value={memo}
              placeholder={isMemoFocused ? "" : "메모를 작성하세요"}
              onChange={(e) => {
                const raw = e.target.value;
                const filtered = raw.replace(
                  /[^ㄱ-ㅎ가-힣a-zA-Z0-9\s~`!@#$%^&*()\-_=+[\]{}\\|;:'",.<>/?\n]/g,
                  ""
                );
                setMemo(filtered.slice(0, 300));
              }}
              onFocus={() => setIsMemoFocused(true)}
              onBlur={(e) => {
                if (!e.target.value) {
                  setIsMemoFocused(false);
                }
              }}
            />
            <S.HelperText>
              한글/영문/숫자/특수문자로 최대 300자까지 입력할 수 있어요
            </S.HelperText>
          </S.InputBox>

          {/* 연락 수단 */}
          <S.InputBox>
            <S.InputLabel>연락 수단</S.InputLabel>
            <S.Input
              type="text"
              placeholder={isContactFocused ? "" : "연락 수단을 입력하세요"}
              maxLength={120}
              value={contact}
              onChange={(e) => {
                const raw = e.target.value;
                const filtered = raw.replace(
                  /[^ㄱ-ㅎ가-힣a-zA-Z0-9\s~`!@#$%^&*()\-_=+[\]{}\\|;:'",.<>/?]/g,
                  ""
                );
                setContact(filtered.slice(0, 120));
              }}
              onFocus={() => setIsContactFocused(true)}
              onBlur={(e) => {
                if (!e.target.value.trim()) {
                  setIsContactFocused(false);
                }
              }}
            />
            <S.HelperText>
              한글/영문/숫자/특수문자로 최대 120자까지 입력할 수 있어요
            </S.HelperText>
          </S.InputBox>

          {/* 팀 모집 기간 */}
          <S.InputBox>
            <S.InputLabel>팀 모집 기간</S.InputLabel>
            <S.Input
              type="text"
              placeholder={isPeriodFocused ? "" : "20XX.XX.XX ~ 20XX.XX.XX"}
              maxLength={120}
              value={recruitmentPeriod}
              onChange={(e) => {
                const raw = e.target.value;
                const filtered = raw.replace(
                  /[^ㄱ-ㅎ가-힣a-zA-Z0-9\s~`!@#$%^&*()\-_=+[\]{}\\|;:'",.<>/?]/g,
                  ""
                );
                setRecruitmentPeriod(filtered.slice(0, 120));
              }}
              onFocus={() => setIsPeriodFocused(true)}
              onBlur={(e) => {
                if (!e.target.value.trim()) {
                  setIsPeriodFocused(false);
                }
              }}
            />
            <S.HelperText>최소 1일 ~ 최대 14일 이내로 가능해요</S.HelperText>
          </S.InputBox>

          {/* 전송하기 버튼 */}
          <S.SendButton
            type="button"
            disabled={!isSendEnabled}
            onClick={handleSend}
          >
            전송하기
          </S.SendButton>
        </S.Content>
      </S.BottomSheet>

      {/* 팀 제안 완료 모달 */}
      <TeamProposalConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleConfirmClose}
        onViewTeam={handleViewTeam}
      />
    </>
  );
};
