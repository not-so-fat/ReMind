import type { StatusCategory } from './status';
import type { TargetConfig } from '../validation/config';

/**
 * Pick a category based on availability and weights, re-normalizing if needed.
 * If a category has no available quizzes, it's excluded and weights are re-normalized.
 */
export function pickCategory(
  available: Record<StatusCategory, number>,
  config: TargetConfig
): StatusCategory {
  // Filter out categories with 0 availability
  const availableCategories = (['New', 'Wandering', 'Confident'] as const).filter(
    (cat) => available[cat] > 0
  );

  if (availableCategories.length === 0) {
    throw new Error('No quizzes available in any category');
  }

  // If only one category available, pick it
  if (availableCategories.length === 1) {
    return availableCategories[0];
  }

  // Re-normalize weights for available categories
  const weights = {
    New: config.weightNew,
    Wandering: config.weightWandering,
    Confident: config.weightConfident,
  };

  let totalWeight = 0;
  for (const cat of availableCategories) {
    totalWeight += weights[cat];
  }

  if (totalWeight === 0) {
    // If all weights are 0, pick uniformly
    const randomIndex = Math.floor(Math.random() * availableCategories.length);
    return availableCategories[randomIndex];
  }

  // Normalize and pick by weight
  const random = Math.random();
  let cumulative = 0;

  // Sort categories in order for consistent selection
  for (const cat of availableCategories) {
    cumulative += weights[cat] / totalWeight;
    if (random <= cumulative) {
      return cat;
    }
  }

  // Fallback (shouldn't happen, but just in case)
  // This could happen due to floating point precision issues
  // Return the last category as fallback
  return availableCategories[availableCategories.length - 1];
}

