export interface SectionBounds {
  start: number;
  end: number;
}

/** 읽을 수 있는 영역에서는 개입하지 않고, 섹션 사이에서만 도착 지점을 결정한다. */
export function getSectionSnapTarget(
  y: number,
  originY: number,
  bounds: SectionBounds[],
  viewportHeight: number
): number | null {
  if (bounds.some(({ start, end }) => y >= start - 1 && y <= end + 1)) return null;

  for (let i = 0; i < bounds.length - 1; i += 1) {
    const before = bounds[i]!;
    const after = bounds[i + 1]!;
    if (y <= before.end || y >= after.start) continue;

    // 화면의 12%, 최소 48px / 최대 120px. 작은 화면에서는 전환 구간의 절반 이하.
    const threshold = Math.min(
      120,
      Math.max(48, viewportHeight * 0.12),
      (after.start - before.end) / 2
    );
    const fromAbove =
      originY <= before.end ||
      (originY < after.start && originY - before.end <= after.start - originY);

    if (fromAbove) return y - before.end >= threshold ? after.start : before.end;
    return after.start - y >= threshold ? before.end : after.start;
  }
  return null;
}
