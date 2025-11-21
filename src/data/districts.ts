import { LocationKey } from '../store/useStore';

export const DISTRICT_COORDS: Record<LocationKey, [number, number, number]> = {
  DISTRICT_A: [-30, 0, -30],
  DISTRICT_B: [30, 0, 30],
  DISTRICT_C: [0, 0, 0],
  NEXUS_LAB: [28, 0, 32],
  KOFUKU_TOWER: [-32, 0, -28],
  CYBERGUARD_HUB: [32, 0, 28],
  GITHUB_PORTAL: [30, 0, 30],
  SKILLS_PAVILION: [0, 0, 5]
};

// Simple collision radius for each building
export const COLLIDERS: { position: [number, number, number], radius: number }[] = [
  { position: [-32, 0, -28], radius: 4 }, // Kofuku Tower
  { position: [-28, 0, -32], radius: 4 }, // Smytten Depot
  { position: [28, 0, 32], radius: 4 },   // Nexus Lab
  { position: [32, 0, 28], radius: 4 },   // CyberGuard Hub
  { position: [30, 0, 30], radius: 6 },   // GitHub Portal (larger)
  { position: [0, 0, 5], radius: 3 },     // Skills Pavilion
];
