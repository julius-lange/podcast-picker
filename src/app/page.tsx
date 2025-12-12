'use client';

import { useState, useCallback } from 'react';
// Assuming these files exist in your project structure:
import { QUESTIONS, PODCAST_MAP } from '@/data'; 
import { QuestionId, Answer, UserAnswers, PodcastEpisode } from '@/types'; 
import React from 'react'; // Import React for React.FC

// --- Constants ---
const NEXT_QUESTION_INDEX = 0;
const FINAL_STEP_INDEX = QUESTIONS.length; // Assumes 3 questions, so index 3

// Standard style for all primary action buttons (Start Quiz, Listen Now)
const PRIMARY_BUTTON_STYLE =
  "inline-block w-full py-3 px-4 bg-white text-green-700 font-bold border border-green-500 rounded-lg shadow-md hover:bg-green-50 hover:border-green-600 transition-all duration-300 ease-in-out text-xl";

// ===============================================
// ProgressIndicator component (Required for Home to compile)
// ===============================================
interface ProgressIndicatorProps {
  currentStep: number;
  finalStepIndex: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, finalStepIndex }) => (
  <div className="flex justify-between items-center mb-6">
    <div className="text-sm font-medium text-teal-600">
      Question {Math.min(currentStep + 1, finalStepIndex)} of {finalStepIndex}
    </div>
    <div className="flex space-x-2">
      {QUESTIONS.map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            index < currentStep
              ? 'bg-green-500' // Answered
              : index === currentStep
              ? 'bg-teal-600 ring-2 ring-teal-300' // Current
              : 'bg-gray-200' // Unanswered
          }`}
        />
      ))}
    </div>
  </div>
);


// ===============================================
// Home Component
// ===============================================
export default function Home() {
  // -1: Intro Screen, 0..2: Questions, 3: Result Screen
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [answers, setAnswers] = useState<UserAnswers>({ q1: null, q2: null, q3: null });
  const [result, setResult] = useState<PodcastEpisode | null>(null);

  const currentQuestion = currentStep >= 0 && currentStep < FINAL_STEP_INDEX ? QUESTIONS[currentStep] : null;

  // ===============================================
  // FIX: Refactored handleAnswer to ensure the final result calculation 
  // uses the non-stale, complete set of answers.
  // ===============================================
  const handleAnswer = useCallback((questionId: QuestionId, answer: Answer) => {

    // 1. Utility function to calculate the result
    const calculateResult = (finalAnswers: Record<QuestionId, Answer>) => {
      // Create the deterministic key, e.g., 'a-b-a'
      const key = `${finalAnswers.q1}-${finalAnswers.q2}-${finalAnswers.q3}`;
      const episode = PODCAST_MAP[key];

      // Prefixing the title with the brand name
      const finalEpisode: PodcastEpisode | null = episode
        ? {
            title: `BCG WomEmpowerment Podcast: ${episode.title}`,
            description: episode.description,
            url: episode.url,
          }
        : null;

      if (finalEpisode) {
        setResult(finalEpisode);
      } else {
        setResult({
          title: 'Error: Mapping Issue',
          description: 'The answers did not match a predefined podcast episode. Please contact support.',
          url: '#',
        });
      }
    };

    // Calculate the *new, complete* state of answers based on the current state and new answer
    const newAnswers: UserAnswers = {
        ...answers,
        [questionId]: answer,
    };
    
    // 3. Move to the next step
    const nextStep = currentStep + 1;

    if (nextStep < FINAL_STEP_INDEX) {
      // Still more questions to go
      setAnswers(newAnswers); // Update state with the new answer
      setCurrentStep(nextStep);
    } else {
      // All questions answered, time to calculate result
      // We use the locally created `newAnswers` to ensure we have the Q3 answer included.
      calculateResult(newAnswers as Record<QuestionId, Answer>); 
      setAnswers(newAnswers); // Final state update for completeness
      setCurrentStep(FINAL_STEP_INDEX); // Move to the "Result" step
    }
    
    // Dependency array is necessary to pick up the latest 'currentStep' and 'answers'
  }, [currentStep, answers]);


  const startQuiz = () => {
    setCurrentStep(NEXT_QUESTION_INDEX);
  };

  const resetQuiz = () => {
    setCurrentStep(-1); // Go back to the intro
    setAnswers({ q1: null, q2: null, q3: null });
    setResult(null);
  };

  // Determine content based on current step
  let content;

  if (currentStep === -1) {
    // --- Initial Introduction Screen (Celebratory Invite) ---
    content = (
      <div className="text-center p-8 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-teal-800 mb-4">
            BCG WomEmpowerment Podcast
        </h2>
        <p className="text-lg text-gray-600 mb-8 font-medium border-b pb-4 border-teal-100">
          Thank you for making our first year a tremendous success! To celebrate, answer three quick questions to find your perfect end-of-year episode recommendation.
        </p>
        <button
          onClick={startQuiz}
          className={PRIMARY_BUTTON_STYLE}
        >
          Start the Quiz
        </button>
      </div>
    );
  } else if (currentStep < FINAL_STEP_INDEX) {
    // --- Question Screen ---
    content = (
      // The 'key' prop forces React to re-render and re-apply the animation on step change
      <div key={currentStep} className="animate-fade-in">
        <header className="text-center mb-6 pb-4 border-b border-teal-100">
          <h1 className="text-3xl font-extrabold text-teal-800">
            Podcast Episode Finder
          </h1>
        </header>

        <div>
          <ProgressIndicator 
            currentStep={currentStep} 
            finalStepIndex={FINAL_STEP_INDEX} 
          />
          <div className="p-6 bg-teal-50 rounded-lg border-2 border-teal-200">
            <h2 className="text-xl font-bold mb-5 text-gray-800">
              {currentStep + 1}. {currentQuestion!.text}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Option A Button */}
              <button
                onClick={() => handleAnswer(currentQuestion!.id, 'a')}
                className="w-full py-3 px-4 bg-white text-teal-600 font-semibold border border-teal-300 rounded-lg shadow-sm hover:bg-teal-50 hover:border-teal-400 transition-all duration-200 ease-in-out text-left"
              >
                <span className="font-bold mr-2 text-teal-700">A:</span> {currentQuestion!.optionA}
              </button>

              {/* Option B Button */}
              <button
                onClick={() => handleAnswer(currentQuestion!.id, 'b')}
                className="w-full py-3 px-4 bg-white text-teal-600 font-semibold border border-teal-300 rounded-lg shadow-sm hover:bg-teal-50 hover:border-teal-400 transition-all duration-200 ease-in-out text-left"
              >
                <span className="font-bold mr-2 text-teal-700">B:</span> {currentQuestion!.optionB}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (currentStep === FINAL_STEP_INDEX && result) {
    // --- Result Screen (Styled like a question card) ---
    content = (
      <div key="result" className="animate-fade-in">
        <header className="text-center mb-6 pb-4 border-b border-teal-100">
          <h1 className="text-3xl font-extrabold text-teal-800">
            Your Recommendation
          </h1>
        </header>
        <div className="text-center p-6 bg-teal-50 border-4 border-teal-300 rounded-xl">
          <h2 className="text-3xl font-extrabold text-green-700 mb-4">
            Episode Match Found!
          </h2>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {result.title}
          </h3>
          <p className="text-gray-600 mb-6 italic border-t pt-3 mt-3">
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
            className="mt-4 block w-full text-sm text-teal-600 hover:text-teal-800 transition duration-300"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-xl p-8 transform transition-all duration-500 ease-in-out">
        {content}
      </div>
    </div>
  );
}