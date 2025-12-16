import React, { useEffect, useRef, useState } from "react";
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

// 상세 훅
import { useBoardDetail } from "@hooks";

type LocationState = {
  boardId?: number;
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

/**
 * categoryName 포맷 정규화
 * - "문화,생활" / "문화 생활" / "문화-생활" -> "문화_생활"
 * - "API 연동" -> "API_연동"
 * - 이미 "데이터_시각화" 처럼 내려오면 그대로 유지
 */
const normalizeCategory = (s?: string) => {
  const raw = (s ?? "").trim();

  // 구분자(쉼표/공백/하이픈/슬래시)들을 전부 "_"로 통일
  const normalized = raw
    .replace(/[,/]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/-+/g, "_");

  // "_"가 여러 개 연속이면 하나로
  return normalized.replace(/_+/g, "_").trim();
};

export const BoardDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showOverlay } = useOverlay();

  // boardId만 받기
  const { boardId } = (location.state || {}) as LocationState;

  // API로 보드 상세 가져오기
  const { data, loading } = useBoardDetail(boardId);

  const [titleEditing, setTitleEditing] = useState(false);
  const [memoEditing, setMemoEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");

  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isProposalSheetOpen, setIsProposalSheetOpen] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  // data 들어오면 title/memo 초기값 동기화
  useEffect(() => {
    if (!data) return;
    setTitle(data.boardName ?? "");
    setMemo(data.boardMemo ?? "");
  }, [data]);

  // ✅ blocks가 실제로 오는지 확인용(문제 해결되면 지워도 됨)
  useEffect(() => {
    if (!data) return;
    console.log("[BoardDetail] boardId:", boardId);
    console.log("[BoardDetail] blocks raw:", data.blocks);
  }, [data, boardId]);

  // boardId가 없으면 잘못된 진입
  if (!boardId) {
    return (
      <div style={styles.root}>
        <p>보드 정보를 찾을 수 없어요.</p>
      </div>
    );
  }

  // 로딩 중 처리
  if (loading || !data) {
    return (
      <div style={styles.root}>
        <div style={styles.headerFixed}>
          <header style={styles.topNav}>
            <button
              type="button"
              style={styles.iconBtn}
              onClick={() => navigate(-1)}
              aria-label="이전"
            >
              <img src={backIcon} alt="이전" style={styles.topNavIcon} />
            </button>
            <h1 style={styles.topNavTitle}>보드 상세</h1>
            <div style={{ width: 24, height: 24 }} />
          </header>
        </div>
        <main style={styles.content}>
          <p style={{ color: "#868286", fontSize: 14 }}>로딩중...</p>
        </main>
      </div>
    );
  }

  const blocks = data.blocks ?? [];
  const blockText = `${blocks.length}블록`;

  const handleBack = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    // TODO: 삭제 API 연결 시 구현
    navigate(-1);
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
          // TODO: 선택한 블록 삭제 API 연결
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

          <h1 style={styles.topNavTitle}>보드 상세</h1>

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
                const top = rect ? rect.bottom + 4 : 120;
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
          <p style={styles.blockCountText}>{blockText}</p>

          {/* 보드 제목 줄 */}
          <div style={styles.titleRow}>
            {titleEditing ? (
              <input
                style={styles.boardTitleInput}
                maxLength={14}
                value={title}
                onChange={(e) => setTitle(filterSpecialChars(e.target.value, 14))}
                onBlur={() => setTitleEditing(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setTitleEditing(false);
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
        {blocks.length === 0 ? (
          <section style={styles.emptySection}>
            <p style={styles.emptyTitle}>아직 저장한 블록 없음</p>
            <p style={styles.emptySub}>
              이 보드에 저장한 블록이 여기에 표시됩니다.
            </p>
          </section>
        ) : (
          <section style={styles.cardsGrid}>
            {blocks
              .map((b: any) => {
                const rawId = b.blockId ?? b.id ?? b.block_id;
                const blockId = Number(rawId);
                if (!Number.isFinite(blockId)) {
                  console.warn("[BoardDetail] invalid block id:", rawId, b);
                  return null;
                }

                // Swagger 기준 필드명 blockTitle / categoryName / blockType / techPart 등 맞춰서 우선 사용
                const blockTitle = b.blockTitle ?? b.title ?? b.block_title ?? "";
                const oneLineSummary =
                  b.oneLineSummary ?? b.onelineSummary ?? b.oneline_summary ?? "";
                const writerNickname =
                  b.writerNickname ?? b.userName ?? b.user_name ?? "";
                const techPart = b.techPart ?? b.tech_part ?? "";

                const categoryNameRaw = b.categoryName ?? b.category_name ?? "";
                const categoryName = normalizeCategory(categoryNameRaw);

                console.log("[BoardDetail] category mapping check", {
                  blockId,
                  blockTitle,
                  categoryNameRaw,
                  normalized: categoryName,
                });

                // 매칭 확인 로그 (문제 해결 후 삭제)
                console.log("[BoardDetail] render block:", {
                  blockId,
                  blockTitle,
                  blockType: b.blockType,
                  techPart,
                  categoryNameRaw,
                  categoryName,
                });

                return (
                  <BlockCard
                    key={blockId}
                    block_id={blockId}
                    block_title={blockTitle}
                    oneline_summary={oneLineSummary}
                    user_name={writerNickname}
                    tech_part={techPart}
                    category_name={categoryName} // ✅ 여기로 배경 매칭됨
                    isSelectionMode={isSelectionMode}
                    isSelected={selectedCards.includes(blockId)}
                    onToggleSelect={handleCardToggle}
                  />
                );
              })
              .filter(Boolean)}
          </section>
        )}
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

      <div style={styles.homeIndicator} />

      <TeamProposalSheet
        isOpen={isProposalSheetOpen}
        onClose={() => setIsProposalSheetOpen(false)}
      />
    </div>
  );
};