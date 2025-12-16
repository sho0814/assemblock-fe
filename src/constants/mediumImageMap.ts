// 카테고리명과 medium 이미지 매핑
import mediumIdeaCulture from '@assets/common/medium Img/mediumIdeaCulture.svg';
import mediumIdeaEducation from '@assets/common/medium Img/mediumIdeaEducation.svg';
import mediumIdeaEnvironment from '@assets/common/medium Img/mediumIdeaEnvironment.svg';
import mediumIdeaEtc from '@assets/common/medium Img/mediumIdeaEtc.svg';
import mediumIdeaFinance from '@assets/common/medium Img/mediumIdeaFinance.svg';
import mediumIdeaHealth from '@assets/common/medium Img/mediumIdeaHealth.svg';
import mediumIdeaHousing from '@assets/common/medium Img/mediumIdeaHousing.svg';
import mediumIdeaParenting from '@assets/common/medium Img/mediumIdeaParenting.svg';
import mediumIdeaRelationships from '@assets/common/medium Img/mediumIdeaRelationships.svg';
import mediumIdeaSocialCommunity from '@assets/common/medium Img/mediumIdeaSocialCommunity.svg';
import mediumIdeaTechnologyAI from '@assets/common/medium Img/mediumIdeaTechnologyAI.svg';

// 기술 타입 > 디자인
import mediumTechDesignBrand from '@assets/common/medium Img/mediumTechDesignBrand.svg';
import mediumTechDesignIcon from '@assets/common/medium Img/mediumTechDesignIcon.svg';
import mediumTechDesignMotionInteraction from '@assets/common/medium Img/mediumTechDesignMotionInteraction.svg';
import mediumTechDesignUiux from '@assets/common/medium Img/mediumTechDesignUiux.svg';
import mediumTechDesignVisualGraphic from '@assets/common/medium Img/mediumTechDesignVisualGraphic.svg';

// 기술 타입 > 백엔드
import mediumTechBackAi from '@assets/common/medium Img/mediumTechBackAi.svg';
import mediumTechBackBack from '@assets/common/medium Img/mediumTechBackBack.svg';

// 기술 타입 > 프론트엔드
import mediumTechFrontAPIintegration from '@assets/common/medium Img/mediumTechFrontAPIintegration.svg';
import mediumTechFrontDatavisualization from '@assets/common/medium Img/mediumTechFrontDatavisualization.svg';
import mediumTechFrontInteractionAnimation from '@assets/common/medium Img/mediumTechFrontInteractionAnimation.svg';
import mediumTechFrontLayoutGrid from '@assets/common/medium Img/mediumTechFrontLayoutGrid.svg';
import mediumTechFrontPerformanceOptimization from '@assets/common/medium Img/mediumTechFrontPerformanceOptimization.svg';
import mediumTechFrontStateManagement from '@assets/common/medium Img/mediumTechFrontStateManagement.svg';

export const mediumImageMap: Record<string, string> = {
  // 아이디어 타입
  '문화_생활': mediumIdeaCulture,
  '교육_학습': mediumIdeaEducation,
  '환경_지속가능성': mediumIdeaEnvironment,
  '기타': mediumIdeaEtc,
  '경제_금융': mediumIdeaFinance,
  '의료_건강': mediumIdeaHealth,
  '주거_공간': mediumIdeaHousing,
  '육아_살림': mediumIdeaParenting,
  '관계_심리': mediumIdeaRelationships,
  '사회_커뮤니티': mediumIdeaSocialCommunity,
  '기술_AI': mediumIdeaTechnologyAI,

  // 기술 타입 > 디자인
  '브랜드_디자인': mediumTechDesignBrand,
  '아이콘_디자인': mediumTechDesignIcon,
  '인터렉션_및_모션_디자인': mediumTechDesignMotionInteraction,
  'UXUI디자인': mediumTechDesignUiux,
  '비주얼_그래픽_디자인': mediumTechDesignVisualGraphic,

  // 기술 타입 > 백엔드
  'AI_기능_활용': mediumTechBackAi,
  '백엔드': mediumTechBackBack,

  // 기술 타입 > 프론트엔드
  'API_연동': mediumTechFrontAPIintegration,
  '데이터_시각화': mediumTechFrontDatavisualization,
  '인터랙션_애니메이션': mediumTechFrontInteractionAnimation,
  '레이아웃_그리드': mediumTechFrontLayoutGrid,
  '성능_최적화': mediumTechFrontPerformanceOptimization,
  '상태_관리': mediumTechFrontStateManagement,
};

export const getMediumImage = (categoryName: string | null): string => {
  if (!categoryName) return mediumIdeaEtc;
  
  if (mediumImageMap[categoryName]) {
    return mediumImageMap[categoryName];
  }
  
  return mediumIdeaEtc;
};

