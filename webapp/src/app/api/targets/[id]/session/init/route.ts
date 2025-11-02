import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fillQueue } from '@/lib/engine/queue';
import { TargetConfigSchema, DEFAULT_CONFIG } from '@/lib/validation/config';

/**
 * POST /api/targets/[id]/session/init - Initialize a practice session
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const target = await db.target.findUnique({
      where: { id },
      select: { id: true, configJson: true },
    });

    if (!target) {
      return NextResponse.json({ error: 'Target not found' }, { status: 404 });
    }

    const config = target.configJson
      ? TargetConfigSchema.parse(target.configJson)
      : DEFAULT_CONFIG;

    // Initialize queue (empty recentAnsweredIds for fresh session)
    const queueState = await fillQueue(id, [], [], config);

    // Get full quiz details for the current quiz (first in queue)
    if (!queueState.queue || queueState.queue.length === 0) {
      return NextResponse.json({ 
        error: 'No quizzes available. Please import quizzes first.' 
      }, { status: 400 });
    }

    const currentQuizId = queueState.queue[0];
    const currentQuiz = await db.quiz.findUnique({
      where: { id: currentQuizId },
      select: {
        id: true,
        question: true,
        numTrials: true,
        numSuccess: true,
      },
    });

    if (!currentQuiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 500 });
    }

    return NextResponse.json({
      queue: queueState.queue,
      choices: queueState.choices,
      currentQuiz: {
        id: currentQuiz.id,
        question: currentQuiz.question,
        numTrials: currentQuiz.numTrials,
        numSuccess: currentQuiz.numSuccess,
      },
      recentAnsweredIds: [],
    });
  } catch (error) {
    console.error('Error initializing session:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { 
        error: 'Failed to initialize session',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}

