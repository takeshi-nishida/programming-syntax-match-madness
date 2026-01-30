import { useLocale } from "../hooks/useLocale";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const { t, toggleLocale } = useLocale();

  return (
    <div className="start-screen">
      <button className="start-screen__lang" onClick={toggleLocale}>
        {t.language}
      </button>

      <h1 className="start-screen__title">{t.title}</h1>
      <p className="start-screen__subtitle">{t.subtitle}</p>

      <div className="start-screen__rules">
        <h2>{t.howToPlay}</h2>
        <ul>
          <li>{t.rule1}</li>
          <li>{t.rule2}</li>
          <li>{t.rule3}</li>
          <li>{t.rule4}</li>
          <li>{t.rule5}</li>
        </ul>
      </div>

      <div className="start-screen__example">
        <h2>{t.example}</h2>
        <div className="start-screen__example-cards">
          <code>const {"{ a, b }"} = obj;</code>
          <span>{t.equals}</span>
          <code>const a = obj.a, b = obj.b;</code>
        </div>
      </div>

      <button className="start-screen__button" onClick={onStart}>
        {t.start}
      </button>
    </div>
  );
}
