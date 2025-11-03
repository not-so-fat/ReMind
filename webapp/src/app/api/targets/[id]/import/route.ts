import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { parseCSV, validateMinimumQuizzes } from '@/lib/csv/parse';
import { TargetConfigSchema, DEFAULT_CONFIG } from '@/lib/validation/config';

/**
 * POST /api/targets/[id]/import - Import quizzes from CSV
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check target exists
    const target = await db.target.findUnique({
      where: { id },
      select: { id: true, configJson: true, _count: { select: { quizzes: true } } },
    });

    if (!target) {
      return NextResponse.json({ error: 'Target not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const hasHeader = formData.get('hasHeader') === 'true';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const csvContent = await file.text();
    const parseResult = parseCSV(csvContent, hasHeader);

    // Get config
    const config = target.configJson
      ? TargetConfigSchema.parse(target.configJson)
      : DEFAULT_CONFIG;

    // Check if this is the first import (no existing quizzes)
    const isFirstImport = target._count.quizzes === 0;
    if (isFirstImport) {
      const minRequired = config.queueSize + config.cooldownTurns;
      validateMinimumQuizzes(parseResult.quizzes, minRequired);
    }

    // Import quizzes (ignore duplicates due to unique constraint)
    let importedCount = 0;
    let skippedInDb = 0;
    for (const quiz of parseResult.quizzes) {
      try {
        await db.quiz.create({
          data: {
            targetId: id,
            question: quiz.question,
            answer: quiz.answer,
          },
        });
        importedCount++;
      } catch (error: any) {
        // Ignore unique constraint violations (duplicates)
        if (error?.code !== 'P2002') {
          throw error;
        }
        skippedInDb++;
      }
    }

    return NextResponse.json({
      imported: importedCount,
      totalRows: parseResult.totalRows,
      uniqueInFile: parseResult.uniqueEntries,
      skippedInFile: parseResult.skippedRows,
      skippedInDb: skippedInDb,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    console.error('Error importing CSV:', error);
    return NextResponse.json(
      { error: 'Failed to import CSV' },
      { status: 500 }
    );
  }
}

