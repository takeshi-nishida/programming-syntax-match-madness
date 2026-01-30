import { useEffect, useRef } from "react";
import type { Dispatch } from "react";
import type { MatchResult } from "../types/game";
import type { GameAction } from "./useGameReducer";
import { LEAVE_DURATION, REFILL_DELAY, WRONG_DELAY, ENTER_DURATION } from "../constants";

/**
 * マッチ結果キューの先頭を監視し、アニメーションシーケンスを管理するカスタムフック
 * 
 * success: leaving → clear → refill → entering
 * fail: shake → clear selection
 */
export function useMatchAnimation(
  matchQueue: MatchResult[],
  dispatch: Dispatch<GameAction>
): void {
  // 現在処理中のマッチ結果IDを追跡（重複処理防止）
  const processingRef = useRef<string | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const currentMatch = matchQueue[0];
  // マッチ結果のID（positionsを文字列化）
  const matchId = currentMatch 
    ? `${currentMatch.type}-${currentMatch.positions.map(p => `${p.side}${p.row}`).join("-")}`
    : null;

  useEffect(() => {
    // 処理するものがない、または既に処理中
    if (!currentMatch || !matchId || processingRef.current === matchId) return;

    processingRef.current = matchId;

    const addTimer = (callback: () => void, delay: number) => {
      const timer = setTimeout(callback, delay);
      timersRef.current.push(timer);
      return timer;
    };

    if (currentMatch.type === "success") {
      // 正解アニメーションシーケンス
      addTimer(() => {
        dispatch({ type: "CLEAR_MATCHED", positions: currentMatch.positions });

        addTimer(() => {
          dispatch({ type: "REFILL_SLOTS" });

          addTimer(() => {
            dispatch({ type: "CLEAR_ENTERING" });
            processingRef.current = null;
          }, ENTER_DURATION);
        }, REFILL_DELAY);
      }, LEAVE_DURATION);
    } else {
      // 不正解アニメーション
      addTimer(() => {
        dispatch({ type: "CLEAR_MATCH_RESULT" });
        processingRef.current = null;
      }, WRONG_DELAY);
    }

    // クリーンアップはコンポーネントのアンマウント時のみ
    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];
    };
  }, [matchId, currentMatch, dispatch]);
}
