import { useEffect } from "react";

/** 고정 헤더 높이. index.css의 scroll-padding-top 값과 맞춰야 한다. */
const HEADER_OFFSET = 60;

/** 섹션 경계를 뷰포트의 이 비율만큼 넘기면 진행 방향의 다음 섹션으로 확정 이동한다. */
const ADVANCE_RATIO = 0.1;

/** 스크롤이 멈췄다고 판단하기까지의 대기 시간(ms). */
const SETTLE_DELAY = 30;

/** 프로그램 스크롤이 끝날 때까지 사용자 판정을 미루는 시간(ms). */
const PROGRAMMATIC_GUARD = 300;

interface SectionBounds {
  /** 섹션 상단이 헤더 바로 아래에 오는 스크롤 위치. */
  start: number;
  /** 섹션 하단이 화면 바닥에 닿는 스크롤 위치. 짧은 섹션은 start와 같다. */
  end: number;
}

/**
 * 섹션 사이 전환 구간에서만 개입한다. 아래로 경계를 ADVANCE_RATIO 이상 넘기면 다음
 * 섹션 상단으로, 위로 같은 비율만큼 넘기면 이전 섹션 하단으로 밀어준다. 넘기지
 * 못했으면 출발한 섹션으로 되돌린다. 뷰포트보다 긴 섹션의 내부(start~end)는
 * 건드리지 않으므로 자유롭게 읽을 수 있다.
 */
export default function useSectionSnap(sectionIds: string[]) {
  useEffect(() => {
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    let releaseTimer: ReturnType<typeof setTimeout> | undefined;
    let isProgrammatic = false;
    let lastY = window.scrollY;
    let lastDirection = 1;

    const measure = (): SectionBounds[] =>
      sectionIds
        .map((id) => document.getElementById(id))
        .filter((element): element is HTMLElement => element !== null)
        .map((element) => {
          const top = element.getBoundingClientRect().top + window.scrollY;
          const start = top - HEADER_OFFSET;
          return {
            start,
            end: Math.max(start, top + element.offsetHeight - window.innerHeight),
          };
        });

    const scrollTo = (top: number) => {
      isProgrammatic = true;
      clearTimeout(releaseTimer);
      releaseTimer = setTimeout(() => {
        isProgrammatic = false;
      }, PROGRAMMATIC_GUARD);
      window.scrollTo({ top, behavior: "smooth" });
    };

    const settle = () => {
      const bounds = measure();
      const y = window.scrollY;
      const threshold = window.innerHeight * ADVANCE_RATIO;

      for (let i = 0; i < bounds.length; i += 1) {
        const current = bounds[i];
        if (!current) continue;
        if (y >= current.start - 1 && y <= current.end + 1) return;

        const next = bounds[i + 1];
        if (!next || y <= current.end || y >= next.start) continue;

        if (lastDirection >= 0) {
          scrollTo(y > current.end + threshold ? next.start : current.end);
        } else {
          scrollTo(y < next.start - threshold ? current.end : next.start);
        }
        return;
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      if (y !== lastY) lastDirection = y > lastY ? 1 : -1;
      lastY = y;
      if (isProgrammatic) return;
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, SETTLE_DELAY);
    };

    // 사용자가 다시 스크롤을 시작하면 진행 중인 보정보다 사용자 입력을 우선한다.
    const cancelProgrammatic = () => {
      isProgrammatic = false;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", cancelProgrammatic, { passive: true });
    window.addEventListener("touchstart", cancelProgrammatic, { passive: true });

    return () => {
      clearTimeout(settleTimer);
      clearTimeout(releaseTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", cancelProgrammatic);
      window.removeEventListener("touchstart", cancelProgrammatic);
    };
  }, [sectionIds]);
}
