import { useState } from "react";
import type { GameResult } from "./types/game";
import { StartScreen } from "./screens/StartScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { Game } from "./components/Game";
import { LocaleProvider } from "./hooks/useLocale";
import "./App.css";

type Screen = "start" | "playing" | "result";

function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [gameKey, setGameKey] = useState(0);

  const handleStart = () => {
    setScreen("playing");
    setGameKey((k) => k + 1); // ゲームをリセットするためのキー
  };

  const handleGameEnd = (result: GameResult) => {
    setGameResult(result);
    setScreen("result");
  };

  const handleRestart = () => {
    setScreen("start");
    setGameResult(null);
  };

  return (
    <LocaleProvider>
      <div className="app">
        {screen === "start" && <StartScreen onStart={handleStart} />}
        {screen === "playing" && <Game key={gameKey} onGameEnd={handleGameEnd} />}
        {screen === "result" && gameResult && (
          <ResultScreen result={gameResult} onRestart={handleRestart} />
        )}
      </div>
    </LocaleProvider>
  );
}

export default App;
