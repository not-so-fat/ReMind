'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getQuizStatus } from '@/lib/engine/status';
import type { StatusCategory } from '@/lib/engine/status';
import { TargetConfigSchema, DEFAULT_CONFIG } from '@/lib/validation/config';

interface SessionState {
  queue: string[];
  choices: Array<{ quizId: string; answer: string }>;
  currentQuiz: {
    id: string;
    question: string;
    numTrials: number;
    numSuccess: number;
  } | null;
  recentAnsweredIds: string[];
}

interface Target {
  id: string;
  name: string;
}

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const targetId = params.id as string;

  const [target, setTarget] = useState<Target | null>(null);
  const [session, setSession] = useState<SessionState | null>(null);
  const [loading, setLoading] = useState(true);
  const [answering, setAnswering] = useState(false);
  const [lastResult, setLastResult] = useState<{
    correct: boolean;
    acceptedAnswers: string[];
    userAnswer: string;
    statusChanged: boolean;
  } | null>(null);
  const [choicesForFeedback, setChoicesForFeedback] = useState<Array<{ quizId: string; answer: string }> | null>(null);
  const [todayTrials, setTodayTrials] = useState(0);
  const [stats, setStats] = useState<{
    totalQuizzes: number;
    categoryCounts: Record<StatusCategory, number>;
  } | null>(null);
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    if (targetId) {
      loadTarget();
      loadStats();
      initSession();
      loadTodayTrials();
    }
  }, [targetId]);

  async function loadTarget() {
    try {
      const res = await fetch(`/api/targets/${targetId}`);
      const data = await res.json();
      setTarget(data.target);
      
      const loadedConfig = data.target.configJson
        ? TargetConfigSchema.parse(data.target.configJson)
        : DEFAULT_CONFIG;
      setConfig(loadedConfig);
    } catch (error) {
      console.error('Error loading target:', error);
    }
  }

  async function loadStats() {
    try {
      const res = await fetch(`/api/targets/${targetId}/stats`);
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }

  async function loadTodayTrials() {
    try {
      const res = await fetch(`/api/targets/${targetId}/stats`);
      const data = await res.json();
      if (data.todayTrials !== undefined) {
        setTodayTrials(data.todayTrials);
      }
    } catch (error) {
      console.error('Error loading today trials:', error);
    }
  }

  async function initSession() {
    setLoading(true);
    try {
      const res = await fetch(`/api/targets/${targetId}/session/init`, {
        method: 'POST',
      });
      const data = await res.json();
      
      if (!res.ok || data.error) {
        alert(`Error: ${data.error || 'Failed to initialize session'}`);
        return;
      }
      
      // Ensure all required fields are present
      if (!data.queue || !data.choices || !data.currentQuiz) {
        alert('Invalid session data received');
        return;
      }
      
      setSession({
        queue: data.queue || [],
        choices: data.choices || [],
        currentQuiz: data.currentQuiz,
        recentAnsweredIds: data.recentAnsweredIds || [],
      });
      setLastResult(null);
    } catch (error) {
      console.error('Error initializing session:', error);
      alert('Failed to initialize session. Please make sure you have imported quizzes.');
    } finally {
      setLoading(false);
    }
  }

  async function handleAnswer(answer: string) {
    if (!session || !session.currentQuiz || answering) return;

    setAnswering(true);
    setLastResult(null);

    try {
      const res = await fetch(`/api/targets/${targetId}/session/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: session.currentQuiz.id,
          answer,
          queue: session.queue,
          recentAnsweredIds: session.recentAnsweredIds,
        }),
      });

      const data = await res.json();
      
      // Store current choices and quiz for feedback display
      setChoicesForFeedback(session.choices);
      
      setLastResult({
        correct: data.correct,
        acceptedAnswers: data.acceptedAnswers,
        userAnswer: answer,
        statusChanged: data.updatedQuiz.statusChanged,
      });

      // Don't update session yet - keep everything as is during feedback
      // Reload today's trials count from the database
      await loadTodayTrials();
      await loadStats();

      // Clear result and update session (quiz and choices) after animation
      setTimeout(() => {
        setLastResult(null);
        setChoicesForFeedback(null);
        // Update session with new quiz and choices after feedback is cleared
        setSession({
          queue: data.queue,
          choices: data.choices,
          currentQuiz: data.currentQuiz,
          recentAnsweredIds: data.recentAnsweredIds,
        });
      }, 2000);
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setAnswering(false);
    }
  }


  function getStatusColor(status: StatusCategory): string {
    switch (status) {
      case 'New':
        return 'var(--card-gray)';
      case 'Wandering':
        return 'var(--card-red)';
      case 'Confident':
        return 'var(--card-green)';
    }
  }

  if (loading || !session || !target) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--cyber-dark)' }}>
        <div className="text-xl" style={{ color: 'var(--cyber-teal)' }}>Loading...</div>
      </div>
    );
  }

  const currentStatus = session.currentQuiz
    ? getQuizStatus(session.currentQuiz.numTrials, session.currentQuiz.numSuccess, config)
    : null;
  const successRate = session.currentQuiz
    ? session.currentQuiz.numTrials === 0
      ? 0
      : session.currentQuiz.numSuccess / session.currentQuiz.numTrials
    : 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--cyber-dark)', color: 'var(--cyber-teal)' }}>
      {/* Header */}
      <header className="border-b-2" style={{ borderColor: 'var(--cyber-teal)' }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg hover:underline"
            style={{ color: 'var(--cyber-gold)' }}
          >
            ← Back
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold" style={{ color: 'var(--cyber-gold)' }}>
              {target.name}
            </h1>
            {stats && (
              <p className="text-sm opacity-70">
                <span className="text-2xl font-bold">{stats.totalQuizzes}</span> quizzes | New: <span className="text-2xl font-bold">{stats.categoryCounts.New}</span> | Wandering: <span className="text-2xl font-bold">{stats.categoryCounts.Wandering}</span> | Confident: <span className="text-2xl font-bold">{stats.categoryCounts.Confident}</span>
              </p>
            )}
          </div>
          <Link
            href={`/targets/${targetId}/review`}
            className="text-lg hover:underline"
            style={{ color: 'var(--cyber-gold)' }}
          >
            Review →
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Today's Trials */}
        <div className="mb-8 text-center">
          <p className="text-lg opacity-80">Trials done today: <span className="text-4xl font-bold">{todayTrials}</span></p>
        </div>

        {/* Quiz Card */}
        {session.currentQuiz && (
          <div
            className="mb-8 p-8 rounded-lg border-2"
            style={{
              borderColor: currentStatus ? getStatusColor(currentStatus) : 'var(--cyber-teal)',
              backgroundColor: 'rgba(146, 228, 221, 0.05)',
            }}
          >
            <div className="mb-4">
              {currentStatus && (
                <span
                  className="inline-block px-3 py-1 rounded text-sm font-semibold mb-2"
                  style={{
                    backgroundColor: getStatusColor(currentStatus),
                    color: 'var(--cyber-dark)',
                  }}
                >
                  {currentStatus}
                </span>
              )}
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--cyber-gold)' }}>
              {session.currentQuiz.question}
            </h2>
            <div className="text-sm opacity-70">
              Success rate: <span className="text-2xl font-bold">{(successRate * 100).toFixed(0)}%</span> | Trials: <span className="text-2xl font-bold">{session.currentQuiz.numTrials}</span>
            </div>
          </div>
        )}

        {/* Answer Feedback - Fixed height container to prevent layout shift */}
        <div className="mb-8" style={{ minHeight: '80px' }}>
          {lastResult && (
            <div
              className={`p-4 rounded text-center ${
                lastResult.correct ? 'animate-pulse' : 'animate-bounce'
              }`}
              style={{
                backgroundColor: lastResult.correct ? 'var(--card-green)' : 'var(--card-red)',
                color: 'var(--cyber-dark)',
              }}
            >
              {lastResult.correct ? (
                <p className="font-bold">✓ Correct!</p>
              ) : (
                <>
                  <p className="font-bold">✗ Incorrect</p>
                  <p className="text-sm mt-2">Correct answer(s): {lastResult.acceptedAnswers.join(', ')}</p>
                </>
              )}
              {lastResult.statusChanged && (
                <p className="text-sm mt-2 font-bold">Status changed! 🎉</p>
              )}
            </div>
          )}
        </div>

        {/* Choices */}
        {(choicesForFeedback || session.choices) && (choicesForFeedback || session.choices)!.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(choicesForFeedback || session.choices)!.map((choice, idx) => {
            const isCorrect = lastResult?.correct && choice.answer === lastResult.userAnswer;
            const isWrong = !lastResult?.correct && choice.answer === lastResult?.userAnswer;
            const isAccepted = lastResult?.acceptedAnswers.includes(choice.answer);

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(choice.answer)}
                disabled={answering || !!lastResult}
                className="p-6 rounded-lg border-2 text-left transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative"
                style={{
                  borderColor:
                    isCorrect || isAccepted
                      ? 'var(--card-green)'
                      : isWrong
                      ? 'var(--card-red)'
                      : 'var(--cyber-teal)',
                  backgroundColor:
                    isCorrect || isAccepted
                      ? 'rgba(57, 255, 20, 0.2)'
                      : isWrong
                      ? 'rgba(249, 56, 109, 0.2)'
                      : 'rgba(146, 228, 221, 0.05)',
                }}
              >
                {choice.answer}
              </button>
            );
          })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg mb-4">No quizzes available</p>
            <p className="opacity-70 mb-4">Please import quizzes first to start practicing.</p>
            <Link
              href={`/targets/${targetId}/review`}
              className="px-6 py-3 rounded border-2 inline-block"
              style={{
                borderColor: 'var(--cyber-teal)',
                color: 'var(--cyber-teal)',
              }}
            >
              Import Quizzes
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

