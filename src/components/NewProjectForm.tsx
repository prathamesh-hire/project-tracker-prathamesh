'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// one fresh client for the browser
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const STATUS = ['Not Started', 'In Progress', 'Completed'] as const;

export function NewProjectForm() {
  const router = useRouter();

  // form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<(typeof STATUS)[number]>('Not Started');
  const [dueDate, setDueDate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError('Name is required');

    setLoading(true);
    setError(null);

    const { error } = await supabase.from('projects').insert({
      name: name.trim(),
      description: description || null,
      notes: notes || null,
      status,
      due_date: dueDate || null,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // optimistic refresh
    setName('');
    setDescription('');
    setNotes('');
    setStatus('Not Started');
    setDueDate('');
    router.refresh(); // revalidate server component
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-gray-200 bg-white/5 p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold">Add a new project</h2>

      <div>
        <label className="block text-sm font-medium">Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input w-full"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea w-full"
          rows={2}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="textarea w-full"
          rows={2}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as (typeof STATUS)[number])
            }
            className="select w-full"
          >
            {STATUS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium">Due&nbsp;date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="input w-full"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        className="btn w-full"
        disabled={loading}
      >
        {loading ? 'Saving…' : 'Create Project'}
      </button>
    </form>
  );
}
