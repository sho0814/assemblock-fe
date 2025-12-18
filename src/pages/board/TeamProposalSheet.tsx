import React, { useMemo, useState } from "react";
import closeIcon from "@assets/board/close.svg";
import * as S from "./TeamProposalSheet.styled";
import { TeamProposalConfirmModal } from "./TeamProposalConfirmModal";
import { createBoardProposal } from "@api/boardProposal";

interface TeamProposalSheetProps {
  isOpen: boolean;
  onClose: () => void;

  boardId: number;
  onSuccess: (proposalId: number) => void;

  // 서버로는 안 보냄 UI용
  selectedBlockIds?: number[];
}

// "YYYY.MM.DD ~ YYYY.MM.DD" -> { start: "YYYY-MM-DD", end: "YYYY-MM-DD" }
const parseRecruitmentPeriod = (input: string) => {
  const raw = (input ?? "").trim();
  const parts = raw.split("~").map((s) => s.trim());
  if (parts.length !== 2) return null;

  const normalize = (d: string) => {
    const x = d.replace(/\s/g, "");
    const m = x.match(/^(\d{4})[.\-](\d{1,2})[.\-](\d{1,2})$/);
    if (!m) return null;
    const yyyy = m[1];
    const mm = m[2].padStart(2, "0");
    const dd = m[3].padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const start = normalize(parts[0]);
  const end = normalize(parts[1]);
  if (!start || !end) return null;

  return { start, end };
};

export const TeamProposalSheet: React.FC<TeamProposalSheetProps> = ({
  isOpen,
  onClose,
  boardId,
  onSuccess,
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

  const [sending, setSending] = useState(false);
  const [createdProposalId, setCreatedProposalId] = useState<number | null>(null);

  // 수정: contact(=discordId)도 필수로 체크
  const isSendEnabled = useMemo(() => {
    return (
      projectTitle.trim().length > 0 &&
      contact.trim().length > 0 &&
      recruitmentPeriod.trim().length > 0
    );
  }, [projectTitle, contact, recruitmentPeriod]);

  const resetFields = () => {
    setProjectTitle("");
    setMemo("");
    setContact("");
    setRecruitmentPeriod("");
    setIsTitleFocused(false);
    setIsMemoFocused(false);
    setIsContactFocused(false);
    setIsPeriodFocused(false);
  };

  const handleClose = () => {
    resetFields();
    onClose();
  };

  const handleSend = async () => {
    if (!isSendEnabled) return;
    if (sending) return;

    // 추가 안전장치
    if (!contact.trim()) {
      alert("연락 수단(디스코드 ID)을 입력해주세요.");
      return;
    }

    const parsed = parseRecruitmentPeriod(recruitmentPeriod);
    if (!parsed) {
      alert("팀 모집 기간 형식을 확인해주세요. (예: 2025.12.17 ~ 2025.12.20)");
      return;
    }

    try {
      setSending(true);

      const res = await createBoardProposal({
        boardId,
        discordId: contact.trim(), // trim해서 전달
        recruitStartDate: parsed.start,
        recruitEndDate: parsed.end,
        projectTitle: projectTitle.trim(),
        projectMemo: memo.trim(),
      });

      const proposalId = res?.proposalId;
      if (typeof proposalId !== "number") {
        throw new Error("proposalId가 응답에 없습니다.");
      }

      // 먼저 proposalId 확보
      setCreatedProposalId(proposalId);

      // 모달 열고, 시트 닫기(필드만 초기화)
      setIsConfirmModalOpen(true);
      resetFields();
      onClose();
    } catch (e) {
      console.error(e);
      alert("팀 제안 전송에 실패했어요.");
    } finally {
      setSending(false);
    }
  };

  const handleViewTeam = () => {
    if (createdProposalId === null) {
      alert("제안 정보를 찾을 수 없어요. 다시 시도해주세요.");
      return;
    }

    // 정리 먼저 하고 성공 콜백 호출
    const id = createdProposalId;
    setIsConfirmModalOpen(false);
    setCreatedProposalId(null);

    onSuccess(id);
  };

  const handleConfirmClose = () => {
    setIsConfirmModalOpen(false);
    setCreatedProposalId(null);
  };

  return (
    <>
      {/* 바텀시트 배경 딤드 */}
      <S.Dimmed isOpen={isOpen} onClick={handleClose} />

      {/* 팀 제안 보내기 바텀시트 */}
      <S.BottomSheet isOpen={isOpen}>
        <S.Header>
          <S.HeaderSide />
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
                if (!e.target.value.trim()) setIsTitleFocused(false);
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
                if (!e.target.value) setIsMemoFocused(false);
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
                if (!e.target.value.trim()) setIsContactFocused(false);
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
                if (!e.target.value.trim()) setIsPeriodFocused(false);
              }}
            />
            <S.HelperText>최소 1일 ~ 최대 14일 이내로 가능해요</S.HelperText>
          </S.InputBox>

          {/* 전송하기 버튼 */}
          <S.SendButton
            type="button"
            disabled={!isSendEnabled || sending}
            onClick={handleSend}
          >
            {sending ? "전송 중..." : "전송하기"}
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