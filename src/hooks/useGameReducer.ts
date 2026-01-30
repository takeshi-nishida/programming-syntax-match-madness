import type { Slot, Side, CardPair, GameState } from "../types/game";
import { PROBLEMS } from "../data/problems";
import { shuffle } from "../utils/shuffle";

// アクション定義
export type GameAction =
  | { type: "SELECT_SLOT"; side: Side; row: number }
  | { type: "DESELECT_SLOT"; side: Side; row: number }
  | { type: "MATCH_SUCCESS"; firstSlot: { side: Side; row: number }; secondSlot: { side: Side; row: number } }
  | { type: "MATCH_FAIL" }
  | { type: "SET_LEAVING"; firstSlot: { side: Side; row: number }; secondSlot: { side: Side; row: number } }
  | { type: "CLEAR_MATCHED"; firstSlot: { side: Side; row: number }; secondSlot: { side: Side; row: number } }
  | { type: "REFILL_SLOTS" }
  | { type: "CLEAR_ENTERING" }
  | { type: "CLEAR_SELECTED" }
  | { type: "SET_PROCESSING"; value: boolean };

// 初期状態を生成する関数（useReducerの第3引数用）
export function initGameState(): GameState {
  const queue = createPairQueue();
  const initialSlots = createInitialSlots();
  const pairsToUse = queue.slice(0, 5);
  
  const leftCards = shuffle(pairsToUse.map(p => p.left));
  const rightCards = shuffle(pairsToUse.map(p => p.right));
  
  const filledSlots = initialSlots.map(slot => {
    if (slot.side === "left" && slot.row < leftCards.length) {
      return { ...slot, card: leftCards[slot.row], status: "idle" as const };
    }
    if (slot.side === "right" && slot.row < rightCards.length) {
      return { ...slot, card: rightCards[slot.row], status: "idle" as const };
    }
    return slot;
  });

  return {
    slots: filledSlots,
    selected: [],
    combo: 0,
    maxCombo: 0,
    matchedPairs: 0,
    pairQueue: queue.slice(5),
    isProcessing: false,
    startTime: Date.now(),
    totalPairs: PROBLEMS.length,
  };
}

// スロットの初期化（左右×5行 = 10スロット）
export function createInitialSlots(): Slot[] {
  const slots: Slot[] = [];
  for (let row = 0; row < 5; row++) {
    slots.push({ side: "left", row, status: "idle" });
    slots.push({ side: "right", row, status: "idle" });
  }
  return slots;
}

// 問題からペアキューを生成（シャッフル済み）
export function createPairQueue(): CardPair[] {
  let instanceCounter = 0;
  const shuffledProblems = shuffle(PROBLEMS);

  const pairs: CardPair[] = shuffledProblems.map((problem) => {
    const [leftData, rightData] = Math.random() < 0.5 
      ? [problem.pair[0], problem.pair[1]]
      : [problem.pair[1], problem.pair[0]];

    return {
      left: {
        instanceId: `card-${instanceCounter++}`,
        problemId: problem.id,
        problemData: leftData,
      },
      right: {
        instanceId: `card-${instanceCounter++}`,
        problemId: problem.id,
        problemData: rightData,
      },
    };
  });

  return pairs;
}

// Reducer
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {

    case "SELECT_SLOT": {
      const { side, row } = action;
      const slot = state.slots.find(s => s.side === side && s.row === row);
      if (!slot || !slot.card) return state;

      // 同じ側で既に選択されているスロットを探す
      const sameSlotSelected = state.selected.find(s => s.side === side);

      let newSlots: Slot[];
      let newSelected: Slot[];

      if (sameSlotSelected) {
        // 既存の選択を解除して新しいものを選択
        newSlots = state.slots.map(s => {
          if (s.side === sameSlotSelected.side && s.row === sameSlotSelected.row) {
            return { ...s, status: "idle" as const };
          }
          if (s.side === side && s.row === row) {
            return { ...s, status: "selected" as const };
          }
          return s;
        });
        newSelected = [
          ...state.selected.filter(s => s.side !== side),
          { ...slot, status: "selected" as const },
        ];
      } else {
        // 新しく選択
        newSlots = state.slots.map(s =>
          s.side === side && s.row === row
            ? { ...s, status: "selected" as const }
            : s
        );
        newSelected = [...state.selected, { ...slot, status: "selected" as const }];
      }

      return { ...state, slots: newSlots, selected: newSelected };
    }

    case "DESELECT_SLOT": {
      const { side, row } = action;
      return {
        ...state,
        slots: state.slots.map(s =>
          s.side === side && s.row === row
            ? { ...s, status: "idle" as const }
            : s
        ),
        selected: state.selected.filter(s => !(s.side === side && s.row === row)),
      };
    }

    case "SET_LEAVING": {
      const { firstSlot, secondSlot } = action;
      return {
        ...state,
        slots: state.slots.map(s => {
          if (
            (s.side === firstSlot.side && s.row === firstSlot.row) ||
            (s.side === secondSlot.side && s.row === secondSlot.row)
          ) {
            return { ...s, status: "leaving" as const };
          }
          return s;
        }),
        selected: [],
        isProcessing: true,
      };
    }

    case "MATCH_SUCCESS": {
      const newCombo = state.combo + 1;
      return {
        ...state,
        combo: newCombo,
        maxCombo: Math.max(state.maxCombo, newCombo),
      };
    }

    case "CLEAR_MATCHED": {
      const { firstSlot, secondSlot } = action;
      return {
        ...state,
        slots: state.slots.map(s => {
          if (
            (s.side === firstSlot.side && s.row === firstSlot.row) ||
            (s.side === secondSlot.side && s.row === secondSlot.row)
          ) {
            return { ...s, card: undefined, status: "idle" as const };
          }
          return s;
        }),
        matchedPairs: state.matchedPairs + 1,
      };
    }

    case "MATCH_FAIL":
      return {
        ...state,
        combo: 0,
        isProcessing: true,
      };

    case "CLEAR_SELECTED":
      return {
        ...state,
        slots: state.slots.map(s =>
          s.status === "selected" ? { ...s, status: "idle" as const } : s
        ),
        selected: [],
        isProcessing: false,
      };

    case "REFILL_SLOTS": {
      const emptyLeftSlots = state.slots.filter(
        s => s.side === "left" && !s.card && s.status !== "leaving"
      );
      const emptyRightSlots = state.slots.filter(
        s => s.side === "right" && !s.card && s.status !== "leaving"
      );

      const pairsToFill = Math.min(
        emptyLeftSlots.length,
        emptyRightSlots.length,
        state.pairQueue.length
      );

      if (pairsToFill === 0) {
        return { ...state, isProcessing: false };
      }

      const pairsToUse = state.pairQueue.slice(0, pairsToFill);
      const newPairQueue = state.pairQueue.slice(pairsToFill);

      const shuffledLeftSlots = shuffle(emptyLeftSlots).slice(0, pairsToFill);
      const shuffledRightSlots = shuffle(emptyRightSlots).slice(0, pairsToFill);

      const newSlots = state.slots.map(slot => {
        if (slot.side === "left") {
          const idx = shuffledLeftSlots.findIndex(e => e.row === slot.row);
          if (idx !== -1) {
            return {
              ...slot,
              card: pairsToUse[idx].left,
              status: "entering" as const,
            };
          }
        } else {
          const idx = shuffledRightSlots.findIndex(e => e.row === slot.row);
          if (idx !== -1) {
            return {
              ...slot,
              card: pairsToUse[idx].right,
              status: "entering" as const,
            };
          }
        }
        return slot;
      });

      return { ...state, slots: newSlots, pairQueue: newPairQueue };
    }

    case "CLEAR_ENTERING":
      return {
        ...state,
        slots: state.slots.map(s =>
          s.status === "entering" ? { ...s, status: "idle" as const } : s
        ),
        isProcessing: false,
      };

    case "SET_PROCESSING":
      return { ...state, isProcessing: action.value };

    default:
      return state;
  }
}
