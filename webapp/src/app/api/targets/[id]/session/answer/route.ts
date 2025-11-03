import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { evaluateAnswer, recordTrial } from '@/lib/engine/evaluation';
import { fillQueue, updateRecentAnsweredIds } from '@/lib/engine/queue';
import { getQuizStatus } from '@/lib/engine/status';
import { TargetConfigSchema, DEFAULT_CONFIG } from '@/lib/validation/config';

/**
 * POST /api/targets/[id]/session/answer - Submit an answer and advance the session
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { quizId, answer, queue, recentAnsweredIds } = body;

    // Allow empty string for answer to represent timeout; ensure type is string
    if (!quizId || typeof answer !== 'string' || !Array.isArray(queue) || !Array.isArray(recentAnsweredIds)) {
      return NextResponse.json(
        { error: 'Missing required fields: quizId, answer (string), queue, recentAnsweredIds' },
        { status: 400 }
      );
    }

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

    // Evaluate answer (empty answer indicates timeout - treat as incorrect)
    const evaluation = await evaluateAnswer({
      targetId: id,
      quizId,
      userAnswer: answer || '___TIMEOUT___', // Use a placeholder that won't match any answer
    });
    // If timeout, force incorrect
    const isTimeout = !answer || answer === '';
    const finalCorrect = isTimeout ? false : evaluation.correct;

    // Record trial
    await recordTrial(quizId, finalCorrect);

    // Get updated quiz stats
    const updatedQuiz = await db.quiz.findUnique({
      where: { id: quizId },
      select: {
        id: true,
        numTrials: true,
        numSuccess: true,
      },
    });

    if (!updatedQuiz) {
      return NextResponse.json({ error: 'Quiz not found after update' }, { status: 500 });
    }

    const oldStatus = getQuizStatus(
      updatedQuiz.numTrials - 1,
      finalCorrect ? updatedQuiz.numSuccess - 1 : updatedQuiz.numSuccess,
      config
    );
    const newStatus = getQuizStatus(
      updatedQuiz.numTrials,
      updatedQuiz.numSuccess,
      config
    );
    const statusChanged = oldStatus !== newStatus;

    // Update recentAnsweredIds
    const updatedRecentAnsweredIds = updateRecentAnsweredIds(
      recentAnsweredIds,
      quizId,
      config.cooldownTurns
    );

    // Remove answered quiz from queue and choices
    const updatedQueue = queue.filter((qid: string) => qid !== quizId);
    
    // Fill queue back to M
    const newQueueState = await fillQueue(
      id,
      updatedQueue,
      updatedRecentAnsweredIds,
      config
    );

    // Get next quiz details
    const nextQuizId = newQueueState.queue[0];
    const nextQuiz = nextQuizId
      ? await db.quiz.findUnique({
          where: { id: nextQuizId },
          select: {
            id: true,
            question: true,
            numTrials: true,
            numSuccess: true,
          },
        })
      : null;

    return NextResponse.json({
      correct: finalCorrect,
      acceptedAnswers: evaluation.acceptedAnswers,
      updatedQuiz: {
        id: updatedQuiz.id,
        numTrials: updatedQuiz.numTrials,
        numSuccess: updatedQuiz.numSuccess,
        status: newStatus,
        statusChanged,
      },
      queue: newQueueState.queue,
      choices: newQueueState.choices,
      currentQuiz: nextQuiz
        ? {
            id: nextQuiz.id,
            question: nextQuiz.question,
            numTrials: nextQuiz.numTrials,
            numSuccess: nextQuiz.numSuccess,
          }
        : null,
      recentAnsweredIds: updatedRecentAnsweredIds,
    });
  } catch (error) {
    console.error('Error processing answer:', error);
    return NextResponse.json(
      { error: 'Failed to process answer' },
      { status: 500 }
    );
  }
}

