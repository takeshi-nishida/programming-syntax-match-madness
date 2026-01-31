import type { Slot, Side, CardPair, GameState, SlotPosition, Course, Problem } from "../types/game";
import { getProblemsByLevelRange, selectRandomProblems } from "../data/problems/index";
import { shuffle } from "../utils/shuffle";

// アクション定義
export type GameAction =
  | { type: "SELECT_SLOT"; side: Side; row: number }
  | { type: "DESELECT_SLOT"; side: Side; row: number }
  | { type: "CLEAR_MATCHED"; positions: [SlotPosition, SlotPosition] }
  | { type: "REFILL_SLOTS" }
  | { type: "CLEAR_ENTERING" }
  | { type: "CLEAR_MATCH_RESULT" }
  | { type: "END_GAME" };

// 選択中のスロットを取得するヘルパー関数
function getSelectedSlots(slots: Slot[]): Slot[] {
  return slots.filter(s => s.status === "selected" && s.card);
}

// 初期状態を生成する関数（コース指定対応）
export function initGameState(course: Course): GameState {
  const problems = getProblemsByLevelRange(course.levelRange[0], course.levelRange[1]);
  const selectedProblems = selectRandomProblems(problems, course.problemCount);
  const queue = createPairQueue(selectedProblems);
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
    combo: 0,
    maxCombo: 0,
    matchedPairs: 0,
    pairQueue: queue.slice(5),
    matchQueue: [],
    gameEnded: false,
    startTime: Date.now(),
    totalPairs: selectedProblems.length,
  };
}

// スロットの初期化（左右×5行 = 10スロット）
function createInitialSlots(): Slot[] {
  const slots: Slot[] = [];
  for (let row = 0; row < 5; row++) {
    slots.push({ side: "left", row, status: "idle" });
    slots.push({ side: "right", row, status: "idle" });
  }
  return slots;
}

// 問題からペアキューを生成（シャッフル済み）
// 規約: pair[0] = モダン（左）, pair[1] = 従来（右）で固定
export function createPairQueue(problems: Problem[]): CardPair[] {
  let instanceCounter = 0;
  const shuffledProblems = shuffle(problems);

  const pairs: CardPair[] = shuffledProblems.map((problem) => ({
    left: {
      instanceId: `card-${instanceCounter++}`,
      problemId: problem.id,
      problemData: problem.pair[0], // モダン/簡潔な書き方
    },
    right: {
      instanceId: `card-${instanceCounter++}`,
      problemId: problem.id,
      problemData: problem.pair[1], // 従来/冗長な書き方
    },
  }));

  return pairs;
}

// ========================================
// アクションハンドラ
// ========================================

/** スロット選択のハンドラ */
function handleSelectSlot(
  state: GameState,
  side: Side,
  row: number
): GameState {
  // fail処理中は選択不可
  const currentMatch = state.matchQueue[0];
  if (currentMatch?.type === "fail") return state;

  const slot = state.slots.find(s => s.side === side && s.row === row);
  if (!slot || !slot.card) return state;
  if (slot.status === "leaving" || slot.status === "entering") return state;

  const selected = getSelectedSlots(state.slots);
  const sameSideSelected = selected.find(s => s.side === side);
  const otherSideSelected = selected.find(s => s.side !== side);

  // 同じ側で既に選択がある場合は置き換え
  if (sameSideSelected) {
    return handleSelectWithReplace(state, slot, sameSideSelected, otherSideSelected, side, row);
  }

  // 新しく選択
  return handleNewSelection(state, slot, otherSideSelected, side, row);
}

/** 同じ側の選択を置き換える場合 */
function handleSelectWithReplace(
  state: GameState,
  slot: Slot,
  sameSideSelected: Slot,
  otherSideSelected: Slot | undefined,
  side: Side,
  row: number
): GameState {
  const newSlots = state.slots.map(s => {
    if (s.side === sameSideSelected.side && s.row === sameSideSelected.row) {
      return { ...s, status: "idle" as const };
    }
    if (s.side === side && s.row === row) {
      return { ...s, status: "selected" as const };
    }
    return s;
  });

  // 置き換え後に反対側に選択があればマッチ判定
  if (otherSideSelected && otherSideSelected.card && slot.card) {
    return applyMatchResult(state, newSlots, slot, otherSideSelected, side, row);
  }

  return { ...state, slots: newSlots };
}

/** 新しく選択する場合 */
function handleNewSelection(
  state: GameState,
  slot: Slot,
  otherSideSelected: Slot | undefined,
  side: Side,
  row: number
): GameState {
  const newSlots = state.slots.map(s =>
    s.side === side && s.row === row ? { ...s, status: "selected" as const } : s
  );

  // 反対側に選択があればマッチ判定
  if (otherSideSelected && otherSideSelected.card && slot.card) {
    return applyMatchResult(state, newSlots, slot, otherSideSelected, side, row);
  }

  return { ...state, slots: newSlots };
}

/** マッチ判定を適用 */
function applyMatchResult(
  state: GameState,
  newSlots: Slot[],
  slot: Slot,
  otherSideSelected: Slot,
  side: Side,
  row: number
): GameState {
  const isMatch = slot.card!.problemId === otherSideSelected.card!.problemId;
  const positions: [SlotPosition, SlotPosition] = [
    { side: otherSideSelected.side, row: otherSideSelected.row },
    { side, row },
  ];

  if (isMatch) {
    const newCombo = state.combo + 1;
    return {
      ...state,
      slots: newSlots.map(s =>
        positions.some(p => p.side === s.side && p.row === s.row)
          ? { ...s, status: "leaving" as const }
          : s
      ),
      combo: newCombo,
      maxCombo: Math.max(state.maxCombo, newCombo),
      matchQueue: [...state.matchQueue, { type: "success", positions }],
    };
  } else {
    return {
      ...state,
      slots: newSlots,
      combo: 0,
      matchQueue: [...state.matchQueue, { type: "fail", positions }],
    };
  }
}

/** スロット選択解除のハンドラ */
function handleDeselectSlot(state: GameState, side: Side, row: number): GameState {
  const currentMatch = state.matchQueue[0];
  if (currentMatch?.type === "fail") return state;
  return {
    ...state,
    slots: state.slots.map(s =>
      s.side === side && s.row === row ? { ...s, status: "idle" as const } : s
    ),
  };
}

/** マッチしたカードを消すハンドラ */
function handleClearMatched(
  state: GameState,
  positions: [SlotPosition, SlotPosition]
): GameState {
  const newMatchedPairs = state.matchedPairs + 1;
  const gameEnded = newMatchedPairs >= state.totalPairs;
  return {
    ...state,
    slots: state.slots.map(s => {
      if (positions.some(p => p.side === s.side && p.row === s.row)) {
        return { ...s, card: undefined, status: "idle" as const };
      }
      return s;
    }),
    matchedPairs: newMatchedPairs,
    gameEnded,
  };
}

/** 不正解時の選択解除ハンドラ */
function handleClearMatchResult(state: GameState): GameState {
  return {
    ...state,
    slots: state.slots.map(s =>
      s.status === "selected" ? { ...s, status: "idle" as const } : s
    ),
    matchQueue: state.matchQueue.slice(1),
  };
}

/** スロット補充ハンドラ */
function handleRefillSlots(state: GameState): GameState {
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
    return state;
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

/** entering状態を解除するハンドラ */
function handleClearEntering(state: GameState): GameState {
  return {
    ...state,
    slots: state.slots.map(s =>
      s.status === "entering" ? { ...s, status: "idle" as const } : s
    ),
    matchQueue: state.matchQueue.slice(1),
  };
}

// ========================================
// Reducer
// ========================================

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SELECT_SLOT":
      return handleSelectSlot(state, action.side, action.row);

    case "DESELECT_SLOT":
      return handleDeselectSlot(state, action.side, action.row);

    case "CLEAR_MATCHED":
      return handleClearMatched(state, action.positions);

    case "CLEAR_MATCH_RESULT":
      return handleClearMatchResult(state);

    case "REFILL_SLOTS":
      return handleRefillSlots(state);

    case "CLEAR_ENTERING":
      return handleClearEntering(state);

    case "END_GAME":
      return { ...state, gameEnded: true };

    default:
      return state;
  }
}
