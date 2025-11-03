'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Target {
  id: string;
  name: string;
  createdAt: string;
  _count: {
    quizzes: number;
  };
}

export default function Home() {
  const [targets, setTargets] = useState<Target[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTargetName, setNewTargetName] = useState('');
  const [creating, setCreating] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [hasHeader, setHasHeader] = useState(false);

  useEffect(() => {
    fetchTargets();
  }, []);

  async function fetchTargets() {
    try {
      const res = await fetch('/api/targets');
      const data = await res.json();
      setTargets(data.targets || []);
    } catch (error) {
      console.error('Error fetching targets:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTarget(e: React.FormEvent) {
    e.preventDefault();
    if (!newTargetName.trim()) return;

    setCreating(true);
    try {
      // Create target first
      const createRes = await fetch('/api/targets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newTargetName.trim() }),
      });

      if (!createRes.ok) {
        const error = await createRes.json();
        alert(`Error: ${error.error || 'Failed to create target'}`);
        return;
      }

      const { target } = await createRes.json();

      // Import CSV if provided
      if (importFile) {
        const formData = new FormData();
        formData.append('file', importFile);
        formData.append('hasHeader', hasHeader.toString());

        const importRes = await fetch(`/api/targets/${target.id}/import`, {
          method: 'POST',
          body: formData,
        });

        if (!importRes.ok) {
          const error = await importRes.json();
          alert(`Target created but import failed: ${error.error || 'Failed to import CSV'}`);
        } else {
          const data = await importRes.json();
          alert(`Target created! Imported ${data.imported} quiz${data.imported !== 1 ? 'zes' : ''}`);
        }
      } else {
        alert('Target created! Import a CSV file to add quizzes.');
      }

      setNewTargetName('');
      setImportFile(null);
      setHasHeader(false);
      setShowCreateForm(false);
      await fetchTargets();
    } catch (error) {
      console.error('Error creating target:', error);
      alert('Failed to create target');
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl" style={{ color: 'var(--cyber-teal)' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 overflow-x-hidden" style={{ backgroundColor: 'var(--cyber-dark)', color: 'var(--cyber-teal)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8" style={{ color: 'var(--cyber-gold)' }}>
          ReMind
        </h1>
        <p className="text-sm md:text-lg mb-6 md:mb-8 opacity-80">
          Repeat to Remind - Helps you remember things through repetitive quiz training
        </p>

        {!showCreateForm ? (
          <button
            onClick={() => setShowCreateForm(true)}
            className="mb-6 md:mb-8 px-4 md:px-6 py-2 md:py-3 rounded border-2 text-sm md:text-base"
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
            + Create New Target
          </button>
        ) : (
          <form onSubmit={handleCreateTarget} className="mb-6 md:mb-8 p-4 md:p-6 rounded border-2" style={{ borderColor: 'var(--cyber-teal)' }}>
            <h2 className="text-lg md:text-xl mb-3 md:mb-4" style={{ color: 'var(--cyber-gold)' }}>Create New Target</h2>
            <input
              type="text"
              value={newTargetName}
              onChange={(e) => setNewTargetName(e.target.value)}
              placeholder="Target name (e.g., English practice)"
              className="w-full mb-4 px-4 py-2 rounded"
              style={{
                backgroundColor: 'var(--cyber-dark)',
                color: 'var(--cyber-teal)',
                border: '1px solid var(--cyber-teal)',
              }}
              autoFocus
            />
            <div className="mb-4">
              <label className="block mb-2 text-sm opacity-70">
                Import CSV file (optional, required for first import)
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                className="w-full"
              />
              <label className="flex items-center gap-2 mt-2 text-sm">
                <input
                  type="checkbox"
                  checked={hasHeader}
                  onChange={(e) => setHasHeader(e.target.checked)}
                />
                <span>First row is header</span>
              </label>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={creating || !newTargetName.trim()}
                className="px-6 py-2 rounded"
                style={{
                  backgroundColor: 'var(--cyber-teal)',
                  color: 'var(--cyber-dark)',
                  cursor: creating || !newTargetName.trim() ? 'not-allowed' : 'pointer',
                  opacity: creating || !newTargetName.trim() ? 0.5 : 1,
                }}
              >
                {creating ? 'Creating...' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewTargetName('');
                  setImportFile(null);
                  setHasHeader(false);
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {targets.map((target) => (
            <Link
              key={target.id}
              href={`/targets/${target.id}/practice`}
              className="p-4 md:p-6 rounded border-2 block transition-all hover:scale-105"
              style={{
                borderColor: 'var(--cyber-teal)',
                backgroundColor: 'rgba(146, 228, 221, 0.05)',
              }}
            >
              <h3 className="text-base md:text-xl font-semibold mb-2" style={{ color: 'var(--cyber-gold)' }}>
                {target.name}
              </h3>
              <p className="text-xs md:text-sm opacity-70">
                {target._count.quizzes} quiz{target._count.quizzes !== 1 ? 'zes' : ''}
              </p>
            </Link>
          ))}
        </div>

        {targets.length === 0 && !showCreateForm && (
          <div className="text-center py-12 opacity-60">
            <p className="text-lg mb-4">No targets yet</p>
            <p>Create your first target to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}
