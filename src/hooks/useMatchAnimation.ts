import { useEffect, useRef } from "react";
import type { Dispatch } from "react";
import type { MatchResult } from "../types/game";
import type { GameAction } from "./useGameReducer";
import { LEAVE_DURATION, REFILL_DELAY, WRONG_DELAY, ENTER_DURATION } from "../constants";

/**
 * マッチ結果に応じたアニメーションシーケンスを管理するカスタムフック
 * 
 * success: leaving → clear → refill → entering
 * fail: shake → clear selection
 */
export function useMatchAnimation(
  matchResult: MatchResult | null,
  dispatch: Dispatch<GameAction>
): void {
  // タイマーIDを保持するref（クリーンアップ用）
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!matchResult) return;

    // 新しいアニメーション開始時に既存タイマーをクリア
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];

    const addTimer = (callback: () => void, delay: number) => {
      const timer = setTimeout(callback, delay);
      timersRef.current.push(timer);
      return timer;
    };

    if (matchResult.type === "success") {
      // 正解アニメーションシーケンス
      addTimer(() => {
        dispatch({ type: "CLEAR_MATCHED", positions: matchResult.positions });

        addTimer(() => {
          dispatch({ type: "REFILL_SLOTS" });

          addTimer(() => {
            dispatch({ type: "CLEAR_ENTERING" });
          }, ENTER_DURATION);
        }, REFILL_DELAY);
      }, LEAVE_DURATION);
    } else {
      // 不正解アニメーション
      addTimer(() => {
        dispatch({ type: "CLEAR_MATCH_RESULT" });
      }, WRONG_DELAY);
    }

    // クリーンアップ
    return () => {
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];
    };
  }, [matchResult, dispatch]);
}
