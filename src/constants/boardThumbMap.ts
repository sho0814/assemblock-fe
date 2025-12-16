// src/constants/boardThumbMap.ts
import { getSmallSvg } from "@assets/board/small";

const normalizeCategory = (s?: string) => {
  const raw = (s ?? "").trim();
  return raw
    .replace(/[,/]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/-+/g, "_")
    .replace(/_+/g, "_")
    .trim();
};

export const categoryToThumb = (category?: string) => {
  const normalized = normalizeCategory(category);
  if (!normalized) return getSmallSvg("basic");

  const map: Record<string, string> = {
    // 아이디어
    "주거_공간": "smallIdeaHousing",
    "교육_학습": "smallIdeaEducation",
    "환경_지속가능성": "smallIdeaEnvironment",
    "기타": "smallIdeaEtc",
    "경제_금융": "smallIdeaFinance",
    "의료_건강": "smallIdeaHealth",
    "육아_살림": "smallIdeaParenting",
    "관계_심리": "smallIdeaRelationships",
    "사회_커뮤니티": "smallIdeaSocialCommunity",
    "문화_생활": "smallIdeaCulture",
    "기술_AI": "smallIdeaTechnologyAI",

    // 디자인
    "브랜드_디자인": "smallTechDesignBrand",
    "아이콘_디자인": "smallTechDesignIcon",
    "인터렉션_및_모션_디자인": "smallTechDesignMotionInteraction",
    "UXUI디자인": "smallTechDesignUiux",
    "비주얼_그래픽_디자인": "smallTechDesignVisualGraphic",

    // 백엔드
    "AI_기능_활용": "smallTechBackAi",
    "백엔드": "smallTechBackBack",

    // 프론트
    "API_연동": "smallTechFrontAPIintegration",
    "데이터_시각화": "smallTechFrontDatavisualization",
    "인터렉션_애니메이션": "smallTechFrontInteractionAnimation",
    "레이아웃_그리드": "smallTechFrontLayoutGrid",
    "성능_최적화": "smallTechFrontPerformanceOptimization",
    "상태_관리": "smallTechFrontStateManagement",
  };

  const key = map[normalized];
  console.log("[ThumbMap] mapping", { category, normalized, key });
  // ✅ 여기 핵심: 매핑 실패면 무조건 basic
  if (!key) {
    console.warn("[ThumbMap] no match -> basic", { category, normalized });
    return getSmallSvg("basic");
  }

  return getSmallSvg(key);
};