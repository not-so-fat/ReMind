import type { TargetConfig } from '../validation/config';

export type StatusCategory = 'New' | 'Wandering' | 'Confident';

/**
 * Compute quiz status category based on trial counts and config.
 */
export function getQuizStatus(
  numTrials: number,
  numSuccess: number,
  config: TargetConfig
): StatusCategory {
  if (numTrials < config.minTrialsForStatus) {
    return 'New';
  }

  const successRate = numSuccess / numTrials;
  return successRate < config.successRateThreshold ? 'Wandering' : 'Confident';
}

/**
 * Calculate success rate (0-1) from trial counts.
 */
export function getSuccessRate(numTrials: number, numSuccess: number): number {
  return numTrials === 0 ? 0 : numSuccess / numTrials;
}

