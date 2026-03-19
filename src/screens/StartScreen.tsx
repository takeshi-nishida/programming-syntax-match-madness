import { useLocale } from "../hooks/useLocale";
import { useIsDark } from "../hooks/useIsDark";
import { CodeHighlight } from "../components/CodeHighlight";
import { COURSES } from "../data/courses";
import type { Course } from "../types/game";

interface StartScreenProps {
  onStart: (course: Course) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const { t, toggleLocale } = useLocale();
  const isDark = useIsDark();

  return (
    <div className="start-screen">
      <a
        href="https://github.com/takeshi-nishida/programming-syntax-match-madness"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View repository"
        className="start-screen__repo"
      >
        <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </a>
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
        </ul>
      </div>

      <div className="start-screen__example">
        <h2>{t.example}</h2>
        <div className="start-screen__example-cards">
          <div className="start-screen__example-code">
            <CodeHighlight code="const { a, b } = obj;" isDark={isDark} />
          </div>
          <span>{t.equals}</span>
          <div className="start-screen__example-code">
            <CodeHighlight code="const a = obj.a, b = obj.b;" isDark={isDark} />
          </div>
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
