'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { TargetConfigSchema, DEFAULT_CONFIG, type TargetConfig } from '@/lib/validation/config';

interface Target {
  id: string;
  name: string;
  configJson: unknown;
}

export default function SettingsPage() {
  const params = useParams();
  const router = useRouter();
  const targetId = params.id as string;

  const [target, setTarget] = useState<Target | null>(null);
  const [config, setConfig] = useState<TargetConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (targetId) {
      loadTarget();
    }
  }, [targetId]);

  async function loadTarget() {
    setLoading(true);
    try {
      const res = await fetch(`/api/targets/${targetId}`);
      const data = await res.json();
      setTarget(data.target);
      
      const loadedConfig = data.target.configJson
        ? TargetConfigSchema.parse(data.target.configJson)
        : DEFAULT_CONFIG;
      setConfig(loadedConfig);
    } catch (error) {
      console.error('Error loading target:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/targets/${targetId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config }),
      });

      if (res.ok) {
        alert('Settings saved successfully!');
        router.push(`/targets/${targetId}/practice`);
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || 'Failed to save settings'}`);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  }

  if (loading || !target) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--cyber-dark)' }}>
        <div className="text-xl" style={{ color: 'var(--cyber-teal)' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--cyber-dark)', color: 'var(--cyber-teal)' }}>
      {/* Header */}
      <header className="border-b-2" style={{ borderColor: 'var(--cyber-teal)' }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href={`/targets/${targetId}/practice`}
            className="text-lg hover:underline"
            style={{ color: 'var(--cyber-gold)' }}
          >
            ← Back
          </Link>
          <h1 className="text-xl font-bold" style={{ color: 'var(--cyber-gold)' }}>
            Settings - {target.name}
          </h1>
          <div style={{ width: '80px' }}></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSave}>
          <div className="space-y-8">
            {/* N: Minimum trials for status */}
            <div className="p-6 rounded-lg border-2" style={{ borderColor: 'var(--cyber-teal)' }}>
              <label className="block mb-2">
                <span className="text-lg font-semibold" style={{ color: 'var(--cyber-gold)' }}>
                  N: Minimum Trials for Status
                </span>
                <p className="text-sm opacity-70 mt-1">
                  Number of trials required before a quiz can be categorized as Wandering or Confident
                </p>
              </label>
              <input
                type="number"
                min="1"
                value={config.minTrialsForStatus}
                onChange={(e) =>
                  setConfig({ ...config, minTrialsForStatus: parseInt(e.target.value) || 1 })
                }
                className="mt-2 w-full px-4 py-2 rounded"
                style={{
                  backgroundColor: 'var(--cyber-dark)',
                  color: 'var(--cyber-teal)',
                  border: '1px solid var(--cyber-teal)',
                }}
              />
            </div>

            {/* M: Queue Size */}
            <div className="p-6 rounded-lg border-2" style={{ borderColor: 'var(--cyber-teal)' }}>
              <label className="block mb-2">
                <span className="text-lg font-semibold" style={{ color: 'var(--cyber-gold)' }}>
                  M: Queue Size (Number of Choices)
                </span>
                <p className="text-sm opacity-70 mt-1">
                  Number of quizzes in the queue; also the number of answer choices shown
                </p>
              </label>
              <input
                type="number"
                min="1"
                value={config.queueSize}
                onChange={(e) =>
                  setConfig({ ...config, queueSize: parseInt(e.target.value) || 1 })
                }
                className="mt-2 w-full px-4 py-2 rounded"
                style={{
                  backgroundColor: 'var(--cyber-dark)',
                  color: 'var(--cyber-teal)',
                  border: '1px solid var(--cyber-teal)',
                }}
              />
            </div>

            {/* C: Cooldown Turns */}
            <div className="p-6 rounded-lg border-2" style={{ borderColor: 'var(--cyber-teal)' }}>
              <label className="block mb-2">
                <span className="text-lg font-semibold" style={{ color: 'var(--cyber-gold)' }}>
                  C: Cooldown Turns
                </span>
                <p className="text-sm opacity-70 mt-1">
                  Number of turns before a quiz can appear again (session-scoped)
                </p>
              </label>
              <input
                type="number"
                min="0"
                value={config.cooldownTurns}
                onChange={(e) =>
                  setConfig({ ...config, cooldownTurns: parseInt(e.target.value) || 0 })
                }
                className="mt-2 w-full px-4 py-2 rounded"
                style={{
                  backgroundColor: 'var(--cyber-dark)',
                  color: 'var(--cyber-teal)',
                  border: '1px solid var(--cyber-teal)',
                }}
              />
            </div>

            {/* Category Weights */}
            <div className="p-6 rounded-lg border-2" style={{ borderColor: 'var(--cyber-teal)' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--cyber-gold)' }}>
                Category Selection Weights
              </h3>
              <p className="text-sm opacity-70 mb-4">
                Relative probability of selecting quizzes from each category (will be normalized)
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">
                    <span className="font-semibold">p_n: Weight for New</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={config.weightNew}
                    onChange={(e) =>
                      setConfig({ ...config, weightNew: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 rounded"
                    style={{
                      backgroundColor: 'var(--cyber-dark)',
                      color: 'var(--cyber-teal)',
                      border: '1px solid var(--cyber-teal)',
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2">
                    <span className="font-semibold">p_w: Weight for Wandering</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={config.weightWandering}
                    onChange={(e) =>
                      setConfig({ ...config, weightWandering: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 rounded"
                    style={{
                      backgroundColor: 'var(--cyber-dark)',
                      color: 'var(--cyber-teal)',
                      border: '1px solid var(--cyber-teal)',
                    }}
                  />
                </div>

                <div>
                  <label className="block mb-2">
                    <span className="font-semibold">p_c: Weight for Confident</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={config.weightConfident}
                    onChange={(e) =>
                      setConfig({ ...config, weightConfident: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 rounded"
                    style={{
                      backgroundColor: 'var(--cyber-dark)',
                      color: 'var(--cyber-teal)',
                      border: '1px solid var(--cyber-teal)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 rounded"
              style={{
                backgroundColor: 'var(--cyber-teal)',
                color: 'var(--cyber-dark)',
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.5 : 1,
              }}
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
            <button
              type="button"
              onClick={() => router.push(`/targets/${targetId}/practice`)}
              className="px-8 py-3 rounded border"
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
      </main>
    </div>
  );
}

