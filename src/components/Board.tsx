import type { Slot } from "../types/game";
import { SlotView } from "./SlotView";

interface BoardProps {
  slots: Slot[];
  onSelect: (slot: Slot) => void;
}

export function Board({ slots, onSelect }: BoardProps) {
  // 左列と右列に分けて、row順にソート
  const leftSlots = slots
    .filter((s) => s.side === "left")
    .sort((a, b) => a.row - b.row);
  const rightSlots = slots
    .filter((s) => s.side === "right")
    .sort((a, b) => a.row - b.row);

  return (
    <div className="board">
      <div className="board__column board__column--left">
        {leftSlots.map((slot) => (
          <SlotView
            key={`${slot.side}-${slot.row}`}
            slot={slot}
            onSelect={onSelect}
          />
        ))}
      </div>
      <div className="board__column board__column--right">
        {rightSlots.map((slot) => (
          <SlotView
            key={`${slot.side}-${slot.row}`}
            slot={slot}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
