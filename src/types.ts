// src/types.ts

export type QuestionId = 'q1' | 'q2' | 'q3';
export type Answer = 'a' | 'b';

export type UserAnswers = Partial<Record<QuestionId, Answer>>;

export interface PodcastEpisode {
  title: string;
  description: string;
  url: string;
}

export type QuizVersion = 'week1' | 'week2' | 'week3' | 'week4';
