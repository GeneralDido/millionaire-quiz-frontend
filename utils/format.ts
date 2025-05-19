// utils/format.ts
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'N/A';

  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
