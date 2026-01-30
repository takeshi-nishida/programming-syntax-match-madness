import { useReducer, useEffect, useState } from "react";
import type { Slot, GameResult } from "../types/game";
import { LEAVE_DURATION, REFILL_DELAY, WRONG_DELAY, ENTER_DURATION } from "../constants";
import { Board } from "./Board";
import { gameReducer, initGameState } from "../hooks/useGameReducer";

interface GameProps {
  onGameEnd: (result: GameResult) => void;
}

export function Game({ onGameEnd }: GameProps) {
  // useReducerの第3引数で初期化関数を渡す（遅延初期化）
  const [state, dispatch] = useReducer(gameReducer, null, initGameState);
  const { slots, selected, combo, maxCombo, matchedPairs, isProcessing, startTime, totalPairs } = state;

  // スロット選択ハンドラ
  const handleSelect = (slot: Slot) => {
    if (isProcessing) return;
    if (!slot.card) return;
    if (slot.status === "leaving" || slot.status === "entering") return;

    // 既に選択されている場合は選択解除
    if (slot.status === "selected") {
      dispatch({ type: "DESELECT_SLOT", side: slot.side, row: slot.row });
      return;
    }

    // 選択
    dispatch({ type: "SELECT_SLOT", side: slot.side, row: slot.row });

    // 2枚目の選択の場合、判定を行う
    const currentSelected = selected.find(s => s.side !== slot.side);
    if (currentSelected) {
      const firstCard = slots.find(
        s => s.side === currentSelected.side && s.row === currentSelected.row
      )?.card;
      const secondCard = slot.card;

      if (firstCard && secondCard && firstCard.problemId === secondCard.problemId) {
        // 正解
        const firstSlot = { side: currentSelected.side, row: currentSelected.row };
        const secondSlot = { side: slot.side, row: slot.row };

        dispatch({ type: "MATCH_SUCCESS", firstSlot, secondSlot });
        dispatch({ type: "SET_LEAVING", firstSlot, secondSlot });

        // LEAVE_DURATION 後にカードを消す
        const newMatchedPairs = matchedPairs + 1;
        setTimeout(() => {
          dispatch({ type: "CLEAR_MATCHED", firstSlot, secondSlot });

          // ゲーム終了判定
          if (newMatchedPairs === totalPairs) {
            const clearTimeMs = Date.now() - startTime;
            onGameEnd({ clearTimeMs, maxCombo: Math.max(maxCombo, combo + 1), totalPairs });
            return;
          }

          // REFILL_DELAY 後に補充
          setTimeout(() => {
            dispatch({ type: "REFILL_SLOTS" });
            
            // ENTER_DURATION 後に entering を解除
            setTimeout(() => {
              dispatch({ type: "CLEAR_ENTERING" });
            }, ENTER_DURATION);
          }, REFILL_DELAY);
        }, LEAVE_DURATION);
      } else {
        // 不正解
        dispatch({ type: "MATCH_FAIL" });
        setTimeout(() => {
          dispatch({ type: "CLEAR_SELECTED" });
        }, WRONG_DELAY);
      }
    }
  };

  // 経過時間表示用
  const [elapsedTime, setElapsedTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="game">
      <div className="game__header">
        <div className="game__time">⏱️ {formatTime(elapsedTime)}</div>
        <div className="game__combo">🔥 {combo} コンボ</div>
        <div className="game__progress">
          {matchedPairs} / {totalPairs} ペア
        </div>
      </div>
      <Board slots={slots} onSelect={handleSelect} />
    </div>
  );
}
