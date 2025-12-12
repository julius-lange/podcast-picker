// src/data.ts

import { PodcastEpisode, Question } from './types';

// The three questions for the user
export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: 'Branchenfokus: Möchtest du von einer Frau hören, die im Tech/Digital/Innovation-Bereich oder in eher trditionelleren Industiern tätig ist oder war?',
    optionA: 'Tech/Digital/Innovation',
    optionB: 'Traditionelle Industrien (Pharma, Chemie, Transport, Versicherung)',
  },
  {
    id: 'q2',
    text: 'Führungserfahrung: Möchtest du von einer Frau mit Vorstandserfahrung/C-Level hören?',
    optionA: 'Vorstandserfahrung/C-Level',
    optionB: 'Beratungs-/mittlere Führungserfahrung',
  },
  {
    id: 'q3',
    text: 'Auslandsbezug: Möchtest du von einer Frau hören, die signifikante Zeit im Ausland gelebt/gearbeitet hat?',
    optionA: 'Signifikante Zeit im Ausland',
    optionB: 'Primär in Deutschland/DACH tätig',
  },
];

// 8 possible combinations (2^3 = 8)
export const PODCAST_MAP: Record<string, PodcastEpisode> = {
  // Q1:A (Tech/Digital) - Q2:A (C-Level) - Q3:A (Ausland)
  'a-a-a': {
    title: 'Episode 4: Christina Foerster',
    description: 'Lufthansa-Vorstand mit MBA Wharton USA, Customer/IT/Digital Fokus',
    url: 'https://f.io/kfxeywRT',
  },
  // Q1:A (Tech/Digital) - Q2:A (C-Level) - Q3:B (Deutschland)
  'a-a-b': {
    title: 'Episode 8: Sabine Eckhardt',
    description: 'Vorstand ProSiebenSat.1, CEO JLL, Multi-AR, heute mehrfach tätig',
    url: 'https://f.io/qIl6uAQP',
  },
  // Q1:A (Tech/Digital) - Q2:B (Beratung/mittlere Führung) - Q3:A (Ausland)
  'a-b-a': {
    title: 'Episode 26: Sarah Oden',
    description: 'BCG Marketing & Alumni Relations, deutsch-ägyptisch, aktuell in Kairo',
    url: 'https://f.io/fgi_yaqh',
  },
  // Q1:A (Tech/Digital) - Q2:B (Beratung/mittlere Führung) - Q3:B (Deutschland)
  'a-b-b': {
    title: 'Episode 11: Mareike Jens',
    description: 'Chief of Staff bei Optiml mit Tech/AI-Fokus, ehemals BCG',
    url: 'https://f.io/Cnxp09pH',
  },
  // Q1:B (Traditionelle Industrie) - Q2:A (C-Level) - Q3:A (Ausland)
  'b-a-a': {
    title: 'Episode 1: Astrid Stange',
    description: 'AXA-Vorstand mit 14 Jahren Allianz Erfahrung, Pendeln Köln-München',
    url: 'https://f.io/99dM6zBr',
  },
  // Q1:B (Traditionelle Industrie) - Q2:A (C-Level) - Q3:B (Deutschland)
  'b-a-b': {
    title: 'Episode 19: Ulrike Garanin',
    description: 'Geschäftsführerin Dilo Hydrogen, ehemals Joblinge-CEO',
    url: 'https://app.frame.io/presentations/ade44111-d96a-4446-9d16-95a1063ae169',
  },
  // Q1:B (Traditionelle Industrie) - Q2:B (Beratung/mittlere Führung) - Q3:A (Ausland)
  'b-b-a': {
    title: 'Episode 9: Maya Bundt',
    description: 'Verwaltungsrätin Schweiz, Cyber-Expertin, BCG/Swiss Re Hintergrund',
    url: 'https://f.io/qA3D9OOs',
  },
  // Q1:B (Traditionelle Industrie) - Q2:B (Beratung/mittlere Führung) - Q3:B (Deutschland)
  'b-b-b': {
    title: 'Episode 21: Ines Ploss',
    description: 'CPO Heidelberg Materials, Biochemie Hintergrund, Aufsichtsrätin',
    url: 'https://f.io/3iAlG_I3',
  },
};
