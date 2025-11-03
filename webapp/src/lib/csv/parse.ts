import Papa from 'papaparse';

export interface ParsedQuiz {
  question: string;
  answer: string;
}

/**
 * Normalize a string: trim, lowercase, Unicode normalize.
 */
export function normalizeString(str: string): string {
  return str
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase();
}

export interface ParseResult {
  quizzes: ParsedQuiz[];
  totalRows: number;
  skippedRows: number;
  uniqueEntries: number;
}

/**
 * Parse CSV file and extract quiz pairs.
 * @param csvContent Raw CSV string
 * @param hasHeader Whether first row is header (skip it)
 * @returns Parse result with quizzes and statistics
 */
export function parseCSV(csvContent: string, hasHeader: boolean = false): ParseResult {
  const result = Papa.parse<string[]>(csvContent, {
    header: false,
    skipEmptyLines: true,
    transform: (value) => value.trim(),
  });

  if (result.errors.length > 0) {
    throw new Error(`CSV parsing errors: ${result.errors.map((e) => e.message).join(', ')}`);
  }

  const rows = result.data;
  if (rows.length === 0) {
    throw new Error('CSV file is empty');
  }

  // Skip header if present
  const dataRows = hasHeader ? rows.slice(1) : rows;
  const totalRows = dataRows.length;

  const quizzes: ParsedQuiz[] = [];
  const seen = new Set<string>(); // For deduplication
  let skippedRows = 0;

  for (const row of dataRows) {
    if (row.length < 2) {
      skippedRows++;
      continue; // Skip rows without at least 2 columns
    }

    const question = row[0]?.trim();
    const answer = row[1]?.trim();

    if (!question || !answer) {
      skippedRows++;
      continue; // Skip rows with empty question or answer
    }

    // Normalize for deduplication check
    const normalizedQuestion = normalizeString(question);
    const normalizedAnswer = normalizeString(answer);
    const key = `${normalizedQuestion}|${normalizedAnswer}`;

    if (!seen.has(key)) {
      seen.add(key);
      quizzes.push({
        question: question, // Store original (not normalized) for display
        answer: answer,
      });
    } else {
      skippedRows++; // Count duplicates as skipped
    }
  }

  return {
    quizzes,
    totalRows,
    skippedRows,
    uniqueEntries: quizzes.length,
  };
}

/**
 * Validate that we have at least minQuizzes quizzes.
 */
export function validateMinimumQuizzes(
  quizzes: ParsedQuiz[],
  minQuizzes: number
): void {
  if (quizzes.length < minQuizzes) {
    throw new Error(
      `Insufficient unique quizzes: found ${quizzes.length}, required at least ${minQuizzes}`
    );
  }
}

