// src/components/StatusBadge.tsx
import clsx from 'clsx';

export function StatusBadge({ status }: { status: string }) {
  const color = {
    'Not Started':  'bg-gray-200 text-gray-800',
    'In Progress':  'bg-yellow-200 text-yellow-900',
    Completed:      'bg-green-200 text-green-900',
  }[status] ?? 'bg-gray-200 text-gray-800';

  return (
    <span
      className={clsx(
        'inline-block rounded-full px-2 py-0.5 text-xs font-medium',
        color
      )}
    >
      {status}
    </span>
  );
}
