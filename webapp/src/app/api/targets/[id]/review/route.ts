import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getQuizStatus } from '@/lib/engine/status';
import type { StatusCategory } from '@/lib/engine/status';
import { TargetConfigSchema, DEFAULT_CONFIG } from '@/lib/validation/config';

/**
 * GET /api/targets/[id]/review - Get review statistics
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

    let totalTrials = 0;
    for (const quiz of target.quizzes) {
      const status = getQuizStatus(quiz.numTrials, quiz.numSuccess, config);
      categoryCounts[status]++;
      totalTrials += quiz.numTrials;
    }

    // Get daily completion for last 7 days
    const now = new Date();
    // Get today's date in local timezone (for user's "today")
    const todayLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(todayLocal);
    sevenDaysAgo.setDate(todayLocal.getDate() - 7);

    const allTrials = await db.trial.findMany({
      where: {
        quiz: {
          targetId: id,
        },
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Initialize daily counts for last 7 days (including zeros)
    // Start from 6 days ago (i=6) and go to today (i=0)
    // After sorting, today will be the last item (rightmost on chart)
    const dailyCounts: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date(todayLocal);
      date.setDate(todayLocal.getDate() - i);
      // Format as YYYY-MM-DD using local date components
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateKey = `${year}-${month}-${day}`;
      dailyCounts[dateKey] = 0;
    }

    // Count trials by date (using local date for grouping)
    for (const trial of allTrials) {
      const trialDate = new Date(trial.createdAt);
      // Get local date components
      const year = trialDate.getFullYear();
      const month = String(trialDate.getMonth() + 1).padStart(2, '0');
      const day = String(trialDate.getDate()).padStart(2, '0');
      const dateKey = `${year}-${month}-${day}`;
      if (dailyCounts[dateKey] !== undefined) {
        dailyCounts[dateKey]++;
      }
    }

    // Convert to array format for charting (oldest to newest, with today on the right)
    const dailyData = Object.entries(dailyCounts)
      .sort() // Sorts dates ascending (oldest first, today last/rightmost)
      .map(([date, count]) => ({ date, count }));

    return NextResponse.json({
      totalTrials,
      categoryCounts,
      dailyData,
    });
  } catch (error) {
    console.error('Error fetching review data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch review data' },
      { status: 500 }
    );
  }
}

