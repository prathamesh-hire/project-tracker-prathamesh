'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Project } from '@/types/project';
import { STATUS } from '@/components/constants';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function EditProjectForm({
  project,
  onDone,
}: {
  project: Project;
  onDone: () => void;
}) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || '');
  const [notes, setNotes] = useState(project.notes || '');
  const [status, setStatus] = useState(project.status);
  const [dueDate, setDueDate] = useState(project.due_date || '');
  const [loading, setLoading] = useState(false);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase
      .from('projects')
      .update({
        name,
        description: description || null,
        notes: notes || null,
        status,
        due_date: dueDate || null,
      })
      .eq('id', project.id);
    setLoading(false);
    onDone(); // closes modal & refreshes list
  }

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <h2 className="text-xl font-bold">Edit project</h2>

      {/* name */}
      <input
        className="input w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      {/* description */}
      <textarea
        className="textarea w-full"
        rows={2}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* notes */}
      <textarea
        className="textarea w-full"
        rows={2}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      {/* status + date */}
      <div className="flex gap-4">
        <select
          className="select flex-1"
          value={status}
          onChange={(e) => setStatus(e.target.value as Project['status'])}
        >
          {STATUS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <input
          type="date"
          className="input flex-1"
          value={dueDate ?? ''}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onDone}
          className="btn-secondary px-4 py-2"
        >
          Cancel
        </button>
        <button
          className="btn-primary px-4 py-2"
          disabled={loading}
        >
          {loading ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  );
}
