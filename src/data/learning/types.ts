/**
 * Learning content. Lessons are shared between roles where the subject is the same (Docker is Docker for a
 * Backend, DevOps or Cloud engineer); each role adds its own "why it matters" line in ./map.ts.
 *
 * Authoring uses compact tuples; ./index.ts turns them into the typed shapes below.
 */

export type ResourceKind = "Docs" | "Course" | "Guide" | "Book" | "Interactive" | "Video" | "Reference";
export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Topic = { id: string; title: string; detail: string };
export type Resource = { title: string; url: string; provider: string; kind: ResourceKind };
export type Project = { id: string; title: string; difficulty: Difficulty; hours: number; description: string };
export type LessonQuestion = { question: string; options: string[]; answer: number; explanation: string };

export type Lesson = {
  id: string;
  overview: string;
  topics: Topic[];
  resources: Resource[];
  projects: Project[];
  quiz: LessonQuestion[];
};

export type RawLesson = {
  overview: string;
  /** [title, detail] */
  topics: [string, string][];
  /** [title, url, provider, kind] */
  resources: [string, string, string, ResourceKind][];
  /** [title, difficulty, hours, description] */
  projects: [string, Difficulty, number, string][];
  /** [question, options, answer index, explanation] */
  quiz: [string, string[], number, string][];
};

export type RawLessons = Record<string, RawLesson>;
