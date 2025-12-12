// src/types.ts (Example structure)

export type QuestionId = 'q1' | 'q2' | 'q3';
export type Answer = 'a' | 'b';

export type UserAnswers = Record<QuestionId, Answer | null>;

export interface Question {
  id: QuestionId;
  text: string;
  optionA: string;
  optionB: string;
}

export interface PodcastEpisode {
  title: string;
  description: string;
  url: string; // Link to the episode/platform
}