import type { GameResult } from "../types/game";
import { useLocale } from "../hooks/useLocale";

interface ResultScreenProps {
  result: GameResult;
  onRestart: () => void;
}

export function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const { t } = useLocale();
  const { clearTimeMs, maxCombo, totalPairs } = result;

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const millis = Math.floor((ms % 1000) / 10);
    return `${minutes}:${secs.toString().padStart(2, "0")}.${millis
      .toString()
      .padStart(2, "0")}`;
  };

  const shareText = `${t.shareTitle}
${t.shareTime}: ${formatTime(clearTimeMs)}
${t.shareMaxCombo}: ${maxCombo}
${totalPairs} ${t.sharePairsComplete}

${t.shareHashtags}`;

  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}`;

  return (
    <div className="result-screen">
      <h1 className="result-screen__title">{t.cleared}</h1>

      <div className="result-screen__stats">
        <div className="result-screen__stat">
          <span className="result-screen__stat-label">{t.clearTime}</span>
          <span className="result-screen__stat-value">
            {formatTime(clearTimeMs)}
          </span>
        </div>

        <div className="result-screen__stat">
          <span className="result-screen__stat-label">{t.maxCombo}</span>
          <span className="result-screen__stat-value">{maxCombo}</span>
        </div>

        <div className="result-screen__stat">
          <span className="result-screen__stat-label">{t.matches}</span>
          <span className="result-screen__stat-value">
            {totalPairs} / {totalPairs}
          </span>
        </div>
      </div>

      <div className="result-screen__actions">
        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="result-screen__share-button"
        >
          {t.shareResult}
        </a>

        <button className="result-screen__restart-button" onClick={onRestart}>
          {t.playAgain}
        </button>
      </div>
    </div>
  );
}
