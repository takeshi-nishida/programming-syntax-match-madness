import type { Slot } from "../types/game";
import { LEAVE_DURATION, ENTER_DURATION } from "../constants";

interface SlotViewProps {
  slot: Slot;
  onSelect: (slot: Slot) => void;
}

export function SlotView({ slot, onSelect }: SlotViewProps) {
  const { card, status } = slot;

  // CSS Variables でアニメーション時間を注入
  const style = {
    "--leave-duration": `${LEAVE_DURATION}ms`,
    "--enter-duration": `${ENTER_DURATION}ms`,
  } as React.CSSProperties;

  // 空のスロット
  if (!card) {
    return <div className="slot slot--empty" style={style} />;
  }

  const handleClick = () => {
    if (status === "idle" || status === "selected") {
      onSelect(slot);
    }
  };

  return (
    <div
      className={`slot slot--${status}`}
      style={style}
      onClick={handleClick}
    >
      <div className="slot__card">
        <code className="slot__text">{card.problemData.text}</code>
      </div>
    </div>
  );
}
