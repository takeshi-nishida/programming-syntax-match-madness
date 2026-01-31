import type { Problem } from "../../types/game";
import { basicProblems } from "./basics";
import { domProblems } from "./dom-events";
import { arrayProblems } from "./array-methods";
import { modernProblems } from "./modern-syntax";
import { asyncProblems } from "./async-advanced";

// 全問題を統合
export const ALL_PROBLEMS: Problem[] = [
  ...basicProblems,
  ...domProblems,
  ...arrayProblems,
  ...modernProblems,
  ...asyncProblems,
];

// レベル別にフィルタリング
export function getProblemsByLevelRange(minLevel: number, maxLevel: number): Problem[] {
  return ALL_PROBLEMS.filter(p => p.level >= minLevel && p.level <= maxLevel);
}

// ランダムにN問選択
export function selectRandomProblems(problems: Problem[], count: number): Problem[] {
  const shuffled = [...problems].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
