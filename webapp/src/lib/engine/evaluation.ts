import { db } from '../db';

/**
 * Evaluate if user answer matches any correct answer for the question.
 * Multiple quizzes can share the same question with different answers; all are valid.
 */
export async function evaluateAnswer(args: {
  targetId: string;
  quizId: string;
  userAnswer: string;
}): Promise<{ correct: boolean; acceptedAnswers: string[] }> {
  // Get the quiz to find its question
  const quiz = await db.quiz.findUnique({
    where: { id: args.quizId },
    select: { question: true },
  });

  if (!quiz) {
    throw new Error(`Quiz not found: ${args.quizId}`);
  }

  // Find all quizzes in this target with the same question
  const allAnswers = await db.quiz.findMany({
    where: {
      targetId: args.targetId,
      question: quiz.question,
    },
    select: { answer: true },
  });

  const acceptedAnswers = allAnswers.map((q) => q.answer);
  // Deduplicate answers to avoid repeated display
  const uniqueAcceptedAnswers = Array.from(new Set(acceptedAnswers));
  
  // Normalize for comparison (trim, lowercase)
  const normalizedUserAnswer = normalizeAnswer(args.userAnswer);
  const normalizedAccepted = uniqueAcceptedAnswers.map(normalizeAnswer);

  const correct = normalizedAccepted.includes(normalizedUserAnswer);

  return { correct, acceptedAnswers: uniqueAcceptedAnswers };
}

/**
 * Normalize answer for comparison: trim whitespace and lowercase.
 */
function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase();
}

/**
 * Record a trial for a quiz and update counters.
 */
export async function recordTrial(quizId: string, correct: boolean): Promise<void> {
  await db.$transaction(async (tx) => {
    // Create trial record
    await tx.trial.create({
      data: {
        quizId,
        success: correct,
      },
    });

    // Update quiz counters
    await tx.quiz.update({
      where: { id: quizId },
      data: {
        numTrials: { increment: 1 },
        numSuccess: correct ? { increment: 1 } : undefined,
      },
    });
  });
}

