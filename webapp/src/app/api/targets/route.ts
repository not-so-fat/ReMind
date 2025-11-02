import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { TargetConfigSchema, DEFAULT_CONFIG } from '@/lib/validation/config';

/**
 * GET /api/targets - List all targets
 */
export async function GET() {
  try {
    const targets = await db.target.findMany({
      include: {
        _count: {
          select: { quizzes: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ targets });
  } catch (error) {
    console.error('Error fetching targets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch targets' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/targets - Create a new target
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, config } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Target name is required' },
        { status: 400 }
      );
    }

    // Validate and merge config
    const validatedConfig = config
      ? TargetConfigSchema.parse(config)
      : DEFAULT_CONFIG;

    const target = await db.target.create({
      data: {
        name: name.trim(),
        configJson: validatedConfig,
      },
    });

    return NextResponse.json({ target }, { status: 201 });
  } catch (error) {
    if (error && typeof error === 'object' && 'issues' in error) {
      // Zod validation error
      return NextResponse.json(
        { error: 'Invalid configuration', details: error },
        { status: 400 }
      );
    }
    console.error('Error creating target:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Failed to create target', details: errorMessage },
      { status: 500 }
    );
  }
}

