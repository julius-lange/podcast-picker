// src/data.ts

import { PodcastEpisode, Question } from './types';

// The three questions for the user
export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'When choosing a travel destination, do you prefer a quiet, historical city or a bustling, modern metropolis?',
    optionA: 'Quiet, Historical City',
    optionB: 'Bustling, Modern Metropolis',
  },
  {
    id: 'q2',
    text: 'To unwind, are you more likely to listen to a long-form interview or a quick, witty comedy sketch?',
    optionA: 'Long-form interview (deep dive)',
    optionB: 'Quick, witty comedy sketch',
  },
  {
    id: 'q3',
    text: 'Do you feel more energized by a detailed plan or by spontaneous improvisation?',
    optionA: 'Detailed plan and structure',
    optionB: 'Spontaneous improvisation',
  },
];

// 8 possible combinations (2^3 = 8)
export const PODCAST_MAP: Record<string, PodcastEpisode> = {
  // Q1:A (History) - Q2:A (Deep Dive) - Q3:A (Structure)
  'a-a-a': {
    title: 'The History of Everything - Structured Deep Dive',
    description: 'A meticulously researched look into a forgotten historical event.',
    url: 'https://example.com/podcast/aaa',
  },
  // Q1:A (History) - Q2:A (Deep Dive) - Q3:B (Improvisation)
  'a-a-b': {
    title: 'Unscripted Legends - Improv History',
    description: 'Two historians debate a topic with no notes, leading to wild theories.',
    url: 'https://example.com/podcast/aab',
  },
  // Q1:B (Modern) - Q2:B (Comedy) - Q3:B (Improvisation)
  'b-b-b': {
    title: 'The Comedy Improv Hour',
    description: 'Fast-paced, high-energy comedy sketches and bits about modern life.',
    url: 'https://example.com/podcast/bbb',
  },
  // Add all 8 combinations (e.g., 'a-b-a', 'b-a-b', etc.)
  'a-b-a': {
    title: 'Quick History Facts - Structured & Witty',
    description: 'A quick, witty show that delivers 5 facts about a new historical topic every episode.',
    url: 'https://example.com/podcast/aba',
  },
  'a-b-b': {
    title: 'Off-the-Cuff History Talk',
    description: 'A light, improvisational chat show focused on historical trivia and funny stories.',
    url: 'https://example.com/podcast/abb',
  },
  'b-a-a': {
    title: 'The Modern Architecture Deep Dive',
    description: 'An in-depth, structured analysis of a specific contemporary building or design movement.',
    url: 'https://example.com/podcast/baa',
  },
  'b-a-b': {
    title: 'Deep Thoughts on Modern Life - Unplanned',
    description: 'A philosopher and a comedian have an unstructured discussion on current events and technology.',
    url: 'https://example.com/podcast/bab',
  },
  'b-b-a': {
    title: 'Structured Stand-Up Analysis',
    description: 'Comedians meticulously break down the structure and timing of a famous stand-up routine.',
    url: 'https://example.com/podcast/bba',
  },
};
