import React, { useRef, useState } from 'react';
import { useStore } from '../../store/useStore';

const MAX_RADIUS = 50; // px

export const MobileJoystick: React.FC = () => {
  const setJoystickInput = useStore(s => s.setJoystickInput);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setActive(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!active || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate relative position
    let dx = e.clientX - rect.left - centerX;
    let dy = e.clientY - rect.top - centerY;
    
    // Clamp to radius
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > MAX_RADIUS) {
      const angle = Math.atan2(dy, dx);
      dx = Math.cos(angle) * MAX_RADIUS;
      dy = Math.sin(angle) * MAX_RADIUS;
    }
    
    setPosition({ x: dx, y: dy });
    
    // Normalize output -1 to 1
    setJoystickInput({ 
      x: dx / MAX_RADIUS, 
      y: dy / MAX_RADIUS 
    });
  };

  const handlePointerUp = () => {
    setActive(false);
    setPosition({ x: 0, y: 0 });
    setJoystickInput({ x: 0, y: 0 });
  };

  return (
    <div 
      className="fixed bottom-8 left-8 w-32 h-32 z-50 touch-none select-none"
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Base */}
      <div className="absolute inset-0 rounded-full bg-white/10 border-2 border-white/20 backdrop-blur-sm" />
      
      {/* Knob */}
      <div 
        className="absolute w-12 h-12 bg-cyan-500/80 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ 
          left: '50%', 
          top: '50%',
          transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))` 
        }}
      />
    </div>
  );
};
