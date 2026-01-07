'use client';

import { useState, useEffect } from 'react';
import React from 'react';

import { QUIZ_BY_VERSION } from '@/quizConfig';
import { resolveQuestionContent } from '@/resolveQuestion';
import { PODCAST_MAP } from '@/PODCAST_MAP';
import { QuestionId, Answer, UserAnswers, PodcastEpisode } from '@/types';
import { usePreviewDate } from '@/usePreviewDate';

// --- Constants ---
const FINAL_STEP_INDEX = 3;

const PRIMARY_BUTTON_STYLE =
  'inline-block w-full py-3 px-4 bg-white text-green-700 font-bold border border-green-500 rounded-lg shadow-md hover:bg-green-50 hover:border-green-600 transition-all duration-300 ease-in-out text-xl';

// ===============================================
// ProgressIndicator (styling unchanged)
// ===============================================
interface ProgressIndicatorProps {
  currentStep: number;
  finalStepIndex: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  finalStepIndex,
}) => (
  <div className="flex items-center justify-between mb-6">
    <div className="text-sm font-medium text-teal-600">
      Question {Math.min(currentStep + 1, finalStepIndex)} of {finalStepIndex}
    </div>
    <div className="flex space-x-2">
      {Array.from({ length: finalStepIndex }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            index < currentStep
              ? 'bg-green-500'
              : index === currentStep
              ? 'bg-teal-600 ring-2 ring-teal-300'
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  </div>
);

// ===============================================
// Home
// ===============================================
export default function Home() {
  const { date, setDate, version } = usePreviewDate();
  const quiz = QUIZ_BY_VERSION[version];

  // -1: Intro, 0..2: Questions, 3: Result
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [currentQuestionId, setCurrentQuestionId] = useState<QuestionId | null>(
    null
  );
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [result, setResult] = useState<PodcastEpisode | null>(null);

  // Set current date and log it with version
  useEffect(() => {
    const currentDate = new Date();
    setDate(currentDate);
    console.log('Current date:', currentDate.toISOString().slice(0, 10));
    console.log('Active version:', version);
  }, [version, setDate]);

  const startQuiz = () => {
    setAnswers({});
    setResult(null);
    setCurrentQuestionId('q1');
    setCurrentStep(0);
  };

  const resetQuiz = () => {
    setCurrentStep(-1);
    setCurrentQuestionId(null);
    setAnswers({});
    setResult(null);
  };
  const calculateResult = (finalAnswers: UserAnswers) => {
    const key = `${version}:${finalAnswers.q1}-${finalAnswers.q2}-${finalAnswers.q3}`;

    const keys = Object.keys(PODCAST_MAP);
    const hasKey = Object.prototype.hasOwnProperty.call(PODCAST_MAP, key);

    console.log('[quiz] version:', version);
    console.log('[quiz] answers:', finalAnswers);
    console.log('[quiz] key:', key);
    console.log('[quiz] hasKey:', hasKey);
    console.log('[quiz] sample keys:', keys.slice(0, 10));

    const episode = PODCAST_MAP[key];

    setResult(
      episode
        ? {
            title: `BCG Women Powerment Podcast: ${episode.title}`,
            description: episode.description,
            url: episode.url,
          }
        : {
            title: 'Error: Mapping Issue',
            description: `Missing key: ${key}`,
            url: '#',
          }
    );
  };

  // const calculateResult = (finalAnswers: UserAnswers) => {
  //   const key = `${version}:${finalAnswers.q1}-${finalAnswers.q2}-${finalAnswers.q3}`;
  //   const episode = PODCAST_MAP[key];

  //   setResult(
  //     episode
  //       ? {
  //           title: `BCG Women Powerment Podcast: ${episode.title}`,
  //           description: episode.description,
  //           url: episode.url,
  //         }
  //       : {
  //           title: 'Error: Mapping Issue',
  //           description:
  //             'The answers did not match a predefined podcast episode.',
  //           url: '#',
  //         }
  //   );
  // };

  const handleAnswer = (questionId: QuestionId, answer: Answer) => {
    const newAnswers: UserAnswers = {
      ...answers,
      [questionId]: answer,
    };

    const next = quiz[questionId].next({
      answer,
      answers: newAnswers,
      version,
    });

    setAnswers(newAnswers);

    if (next === 'result') {
      calculateResult(newAnswers);
      setCurrentStep(FINAL_STEP_INDEX);
      setCurrentQuestionId(null);
    } else {
      setCurrentQuestionId(next);
      setCurrentStep((s) => s + 1);
    }
  };


  // ===============================================
  // Content resolution
  // ===============================================
  let content;

  if (currentStep === -1) {
    content = (
      <div className="p-8 text-center animate-fade-in">
        <h2 className="mb-4 text-2xl font-extrabold leading-tight text-teal-800 sm:text-3xl md:text-4xl">
          BCG Women Powerment Podcast
        </h2>
        <p className="pb-4 mb-8 text-lg font-medium text-gray-600 border-b border-teal-100">
          Thank you for making our first year a tremendous success! To celebrate,
          answer three quick questions to find your perfect episode recommendation.
        </p>
        <button onClick={startQuiz} className={PRIMARY_BUTTON_STYLE}>
          Start the Quiz
        </button>
      </div>
    );
  } else if (currentStep < FINAL_STEP_INDEX && currentQuestionId) {
    const resolved =
      currentQuestionId === 'q1'
        ? {
            text: quiz.q1.text,
            a: quiz.q1.options.a,
            b: quiz.q1.options.b,
          }
        : resolveQuestionContent(version, currentQuestionId, answers);

    content = (
      <div key={currentStep} className="animate-fade-in">
        <header className="pb-4 mb-6 text-center border-b border-teal-100">
          <h1 className="text-3xl font-extrabold text-teal-800">
            Podcast Episode Finder
          </h1>
        </header>

        <ProgressIndicator
          currentStep={currentStep}
          finalStepIndex={FINAL_STEP_INDEX}
        />

        <div className="p-6 border-2 border-teal-200 rounded-lg bg-teal-50">
          <h2 className="mb-5 text-xl font-bold text-gray-800">
            {currentStep + 1}. {resolved.text}
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <button
              onClick={() =>
                handleAnswer(currentQuestionId, 'a')
              }
              className="w-full px-4 py-3 font-semibold text-left text-teal-600 transition-all duration-200 ease-in-out bg-white border border-teal-300 rounded-lg shadow-sm hover:bg-teal-50 hover:border-teal-400"
            >
              <span className="mr-2 font-bold text-teal-700">A:</span>{' '}
              {resolved.a}
            </button>

            <button
              onClick={() =>
                handleAnswer(currentQuestionId, 'b')
              }
              className="w-full px-4 py-3 font-semibold text-left text-teal-600 transition-all duration-200 ease-in-out bg-white border border-teal-300 rounded-lg shadow-sm hover:bg-teal-50 hover:border-teal-400"
            >
              <span className="mr-2 font-bold text-teal-700">B:</span>{' '}
              {resolved.b}
            </button>
          </div>
        </div>
      </div>
    );
  } else if (currentStep === FINAL_STEP_INDEX && result) {
    content = (
      <div key="result" className="animate-fade-in">
        <header className="pb-4 mb-6 text-center border-b border-teal-100">
          <h1 className="text-3xl font-extrabold text-teal-800">
            Your Recommendation
          </h1>
        </header>

        <div className="p-6 text-center border-4 border-teal-300 bg-teal-50 rounded-xl">
          <h2 className="mb-4 text-3xl font-extrabold text-green-700">
            Episode Match Found!
          </h2>
          <h3 className="mb-2 text-2xl font-bold text-gray-900">
            {result.title}
          </h3>
          <p className="pt-3 mt-3 mb-6 italic text-gray-600 border-t">
            {result.description}
          </p>
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className={PRIMARY_BUTTON_STYLE}
          >
            Listen to the Episode Now
          </a>
          <button
            onClick={resetQuiz}
            className="block w-full mt-4 text-sm text-teal-600 transition duration-300 hover:text-teal-800"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-3xl p-8 transition-all duration-500 ease-in-out bg-white shadow-2xl rounded-xl">
          {content}
        </div>
      </div>
    </div>
  );
}
