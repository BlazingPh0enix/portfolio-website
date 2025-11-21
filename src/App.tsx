import React from 'react';
import { Scene } from './components/Scene/Scene';
import { Terminal } from './components/UI/Terminal';
import { Minimap } from './components/UI/Minimap';
import { LocationLabel } from './components/UI/LocationLabel';
import { useStore } from './store/useStore';

export default function App() {
  const isTerminalOpen = useStore(s => s.isTerminalOpen);
  return (
    <>
      <Scene />
      <LocationLabel />
      <Minimap />
      {isTerminalOpen && <Terminal />}
    </>
  );
}
