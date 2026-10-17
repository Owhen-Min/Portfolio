import assert from "node:assert/strict";
import test from "node:test";
import { getSectionSnapTarget } from "../src/lib/sectionSnap.ts";

// 800px 유효 화면: 짧은 섹션 → 2400px 긴 섹션 → 짧은 섹션.
const bounds = [
  { start: 0, end: 0 },
  { start: 800, end: 2400 },
  { start: 3200, end: 3200 },
];
const snap = (y, origin) => getSectionSnapTarget(y, origin, bounds, 800);

test("긴 섹션 안에서는 읽던 위치를 유지한다", () => {
  for (const y of [800, 900, 1600, 2399, 2400]) assert.equal(snap(y, 800), null);
});
test("긴 섹션 하단을 조금 넘으면 상단이 아닌 하단으로 복귀한다", () => {
  assert.equal(snap(2440, 2390), 2400);
});
test("긴 섹션 하단을 충분히 넘으면 다음 섹션으로 이동한다", () => {
  assert.equal(snap(2496, 2400), 3200);
});
test("위로 조금 넘어간 경우 출발 섹션 상단으로 복귀한다", () => {
  assert.equal(snap(3160, 3200), 3200);
});
test("위로 충분히 넘어가면 이전 긴 섹션의 하단으로 이동한다", () => {
  assert.equal(snap(3104, 3200), 2400);
});
test("짧은 섹션도 같은 임계값으로 페이지 전환한다", () => {
  assert.equal(snap(40, 0), 0);
  assert.equal(snap(96, 0), 800);
});
test("경계 안에서 미세하게 방향이 바뀌어도 출발 쪽을 기억한다", () => {
  assert.equal(snap(2460, 2400), 2400);
  assert.equal(snap(2440, 2400), 2400);
});
test("마지막 섹션과 문서 밖에는 추가 보정을 하지 않는다", () => {
  assert.equal(snap(3200, 2400), null);
  assert.equal(snap(-10, 0), null);
  assert.equal(snap(3300, 3200), null);
});
test("매우 작은 화면에서도 전환 가능한 임계값을 사용한다", () => {
  assert.equal(
    getSectionSnapTarget(
      21,
      0,
      [
        { start: 0, end: 0 },
        { start: 40, end: 40 },
      ],
      40
    ),
    40
  );
});
