import type { Course } from "../types/game";

export const COURSES: Course[] = [
  {
    id: "basics",
    levelRange: [1, 2],
    problemCount: 15,
  },
  {
    id: "standard",
    levelRange: [2, 4],
    problemCount: 20,
  },
  {
    id: "advanced",
    levelRange: [3, 5],
    problemCount: 20,
  },
];

export function getCourseById(id: string): Course | undefined {
  return COURSES.find(c => c.id === id);
}
