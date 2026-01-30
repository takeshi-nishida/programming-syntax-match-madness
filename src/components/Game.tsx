import { useReducer, useEffect, useState, useRef } from "react";
import type { Slot, GameResult } from "../types/game";
import { Board } from "./Board";
import { gameReducer, initGameState } from "../hooks/useGameReducer";
import { useMatchAnimation } from "../hooks/useMatchAnimation";
import { useSoundEffect } from "../hooks/useSoundEffect";

interface GameProps {
  onGameEnd: (result: GameResult) => void;
}

export function Game({ onGameEnd }: GameProps) {
  const [state, dispatch] = useReducer(gameReducer, null, initGameState);
  const { slots, combo, maxCombo, matchedPairs, matchQueue, gameEnded, startTime, totalPairs } = state;
  const [elapsedTime, setElapsedTime] = useState(0);

  const gameEndedRef = useRef(false);
  const lastMatchIdRef = useRef<string | null>(null);

  const { playMatchSound, playFailSound } = useSoundEffect();

  useMatchAnimation(matchQueue, dispatch);

  // マッチ結果に応じてサウンドを再生
  useEffect(() => {
    const currentMatch = matchQueue[0];
    if (!currentMatch) {
      lastMatchIdRef.current = null;
      return;
    }

    const matchId = `${currentMatch.type}-${currentMatch.positions.map(p => `${p.side}${p.row}`).join("-")}`;
    if (lastMatchIdRef.current === matchId) return;

    lastMatchIdRef.current = matchId;
    if (currentMatch.type === "success") {
      playMatchSound(combo);
    } else {
      playFailSound();
    }
  }, [matchQueue, combo, playMatchSound, playFailSound]);

  useEffect(() => {
    if (gameEnded && !gameEndedRef.current) {
      gameEndedRef.current = true;
      const clearTimeMs = Date.now() - startTime;
      onGameEnd({ clearTimeMs, maxCombo, totalPairs });
    }
  }, [gameEnded, startTime, maxCombo, totalPairs, onGameEnd]);

  useEffect(() => {
    if (gameEnded) return;
    const interval = setInterval(() => {
      setElapsedTime(Date.now() - startTime);
    }, 100);
    return () => clearInterval(interval);
  }, [startTime, gameEnded]);

  const handleSelect = (slot: Slot) => {
    if (slot.status === "selected") {
      dispatch({ type: "DESELECT_SLOT", side: slot.side, row: slot.row });
    } else {
      dispatch({ type: "SELECT_SLOT", side: slot.side, row: slot.row });
    }
  };

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
