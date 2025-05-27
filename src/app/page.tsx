import { supabase } from "@/lib/supabase";
import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import { Project } from "@/types/project";
import { NewProjectForm } from "@/components/NewProjectForm";
import { statusColor } from "@/components/StatusColors";
import { ProjectCard } from "@/components/ProjectCard";
import { SignOutBtn } from "@/components/SignOutBtn";

export const revalidate = 30; // ISR every 30 s (optional)

export default async function Home() {
  const supabase = supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect("/sign-in");
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

      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-gray-500">
            Sorted by due date – newest tasks at the bottom.
          </p>
        </div>
        <SignOutBtn />   {/* ← button appears here */}
      </header>

      {projects.length === 0 ? (
        <p className="text-gray-500">
          No projects yet. Add one to get started!
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </ul>
      )}
    </main>
  );
}
