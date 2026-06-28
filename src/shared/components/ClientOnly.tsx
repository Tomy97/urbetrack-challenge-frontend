import { useEffect, useState, type ReactNode } from 'react';

export function ClientOnly({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      fallback ?? (
        <div className="bg-muted/40 h-full min-h-[240px] animate-pulse rounded-xl" />
      )
    );
  }

  return children;
}
