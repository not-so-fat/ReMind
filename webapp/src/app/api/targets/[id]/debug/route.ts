import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getQuizStatus } from '@/lib/engine/status';
import type { StatusCategory } from '@/lib/engine/status';
import { TargetConfigSchema, DEFAULT_CONFIG } from '@/lib/validation/config';

/**
 * GET /api/targets/[id]/debug - Debug endpoint to see category distribution
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const target = await db.target.findUnique({
      where: { id },
      select: {
        id: true,
        configJson: true,
        quizzes: {
          select: {
            numTrials: true,
            numSuccess: true,
          },
        },
      },
    });

    if (!target) {
      return NextResponse.json({ error: 'Target not found' }, { status: 404 });
    }

    const config = target.configJson
      ? TargetConfigSchema.parse(target.configJson)
      : DEFAULT_CONFIG;

    // Count by category
    const categoryCounts: Record<StatusCategory, number> = {
      New: 0,
      Wandering: 0,
      Confident: 0,
    };

    for (const quiz of target.quizzes) {
      const status = getQuizStatus(quiz.numTrials, quiz.numSuccess, config);
      categoryCounts[status]++;
    }

    const total = target.quizzes.length;
    const percentages = {
      New: total > 0 ? (categoryCounts.New / total * 100).toFixed(1) : '0',
      Wandering: total > 0 ? (categoryCounts.Wandering / total * 100).toFixed(1) : '0',
      Confident: total > 0 ? (categoryCounts.Confident / total * 100).toFixed(1) : '0',
    };

    return NextResponse.json({
      totalQuizzes: total,
      categoryCounts,
      categoryPercentages: percentages,
      config: {
        weights: {
          New: config.weightNew,
          Wandering: config.weightWandering,
          Confident: config.weightConfident,
        },
      },
      note: 'Even with 10% weight for Confident, if most quizzes are Confident, you\'ll see them frequently.',
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to fetch debug info' },
      { status: 500 }
    );
  }
}

