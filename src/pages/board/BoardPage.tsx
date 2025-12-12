import React, { useState, useRef, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { boardPageStyles as styles } from "./BoardPage.styles";
import { useOverlay } from "@components/common/OverlayContext";
import DeleteModal from "./DeleteModal";

// 썸네일 아이콘
import basicBoard from "@assets/board/small/basic.svg";

// 상단 아이콘
import addIcon from "@assets/board/add.svg";
import alarmIcon from "@assets/board/nav/alarm.svg";
import searchIcon from "@assets/board/nav/search.svg";
import menuIcon from "@assets/board/nav/menu.svg";

// 상태바 아이콘
import statusIcons from "@assets/board/nav/status.svg";

import closeIcon from "@assets/board/close.svg";

export type Board = {
  id: number;
  title: string;
  blocks: number;
  icon: string;
  memo?: string;
};

type BoardPageProps = {
  boards?: Board[];
  setBoards?: React.Dispatch<React.SetStateAction<Board[]>>;
};

export const BoardPage: React.FC<BoardPageProps> = () => {
  const navigate = useNavigate();
  const { showOverlay } = useOverlay();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // 바텀시트/폼 상태
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [memo, setMemo] = useState("");
  const [isMemoFocused, setIsMemoFocused] = useState(false);
  const [boards, setBoards] = useState<Board[]>([
    { id: 1, title: "기본 보드", blocks: 0, icon: basicBoard, memo: "" },
    { id: 2, title: "기본 보드", blocks: 0, icon: basicBoard, memo: "" },
    { id: 3, title: "기본 보드", blocks: 0, icon: basicBoard, memo: "" },
  ]);

  const isCreateEnabled = boardTitle.trim().length > 0; // 1자 이상 입력 시 버튼 활성화

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

  const handleDelete = () => {
    // 첫 번째 보드 삭제 (예시)
    if (boards.length > 0) {
      setBoards((prev) => prev.slice(1));
    }
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
        {/* 상단 고정 영역 */}
        <div style={styles.headerFixed}>
          {/* 상태바 */}
          <div style={styles.statusBar}>
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
          </div>

          {/* 탑네비 */}
          <div style={styles.topNav}>
            <div style={styles.topNavTitleBox}>
              <h1 className="h1" style={styles.topNavTitle}>
                내 보드
              </h1>
            </div>
            <div style={styles.topNavIcons}>
              <button style={styles.topNavBtn} 
              type="button"
              onClick={() => navigate("/notification")}
              >
                <img src={alarmIcon} alt="알림" style={styles.alarmIcon} />
              </button>

              <button style={styles.topNavBtn} 
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

        {/* 보드 리스트 */}
        <main style={styles.content}>
          <div style={styles.boardsGrid}>
            {boards.map((board) => (
              <button
                key={board.id}
                style={styles.boardCard}
                type="button"
                onClick={() =>
                  navigate("/Board/detail", {
                    state: { boardId: board.id, boards },
                  })
                }
              >
                {/* 썸네일 2×2 그리드 */}
                <div style={styles.boardIconGrid}>
                  {[0, 1, 2, 3].map((i) => (
                    <img
                      key={i}
                      src={board.icon}
                      alt={`${board.title} 썸네일`}
                      style={styles.boardIconImg}
                    />
                  ))}
                </div>

                {/* 텍스트 블럭 */}
                <div style={styles.boardInfo}>
                  <span style={styles.boardTitle}>{board.title}</span>
                  <span style={styles.boardSub}>{board.blocks}블록</span>
                </div>
              </button>
            ))}
          </div>
        </main>

        {/* 생성 버튼 */}
        <button
          type="button"
          style={styles.floatingAddBtn}
          onClick={() => setIsCreateSheetOpen(true)}
        >
          <img src={addIcon} alt="보드 추가" style={styles.floatingAddImg} />
        </button>

        {/* 홈 인디케이터 */}
        <div style={styles.homeIndicator} />

        {/* 바텀시트 배경 딤드 */}
        <div style={dimmedStyle} onClick={handleCloseSheet} />

        {/* 새 보드 만들기 바텀시트 */}
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
              <img
                src={closeIcon}
                alt="닫기"
                style={styles.bottomSheetCloseIcon}
              />
            </button>
          </header>

          <div style={styles.bottomSheetContent}>
            {/* 보드 제목 박스 */}
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
                    /[^ㄱ-ㅎ가-힣a-zA-Z0-9\s~`!@#$%^&*()\-_=+[\]{}\\|;:'",.<>/?]/g,
                    ""
                  );
                  setBoardTitle(filtered.slice(0, 14));
                }}
                onFocus={() => setIsTitleFocused(true)}
                onBlur={(e) => {
                  if (!e.target.value.trim()) {
                    setIsTitleFocused(false);
                  }
                }}
              />
              <p style={styles.boardTitleHelper}>영문/한글/숫자로 14자까지 입력 가능해요</p>
            </div>

            {/* 메모 박스 */}
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
                    /[^ㄱ-ㅎ가-힣a-zA-Z0-9\s~`!@#$%^&*()\-_=+[\]{}\\|;:'",.<>/?\n]/g,
                    ""
                  );
                  setMemo(filtered.slice(0, 104));
                }}
                onFocus={() => setIsMemoFocused(true)}
                onBlur={(e) => {
                  if (!e.target.value) {
                    setIsMemoFocused(false);
                  }
                }}
              />
              <p style={styles.memoHelper}>한글/영문/숫자/특수문자로 최대 300자까지 입력할 수 있어요</p>
            </div>

            {/* 생성하기 버튼 */}
            <button
              type="button"
              style={createButtonStyle}
              disabled={!isCreateEnabled}
              onClick={() => {
                if (!isCreateEnabled) return;

                setBoards((prev) => {
                  const nextId = prev.length ? prev[prev.length - 1].id + 1 : 1;

                  const newBoard: Board = {
                    id: nextId,
                    title: boardTitle.trim(),
                    blocks: 0,
                    icon: basicBoard, // 기본 썸네일 4개
                    memo: memo.trim(),
                  };

                  return [...prev, newBoard];
                });

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
