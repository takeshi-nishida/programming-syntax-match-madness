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
  const [copySuccess, setCopySuccess] = useState(false);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const millis = Math.floor((ms % 1000) / 10);
    return `${minutes}:${secs.toString().padStart(2, "0")}.${millis
      .toString()
      .padStart(2, "0")}`;
  };

  // スコアカード画像を生成（VS Code風） — 描画して Canvas を返す
  const createScoreCanvas = useCallback(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

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

    return canvas;
  }, [clearTimeMs, maxCombo, totalPairs, courseT.name]);

  // 既存のモーダル表示用（DataURL）を作る関数
  const generateScoreCard = useCallback(() => {
    const canvas = createScoreCanvas();
    if (!canvas) return;
    setScoreCardUrl(canvas.toDataURL("image/png"));
  }, [createScoreCanvas]);

  // Simple mobile detection helper (prefer userAgentData when available)
  const shareTextBase = `${t.shareTitle}
${t.shareCourse}: ${courseT.name}
${t.shareTime}: ${formatTime(clearTimeMs)}
${t.shareMaxCombo}: ${maxCombo}
${totalPairs} ${t.sharePairsComplete}

${t.shareHashtags || ""}`.trim();

  // Keep the share URL separate to avoid duplicating it inside `text` when
  // calling the Web Share API (some platforms show `text` and `url` together).
  const shareUrl = t.shareUrl || window.location.origin;

  const tweetText = `${shareTextBase}\n${shareUrl}`;
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  const isMobileDevice = useCallback(() => {
    // @ts-ignore userAgentData may not exist
    if ((navigator as any).userAgentData && typeof (navigator as any).userAgentData.mobile === "boolean") {
      return (navigator as any).userAgentData.mobile;
    }
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return true;
    return /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
  }, []);

  // 共有用：モバイルかデスクトップで最適なフローを試す
  const shareScoreCard = useCallback(() => {
    const canvas = createScoreCanvas();
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      if (!blob) {
        setScoreCardUrl(canvas.toDataURL("image/png"));
        return;
      }

      const file = new File([blob], "reflex-score.png", { type: "image/png" });
      const mobile = isMobileDevice();

      try {
        // Mobile-first: Web Share with files. Provide `text` without the URL
        // and omit `url` so consumers don't render the same link twice.
        if (mobile && (navigator as any).canShare && (navigator as any).canShare({ files: [file] })) {
          await (navigator as any).share({ files: [file], title: t.shareTitle, text: shareTextBase, url: shareUrl });
          return;
        }

        // Mobile fallback: Web Share without files. Pass `url` separately
        // (some platforms accept a `url` field) and keep `text` URL-free.
        if (mobile && navigator.share) {
          await navigator.share({ title: t.shareTitle, text: shareTextBase, url: shareUrl });
          return;
        }

        // Desktop: try Clipboard image write (best UX for desktop)
        if ((navigator as any).clipboard && (window as any).ClipboardItem) {
          try {
            await (navigator as any).clipboard.write([new (window as any).ClipboardItem({ ["image/png"]: blob })]);
            // open tweet composer so user can paste the image
            window.open(tweetUrl, "_blank", "noopener");
            return;
          } catch (err) {
            console.warn("clipboard image write failed", err);
          }
        }

        // Final fallback: download image, copy text, open intent
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "reflex-score.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(`${shareTextBase}\n${shareUrl}`);
        }
        window.open(tweetUrl, "_blank", "noopener");
      } catch (err) {
        console.error("share failed", err);
        setScoreCardUrl(canvas.toDataURL("image/png"));
      }
    }, "image/png");
  }, [createScoreCanvas, isMobileDevice, shareTextBase, shareUrl, tweetUrl, t.shareTitle]);

  

  return (
    <div className="result-screen">
      <h1 className="result-screen__title">{t.cleared}</h1>

      <div className="result-screen__stats">
        <div className="result-screen__stat">
          <span className="result-screen__stat-label">{t.clearTime}</span>
          <span className="result-screen__stat-value">{formatTime(clearTimeMs)}</span>
        </div>

        <div className="result-screen__stat">
          <span className="result-screen__stat-label">{t.maxCombo}</span>
          <span className="result-screen__stat-value">{maxCombo}</span>
        </div>

        <div className="result-screen__stat">
          <span className="result-screen__stat-label">{t.matches}</span>
          <span className="result-screen__stat-value">{totalPairs} / {totalPairs}</span>
        </div>
      </div>

      <div className="result-screen__actions">
        {isMobileDevice() ? (
          <>
            <button className="result-screen__scorecard-button" onClick={shareScoreCard}>{t.shareResult}</button>
            <button className="result-screen__restart-button" onClick={onRestart}>{t.backToCourses}</button>
          </>
        ) : (
          <>
            <button className="result-screen__scorecard-button" onClick={generateScoreCard}>{t.shareResult}</button>
            <button className="result-screen__restart-button" onClick={onRestart}>{t.backToCourses}</button>
          </>
        )}
      </div>

      {scoreCardUrl && (
        <div className="scorecard-modal" onClick={() => setScoreCardUrl(null)}>
          <div className="scorecard-modal__content" onClick={(e) => e.stopPropagation()}>
            <img src={scoreCardUrl} alt="Score Card" className="scorecard-modal__image" />
            <p className="scorecard-modal__hint">{t.scoreCardHint}</p>
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
              <button
                className="scorecard-modal__copy"
                onClick={async () => {
                  if (!scoreCardUrl) return;
                  if (!(navigator as any).clipboard || !(window as any).ClipboardItem) {
                    alert("Clipboard image write is not supported in this browser.");
                    return;
                  }
                  try {
                    const res = await fetch(scoreCardUrl);
                    const blob = await res.blob();
                    await (navigator as any).clipboard.write([new (window as any).ClipboardItem({ ["image/png"]: blob })]);
                    setCopySuccess(true);
                    // clear toast after a few seconds
                    setTimeout(() => setCopySuccess(false), 4000);
                  } catch (err) {
                    console.error(err);
                    alert("Failed to copy image to clipboard.");
                  }
                }}
              >
                {t.copyImage || 'Copy image'}
              </button>

              <button
                className="scorecard-modal__share-x"
                onClick={() => window.open(tweetUrl, '_blank', 'noopener')}
              >
                {t.shareToX || 'Share to X'}
              </button>

              <button className="scorecard-modal__close" onClick={() => setScoreCardUrl(null)}>{t.close}</button>
            </div>
            {copySuccess && (
              <div className="scorecard-toast" role="status" aria-live="polite">
                <span>{t.copySuccess}</span>
                <button className="scorecard-toast__open" onClick={() => window.open(tweetUrl, '_blank', 'noopener')}>{t.shareToX || 'Open X'}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
