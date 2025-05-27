import { supabase } from "@/lib/supabase";
import { StatusBadge } from "@/components/StatusBadge";
import { Project } from "@/types/project";
import { NewProjectForm } from '@/components/NewProjectForm';

export const revalidate = 30; // ISR every 30 s (optional)

export default async function Home() {
  // 1 · read & sort
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("due_date", { ascending: true, nullsFirst: false });

  if (error) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-bold mb-2">Projects</h1>
        <p className="text-red-500">Error: {error.message}</p>
      </main>
    );
  }

  const projects = (data as Project[]) ?? [];

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <NewProjectForm />
      
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-sm text-gray-500">
          Sorted by due date – newest tasks at the bottom.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="text-gray-500">
          No projects yet. Add one to get started!
        </p>
      ) : (
        <ul className="space-y-4">
          {projects.map((p) => (
            <li
              key={p.id}
              className="rounded-xl border border-gray-200 bg-white/5 backdrop-blur-sm p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-baseline justify-between">
                <h2 className="text-lg font-semibold">{p.name}</h2>
                <StatusBadge status={p.status} />
              </div>

              {/* description (if any) */}
              {p.description && (
                <p className="mt-1 text-sm text-gray-300">{p.description}</p>
              )}

              {/* notes (if any) */}
              {p.notes && (
                <p className="mt-1 text-sm italic text-gray-400">
                  📝 {p.notes}
                </p>
              )}

              {/* due-date line */}
              <div className="mt-1 text-sm text-gray-400">
                {p.due_date
                  ? `Due ${new Date(p.due_date).toLocaleDateString()}`
                  : "No due date"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
