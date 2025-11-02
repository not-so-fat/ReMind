import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getQuizStatus } from '@/lib/engine/status';
import type { StatusCategory } from '@/lib/engine/status';
import { TargetConfigSchema, DEFAULT_CONFIG } from '@/lib/validation/config';

/**
 * GET /api/targets/[id]/stats - Get target statistics
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
        name: true,
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

    // Count trials done today (using UTC date)
    // Note: For timezone-aware "today", we'd need client timezone info
    const now = new Date();
    const todayStart = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0, 0, 0, 0
    ));

    const todayTrials = await db.trial.count({
      where: {
        quiz: {
          targetId: id,
        },
        createdAt: {
          gte: todayStart,
        },
      },
    });

    return NextResponse.json({
      totalQuizzes: target.quizzes.length,
      categoryCounts,
      todayTrials,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}

