export const CATEGORY_IDEA = [
  { label: '문화_생활', value: '문화/생활' },
  { label: '교육_학습', value: '교육/학습' },
  { label: '환경_지속가능성', value: '환경/지속가능성' },
  { label: '경제_금융', value: '경제/금융' },
  { label: '의료_건강', value: '의료/건강' },
  { label: '주거_공간', value: '주거/공간' },
  { label: '육아_살림', value: '육아/살림' },
  { label: '관계_심리', value: '관계/심리' },
  { label: '사회_커뮤니티', value: '사회/커뮤니티' },
  { label: '기술_AI', value: '기술/AI' },
  { label: '기타', value: '기타' }
];

// 기술 -> 디자인
export const CATEGORY_TECH_DESIGN = [
  { label: 'UXUI디자인', value: 'UI/UX디자인' },
  { label: '비주얼_그래픽_디자인', value: '비주얼 그래픽 디자인' },
  { label: '브랜드_디자인', value: '브랜드 디자인' },
  { label: '아이콘_디자인', value: '아이콘 디자인' },
  { label: '인터랙션_및_모션_디자인', value: '인터렉션 및 모션 디자인' },

];

// 기술 -> 백엔드
export const CATEGORY_TECH_BACK = [
  { label: 'AI_기능_활용', value: 'AI 기능 활용', },
  { label: '백엔드', value: '백엔드' }
];

// 기술 -> 프론트
export const CATEGORY_TECH_FRONT = [
  { label: 'API_연동', value: 'API 연동' },
  { label: '데이터_시각화', value: '데이터 시각화' },
  { label: '인터랙션_애니메이션', value: '인터렉션/애니메이션' },
  { label: '레이아웃_그리드', value: '레이아웃/그리드' },
  { label: '성능_최적화', value: '성능 최적화' },
  { label: '상태_관리', value: '상태 관리' }
]

export const CATEGORY_ALL = [
  ...CATEGORY_IDEA,
  ...CATEGORY_TECH_DESIGN,
  ...CATEGORY_TECH_BACK,
  ...CATEGORY_TECH_FRONT, 
]