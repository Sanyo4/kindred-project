import type { OwlState } from './types';

export function getOwlState(currentPage: number, totalPages: number): OwlState {
  const progress = currentPage / totalPages;
  if (progress <= 0.33) return 'awake';
  if (progress <= 0.66) return 'cosy';
  if (progress <= 0.9) return 'sleepy';
  return 'asleep';
}
