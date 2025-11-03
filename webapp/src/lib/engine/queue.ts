import { db } from '../db';
import type { TargetConfig } from '../validation/config';
import { getQuizStatus } from './status';
import { pickCategory } from './category';
import type { StatusCategory } from './status';

export interface QueueState {
  queue: string[]; // quizIds
  choices: Array<{ quizId: string; answer: string }>;
}

/**
 * Get active quizzes for a target, excluding recently answered ones.
 * Returns quizzes grouped by status category.
 */
export async function getActiveQuizzesByCategory(
  targetId: string,
  recentAnsweredIds: string[],
  config: TargetConfig
): Promise<Record<StatusCategory, Array<{ id: string; question: string; answer: string }>>> {
  const allQuizzes = await db.quiz.findMany({
    where: {
      targetId,
      id: recentAnsweredIds.length > 0 ? { notIn: recentAnsweredIds } : undefined,
    },
    select: {
      id: true,
      question: true,
      answer: true,
      numTrials: true,
      numSuccess: true,
    },
  });

  // Group by status category
  const result: Record<StatusCategory, Array<{ id: string; question: string; answer: string }>> = {
    New: [],
    Wandering: [],
    Confident: [],
  };

  for (const quiz of allQuizzes) {
    const status = getQuizStatus(quiz.numTrials, quiz.numSuccess, config);
    result[status].push({
      id: quiz.id,
      question: quiz.question,
      answer: quiz.answer,
    });
  }

  return result;
}

/**
 * Fill queue with M quizzes, ensuring balance across categories.
 */
export async function fillQueue(
  targetId: string,
  currentQueue: string[],
  recentAnsweredIds: string[],
  config: TargetConfig
): Promise<QueueState> {
  // Get available quizzes by category
  const byCategory = await getActiveQuizzesByCategory(targetId, recentAnsweredIds, config);

  // Count available per category
  const available: Record<StatusCategory, number> = {
    New: byCategory.New.length,
    Wandering: byCategory.Wandering.length,
    Confident: byCategory.Confident.length,
  };

  // Check if there are any quizzes available at all
  const totalAvailable = Object.values(available).reduce((sum, count) => sum + count, 0);
  if (totalAvailable === 0) {
    // No quizzes available, return empty queue
    return { queue: [], choices: [] };
  }

  const queue: string[] = [...currentQueue];
  const choicesMap = new Map<string, string>(); // quizId -> answer

  // First, fetch answers for quizzes already in the queue
  if (queue.length > 0) {
    const existingQuizzes = await db.quiz.findMany({
      where: {
        id: { in: queue },
      },
      select: {
        id: true,
        answer: true,
      },
    });
    for (const quiz of existingQuizzes) {
      choicesMap.set(quiz.id, quiz.answer);
    }
  }

  // Fill up to M quizzes
  // Track how many from each category we've picked to respect weights
  const pickedCounts: Record<StatusCategory, number> = {
    New: 0,
    Wandering: 0,
    Confident: 0,
  };

  while (queue.length < config.queueSize) {
    // Check if any categories still have quizzes
    if (Object.values(available).every((count) => count === 0)) {
      break;
    }

    try {
      // Pick a category
      const category = pickCategory(available, config);

      // Get available quizzes in this category that aren't already in queue
      const candidates = byCategory[category].filter((q) => !queue.includes(q.id));

      if (candidates.length === 0) {
        // No more quizzes in this category, mark as unavailable
        available[category] = 0;
        continue;
      }

      // Pick one randomly
      const randomIndex = Math.floor(Math.random() * candidates.length);
      const selected = candidates[randomIndex];

      queue.push(selected.id);
      choicesMap.set(selected.id, selected.answer);
      pickedCounts[category]++;

      // Reduce availability count
      available[category]--;
    } catch (error) {
      // If pickCategory fails (no categories available), break
      break;
    }
  }

  // Build choices array from queue
  const choices = queue.map((quizId) => ({
    quizId,
    answer: choicesMap.get(quizId) || '', // Should always exist, but fallback for safety
  }));

  // Shuffle choices to randomize their positions
  const shuffledChoices = [...choices];
  for (let i = shuffledChoices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledChoices[i], shuffledChoices[j]] = [shuffledChoices[j], shuffledChoices[i]];
  }

  return { queue, choices: shuffledChoices };
}

/**
 * Update recentAnsweredIds: add the answered quiz and trim to C.
 */
export function updateRecentAnsweredIds(
  recentAnsweredIds: string[],
  answeredQuizId: string,
  cooldownTurns: number
): string[] {
  const updated = [...recentAnsweredIds, answeredQuizId];
  // Keep only the last C items
  return updated.slice(-cooldownTurns);
}

