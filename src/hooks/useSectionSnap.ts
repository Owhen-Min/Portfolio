import { useCallback, useEffect, useRef } from "react";
import { getSectionSnapTarget, type SectionBounds } from "../lib/sectionSnap";

const SETTLE_DELAY = 180;

export default function useSectionSnap(sectionIds: string[]) {
  const navigateRef = useRef<(id: string) => void>(() => {});

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let frame: number | undefined;
    let animating = false;
    let touching = false;
    let pointerDown = false;
    const heldKeys = new Set<string>();
    let originY = window.scrollY;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const isLocked = () => getComputedStyle(document.body).overflowY === "hidden";
    const headerHeight = () =>
      parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const measure = (): SectionBounds[] => {
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const clamp = (y: number) => Math.max(0, Math.min(maxY, y));
      return sectionIds.flatMap((id) => {
        const element = document.getElementById(id);
        if (!element) return [];
        const rect = element.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const start = clamp(top - headerHeight());
        return [{ start, end: Math.max(start, clamp(top + rect.height - window.innerHeight)) }];
      });
    };

    const cancel = () => {
      clearTimeout(timer);
      if (frame !== undefined) cancelAnimationFrame(frame);
      frame = undefined;
      animating = false;
    };

    const animateTo = (target: number) => {
      cancel();
      const from = window.scrollY;
      const distance = target - from;
      if (Math.abs(distance) < 1) return;
      if (reducedMotion.matches) {
        window.scrollTo({ top: target, behavior: "instant" });
        originY = target;
        return;
      }
      animating = true;
      const startTime = performance.now();
      const duration = Math.min(560, Math.max(240, Math.abs(distance) * 0.45));
      const tick = (now: number) => {
        if (isLocked()) {
          cancel();
          return;
        }
        const progress = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        window.scrollTo({ top: from + distance * eased, behavior: "instant" });
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          animating = false;
          frame = undefined;
          originY = window.scrollY;
        }
      };
      frame = requestAnimationFrame(tick);
    };

    const settle = () => {
      if (animating || touching || pointerDown || heldKeys.size > 0 || isLocked()) return;
      const target = getSectionSnapTarget(
        window.scrollY,
        originY,
        measure(),
        window.innerHeight - headerHeight()
      );
      if (target !== null) animateTo(target);
    };
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(settle, SETTLE_DELAY);
    };
    const onScroll = () => {
      if (animating || isLocked()) return;
      const y = window.scrollY;
      if (measure().some(({ start, end }) => y >= start - 1 && y <= end + 1)) originY = y;
      schedule();
    };
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      cancel();
      schedule();
    };
    const onTouchStart = () => {
      touching = true;
      cancel();
    };
    const onTouchEnd = () => {
      touching = false;
      schedule();
    };
    const onPointerDown = () => {
      pointerDown = true;
      cancel();
    };
    const onPointerUp = () => {
      pointerDown = false;
      schedule();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        !(event.target instanceof Element) ||
        event.target.closest('input, textarea, select, [contenteditable="true"], [role="dialog"]')
      )
        return;
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        heldKeys.add(event.key);
        cancel();
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (heldKeys.delete(event.key)) schedule();
    };
    const onResize = () => {
      cancel();
      originY = window.scrollY;
    };
    const onBlur = () => {
      touching = false;
      pointerDown = false;
      heldKeys.clear();
      cancel();
    };

    navigateRef.current = (id) => {
      const element = document.getElementById(id);
      if (!element) return;
      const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      animateTo(
        Math.max(
          0,
          Math.min(maxY, element.getBoundingClientRect().top + window.scrollY - headerHeight())
        )
      );
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
    window.addEventListener("blur", onBlur);
    return () => {
      cancel();
      navigateRef.current = () => {};
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("blur", onBlur);
    };
  }, [sectionIds]);

  return useCallback((id: string) => navigateRef.current(id), []);
}
