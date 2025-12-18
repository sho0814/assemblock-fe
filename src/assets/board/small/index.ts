const modules = import.meta.glob('./*.svg', { eager: true, as: 'url' });

export const SMALL_SVGS: Record<string, string> = Object.fromEntries(
  Object.entries(modules).map(([path, url]) => {
    const file = path.split('/').pop()!;
    const key = file.replace('.svg', '');
    return [key, url as string];
  })
);

// 없는 키면 basic.svg로 fallback
export const getSmallSvg = (key?: string) => {
  const hit = !!(key && SMALL_SVGS[key]);
  const fallback = SMALL_SVGS["basic"] ?? "";

  console.log("[getSmallSvg]", {
    requestedKey: key,
    hit,
    hasBasic: !!SMALL_SVGS["basic"],
    availableKeysSample: Object.keys(SMALL_SVGS).slice(0, 10),
  });

  return hit ? SMALL_SVGS[key!] : fallback;
};