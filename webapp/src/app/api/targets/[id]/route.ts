import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { TargetConfigSchema } from '@/lib/validation/config';

/**
 * GET /api/targets/[id] - Get a single target
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const target = await db.target.findUnique({
      where: { id },
      include: {
        _count: {
          select: { quizzes: true },
        },
      },
    });

    if (!target) {
      return NextResponse.json({ error: 'Target not found' }, { status: 404 });
    }

    return NextResponse.json({ target });
  } catch (error) {
    console.error('Error fetching target:', error);
    return NextResponse.json(
      { error: 'Failed to fetch target' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/targets/[id] - Update target config
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { config } = body;

    if (!config) {
      return NextResponse.json(
        { error: 'Config is required' },
        { status: 400 }
      );
    }

    const validatedConfig = TargetConfigSchema.parse(config);

    const target = await db.target.update({
      where: { id },
      data: {
        configJson: validatedConfig,
      },
    });

    return NextResponse.json({ target });
  } catch (error) {
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json(
        { error: 'Invalid configuration', details: error },
        { status: 400 }
      );
    }
    console.error('Error updating target:', error);
    return NextResponse.json(
      { error: 'Failed to update target' },
      { status: 500 }
    );
  }
}

