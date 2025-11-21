import React from 'react';
import { Scene } from './components/Scene/Scene';
import { Terminal } from './components/UI/Terminal';
import { useStore } from './store/useStore';

export default function App() {
  const isTerminalOpen = useStore(s => s.isTerminalOpen);
  return (
    <>
      <Scene />
      {isTerminalOpen && <Terminal />}
    </>
  );
}
