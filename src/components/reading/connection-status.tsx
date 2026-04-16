'use client';

type ConnectionState = 'connected' | 'degraded' | 'disconnected';

interface ConnectionStatusProps {
  state: ConnectionState;
}

export function ConnectionStatus({ state }: ConnectionStatusProps) {
  const colors = {
    connected: 'bg-green-500',
    degraded: 'bg-amber-glow',
    disconnected: 'bg-red-500',
  };

  const labels = {
    connected: 'Connected',
    degraded: 'Weak connection',
    disconnected: 'Disconnected',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${colors[state]}`} />
      <span className="text-warm-grey text-xs">{labels[state]}</span>
    </div>
  );
}
