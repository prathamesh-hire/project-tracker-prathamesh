// src/components/StatusColors.ts
export function statusColor(status: string): string {
  switch (status) {
    case 'Not Started':
      return 'border-l-4 !border-l-slate-300';
    case 'In Progress':
      return 'border-l-4 !border-l-amber-300';
    case 'Completed':
      return 'border-l-4 !border-l-emerald-400';
    default:
      return 'border-l-4 !border-l-slate-300';
  }
}
