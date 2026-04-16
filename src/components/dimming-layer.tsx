'use client';

interface DimmingLayerProps {
  level: number;
  children: React.ReactNode;
}

export function DimmingLayer({ level, children }: DimmingLayerProps) {
  return (
    <div
      className="w-full h-full"
      style={{
        filter: `brightness(${level})`,
        transition: 'filter 0.8s ease-in-out',
      }}
    >
      {children}
    </div>
  );
}
