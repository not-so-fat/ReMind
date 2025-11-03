'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getQuizStatus } from '@/lib/engine/status';
import type { StatusCategory } from '@/lib/engine/status';
import { TargetConfigSchema, DEFAULT_CONFIG } from '@/lib/validation/config';
import Logo from '@/components/Logo';

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
  // During feedback, we freeze the current view and wait for explicit Next.
  // We store the next session snapshot returned by the server and apply it on Next.
  const [pendingAdvance, setPendingAdvance] = useState<{
    queue: string[];
    choices: Array<{ quizId: string; answer: string }>;
    currentQuiz: {
      id: string;
      question: string;
      numTrials: number;
      numSuccess: number;
    } | null;
    recentAnsweredIds: string[];
  } | null>(null);
  const [todayTrials, setTodayTrials] = useState(0);
  const [stats, setStats] = useState<{
    totalQuizzes: number;
    categoryCounts: Record<StatusCategory, number>;
  } | null>(null);
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [showReady, setShowReady] = useState(true);
  const [timeLimitSeconds, setTimeLimitSeconds] = useState<number | null>(5); // null = infinity, number = seconds
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentQuizTimerRef = useRef<string | null>(null);

  useEffect(() => {
    if (targetId) {
      loadTarget();
      loadStats();
      loadTodayTrials();
      // Don't initialize session until user clicks "Start" on ready screen
    }
  }, [targetId]);

  const handleTimeout = useCallback(async () => {
    if (!session || !session.currentQuiz || answering) return;

    // Clear timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    // Submit as incorrect answer
    setAnswering(true);
    setLastResult(null);

    try {
      const res = await fetch(`/api/targets/${targetId}/session/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: session.currentQuiz.id,
          answer: '', // Empty answer indicates timeout
          queue: session.queue,
          recentAnsweredIds: session.recentAnsweredIds,
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to submit timeout');
      }

      // For timeout, use empty string as userAnswer to distinguish from wrong answer
      // Filter acceptedAnswers to only show those from current choices
      const choiceAnswers = session.choices.map((c) => c.answer);
      const visibleAcceptedAnswers = (data.acceptedAnswers || []).filter((ans: string) =>
        choiceAnswers.includes(ans)
      );

      setLastResult({
        correct: false,
        acceptedAnswers: visibleAcceptedAnswers,
        userAnswer: '', // Empty string indicates timeout (not a selected wrong answer)
        statusChanged: data.updatedQuiz.statusChanged,
      });

      await loadTodayTrials();
      await loadStats();

      // Hold next session snapshot; apply on explicit Next
      setPendingAdvance({
        queue: data.queue,
        choices: data.choices,
        currentQuiz: data.currentQuiz,
        recentAnsweredIds: data.recentAnsweredIds,
      });
    } catch (error) {
      console.error('Error handling timeout:', error);
    } finally {
      setAnswering(false);
    }
  }, [session, targetId, timeLimitSeconds]);

  // Reset timer when new quiz appears and we're not in feedback
  useEffect(() => {
    if (!showReady && session?.currentQuiz && timeLimitSeconds !== null && !answering && !lastResult) {
      // Clear any existing timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      currentQuizTimerRef.current = null; // Reset quiz tracking
      setTimeRemaining(timeLimitSeconds);
    } else if (!showReady && session?.currentQuiz && timeLimitSeconds === null) {
      // No time limit (infinity)
      setTimeRemaining(null);
    }
  }, [session?.currentQuiz?.id, timeLimitSeconds, showReady, answering, lastResult]);

  // Timer effect - starts when quiz is shown and time limit is set
  useEffect(() => {
    const quizId = session?.currentQuiz?.id;
    const shouldStartTimer = !showReady && quizId && timeLimitSeconds !== null && timeRemaining !== null && timeRemaining > 0 && !answering && !lastResult;
    const timerAlreadyRunning = timerIntervalRef.current !== null && currentQuizTimerRef.current === quizId;

    // If timer should not be running, clear it
    if (!shouldStartTimer) {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        currentQuizTimerRef.current = null;
      }
      return;
    }

    // If timer is already running for this quiz, don't restart it
    if (timerAlreadyRunning) {
      return;
    }

    // Start new timer for this quiz
    currentQuizTimerRef.current = quizId;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          // Timeout! Call handleTimeout
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    timerIntervalRef.current = interval;

    return () => {
      if (timerIntervalRef.current === interval) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        currentQuizTimerRef.current = null;
      }
    };
  }, [showReady, session?.currentQuiz?.id, timeLimitSeconds, timeRemaining, answering, lastResult, handleTimeout]);

  async function loadTarget() {
    try {
      const res = await fetch(`/api/targets/${targetId}`);
      const data = await res.json();
      setTarget(data.target);
      
      const loadedConfig = data.target.configJson
        ? TargetConfigSchema.parse(data.target.configJson)
        : DEFAULT_CONFIG;
      setConfig(loadedConfig);
      setLoading(false); // Set loading to false once target is loaded
    } catch (error) {
      console.error('Error loading target:', error);
      setLoading(false);
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
      setTimeRemaining(timeLimitSeconds !== null ? timeLimitSeconds : null);
    } catch (error) {
      console.error('Error initializing session:', error);
      alert('Failed to initialize session. Please make sure you have imported quizzes.');
    } finally {
      setLoading(false);
    }
  }

  function handleStartPractice() {
    setShowReady(false);
    initSession();
  }
  
  async function handleAnswer(answer: string) {
    if (!session || !session.currentQuiz || answering) return;

    // Clear timer
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    setAnswering(true);
    setLastResult(null);
    setTimeRemaining(null);

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
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to submit answer');
      }
      
      // Filter acceptedAnswers to only show those from current choices
      const choiceAnswers = session.choices.map((c) => c.answer);
      const visibleAcceptedAnswers = (data.acceptedAnswers || []).filter((ans: string) =>
        choiceAnswers.includes(ans)
      );

      setLastResult({
        correct: data.correct,
        acceptedAnswers: visibleAcceptedAnswers,
        userAnswer: answer,
        statusChanged: data.updatedQuiz.statusChanged,
      });

      // Don't update session yet - keep everything as is during feedback
      // Reload today's trials count from the database
      await loadTodayTrials();
      await loadStats();

      // Hold next session snapshot; apply on explicit Next
      setPendingAdvance({
        queue: data.queue,
        choices: data.choices,
        currentQuiz: data.currentQuiz,
        recentAnsweredIds: data.recentAnsweredIds,
      });
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setAnswering(false);
    }
  }

  function handleNext() {
    if (!pendingAdvance) return;
    // Apply server-provided next state
    setSession({
      queue: pendingAdvance.queue,
      choices: pendingAdvance.choices,
      currentQuiz: pendingAdvance.currentQuiz,
      recentAnsweredIds: pendingAdvance.recentAnsweredIds,
    });
    setPendingAdvance(null);
    setLastResult(null);
    setTimeRemaining(timeLimitSeconds !== null ? timeLimitSeconds : null);
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

  // Ready screen - show before session is initialized
  if (showReady) {
    if (loading || !target) {
      return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--cyber-dark)' }}>
          <div className="text-xl" style={{ color: 'var(--cyber-teal)' }}>Loading...</div>
        </div>
      );
    }
    return (
      <div className="min-h-screen overflow-x-hidden flex items-center justify-center" style={{ backgroundColor: 'var(--cyber-dark)', color: 'var(--cyber-teal)' }}>
        <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: 'var(--cyber-gold)' }}>
              Ready?
            </h1>
          </div>
          
          <div className="p-6 md:p-8 rounded-lg border-2 mb-6" style={{ borderColor: 'var(--cyber-teal)' }}>
            <label className="block mb-4 text-lg md:text-xl font-semibold">
              Time Limit:
            </label>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="timeLimit"
                  value="5"
                  checked={timeLimitSeconds === 5}
                  onChange={() => setTimeLimitSeconds(5)}
                  className="w-5 h-5"
                  style={{
                    accentColor: 'var(--cyber-teal)',
                  }}
                />
                <span className="text-base md:text-lg">5 seconds</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="timeLimit"
                  value="10"
                  checked={timeLimitSeconds === 10}
                  onChange={() => setTimeLimitSeconds(10)}
                  className="w-5 h-5"
                  style={{
                    accentColor: 'var(--cyber-teal)',
                  }}
                />
                <span className="text-base md:text-lg">10 seconds</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="timeLimit"
                  value="infinity"
                  checked={timeLimitSeconds === null}
                  onChange={() => setTimeLimitSeconds(null)}
                  className="w-5 h-5"
                  style={{
                    accentColor: 'var(--cyber-teal)',
                  }}
                />
                <span className="text-base md:text-lg">No limit</span>
              </label>
            </div>
            
            {timeLimitSeconds !== null && (
              <p className="text-xs md:text-sm opacity-60 mt-4">
                If you don't answer in time, it will count as incorrect
              </p>
            )}
          </div>

          <div className="text-center">
            <button
              onClick={handleStartPractice}
              className="px-8 md:px-12 py-3 md:py-4 rounded text-lg md:text-xl font-bold"
              style={{
                backgroundColor: 'var(--cyber-teal)',
                color: 'var(--cyber-dark)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              Start Practice
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--cyber-dark)' }}>
        <div className="text-xl" style={{ color: 'var(--cyber-teal)' }}>Loading...</div>
      </div>
    );
  }

  // During feedback we keep showing the current session's quiz and choices until Next is clicked
  const displayQuiz = session?.currentQuiz;
  const currentStatus = displayQuiz
    ? getQuizStatus(displayQuiz.numTrials, displayQuiz.numSuccess, config)
    : null;
  const successRate = displayQuiz
    ? displayQuiz.numTrials === 0
      ? 0
      : displayQuiz.numSuccess / displayQuiz.numTrials
    : 0;

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--cyber-dark)', color: 'var(--cyber-teal)' }}>
      {/* Header */}
      <header className="border-b-2" style={{ borderColor: 'var(--cyber-teal)' }}>
        <div className="max-w-4xl mx-auto px-3 md:px-6">
          <div className="grid grid-cols-[auto_1fr_auto] gap-x-2 md:gap-x-4 py-2 md:py-2.5">
            {/* Logo - spans both rows */}
            <div className="row-span-2 flex items-start pt-1">
              <Logo href="/" />
            </div>
            {/* Top row: Title */}
            <div className="flex items-center justify-center">
              <h1 className="text-base md:text-xl font-bold text-center px-2" style={{ color: 'var(--cyber-gold)' }}>
                {target?.name ?? ''}
              </h1>
            </div>
            {/* Review button - spans both rows */}
            <div className="row-span-2 flex items-center">
              <Link
                href={`/targets/${targetId}/review`}
                className="text-base md:text-lg hover:underline flex-shrink-0"
                style={{ color: 'var(--cyber-gold)' }}
              >
                Review →
              </Link>
            </div>
            {/* Stats row */}
            {stats ? (
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs md:text-sm opacity-70">
                <span><span className="text-base md:text-2xl font-bold">{stats.totalQuizzes}</span> total</span>
                <span className="hidden sm:inline">|</span>
                <span>N: <span className="text-base md:text-2xl font-bold">{stats.categoryCounts.New}</span></span>
                <span>W: <span className="text-base md:text-2xl font-bold">{stats.categoryCounts.Wandering}</span></span>
                <span>C: <span className="text-base md:text-2xl font-bold">{stats.categoryCounts.Confident}</span></span>
              </div>
            ) : (
              <div></div>
            )}
            {/* Empty cell for grid alignment */}
            <div></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-3 md:px-6 py-4 md:py-8 pb-6">
        {/* Today's Trials */}
        <div className="mb-4 md:mb-8 text-center">
          <p className="text-sm md:text-lg opacity-80">Trials today: <span className="text-2xl md:text-4xl font-bold">{todayTrials}</span></p>
        </div>

        {/* Quiz Card - Relative for overlay */}
        {session.currentQuiz && (
          <div className="relative mb-4 md:mb-8">
            {(() => {
              const displayQuiz = session.currentQuiz;
              const displayStatus = displayQuiz
                ? getQuizStatus(displayQuiz.numTrials, displayQuiz.numSuccess, config)
                : null;
              const displaySuccessRate = displayQuiz
                ? displayQuiz.numTrials === 0
                  ? 0
                  : displayQuiz.numSuccess / displayQuiz.numTrials
                : 0;
              
              return (
                <div
                  className="p-4 md:p-8 rounded-lg border-2"
                  style={{
                    borderColor: displayStatus ? getStatusColor(displayStatus) : 'var(--cyber-teal)',
                    backgroundColor: 'rgba(146, 228, 221, 0.05)',
                  }}
                >
                  <div className="mb-2 md:mb-4">
                    {displayStatus && (
                      <span
                        className="inline-block px-2 md:px-3 py-1 rounded text-xs md:text-sm font-semibold mb-2"
                        style={{
                          backgroundColor: getStatusColor(displayStatus),
                          color: 'var(--cyber-dark)',
                        }}
                      >
                        {displayStatus}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <h2 className="text-xl md:text-3xl font-bold flex-1" style={{ color: 'var(--cyber-gold)' }}>
                      {displayQuiz?.question}
                    </h2>
                    {timeLimitSeconds !== null && timeRemaining !== null && !answering && !lastResult && (
                      <div
                        className="ml-4 px-3 md:px-4 py-1 md:py-2 rounded text-lg md:text-2xl font-bold"
                        style={{
                          backgroundColor: timeRemaining <= 2 ? 'var(--card-red)' : 'var(--cyber-teal)',
                          color: 'var(--cyber-dark)',
                          minWidth: '60px',
                          textAlign: 'center',
                        }}
                      >
                        {timeRemaining}
                      </div>
                    )}
                  </div>
                  <div className="text-xs md:text-sm opacity-70">
                    Success: <span className="text-lg md:text-2xl font-bold">{(displaySuccessRate * 100).toFixed(0)}%</span> | Trials: <span className="text-lg md:text-2xl font-bold">{displayQuiz?.numTrials || 0}</span>
                  </div>
                </div>
              );
            })()}

            {/* Answer Feedback - Overlay positioned absolutely */}
            {lastResult && (
              <div
                className={`absolute top-0 left-0 right-0 z-10 p-3 md:p-4 rounded text-center mx-3 md:mx-6 ${
                  lastResult.correct ? 'animate-pulse' : ''
                }`}
                style={{
                  backgroundColor: lastResult.correct ? 'var(--card-green)' : 'var(--card-red)',
                  color: 'var(--cyber-dark)',
                  marginTop: '-1rem',
                }}
              >
                {lastResult.correct ? (
                  <p className="font-bold text-sm md:text-base">✓ Correct!</p>
                ) : (
                  <>
                    <p className="font-bold text-sm md:text-base">
                      {lastResult.userAnswer === '' ? '⏱ Time\'s Up!' : '✗ Incorrect'}
                    </p>
                    <p className="text-xs md:text-sm mt-1 md:mt-2">Correct: {lastResult.acceptedAnswers.join(', ')}</p>
                  </>
                )}
                {lastResult.statusChanged && (
                  <p className="text-xs md:text-sm mt-1 md:mt-2 font-bold">Status changed! 🎉</p>
                )}
                <div className="mt-2">
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 rounded font-bold"
                    style={{
                      backgroundColor: 'var(--cyber-teal)',
                      color: 'var(--cyber-dark)',
                    }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Choices */}
        {session.choices && session.choices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pb-4">
              {session.choices.map((choice, idx) => {
            const isCorrect = lastResult?.correct && choice.answer === lastResult.userAnswer;
            const isWrong = !lastResult?.correct && choice.answer === lastResult?.userAnswer;
            const isAccepted = lastResult?.acceptedAnswers.includes(choice.answer);

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(choice.answer)}
                disabled={answering || !!lastResult}
                className="p-4 md:p-6 rounded-lg border-2 text-left transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed relative text-sm md:text-base min-h-[60px] md:min-h-[80px] flex items-center"
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

