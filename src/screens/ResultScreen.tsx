import { useState, useCallback } from "react";
import type { GameResult, Course } from "../types/game";
import { useLocale } from "../hooks/useLocale";

interface ResultScreenProps {
  result: GameResult;
  course: Course;
  onRestart: () => void;
}

export function ResultScreen({ result, course, onRestart }: ResultScreenProps) {
  const { t } = useLocale();
  const { clearTimeMs, maxCombo, totalPairs } = result;
  const courseT = t.courses[course.id as keyof typeof t.courses];
  const [scoreCardUrl, setScoreCardUrl] = useState<string | null>(null);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const millis = Math.floor((ms % 1000) / 10);
    return `${minutes}:${secs.toString().padStart(2, "0")}.${millis
      .toString()
      .padStart(2, "0")}`;
  };

  // スコアカード画像を生成（VS Code風）
  const generateScoreCard = useCallback(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 1200;
    const height = 630;
    canvas.width = width;
    canvas.height = height;

    // 背景グラデーション
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(1, "#16213e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // コードパターン背景（装飾）
    ctx.fillStyle = "rgba(102, 126, 234, 0.05)";
    ctx.font = "14px monospace";
    const bgCodeLines = [
      "const result = await match();",
      "if (combo > max) celebrate();",
      "return { success: true };",
      "async function play() { }",
      "const [a, b] = arr;",
    ];
    for (let y = 0; y < height; y += 40) {
      ctx.fillText(bgCodeLines[Math.floor(y / 40) % bgCodeLines.length], 20, y + 30);
      ctx.fillText(bgCodeLines[(Math.floor(y / 40) + 2) % bgCodeLines.length], width - 320, y + 30);
    }

    // VS Code ウィンドウ
    const winX = 100;
    const winY = 40;
    const winW = 1000;
    const winH = 550;
    const radius = 8;

    // ウィンドウ背景
    ctx.fillStyle = "#1e1e1e";
    ctx.beginPath();
    ctx.roundRect(winX, winY, winW, winH, radius);
    ctx.fill();

    // タイトルバー
    ctx.fillStyle = "#323233";
    ctx.beginPath();
    ctx.roundRect(winX, winY, winW, 32, [radius, radius, 0, 0]);
    ctx.fill();

    // ウィンドウコントロール（右側）
    ctx.fillStyle = "#858585";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("─", winX + winW - 75, winY + 20);
    ctx.fillText("□", winX + winW - 45, winY + 20);
    ctx.fillStyle = "#cccccc";
    ctx.fillText("✕", winX + winW - 15, winY + 20);

    // タイトル
    ctx.fillStyle = "#cccccc";
    ctx.font = "13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("result.js - Reflex", winX + winW / 2, winY + 21);

    // アクティビティバー（左サイド）
    const actBarW = 48;
    ctx.fillStyle = "#333333";
    ctx.fillRect(winX, winY + 32, actBarW, winH - 32 - 22);

    // アクティビティバーアイコン
    ctx.fillStyle = "#858585";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("📁", winX + actBarW / 2, winY + 60);
    ctx.fillText("🔍", winX + actBarW / 2, winY + 100);
    ctx.fillStyle = "#ffffff";
    ctx.fillText("📄", winX + actBarW / 2, winY + 140);

    // エディタタブエリア
    const tabAreaY = winY + 32;
    ctx.fillStyle = "#252526";
    ctx.fillRect(winX + actBarW, tabAreaY, winW - actBarW, 35);

    // アクティブタブ
    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(winX + actBarW, tabAreaY, 150, 35);
    
    // タブのJSアイコン
    ctx.fillStyle = "#f7df1e";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("JS", winX + actBarW + 12, tabAreaY + 22);
    
    // タブのファイル名
    ctx.fillStyle = "#ffffff";
    ctx.font = "13px sans-serif";
    ctx.fillText("result.js", winX + actBarW + 35, tabAreaY + 22);

    // エディタ領域
    const editorX = winX + actBarW;
    const editorY = tabAreaY + 35;
    const editorW = winW - actBarW;
    const editorH = winH - 32 - 35 - 22;

    // 行番号エリア
    const lineNumW = 50;
    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(editorX, editorY, lineNumW, editorH);

    // コード領域
    ctx.fillStyle = "#1e1e1e";
    ctx.fillRect(editorX + lineNumW, editorY, editorW - lineNumW, editorH);

    // コード表示
    const codeX = editorX + lineNumW + 25;
    let codeY = editorY + 45;
    const codeLineHeight = 42;

    // 行番号とコード
    const lines = [
      { num: 1, tokens: [{ text: "const ", color: "#569cd6" }, { text: "result", color: "#4fc1ff" }, { text: " = {", color: "#cccccc" }] },
      { num: 2, tokens: [{ text: "  course", color: "#9cdcfe" }, { text: ": ", color: "#cccccc" }, { text: `"${courseT.name}"`, color: "#ce9178" }, { text: ",", color: "#cccccc" }] },
      { num: 3, tokens: [{ text: "  time", color: "#9cdcfe" }, { text: ": ", color: "#cccccc" }, { text: `"${formatTime(clearTimeMs)}"`, color: "#ce9178" }, { text: ",", color: "#cccccc" }] },
      { num: 4, tokens: [{ text: "  combo", color: "#9cdcfe" }, { text: ": ", color: "#cccccc" }, { text: `${maxCombo}`, color: "#b5cea8" }, { text: ",  ", color: "#cccccc" }, { text: "pairs", color: "#9cdcfe" }, { text: ": ", color: "#cccccc" }, { text: `${totalPairs}`, color: "#b5cea8" }] },
      { num: 5, tokens: [{ text: "};", color: "#cccccc" }] },
      { num: 6, tokens: [] },
      { num: 7, tokens: [{ text: "// Syntax Match Example:", color: "#6a9955" }] },
      { num: 8, tokens: [{ text: "const ", color: "#569cd6" }, { text: "{ ", color: "#cccccc" }, { text: "a", color: "#9cdcfe" }, { text: ", ", color: "#cccccc" }, { text: "b", color: "#9cdcfe" }, { text: " } = ", color: "#cccccc" }, { text: "obj", color: "#4fc1ff" }, { text: ";  ", color: "#cccccc" }, { text: "// ↔ ", color: "#6a9955" }, { text: "const ", color: "#569cd6" }, { text: "a", color: "#4fc1ff" }, { text: "=", color: "#cccccc" }, { text: "obj", color: "#4fc1ff" }, { text: ".", color: "#cccccc" }, { text: "a", color: "#9cdcfe" }, { text: ";", color: "#cccccc" }] },
    ];

    ctx.font = "26px monospace";
    lines.forEach((line) => {
      // 行番号
      ctx.fillStyle = "#858585";
      ctx.textAlign = "right";
      ctx.fillText(String(line.num), editorX + lineNumW - 10, codeY);

      // コード
      ctx.textAlign = "left";
      let tokenX = codeX;
      line.tokens.forEach((token) => {
        ctx.fillStyle = token.color;
        ctx.fillText(token.text, tokenX, codeY);
        tokenX += ctx.measureText(token.text).width;
      });

      codeY += codeLineHeight;
    });

    // ステータスバー
    const statusY = winY + winH - 22;
    ctx.fillStyle = "#007acc";
    ctx.beginPath();
    ctx.roundRect(winX, statusY, winW, 22, [0, 0, radius, radius]);
    ctx.fill();

    // ステータスバーコンテンツ
    ctx.fillStyle = "#ffffff";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("Ln 8, Col 1", winX + actBarW + 10, statusY + 15);
    ctx.textAlign = "right";
    ctx.fillText("JavaScript  UTF-8  Reflex", winX + winW - 15, statusY + 15);

    setScoreCardUrl(canvas.toDataURL("image/png"));
  }, [clearTimeMs, maxCombo, totalPairs, courseT.name]);

  const shareText = `${t.shareTitle}
${t.shareCourse}: ${courseT.name}
${t.shareTime}: ${formatTime(clearTimeMs)}
${t.shareMaxCombo}: ${maxCombo}
${totalPairs} ${t.sharePairsComplete}

${t.shareUrl}

${t.shareHashtags}`;

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
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
        <button
          className="result-screen__scorecard-button"
          onClick={generateScoreCard}
        >
          {t.showScoreCard}
        </button>

        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="result-screen__share-button"
        >
          {t.shareResult}
        </a>

        <button className="result-screen__restart-button" onClick={onRestart}>
          {t.backToCourses}
        </button>
      </div>

      {/* スコアカードモーダル */}
      {scoreCardUrl && (
        <div className="scorecard-modal" onClick={() => setScoreCardUrl(null)}>
          <div className="scorecard-modal__content" onClick={(e) => e.stopPropagation()}>
            <img src={scoreCardUrl} alt="Score Card" className="scorecard-modal__image" />
            <p className="scorecard-modal__hint">{t.scoreCardHint}</p>
            <button
              className="scorecard-modal__close"
              onClick={() => setScoreCardUrl(null)}
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
