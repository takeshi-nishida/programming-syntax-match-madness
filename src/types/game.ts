// ゲームの型定義

export type Side = "left" | "right";
export type SlotStatus = "idle" | "selected" | "leaving" | "entering";

// 問題データ（ペアの片方）
export interface ProblemData {
  text: string;
}

// カードインスタンス（スロットに配置されるカード）
export interface CardInstance {
  instanceId: string;
  problemId: string;
  problemData: ProblemData;
}

// スロット（左右×5行の各マス）
export interface Slot {
  side: Side;
  row: number; // 0〜4
  card?: CardInstance;
  status: SlotStatus;
}

// ペア型（左用カードと右用カードのセット）
export interface CardPair {
  left: CardInstance;
  right: CardInstance;
}

// ゲームの状態
export interface GameState {
  slots: Slot[];
  selected: Slot[];
  combo: number;
  maxCombo: number;
  matchedPairs: number;
  pairQueue: CardPair[];
  isProcessing: boolean;
  startTime: number;
  totalPairs: number;
}

// ゲーム結果
export interface GameResult {
  clearTimeMs: number;
  maxCombo: number;
  totalPairs: number;
}

// 問題定義（ペアの配列）
export interface Problem {
  id: string;
  pair: [ProblemData, ProblemData];
}
