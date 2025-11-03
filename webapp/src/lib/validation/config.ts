import { z } from 'zod';

export const TargetConfigSchema = z.object({
  minTrialsForStatus: z.number().int().positive().default(5), // N
  queueSize: z.number().int().positive().default(6), // M
  cooldownTurns: z.number().int().nonnegative().default(10), // C
  successRateThreshold: z.number().min(0).max(1).default(0.8), // Threshold for Confident status (default 80%)
  weightNew: z.number().nonnegative().default(0.4), // p_n
  weightWandering: z.number().nonnegative().default(0.5), // p_w
  weightConfident: z.number().nonnegative().default(0.1), // p_c
});

export type TargetConfig = z.infer<typeof TargetConfigSchema>;

export const DEFAULT_CONFIG: TargetConfig = {
  minTrialsForStatus: 5,
  queueSize: 6,
  cooldownTurns: 10,
  successRateThreshold: 0.8,
  weightNew: 0.4,
  weightWandering: 0.5,
  weightConfident: 0.1,
};

