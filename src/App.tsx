import React, { useEffect, useState } from 'react';
import { Scene } from './components/Scene/Scene';
import { Terminal } from './components/UI/Terminal';
import { Minimap } from './components/UI/Minimap';
import { LocationLabel } from './components/UI/LocationLabel';
import { MobileJoystick } from './components/Player/MobileJoystick';
import { useStore } from './store/useStore';
import { isMobile } from './utils/DeviceDetector';

export default function App() {
  const isTerminalOpen = useStore(s => s.isTerminalOpen);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  return (
    <>
      <Scene />
      <LocationLabel />
      <Minimap />
      {mobile && <MobileJoystick />}
      {isTerminalOpen && <Terminal />}
    </>
  );
}
