import IdeaCulture from '@assets/board/small/smallIdeaCulture.svg'
import IdeaEducation from '@assets/board/small/smallIdeaEducation.svg'
import IdeaEnvironment from '@assets/board/small/smallIdeaEnvironment.svg'
import IdeaEtc from '@assets/board/small/smallIdeaEtc.svg'
import IdeaFinance from '@assets/board/small/smallIdeaFinance.svg'
import IdeaHealth from '@assets/board/small/smallIdeaHealth.svg'
import IdeaHousing from '@assets/board/small/smallIdeaParenting.svg'
import IdeaParenting from '@assets/board/small/smallIdeaParenting.svg'
import IdeaRelationships from '@assets/board/small/smallIdeaRelationships.svg'
import IdeaSocialCommunity from '@assets/board/small/smallIdeaSocialCommunity.svg'
import IdeaTechnologyAI from '@assets/board/small/smallIdeaTechnologyAI.svg'
import BackAi from '@assets/board/small/smallTechBackAi.svg'
import BackBack from '@assets/board/small/smallTechBackBack.svg'
import DesignBrand from '@assets/board/small/smallTechDesignBrand.svg'
import DesignIcon from '@assets/board/small/smallTechDesignIcon.svg'
import DesignMotionInteraction from '@assets/board/small/smallTechDesignMotionInteraction.svg'
import DesignUIUX from '@assets/board/small/smallTechDesignUiux.svg'
import DesignVisualGraphic from '@assets/board/small/smallTechDesignVisualGraphic.svg'
import FrontAPIIntegration from '@assets/board/small/smallTechFrontAPIintegration.svg'
import FrontDataVisualization from '@assets/board/small/smallTechFrontDatavisualization.svg'
import FrontInteractionAnimation from '@assets/board/small/smallTechFrontInteractionAnimation.svg'
import FrontLayoutGrid from '@assets/board/small/smallTechFrontLayoutGrid.svg'
import FrontPerformance from '@assets/board/small/smallTechFrontPerformanceOptimization.svg'
import FrontStateManagement from '@assets/board/small/smallTechFrontStateManagement.svg'

export const categoryToIconMap: Record<string, string> = {
  '주거_공간': IdeaHousing,
  '교육_학습': IdeaEducation,
  '환경_지속가능성': IdeaEnvironment,
  '기타': IdeaEtc,
  '경제_금융': IdeaFinance,
  '의료_건강': IdeaHealth,
  '육아_살림': IdeaParenting,
  '관계_심리': IdeaRelationships,
  '사회_커뮤니티': IdeaSocialCommunity,
  '문화_생활': IdeaCulture,
  '기술_AI': IdeaTechnologyAI,
  '브랜드_디자인': DesignBrand,
  '아이콘_디자인': DesignIcon,
  '인터렉션_및_모션_디자인': DesignMotionInteraction,
  'UXUI디자인': DesignUIUX,
  '비주얼_그래픽_디자인': DesignVisualGraphic,
  'AI_기능_활용': BackAi,
  '백엔드': BackBack,
  'API_연동': FrontAPIIntegration,
  '데이터_시각화': FrontDataVisualization,
  '인터렉션_애니메이션': FrontInteractionAnimation,
  '레이아웃_그리드': FrontLayoutGrid,
  '성능_최적화': FrontPerformance,
  '상태_관리': FrontStateManagement,
};