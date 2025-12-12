import { type CSSProperties } from "react";

type Styles = Record<string, CSSProperties>;

export const boardPageStyles: Styles = {
  root: {
    marginTop: -48,
    marginBottom: -99,
    marginLeft: -20,
    marginRight: -20,

    minWidth: 375,
    maxWidth: 400,
    // minHeight: "100vh",
    backgroundColor: "#FAFAFA",
    boxSizing: "border-box",
    position: "relative",
  },

  pageInner: {
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  },

  headerFixed: {
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",

    width: "100%",
    minWidth: 375,
    maxWidth: 400,

    backgroundColor: "#FAFAFA",
    zIndex: 30,
  },

  // 상태바
  statusBar: {
    display: "flex",
    alignItems: "center",
    height: 48,
    width: "100%",
    boxSizing: "border-box",
    paddingTop: 21,
  },

  statusTimeBox: {
    display: "flex",
    padding: "0 6px 0 49px",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },

  statusTime: {
    color: "#000",
    textAlign: "center",
    fontFamily:
      '"SF Pro", system-ui, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: 590,
    lineHeight: "22px",
  },

  // 오른쪽 아이콘 영역
  statusSideRight: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  statusIconImg: {
    flexShrink: 0,
    height: 13,
  },

  // 탑네비
  topNav: {
    display: "flex",
    height: 68,
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    flexShrink: 0,
    marginTop: 2,
  },

  // 내 보드 텍스트 박스
  topNavTitleBox: {
    display: "flex",
    alignItems: "center",
    padding: "16px 20px 16px 20px",
  },

  topNavTitle: {
    margin: 0,
  },

  // 탑네비 아이콘 박스
  topNavIcons: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "22px 20px",
  },

  topNavBtn: {
    border: "none",
    background: "none",
    padding: 0,
    cursor: "pointer",
  },

  // 아이콘 크기
  alarmIcon: {
    width: 24,
    height: 24,
    aspectRatio: 1 / 1,
  },
  searchIcon: {
    width: 24,
    height: 24,
    aspectRatio: 1 / 1,
  },
  menuIcon: {
    width: 24,
    height: 24,
    aspectRatio: 1 / 1,
  },

  // 카드 리스트
  content: {
    marginTop: 30,
    paddingTop: 116,
    paddingBottom: 199,
  },
  boardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    columnGap: 18,
    rowGap: 18,
    padding: "0 20px",
    boxSizing: "border-box",
  },

  boardCard: {
    display: "flex",
    margin: 0,
    width: "100%",
    height: 177,
    padding: "16px 16px 12px 16px",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,

    borderRadius: 20,
    background: "var(--GrayScale-GR10, #F0EFF1)",
    boxShadow:
      "0 0 2px 0 var(--main-transparency-bk-25, rgba(53, 47, 54, 0.25))",
    boxSizing: "border-box",
    border: "none",
    cursor: "pointer",
  },

  // 아이콘 4개 그리드
  boardIconGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, auto)",
    gridTemplateRows: "repeat(2, auto)",
    columnGap: 4,
    rowGap: 4,
  },

  // 개별 아이콘
  boardIconImg: {
    width: 48,
    height: 48,
    flexShrink: 0,
    objectFit: "contain",
  },

  // 텍스트 블럭
  boardInfo: {
    width: 132,
    textAlign: "center",
  },

  boardTitle: {
    display: "-webkit-box",
    width: 132,
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    flexShrink: 0,

    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "var(--Primary-BK, #352F36)",
    textAlign: "center",
    fontFamily: "Pretendard, sans-serif",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "150%",
    margin: "0 0 4px 0",
  },

  boardSub: {
    color: "var(--GrayScale-GR50, #868286)",
    textAlign: "center",

    fontFamily: "Pretendard, sans-serif",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
    margin: 0,
  },

  // 생성 버튼
  floatingAddBtn: {
    position: "fixed",
    right: "calc(50% - min(400px, 100vw) / 2 + 24px)",
    bottom: 123,

    width: 60,
    height: 60,
    borderRadius: 100,
    border: "none",
    backgroundColor: "#252129",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 60,
  },

  floatingAddImg: {
    width: 24,
    height: 24,
  },

  homeIndicator: {
    position: "fixed",
    left: "50%",
    bottom: 8,
    transform: "translateX(-50%)",
    width: 144,
    height: 5,
    flexShrink: 0,
    borderRadius: 100,
    background: "#000",
    zIndex: 70,
  },

  // 배경 반투명
  bottomSheetDimmed: {
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    top: 0,
    bottom: 99,
    width: "100%",
    minWidth: 375,
    maxWidth: 400,

    backgroundColor: "rgba(0, 0, 0, 0.50)",
    zIndex: 50,
    opacity: 0,
    pointerEvents: "none",
    transition: "opacity 0.25s ease-out",
  },

  // 바텀시트(새 보드 만들기)
  bottomSheet: {
    position: "fixed",
    left: "50%",
    bottom: 0,
    transform: "translateX(-50%)",
    width: "100%",
    minWidth: 375,
    maxWidth: 400,

    height: 454,
    borderRadius: "24px 24px 0 0",
    background: "var(--GrayScale-WT, #FAFAFA)",
    boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
    boxSizing: "border-box",

    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    zIndex: 60,
    transition: "transform 0.25s ease-out",
    overflow: "hidden",
  },

  bottomSheetHeader: {
    display: "flex",
    height: 68,
    padding: "22px 20px",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",

    width: "100%",
    boxSizing: "border-box",
    borderBottom: "1px solid #F0EFF1",
    backgroundColor: "var(--GrayScale-WT, #FAFAFA)",
  },

  bottomSheetTitle: {
    flex: 1,
    textAlign: "center",
    margin: 0,

    color: "var(--Primary-BK, #352F36)",
    fontFamily: "Pretendard, sans-serif",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "150%",
  },

  bottomSheetCloseBtn: {
    border: "none",
    background: "none",
    padding: 0,
    cursor: "pointer",

    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  bottomSheetCloseIcon: {
    width: 18,
    height: 18,
    aspectRatio: 1 / 1,
  },

  bottomSheetContent: {
    width: "100%",
    padding: "0px 20px 29px 20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 0,
  },

  // 보드 제목 박스
  boardTitleBox: {
    display: "flex",
    width: 335,
    padding: "12px 0",
    margin: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 8,
  },

  boardTitleLabel: {
    margin: 0,

    color: "var(--Primary-BK, #352F36)",

    fontFamily: "Pretendard, sans-serif",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "150%",
  },

  boardTitleInput: {
    alignSelf: "stretch",

    width: "100%",
    border: "none",
    borderBottom: "1px solid #E3E3E6",
    padding: "4px 0 8px 0",
    background: "transparent",
    outline: "none",
    borderRadius: 0,

    fontFamily: "Pretendard, sans-serif",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "150%",

    color: "var(--Primary-BK, #352F36)",
  },

  boardTitleInputPlaceholder: {
    color: "#D0CED3",
  },

  boardTitleHelper: {
    margin: 0,

    color: "var(--GrayScale-GR50, #868286)",

    fontFamily: "Pretendard, sans-serif",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
  },

  // 메모 박스
  memoBox: {
    display: "flex",
    width: 335,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    padding: "12px 0",
    alignSelf: "auto",
    margin: "0 auto",
  },
  memoLabel: {
    margin: 0,
    color: "var(--Primary-BK, #352F36)",
    fontFamily: "Pretendard, sans-serif",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "150%",
  },

  memoTextarea: {
    alignSelf: "stretch",
    width: "100%",
    boxSizing: "border-box",

    paddingTop: 0,
    paddingBottom: 4,
    paddingLeft: 0,
    paddingRight: 0,

    border: "none",
    borderBottom: "1px solid #E3E3E6",
    background: "transparent",
    outline: "none",
    borderRadius: 0,

    fontFamily: "Pretendard, sans-serif",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
    color: "var(--Primary-BK, #352F36)",

    resize: "none",
  },

  memoHelper: {
    margin: 0,
    color: "var(--GrayScale-GR50, #868286)",
    fontFamily: "Pretendard, sans-serif",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
  },

  // 생성하기 버튼 - 비활성
  createButtonDisabled: {
    display: "flex",
    width: 335,
    padding: "12px 10px",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,

    borderRadius: 16,
    background: "var(--GrayScale-GR10, #F0EFF1)",
    border: "none",
    outline: "none",
    cursor: "default",

    marginTop: 82,
  },

  // 생성하기 버튼 - 활성
  createButtonEnabled: {
    display: "flex",
    width: 335,
    padding: "12px 10px",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,

    borderRadius: 16,
    border: "none",
    outline: "none",
    background: "var(--Primary-BK, #352F36)",
    cursor: "pointer",

    marginTop: 82,
  },

  // 버튼 텍스트 - 비활성
  createButtonTextDisabled: {
    color: "var(--GrayScale-GR30, #C2C1C3)",
    textAlign: "center",

    fontFamily: "Pretendard, sans-serif",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
  },

  // 버튼 텍스트 - 활성
  createButtonTextEnabled: {
    color: "#FAFAFA",
    fontFamily: "Pretendard, sans-serif",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "150%",
  },
};
