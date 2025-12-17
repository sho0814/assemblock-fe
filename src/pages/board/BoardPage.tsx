import React, { useState, useRef, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { boardPageStyles as styles } from "./BoardPage.styles";
import { useOverlay } from "@components/common/OverlayContext";
import DeleteModal from "./DeleteModal";

// 훅
import { useBoards, useBoardDetail } from "@hooks";
import type { MinimalBoard } from "@types";

// 썸네일 매핑 함수
import { categoryToThumb } from "@constants/boardThumbMap";

// 썸네일 기본 아이콘
import basicBoard from "@assets/board/small/basic.svg";

// 상단 아이콘
import addIcon from "@assets/board/add.svg";
import alarmIcon from "@assets/board/nav/alarm.svg";
import searchIcon from "@assets/board/nav/search.svg";
import menuIcon from "@assets/board/nav/menu.svg";

import closeIcon from "@assets/board/close.svg";

type BoardPageProps = {};

const normalizeCategory = (s?: string) => {
  const raw = (s ?? "").trim();
  const normalized = raw
    .replace(/[,/]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/-+/g, "_");
  return normalized.replace(/_+/g, "_").trim();
};

// "카테고리 썸네일 먼저" + 부족한 칸은 basic으로 채워서 4칸 만들기
const buildThumbs = (categories: string[] = [], basic: string) => {
  const thumbs = categories
    .filter(Boolean)
    .slice(0, 4)
    .map((c) => categoryToThumb(c));

  const blanks = 4 - thumbs.length;
  return blanks > 0 ? [...thumbs, ...Array(blanks).fill(basic)] : thumbs;
};

// 보드 카드 1개를 별도 컴포넌트로 분리 (여기서 boardDetail 호출)
const BoardCardItem: React.FC<{ board: MinimalBoard }> = ({ board }) => {
  const navigate = useNavigate();

  // 보드 상세 조회해서 blocks에서 categoryName을 뽑아 “진짜 썸네일” 구성
  const { data, loading } = useBoardDetail(board.boardId);

  const blocks = data?.blocks ?? [];

  const categoriesInOrder = blocks
    .map((b: any) => normalizeCategory(b.categoryName ?? b.category_name))
    .filter(Boolean);

  const thumbs = buildThumbs(categoriesInOrder, basicBoard);
  const blockCount = data?.blocks ? blocks.length : board.blockCount; // fallback


  return (
    <button
      key={board.boardId}
      style={styles.boardCard}
      type="button"
      onClick={() =>
        navigate("/Board/detail", {
          state: { boardId: board.boardId },
        })
      }
    >
      <div style={styles.boardIconGrid}>
        {thumbs.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${board.boardName} 썸네일`}
            style={styles.boardIconImg}
          />
        ))}
      </div>

      <div style={styles.boardInfo}>
        <span style={styles.boardTitle}>{board.boardName}</span>
        <span style={styles.boardSub}>
          {loading ? "로딩..." : `${blockCount}블록`}
        </span>
      </div>
    </button>
  );
};

export const BoardPage: React.FC<BoardPageProps> = () => {
  const navigate = useNavigate();
  const { showOverlay } = useOverlay();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const { boards, createNewBoard } = useBoards();

   const stableBoards = [...boards].sort((a, b) => b.boardId - a.boardId);

  // 바텀시트/폼 상태
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [memo, setMemo] = useState("");
  const [isMemoFocused, setIsMemoFocused] = useState(false);

  const isCreateEnabled = boardTitle.trim().length > 0;

  const rootStyle: CSSProperties = {
    ...styles.root,
    backgroundColor: isCreateSheetOpen ? "#F2F2F2" : "#FAFAFA",
  };

  const handleCloseSheet = () => {
    setIsCreateSheetOpen(false);
    setBoardTitle("");
    setMemo("");
    setIsTitleFocused(false);
    setIsMemoFocused(false);
  };

  const dimmedStyle: CSSProperties = {
    ...styles.bottomSheetDimmed,
    opacity: isCreateSheetOpen ? 1 : 0,
    pointerEvents: isCreateSheetOpen ? "auto" : "none",
  };

  const sheetStyle: CSSProperties = {
    ...styles.bottomSheet,
    transform: isCreateSheetOpen
      ? "translate(-50%, 0)"
      : "translate(-50%, 100%)",
  };

  const createButtonStyle: CSSProperties = isCreateEnabled
    ? styles.createButtonEnabled
    : styles.createButtonDisabled;

  const createButtonTextStyle: CSSProperties = isCreateEnabled
    ? styles.createButtonTextEnabled
    : styles.createButtonTextDisabled;

  return (
    <div style={rootStyle}>
      <div style={styles.pageInner}>
        <div style={styles.headerFixed}>
          <div style={styles.topNav}>
            <div style={styles.topNavTitleBox}>
              <h1 className="h1" style={styles.topNavTitle}>
                내 보드
              </h1>
            </div>

            <div style={styles.topNavIcons}>
              <button
                style={styles.topNavBtn}
                type="button"
                onClick={() => navigate("/notification")}
              >
                <img src={alarmIcon} alt="알림" style={styles.alarmIcon} />
              </button>

              <button
                style={styles.topNavBtn}
                type="button"
                onClick={() => navigate("/search")}
              >
                <img src={searchIcon} alt="검색" style={styles.searchIcon} />
              </button>

              <button
                ref={menuButtonRef}
                style={styles.topNavBtn}
                type="button"
                onClick={() => navigate("/category")}
              >
                <img src={menuIcon} alt="메뉴" style={styles.menuIcon} />
              </button>
            </div>
          </div>
        </div>

        <main style={styles.content}>
          <div style={styles.boardsGrid}>
            {stableBoards.map((board: MinimalBoard) => (
              <BoardCardItem key={board.boardId} board={board} />
            ))}
          </div>
        </main>

        <button
          type="button"
          style={styles.floatingAddBtn}
          onClick={() => setIsCreateSheetOpen(true)}
        >
          <img src={addIcon} alt="보드 추가" style={styles.floatingAddImg} />
        </button>

        <div style={styles.homeIndicator} />

        <div style={dimmedStyle} onClick={handleCloseSheet} />

        <section style={sheetStyle}>
          <header style={styles.bottomSheetHeader}>
            <h2 className="h2" style={styles.bottomSheetTitle}>
              새 보드 만들기
            </h2>
            <button
              type="button"
              style={styles.bottomSheetCloseBtn}
              onClick={handleCloseSheet}
              aria-label="닫기"
            >
              <img src={closeIcon} alt="닫기" style={styles.bottomSheetCloseIcon} />
            </button>
          </header>

          <div style={styles.bottomSheetContent}>
            <div style={styles.boardTitleBox}>
              <p style={styles.boardTitleLabel}>보드 제목</p>
              <input
                type="text"
                className="board-title-input"
                placeholder={isTitleFocused ? "" : "보드 제목을 입력하세요"}
                maxLength={14}
                style={styles.boardTitleInput}
                value={boardTitle}
                onChange={(e) => {
                  const raw = e.target.value;
                  const filtered = raw.replace(
                    /[^ㄱ-ㅎ가-힣a-zA-Z0-9\s~`!@#$%^&*()\-_=+\[\]{}\\|;:'",.<>/?]/g,
                    ""
                  );
                  setBoardTitle(filtered.slice(0, 14));
                }}
                onFocus={() => setIsTitleFocused(true)}
                onBlur={(e) => {
                  if (!e.target.value.trim()) setIsTitleFocused(false);
                }}
              />
              <p style={styles.boardTitleHelper}>
                영문/한글/숫자로 14자까지 입력 가능해요
              </p>
            </div>

            <div style={styles.memoBox}>
              <p style={styles.memoLabel}>메모</p>
              <textarea
                rows={1}
                className="memo-textarea"
                value={memo}
                placeholder={isMemoFocused ? "" : "메모를 작성하세요"}
                style={styles.memoTextarea}
                maxLength={300}
                onChange={(e) => {
                  const raw = e.target.value;
                  const filtered = raw.replace(
                    /[^ㄱ-ㅎ가-힣a-zA-Z0-9\s~`!@#$%^&*()\-_=+\[\]{}\\|;:'",.<>/?\n]/g,
                    ""
                  );
                  setMemo(filtered.slice(0, 300));
                }}
                onFocus={() => setIsMemoFocused(true)}
                onBlur={(e) => {
                  if (!e.target.value) setIsMemoFocused(false);
                }}
              />
              <p style={styles.memoHelper}>
                한글/영문/숫자/특수문자로 최대 300자까지 입력할 수 있어요
              </p>
            </div>

            <button
              type="button"
              style={createButtonStyle}
              disabled={!isCreateEnabled}
              onClick={async () => {
                if (!isCreateEnabled) return;
                await createNewBoard(boardTitle.trim(), memo.trim());
                handleCloseSheet();
              }}
            >
              <span style={createButtonTextStyle}>생성하기</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
