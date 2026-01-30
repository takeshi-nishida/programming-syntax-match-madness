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

// スロット位置
export interface SlotPosition {
  side: Side;
  row: number;
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

// マッチ結果（アニメーション処理用）
export interface MatchResult {
  type: "success" | "fail";
  positions: [SlotPosition, SlotPosition];
}

// ゲームの状態
export interface GameState {
  slots: Slot[];
  combo: number;
  maxCombo: number;
  matchedPairs: number;
  pairQueue: CardPair[];
  matchResult: MatchResult | null;
  gameEnded: boolean;
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
