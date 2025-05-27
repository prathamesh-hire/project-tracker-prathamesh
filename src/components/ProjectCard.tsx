'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Project } from '@/types/project';
import { statusColor } from '@/components/StatusColors';
import { Modal } from '@/components/Modal';
import { EditProjectForm } from '@/components/EditProjectForm';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { supabaseBrowser } from '@/lib/supabase-browser';


// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

const supabase = supabaseBrowser();

export function ProjectCard({ project }: { project: Project }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    const ok = confirm('Delete this project?');
    if (!ok) return;
    await supabase.from('projects').delete().eq('id', project.id);
    router.refresh();
  }

  return (
    <>
      <li
        className={`card p-5 flex flex-col gap-2 ${statusColor(
          project.status
        )}`}
      >
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">{project.name}</h2>
          <div className="flex gap-2">
            {/* edit */}
            <button
              className="text-gray-400 hover:text-gray-200 transition"
              onClick={() => setOpen(true)}
              aria-label="Edit"
            >
              <Pencil size={16} strokeWidth={1.8} />
            </button>
            {/* delete */}
            <button
              className="text-gray-400 hover:text-red-400 transition"
              onClick={handleDelete}
              aria-label="Delete"
            >
              <Trash2 size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {project.description && (
          <p className="text-sm text-gray-300">{project.description}</p>
        )}
        {project.notes && (
          <p className="text-sm italic text-gray-400">📝 {project.notes}</p>
        )}
        <div className="text-sm text-gray-400">
          {project.due_date
            ? `Due ${new Date(project.due_date).toLocaleDateString()}`
            : 'No due date'}
        </div>
      </li>

      {/* modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <EditProjectForm
          project={project}
          onDone={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </Modal>
    </>
  );
}
