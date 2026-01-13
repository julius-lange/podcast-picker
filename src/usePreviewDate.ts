import { useState } from 'react';
import { QuizVersion } from '@/types';

const WEEK_2_START = new Date('2026-01-13');
const WEEK_3_START = new Date('2026-01-20');
const WEEK_4_START = new Date('2026-01-27');

export function usePreviewDate() {
  const [date, setDate] = useState<Date>(new Date());

  const version: QuizVersion =
    date < WEEK_2_START
      ? 'week1'
      : date < WEEK_3_START
      ? 'week2'
      : date < WEEK_4_START
      ? 'week3'
      : 'week4';

  return { date, setDate, version };
}
