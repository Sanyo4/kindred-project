import type React from 'react';

export function getDimmingLevel(currentPage: number, totalPages: number): number {
  const progress = currentPage / totalPages;
  if (progress <= 0.6) return 1.0;
  if (progress <= 0.75) return 0.85;
  if (progress <= 0.9) return 0.6;
  return 0.3;
}

export function getDimmingCSS(level: number): React.CSSProperties {
  return {
    filter: `brightness(${level})`,
    transition: 'filter 0.8s ease-in-out',
  };
}
