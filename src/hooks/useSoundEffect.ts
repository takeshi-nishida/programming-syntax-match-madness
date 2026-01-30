import { useCallback, useRef } from "react";

// 琉球音階（ドミファソシド - レとラを抜いた5音階）
const NOTES = [
  261.63, // C4 (ド)
  329.63, // E4 (ミ)
  349.23, // F4 (ファ)
  392.00, // G4 (ソ)
  493.88, // B4 (シ)
  523.25, // C5 (ド)
];

/**
 * サウンドエフェクト用カスタムフック
 * Web Audio API を使用して音声ファイルなしで音を生成
 */
export function useSoundEffect() {
  // AudioContext はユーザー操作後に作成する必要がある
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    // suspended 状態の場合は resume
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  /**
   * マッチ成功音を再生（コンボで音階アップ）
   */
  const playMatchSound = useCallback((combo: number) => {
    try {
      const audioCtx = getAudioContext();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      // コンボ数に応じて音階を上げる（6音でループ）
      const noteIndex = (combo - 1) % NOTES.length;
      const freq = NOTES[Math.max(0, noteIndex)];
      
      oscillator.frequency.value = freq;
      oscillator.type = "triangle"; // 柔らかい音色

      const now = audioCtx.currentTime;
      // ポーンという柔らかいエンベロープ
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(1.5, now + 0.05); // 少し緩やかなアタック
      gainNode.gain.exponentialRampToValueAtTime(0.3, now + 0.2); // サスティン
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6); // 長めのリリース

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.65);
    } catch (e) {
      console.error("Sound error:", e);
    }
  }, [getAudioContext]);

  /**
   * 不正解音を再生（低い音）
   */
  const playFailSound = useCallback(() => {
    try {
      const audioCtx = getAudioContext();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      // 低い音（C3）
      oscillator.frequency.value = 130.81;
      oscillator.type = "triangle";

      const now = audioCtx.currentTime;
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(1.5, now + 0.02); // 音量アップ
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start(now);
      oscillator.stop(now + 0.35);
    } catch (e) {
      console.error("Sound error:", e);
    }
  }, [getAudioContext]);

  return { playMatchSound, playFailSound };
}
