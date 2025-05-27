'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/supabase-browser';   // ← new helper

const supabase = supabaseBrowser();

const STATUS = ['Not Started', 'In Progress', 'Completed'] as const;

export function NewProjectForm() {
  const router = useRouter();

  // ── form state ──────────────────────────────────────────────
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<(typeof STATUS)[number]>('Not Started');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── submit handler ──────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError('Name is required');

    setLoading(true);
    setError(null);

    /* 1️⃣ make sure we’re logged in and grab the UID */
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser();

    if (userErr || !user) {
      setLoading(false);
      return setError(userErr?.message ?? 'Not logged in');
    }

    /* 2️⃣ insert with user_id so RLS passes */
    const { error: insertErr } = await supabase.from('projects').insert({
      user_id: user.id,                 // ← critical for NOT-NULL + RLS
      name: name.trim(),
      description: description || null,
      notes: notes || null,
      status,
      due_date: dueDate || null,
    });

    setLoading(false);

    if (insertErr) {
      setError(insertErr.message);
      return;
    }

    /* 3️⃣ optimistic reset + refresh */
    setName('');
    setDescription('');
    setNotes('');
    setStatus('Not Started');
    setDueDate('');
    router.refresh();
  }

  // ── form UI ─────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="card mx-auto max-w-2xl p-8 space-y-6">
      <h2 className="text-xl font-bold">Add a new project</h2>

      {/* name */}
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

      {/* description */}
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea w-full"
          rows={2}
        />
      </div>

      {/* notes */}
      <div>
        <label className="block text-sm font-medium">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="textarea w-full"
          rows={2}
        />
      </div>

      {/* status & date */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as (typeof STATUS)[number])}
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

      <button type="submit" className="btn w-full" disabled={loading}>
        {loading ? 'Saving…' : 'Create Project'}
      </button>
    </form>
  );
}
