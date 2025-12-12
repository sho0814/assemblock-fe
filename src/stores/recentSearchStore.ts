// stores/recentSearchStore.ts
import type { HistoryItem } from '@types';

const STORAGE_KEY = 'recent_searches';
const MAX_HISTORY_COUNT = 10; // 최대 10개로 제한 (성능/용량 고려)

function loadFromStorage(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveToStorage(items: HistoryItem[]) {
  if (typeof window === 'undefined') return;
  try {
    // 중복 제거 후 최대 개수 제한
    const deduped = items.filter((item, index, self) =>
      index === self.findIndex(t => t.keyword === item.keyword)
    );
    const limited = deduped.slice(0, MAX_HISTORY_COUNT);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
  } catch {
    // 용량 초과 등 에러는 여기서만 삼킴
  }
}

// 초기값 불러오기
export const getRecentSearches = (): HistoryItem[] => {
  return loadFromStorage();
};

// 새 검색어 추가 (중복 제거 + 최대 개수 제한)
export const addSearchHistory = (keyword: string): HistoryItem[] => {
  if (!keyword.trim()) return loadFromStorage(); // 빈 키워드는 추가 안함

  const current = loadFromStorage();
  const maxId = current.reduce((m, v) => Math.max(m, v.historyId), 0);

  const newItem: HistoryItem = {
    historyId: maxId + 1,
    keyword: keyword.trim(),
  };

  // 기존에 같은 키워드가 있으면 제거 후 맨 앞에 추가
  const filtered = current.filter(item => item.keyword !== newItem.keyword);
  const next = [newItem, ...filtered];

  saveToStorage(next);
  return next;
};

// 단일 삭제
export const deleteSearchHistory = (historyId: number): HistoryItem[] => {
  const current = loadFromStorage();
  const next = current.filter(item => item.historyId !== historyId);
  saveToStorage(next);
  return next;
};

// 전체 삭제
export const clearAllSearchHistory = (): void => {
  saveToStorage([]);
};
