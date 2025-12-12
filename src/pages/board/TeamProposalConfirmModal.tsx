import React from "react";
import closeIcon from "@assets/board/close.svg";
import teamIcon from "@assets/board/team.svg";
import * as S from "./TeamProposalConfirmModal.styled";

interface TeamProposalConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewTeam: () => void;
}

export const TeamProposalConfirmModal: React.FC<
  TeamProposalConfirmModalProps
> = ({ isOpen, onClose, onViewTeam }) => {
  return (
    <>
      {/* 배경 딤드 */}
      <S.Dimmed isOpen={isOpen} onClick={onClose} />

      {/* 확인 모달 */}
      <S.BottomSheet isOpen={isOpen}>
        <S.Header>
          <S.Title>팀 제안 보내기</S.Title>
          <S.CloseButton type="button" onClick={onClose} aria-label="닫기">
            <S.CloseIcon src={closeIcon} alt="닫기" />
          </S.CloseButton>
        </S.Header>

        <S.Content>
          <S.LogoContainer>
            <S.TeamLogo src={teamIcon} alt="팀" />
          </S.LogoContainer>

          <S.Message>팀 제안을 보냈어요</S.Message>
          <S.SubMessage>
            수락 여부는 내 프로젝트에서 확인할 수 있어요
          </S.SubMessage>

          <S.ButtonContainer>
            <S.ConfirmButton type="button" onClick={onViewTeam}>
              내 팀 보기
            </S.ConfirmButton>
            <S.ConfirmButton type="button" onClick={onClose}>
              확인
            </S.ConfirmButton>
          </S.ButtonContainer>
        </S.Content>
      </S.BottomSheet>
    </>
  );
};
