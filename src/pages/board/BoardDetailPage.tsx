import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { boardDetailStyles as styles } from "./BoardDetailPage.styles";
import { useOverlay } from "@components/common/OverlayContext";
import DeleteModal from "./DeleteModal";
import BlockCard from "@components/block/BlockCard";
import { TeamProposalSheet } from "./TeamProposalSheet";
import DeleteConfirmModal from "./DeleteConfirmModal";

import backIcon from "@assets/board/left.svg";
import moreIcon from "@assets/board/more.svg";
import penIcon from "@assets/board/Pen.svg";
import statusIcons from "@assets/board/nav/status.svg";

import type { Board } from "./BoardPage";

type BoardDetailPageProps = {
  boards: Board[];
  setBoards: React.Dispatch<React.SetStateAction<Board[]>>;
};

type LocationState = {
  boardId?: number;
  boards?: Board[];
};

// Helper function to filter special characters
const filterSpecialChars = (
  text: string,
  maxLength: number,
  allowNewline = false
): string => {
  const pattern = allowNewline
    ? /[^ㄱ-ㅎ가-힣a-zA-Z0-9\s~`!@#$%^&*()\-_=+[\]{}\\|;:'",.<>/?\n]/g
    : /[^ㄱ-ㅎ가-힣a-zA-Z0-9\s~`!@#$%^&*()\-_=+[\]{}\\|;:'",.<>/?]/g;
  return text.replace(pattern, "").slice(0, maxLength);
};

export const BoardDetailPage: React.FC<BoardDetailPageProps> = ({
  boards: propBoards,
  setBoards: propSetBoards,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showOverlay } = useOverlay();
  const { boardId, boards: stateBoards } = (location.state ||
    {}) as LocationState;

  const boards = stateBoards || propBoards;
  const setBoards = propSetBoards;
  const board = boards.find((b) => b.id === boardId);

  const [titleEditing, setTitleEditing] = useState(false);
  const [memoEditing, setMemoEditing] = useState(false);
  const [title, setTitle] = useState(board?.title ?? "");
  const [memo, setMemo] = useState(board?.memo ?? "");
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isProposalSheetOpen, setIsProposalSheetOpen] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  if (!board) {
    return (
      <div style={styles.root}>
        <p>보드 정보를 찾을 수 없어요.</p>
      </div>
    );
  }

  const blockText = `${board.blocks}블록`;

  const handleBack = () => {
    setBoards((prev) =>
      prev.map((b) =>
        b.id === board.id
          ? {
              ...b,
              title,
              memo,
            }
          : b
      )
    );
    navigate(-1);
  };

  const handleDelete = () => {
    // TODO: 삭제 로직 구현
    if (board && setBoards) {
      setBoards((prev) => prev.filter((b) => b.id !== board.id));
      navigate(-1);
    }
  };

  const handleSelect = () => {
    setIsSelectionMode(true);
    setSelectedCards([]);
  };

  const handleCardToggle = (cardId: number) => {
    setSelectedCards((prev) =>
      prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleCancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedCards([]);
  };

  const handleDeleteSelected = () => {
  if (selectedCards.length === 0) return;

  showOverlay(
    <DeleteConfirmModal
      title="삭제 확인"
      desc1="해당 블록을 보드에서 삭제하시겠습니까?"
      desc2="한 번 삭제한 블록은 복구할 수 없어요"
      confirmText="삭제하기"
      onConfirm={() => {
        // 현재 삭제는 아직 X

        setIsSelectionMode(false);
        setSelectedCards([]);
      }}
    />
  );
};

  return (
    <div style={styles.root}>
      {/* 상단 고정 영역 */}
      <div style={styles.headerFixed}>
        {/* 상태바 */}
        {/*<div style={styles.statusBar}>
          <div style={styles.statusTimeBox}>
            <span style={styles.statusTime}>9:41</span>
          </div>

          <div style={{ marginLeft: "auto" }}>
            <img
              src={statusIcons}
              alt="상태 아이콘"
              style={styles.statusIconImg}
            />
          </div>
        </div>*/}

        {/* 탑 네비 */}
        <header style={styles.topNav}>
          <button
            type="button"
            style={styles.iconBtn}
            onClick={handleBack}
            aria-label="이전"
          >
            <img src={backIcon} alt="이전" style={styles.topNavIcon} />
          </button>

          <h1 style={styles.topNavTitle}>
            {isSelectionMode ? "보드 상세" : "보드 상세"}
          </h1>

          {isSelectionMode ? (
            <button
              type="button"
              style={styles.iconBtn}
              onClick={handleCancelSelection}
              aria-label="취소"
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: "#352F36" }}>
                취소
              </span>
            </button>
          ) : (
            <button
              ref={moreButtonRef}
              type="button"
              style={styles.iconBtn}
              onClick={() => {
                const rect = moreButtonRef.current?.getBoundingClientRect();
                const top = rect ? rect.bottom + 4 : 120; // 버튼 아래 4px 간격
                const right = rect ? window.innerWidth - rect.right : 20;

                showOverlay(
                  <DeleteModal
                    onDelete={handleDelete}
                    onSelect={handleSelect}
                    showSelect={true}
                  />,
                  {
                    contentStyle: {
                      position: "absolute",
                      top: `${top}px`,
                      right: `${right}px`,
                    },
                  }
                );
              }}
              aria-label="더보기"
            >
              <img src={moreIcon} alt="더보기" style={styles.topNavIcon} />
            </button>
          )}
        </header>
      </div>

      {/* 본문 */}
      <main style={styles.content}>
        {/* N블록 / 제목 / 메모 박스 */}
        <section style={styles.infoSection}>
          {/* N블록 텍스트 */}
          <p style={styles.blockCountText}>{blockText}</p>

          {/* 보드 제목 줄 */}
          <div style={styles.titleRow}>
            {titleEditing ? (
              <input
                style={styles.boardTitleInput}
                maxLength={14}
                value={title}
                onChange={(e) =>
                  setTitle(filterSpecialChars(e.target.value, 14))
                }
                onBlur={() => setTitleEditing(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setTitleEditing(false);
                  }
                }}
                autoFocus
              />
            ) : (
              <span style={styles.boardTitleText}>{title}</span>
            )}

            <button
              type="button"
              style={styles.iconBtn}
              onClick={() => setTitleEditing(true)}
              aria-label="제목 수정"
            >
              <img src={penIcon} alt="제목 수정" style={styles.titleEditIcon} />
            </button>
          </div>

          {/* 메모 줄 */}
          <div style={styles.memoRow}>
            {memoEditing ? (
              <textarea
                style={styles.memoTextarea}
                maxLength={104}
                value={memo}
                onChange={(e) =>
                  setMemo(filterSpecialChars(e.target.value, 104, true))
                }
                onBlur={() => setMemoEditing(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    setMemoEditing(false);
                  }
                }}
                autoFocus
              />
            ) : (
              <span style={styles.memoText}>
                {memo && memo.length > 0 ? memo : "메모를 입력하세요"}
              </span>
            )}

            <button
              type="button"
              style={styles.iconBtn}
              onClick={() => setMemoEditing(true)}
              aria-label="메모 수정"
            >
              <img src={penIcon} alt="메모 수정" style={styles.memoEditIcon} />
            </button>
          </div>
        </section>

        {/* 블록 카드 그리드 */}
        <section style={styles.cardsGrid}>
          <BlockCard
            block_id={1}
            block_title="UI/UX 디자인 개선"
            oneline_summary="사용자 경험을 향상시키기 위한 디자인 리뉴얼"
            user_name="user_5159"
            tech_part="design"
            category_name="UI/UX디자인"
            isSelectionMode={isSelectionMode}
            isSelected={selectedCards.includes(1)}
            onToggleSelect={handleCardToggle}
          />
          <BlockCard
            block_id={7}
            block_title="API 연동 기능 개선"
            oneline_summary="외부 서비스와의 원활한 연동 구현"
            user_name="user_6247"
            tech_part="frontend"
            category_name="API 연동"
            isSelectionMode={isSelectionMode}
            isSelected={selectedCards.includes(7)}
            onToggleSelect={handleCardToggle}
          />
        </section>

        {/* 아직 저장된 블록 없음 상태 */}
        {/* {board.blocks === 0 && (
          <section style={styles.emptySection}>
            <p style={styles.emptyTitle}>아직 저장한 블록 없음</p>
            <p style={styles.emptySub}>
              이 보드에 저장한 블록이 여기에 표시됩니다.
            </p>
          </section>
        )} */}
      </main>

      {/* 선택하기 버튼들 */}
      {isSelectionMode && (
        <div style={styles.downBtnsList}>
          <button
            style={{
              ...styles.downBtn,
              opacity: selectedCards.length > 0 ? 1 : 0.5,
            }}
            disabled={selectedCards.length === 0}
            onClick={() => setIsProposalSheetOpen(true)}
          >
            선택한 블록 팀 제안 보내기
          </button>
          <button
            style={{
              ...styles.downBtn,
              opacity: selectedCards.length > 0 ? 1 : 0.5,
            }}
            onClick={handleDeleteSelected}
            disabled={selectedCards.length === 0}
          >
            선택한 블록 삭제하기
          </button>
        </div>
      )}

      {/* 홈 인디케이터 */}
      <div style={styles.homeIndicator} />

      {/* 팀 제안 보내기 바텀시트 */}
      <TeamProposalSheet
        isOpen={isProposalSheetOpen}
        onClose={() => setIsProposalSheetOpen(false)}
      />
    </div>
  );
};
