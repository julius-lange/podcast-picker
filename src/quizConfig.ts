import { Answer, QuestionId, QuizVersion, UserAnswers } from '@/types';

export interface QuizQuestion {
  id: QuestionId;
  text: string;
  options: {
    a: string;
    b: string;
  };
  next: (params: {
    answer: Answer;
    answers: UserAnswers;
    version: QuizVersion;
  }) => QuestionId | 'result';
}

const EMPTY_OPTIONS = { a: '', b: '' };

export const QUIZ_BY_VERSION: Record<
  QuizVersion,
  Record<QuestionId, QuizQuestion>
> = {
  // ======================================
  // week1 – before 08.01.2026
  // ======================================
  week1: {
    q1: {
      id: 'q1',
      text:
        'Nach BCG gibt es unendlich viele Optionen. Interessierst du dich eher für eine Frau, die in ein bekanntes Unternehmen gegangen ist oder eine, die selbst gegründet hat?',
      options: {
        a: 'Bekanntes Unternehmen',
        b: 'Gründung/Start-up',
      },
      next: () => 'q2',
    },
    q2: {
      id: 'q2',
      text: '',
      options: EMPTY_OPTIONS,
      next: () => 'q3',
    },
    q3: {
      id: 'q3',
      text: '',
      options: EMPTY_OPTIONS,
      next: () => 'result',
    },
  },

  // ======================================
  // week2 – up to 15.01.2026
  // ======================================
  week2: {
    q1: {
      id: 'q1',
      text:
        'Die Wege bei und nach BCG führen in sehr viele Richtungen. Möchtest du eher von einer Frau hören, die im wesentlichen in Deutschland gearbeitet hat oder von einer, die eine sehr internationale Karriere gemacht hat?',
      options: {
        a: 'Im wesentlichen in Deutschland',
        b: 'Sehr international',
      },
      next: () => 'q2',
    },
    q2: {
      id: 'q2',
      text: '',
      options: EMPTY_OPTIONS,
      next: () => 'q3',
    },
    q3: {
      id: 'q3',
      text: '',
      options: EMPTY_OPTIONS,
      next: () => 'result',
    },
  },

  // ======================================
  // week3 – up to 22.01.2026
  // ======================================
  week3: {
    q1: {
      id: 'q1',
      text:
        'Es gibt ja unendlich viele Karrieremöglichkeiten nach BCG. Möchtest du eher von einer Frau hören, die in ihrem angestammten Feld geblieben ist oder von einer, die etwas ganz anderes gemacht hat?',
      options: {
        a: 'Im Feld geblieben',
        b: 'Etwas ganz anderes',
      },
      next: () => 'q2',
    },
    q2: {
      id: 'q2',
      text: '',
      options: EMPTY_OPTIONS,
      next: () => 'q3',
    },
    q3: {
      id: 'q3',
      text: '',
      options: EMPTY_OPTIONS,
      next: () => 'result',
    },
  },

  // ======================================
  // week4 – after 29.01.2026
  // ======================================
  week4: {
    q1: {
      id: 'q1',
      text:
        'Die Dauer unserer Zugehörigkeit zu BCG variiert ja von ganz kurz bis Jahrzehnte-lang. Möchtest du eher von einer Frau hören, die ziemlich lange oder eher kurz bei BCG war?',
      options: {
        a: 'Ziemlich lange',
        b: 'Eher kurz',
      },
      next: () => 'q2',
    },
    q2: {
      id: 'q2',
      text: '',
      options: EMPTY_OPTIONS,
      next: () => 'q3',
    },
    q3: {
      id: 'q3',
      text: '',
      options: EMPTY_OPTIONS,
      next: () => 'result',
    },
  },
};
