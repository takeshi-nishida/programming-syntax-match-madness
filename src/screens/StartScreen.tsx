interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="start-screen">
      <h1 className="start-screen__title">🎴 構文マッチ</h1>
      <p className="start-screen__subtitle">JavaScript 構文ペアマッチングゲーム</p>

      <div className="start-screen__rules">
        <h2>📖 遊び方</h2>
        <ul>
          <li>左右のカードから<strong>同じ意味</strong>のペアを選ぼう</li>
          <li>左から1枚、右から1枚を選択</li>
          <li>正解するとカードが消えて新しいカードが補充される</li>
          <li>連続正解で<strong>コンボ</strong>が増える！</li>
          <li>全ペアをマッチさせたらクリア</li>
        </ul>
      </div>

      <div className="start-screen__example">
        <h2>💡 例</h2>
        <div className="start-screen__example-cards">
          <code>const {"{ a, b }"} = obj;</code>
          <span>＝</span>
          <code>const a = obj.a, b = obj.b;</code>
        </div>
      </div>

      <button className="start-screen__button" onClick={onStart}>
        ゲームスタート 🚀
      </button>
    </div>
  );
}
