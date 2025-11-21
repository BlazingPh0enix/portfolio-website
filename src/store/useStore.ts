import { create } from 'zustand';

export type LocationKey = 'DISTRICT_A' | 'DISTRICT_B' | 'DISTRICT_C' | 'NEXUS_LAB' | 'KOFUKU_TOWER' | 'CYBERGUARD_HUB' | 'GITHUB_PORTAL' | 'SKILLS_PAVILION';

interface AppState {
  currentLocation: LocationKey;
  isTerminalOpen: boolean;
  playerPosition: [number, number, number];
  setLocation: (loc: LocationKey) => void;
  toggleTerminal: () => void;
  openTerminal: () => void;
  closeTerminal: () => void;
  lastCommand: string | null;
  joystickInput: { x: number; y: number };
  setLastCommand: (cmd: string | null) => void;
  setPlayerPosition: (pos: [number, number, number]) => void;
  setJoystickInput: (input: { x: number; y: number }) => void;
}

export const useStore = create<AppState>((set) => ({
  currentLocation: 'DISTRICT_C',
  isTerminalOpen: true,
  playerPosition: [0, 0, 0],
  lastCommand: null,
  joystickInput: { x: 0, y: 0 },
  setLocation: (loc) => set({ currentLocation: loc }),
  toggleTerminal: () => set(s => ({ isTerminalOpen: !s.isTerminalOpen })),
  openTerminal: () => set({ isTerminalOpen: true }),
  closeTerminal: () => set({ isTerminalOpen: false }),
  setLastCommand: (cmd) => set({ lastCommand: cmd }),
  setPlayerPosition: (pos) => set({ playerPosition: pos }),
  setJoystickInput: (input) => set({ joystickInput: input })
}));
