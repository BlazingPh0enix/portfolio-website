import React, { useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { DISTRICT_COORDS } from '../../data/districts';

export const NavigateOnCommand: React.FC = () => {
  const loc = useStore(s => s.currentLocation);
  const setPlayerPosition = useStore(s => s.setPlayerPosition);

  useEffect(() => {
    const p = DISTRICT_COORDS[loc];
    if (p) setPlayerPosition(p);
  }, [loc, setPlayerPosition]);

  return null;
};
