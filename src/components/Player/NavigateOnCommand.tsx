import React, { useEffect } from 'react';
import { useStore, LocationKey } from '../../store/useStore';

const COORDS: Record<LocationKey, [number, number, number]> = {
  DISTRICT_A: [-30, 0, -30],
  DISTRICT_B: [30, 0, 30],
  DISTRICT_C: [0, 0, 0],
  NEXUS_LAB: [28, 0, 32],
  KOFUKU_TOWER: [-32, 0, -28],
  CYBERGUARD_HUB: [32, 0, 28],
  GITHUB_PORTAL: [30, 0, 30],
  SKILLS_PAVILION: [0, 0, 5]
};

export const NavigateOnCommand: React.FC = () => {
  const loc = useStore(s => s.currentLocation);
  const setPlayerPosition = useStore(s => s.setPlayerPosition);

  useEffect(() => {
    const p = COORDS[loc];
    if (p) setPlayerPosition(p);
  }, [loc, setPlayerPosition]);

  return null;
};
