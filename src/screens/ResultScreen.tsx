import type { GameResult } from "../types/game";

interface ResultScreenProps {
  result: GameResult;
  onRestart: () => void;
}

export function ResultScreen({ result, onRestart }: ResultScreenProps) {
  const { clearTimeMs, maxCombo, totalPairs } = result;

  // 時間フォーマット
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const millis = Math.floor((ms % 1000) / 10);
    return `${minutes}:${secs.toString().padStart(2, "0")}.${millis
      .toString()
      .padStart(2, "0")}`;
  };

  // X（Twitter）投稿用テキスト
  const shareText = `🎴 構文マッチ クリア！
⏱️ タイム: ${formatTime(clearTimeMs)}
🔥 最大コンボ: ${maxCombo}
📝 ${totalPairs}ペア完全制覇！

#構文マッチ #JavaScript`;

  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}`;

  return (
    <div className="result-screen">
      <h1 className="result-screen__title">🎉 クリア！</h1>

      <div className="result-screen__stats">
        <div className="result-screen__stat">
          <span className="result-screen__stat-label">⏱️ クリアタイム</span>
          <span className="result-screen__stat-value">
            {formatTime(clearTimeMs)}
          </span>
        </div>

        <div className="result-screen__stat">
          <span className="result-screen__stat-label">🔥 最大コンボ</span>
          <span className="result-screen__stat-value">{maxCombo}</span>
        </div>

        <div className="result-screen__stat">
          <span className="result-screen__stat-label">📝 マッチ数</span>
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
          𝕏 結果をシェア
        </a>

        <button className="result-screen__restart-button" onClick={onRestart}>
          もう一度プレイ 🔄
        </button>
      </div>
    </div>
  );
}
