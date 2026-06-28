export function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-AR').format(value);
}

export function formatRelativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'hoy';
  if (diffDays === 1) return 'hace 1 d';
  return `hace ${diffDays} d`;
}

export function formatCapacity(kg: number): string {
  return `${formatNumber(kg)} kg`;
}
