import React from 'react';
import { useStore } from '../../store/useStore';

// Simple 2D minimap: maps world [-60..60] to 120px square
const W = 120;
const HALF = 60;

function map(v: number) { return ((v + HALF) / (HALF * 2)) * W; }

export const Minimap: React.FC = () => {
  const player = useStore(s => s.playerPosition);

  const px = map(player[0]);
  const pz = map(player[2]);

  const marker = (x: number, z: number, color: string, size = 6) => (
    <div
      key={`${x}-${z}-${color}`}
      style={{ left: map(x) - size / 2, top: map(z) - size / 2, width: size, height: size }}
      className="absolute rounded-full"
    >
      <div style={{ background: color, width: '100%', height: '100%' }} />
    </div>
  );

  return (
    <div className="fixed right-3 bottom-24 bg-black/70 border border-cyan-700 rounded p-2">
      <div className="relative" style={{ width: W, height: W }}>
        {/* District markers */}
        {marker(-30, -30, '#0ff')}
        {marker(30, 30, '#0ff')}
        {marker(0, 0, '#0ff')}
        {/* Player marker */}
        <div
          style={{ left: px - 4, top: pz - 4, width: 8, height: 8 }}
          className="absolute rounded-full bg-amber-300 shadow"
          title="You"
        />
        {/* Border grid */}
        <div className="absolute inset-0 border border-cyan-900/60" />
      </div>
    </div>
  );
};
