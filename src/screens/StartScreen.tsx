import { useLocale } from "../hooks/useLocale";
import { COURSES } from "../data/courses";
import type { Course } from "../types/game";

interface StartScreenProps {
  onStart: (course: Course) => void;
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

      <h2 className="start-screen__course-title">{t.selectCourse}</h2>
      <div className="start-screen__courses">
        {COURSES.map((course) => {
          const courseT = t.courses[course.id as keyof typeof t.courses];
          return (
            <button
              key={course.id}
              className="start-screen__course-card"
              onClick={() => onStart(course)}
            >
              <span className="start-screen__course-name">{courseT.name}</span>
              <span className="start-screen__course-desc">{courseT.desc}</span>
              <span className="start-screen__course-meta">
              {t.courseLevels}{course.levelRange[0]}-{course.levelRange[1]} / {course.problemCount}{t.courseProblems}
            </span>
          </button>
          );
        })}
      </div>
    </div>
  );
}
