import { QuizVersion, UserAnswers } from '@/types';

type Resolved = { text: string; a: string; b: string };

export function resolveQuestionContent(
  version: QuizVersion,
  questionId: 'q2' | 'q3',
  answers: UserAnswers
): Resolved {
  if (version === 'week1') {
    if (questionId === 'q2') {
      return answers.q1 === 'a'
        ? {
            text:
              'Möchtest du von einer Frau erfahren, die sehr lange in diesem Unternehmen war/ist oder von einer, die nach einer Phase dort nochmal etwas ganz anderes macht?',
            a: 'Kontinuierlich im Unternehmen',
            b: 'Nach einer Phase im Unternehmen etwas ganz anderes',
          }
        : {
            text:
              'Interessierst du dich mehr für ein „Purpose Business“ oder ein Service Business (wissend, dass auch Service Businesses meist Purpose haben)?',
            a: '„Purpose Business“',
            b: 'Service Business',
          };
    }

    if (questionId === 'q3') {
      if (answers.q1 === 'a' && answers.q2 === 'a')
        return {
          text:
            'Möchtest du von einer Frau hören, die die Spitze erreicht hat oder lieber von einer, die noch auf dem Weg nach oben ist?',
          a: 'Spitze erreicht: Beate Heinisch',
          b: 'Noch auf dem Weg nach oben: Christine Hauck',
        };

      if (answers.q1 === 'a' && answers.q2 === 'b')
        return {
          text: 'Welche Art von Wechsel interessiert dich am meisten?',
          a: 'Ein radikaler Branchenwechsel: Christina Foerster',
          b: 'Ein völliger Rollenwechsel: Alice Sachova',
        };

      if (answers.q1 === 'b' && answers.q2 === 'a')
        return {
          text:
            'Möchtest du mehr von einer Gründung im Social Business oder im Bereich Sustainability hören?',
          a: 'Social Business: Iris Braun',
          b: 'Sustainability: Mareike Jens',
        };

      return {
        text:
          'Möchtest du lieber von einer Success Story lernen oder von einer Geschichte mit überwundenen Herausforderungen?',
        a: 'Success Story: Katja Bossert',
        b: 'Überwundene Herausforderungen: Bea Beste',
      };
    }
  }

  if (version === 'week2') {
    if (questionId === 'q2') {
      return answers.q1 === 'a'
        ? {
            text:
              'Auch unsere Studienhintergründe sind sehr unterschiedlich. Interessierst du dich heute eher für eine Frau, die BWL/VWL studiert hat oder eine mit exotischerem Studienfach?',
            a: 'BWL oder ähnliches',
            b: 'Etwas anderes',
          }
        : {
            text:
              'Interessiert dich mehr eine Frau, die in Nordamerika gearbeitet hat oder lieber eine, die ihre Karriere in einer „exotischeren“ Region gemacht hat',
            a: 'Nordamerika',
            b: '„Exotischere“ Region',
          };
    }

    if (questionId === 'q3') {
      if (answers.q1 === 'a' && answers.q2 === 'a')
        return {
          text:
            'Interessierst du dich mehr für die Erfahrungen einer Frau, die Vollzeit arbeitet oder möchtest du von Erfahrungen mit Teilzeit-Karrieren hören?',
          a: 'Vollzeit: Verena Grundke',
          b: 'Teilzeit: Anja Klodwig',
        };

      if (answers.q1 === 'a' && answers.q2 === 'b')
        return {
          text:
            'Möchtest du gerne mehr von einer Konzernkarriere oder von einer Portfolio-Karriere hören?',
          a: 'Konzernkarriere: Ines Ploss',
          b: 'Portfoliokarriere: Astrid Rauchfuss',
        };

      if (answers.q1 === 'b' && answers.q2 === 'a')
        return {
          text:
            'Möchtest du eher von einer Frau hören, die in einem Unternehmen Karriere gemacht hat oder einer, die mehrfach gewechselt hat?',
          a: 'Ein Unternehmen: Steffi Walther',
          b: 'Mehrere Unternehmen: Tina Doerffer',
        };

      return {
        text:
          'Möchtest du lieber von einer Erfahrung in Asien oder in Südamerika hören?',
        a: 'Asien: Saskia Bruysten',
        b: 'Südamerika: Julia Santander',
      };
    }
  }

  if (version === 'week3') {
    if (questionId === 'q2') {
      return answers.q1 === 'a'
        ? {
            text:
              'Frauen, die in ihrem Feld geblieben sind, haben ja oft eine besondere Spezialisierung entwickelt. Interessierst du dich eher für eine Frau, die sich auf ein bestimmtes Thema spezialisiert hat oder eine, die eine besondere funktionale Expertise entwickelt hat?',
            a: 'Themen-Spezialisierung',
            b: 'Funktionale Expertise',
          }
        : {
            text:
              'Interessiert dich mehr eine Frau, die in Richtung Forschung/Lehre gegangen ist oder eine, die einen mutigen (also noch mutigeren) Karrierewechsel gemacht hat?',
            a: 'Forschung/Lehre',
            b: 'Mutiger Karrierewechsel',
          };
    }

    if (questionId === 'q3') {
      if (answers.q1 === 'a' && answers.q2 === 'a')
        return {
          text:
            'Interessierst du dich mehr für die Erfahrungen einer Frau, die eine der Top-Expertinnen für Cyber-Security ist oder einer, die ein Branding-Profi ist?',
          a: 'Cyber-Security: Maya Bundt',
          b: 'Branding: Wiebke Sokolowski',
        };

      if (answers.q1 === 'a' && answers.q2 === 'b')
        return {
          text:
            'Möchtest du gerne mehr von einer funktionalen Spezialisierung im Bereich Finanzen oder Operations hören?',
          a: 'Finanzen: Alexandra Heine',
          b: 'Operations: Martina Schulze-Adams',
        };

      if (answers.q1 === 'b' && answers.q2 === 'a')
        return {
          text:
            'Möchtest du eher von einer Professorin für Projektmanagement oder für Marketing hören?',
          a: 'Projektmanagement: Sabine Jaritz',
          b: 'Marketing: Birte Kemmerling',
        };

      return {
        text:
          'Möchtest du lieber von den Erfahrungen im Mittelstand oder dem Aufbau des Marketings in Ägypten hören?',
        a: 'Mittelstand: Ulrike Garanin',
        b: 'Ägypten: Sarah Oden',
      };
    }
  }

  if (version === 'week4') {
    if (questionId === 'q2') {
      return answers.q1 === 'a'
        ? {
            text:
              'Wenn man sehr lange bei BCG war, schätzt man vielleicht besonders die Selbstbestimmtheit. Das haben oft Selbstständige aber auch Beirätinnen. Von wem möchtest du heute lieber hören?',
            a: 'Selbstständige',
            b: 'Beirätin',
          }
        : {
            text:
              'Ein typischer Weg nach 2-3 Jahren BCG führt einen ja oft in einen Konzern oder – zunehmend – in eine Gründung/ein Start-up. Wovon möchtest du lieber hören?',
            a: 'Konzernkarriere',
            b: 'Erfahrung mit Gründung/Start-up',
          };
    }

    if (questionId === 'q3') {
      if (answers.q1 === 'a' && answers.q2 === 'a')
        return {
          text:
            'Das Feld der Selbstständigkeit ist unendlich weit. Möchtest du heute lieber von einem Social Business oder einer Tätigkeit im Venture Capital hören?',
          a: 'Social Business: Juliane Kronen',
          b: 'Venture Capital: Caro Gabor',
        };

      if (answers.q1 === 'a' && answers.q2 === 'b')
        return {
          text:
            'Teilnehmerinnen unseres AR-Circles wissen, dass Boards vollkommen unterschiedlich sein können. Magst du eher von einer Aufsichtsrätin eines börsennotierten Unternehmens hören oder einer Beirätin in einem Familienunternehmen?',
          a: 'Börsennotiert: Melanie Bockemühl',
          b: 'Familienunternehmen: Christiane Uhl',
        };

      if (answers.q1 === 'b' && answers.q2 === 'a')
        return {
          text:
            'Möchtest du eher von einer Frau hören, die immer noch im gleichen Unternehmen seit ihrer Zeit bei BCG ist, oder von einer, die nach der Konzernkarriere nochmal etwas anderes macht?',
          a: 'Gleiches Unternehmen: Isabella Erb-Herrmann',
          b: 'Etwas anderes: Elisabeth Schick',
        };

      return {
        text:
          'Gerade junge Ex-BCGlerinnen sind in unglaublich spannenden Start-ups unterwegs. Möchtest du lieber von faszinierenden Erfahrungen aus dem For profit oder aus dem NGO-Bereich hören?',
        a: 'Mittelstand: Steff Gerhart',
        b: 'NGO: Steff Rocker',
      };
    }
  }

  throw new Error('Invalid question resolution');
}
