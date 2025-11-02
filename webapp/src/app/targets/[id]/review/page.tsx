'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { StatusCategory } from '@/lib/engine/status';

interface ReviewData {
  totalTrials: number;
  categoryCounts: Record<StatusCategory, number>;
  dailyData: Array<{ date: string; count: number }>;
}

interface Target {
  id: string;
  name: string;
}

export default function ReviewPage() {
  const params = useParams();
  const targetId = params.id as string;

  const [target, setTarget] = useState<Target | null>(null);
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showImport, setShowImport] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [hasHeader, setHasHeader] = useState(false);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    if (targetId) {
      loadTarget();
      loadReviewData();
    }
  }, [targetId]);

  async function loadTarget() {
    try {
      const res = await fetch(`/api/targets/${targetId}`);
      const data = await res.json();
      setTarget(data.target);
    } catch (error) {
      console.error('Error loading target:', error);
    }
  }

  async function loadReviewData() {
    setLoading(true);
    try {
      const res = await fetch(`/api/targets/${targetId}/review`);
      const data = await res.json();
      setReviewData(data);
    } catch (error) {
      console.error('Error loading review data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleImport(e: React.FormEvent) {
    e.preventDefault();
    if (!importFile) return;

    setImporting(true);
    try {
      const formData = new FormData();
      formData.append('file', importFile);
      formData.append('hasHeader', hasHeader.toString());

      const res = await fetch(`/api/targets/${targetId}/import`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        alert(`Imported ${data.imported} quiz${data.imported !== 1 ? 'zes' : ''}`);
        setImportFile(null);
        setShowImport(false);
        await loadReviewData();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || 'Failed to import'}`);
      }
    } catch (error) {
      console.error('Error importing:', error);
      alert('Failed to import CSV');
    } finally {
      setImporting(false);
    }
  }

  if (loading || !target || !reviewData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--cyber-dark)' }}>
        <div className="text-xl" style={{ color: 'var(--cyber-teal)' }}>Loading...</div>
      </div>
    );
  }

  const maxDailyCount = Math.max(...reviewData.dailyData.map((d) => d.count), 1);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--cyber-dark)', color: 'var(--cyber-teal)' }}>
      {/* Header */}
      <header className="border-b-2" style={{ borderColor: 'var(--cyber-teal)' }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-lg hover:underline"
            style={{ color: 'var(--cyber-gold)' }}
          >
            ← Back
          </Link>
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold" style={{ color: 'var(--cyber-gold)' }}>
              {target.name} - Review
            </h1>
          </div>
          <Link
            href={`/targets/${targetId}/practice`}
            className="text-lg hover:underline"
            style={{ color: 'var(--cyber-gold)' }}
          >
            Practice →
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Settings Button - Top Right */}
        <div className="flex justify-end mb-6">
          <Link
            href={`/targets/${targetId}/settings`}
            className="px-4 py-2 rounded border-2 inline-block transition-all hover:scale-105"
            style={{
              borderColor: 'var(--cyber-teal)',
              color: 'var(--cyber-teal)',
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--cyber-teal)';
              e.currentTarget.style.color = 'var(--cyber-dark)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--cyber-teal)';
            }}
          >
            ⚙️ Settings
          </Link>
        </div>

        {/* Cumulative Trials */}
        <div className="mb-8 p-6 rounded-lg border-2" style={{ borderColor: 'var(--cyber-teal)' }}>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--cyber-gold)' }}>
            Cumulative Trials
          </h2>
          <p className="text-4xl font-bold">{reviewData.totalTrials}</p>
        </div>

        {/* Category Sizes */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--cyber-gold)' }}>
            Category Sizes
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div
              className="p-4 rounded-lg border-2 text-center"
              style={{ borderColor: 'var(--card-gray)' }}
            >
              <div className="text-sm opacity-70 mb-1">New</div>
              <div className="text-2xl font-bold">{reviewData.categoryCounts.New}</div>
            </div>
            <div
              className="p-4 rounded-lg border-2 text-center"
              style={{ borderColor: 'var(--card-red)' }}
            >
              <div className="text-sm opacity-70 mb-1">Wandering</div>
              <div className="text-2xl font-bold">{reviewData.categoryCounts.Wandering}</div>
            </div>
            <div
              className="p-4 rounded-lg border-2 text-center"
              style={{ borderColor: 'var(--card-green)' }}
            >
              <div className="text-sm opacity-70 mb-1">Confident</div>
              <div className="text-2xl font-bold">{reviewData.categoryCounts.Confident}</div>
            </div>
          </div>
        </div>

        {/* Daily Completion Chart */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--cyber-gold)' }}>
            Recent Daily Completion (Last 7 Days)
          </h2>
          <div className="p-6 rounded-lg border-2" style={{ borderColor: 'var(--cyber-teal)' }}>
            <div className="flex items-end justify-between gap-2 h-48">
              {reviewData.dailyData.map((day, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full rounded-t transition-all"
                    style={{
                      backgroundColor: 'var(--cyber-teal)',
                      height: `${(day.count / maxDailyCount) * 100}%`,
                      minHeight: day.count > 0 ? '4px' : '0',
                    }}
                  />
                  <div className="text-xs mt-2 opacity-70 text-center">
                    {new Date(day.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="text-xs font-bold mt-1">{day.count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Import More Quizzes */}
        <div className="mb-8">
          {!showImport ? (
            <button
              onClick={() => setShowImport(true)}
              className="px-6 py-3 rounded border-2"
              style={{
                borderColor: 'var(--cyber-teal)',
                color: 'var(--cyber-teal)',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--cyber-teal)';
                e.currentTarget.style.color = 'var(--cyber-dark)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--cyber-teal)';
              }}
            >
              Import More Quizzes (CSV)
            </button>
          ) : (
            <form onSubmit={handleImport} className="p-6 rounded border-2" style={{ borderColor: 'var(--cyber-teal)' }}>
              <h3 className="text-xl mb-4" style={{ color: 'var(--cyber-gold)' }}>
                Import CSV
              </h3>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                className="mb-4"
              />
              <label className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  checked={hasHeader}
                  onChange={(e) => setHasHeader(e.target.checked)}
                />
                <span>First row is header</span>
              </label>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={!importFile || importing}
                  className="px-6 py-2 rounded"
                  style={{
                    backgroundColor: 'var(--cyber-teal)',
                    color: 'var(--cyber-dark)',
                    cursor: !importFile || importing ? 'not-allowed' : 'pointer',
                    opacity: !importFile || importing ? 0.5 : 1,
                  }}
                >
                  {importing ? 'Importing...' : 'Import'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowImport(false);
                    setImportFile(null);
                  }}
                  className="px-6 py-2 rounded border"
                  style={{
                    borderColor: 'var(--cyber-teal)',
                    color: 'var(--cyber-teal)',
                    backgroundColor: 'transparent',
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

