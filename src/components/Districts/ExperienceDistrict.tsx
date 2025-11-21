import React, { useRef } from 'react';
import type { Group } from 'three';
import { GroupProps } from '@react-three/fiber';
import { PositionalAudio, useGLTF } from '@react-three/drei';
import { LocationKey } from '../../store/useStore';

// Placeholder GLB used for ALL buildings until individual models are ready.
// Replace `building.glb` with tower.glb, depot.glb, etc. when available.
// Each instance can have bespoke materials & emissive signage later.

type Props = GroupProps & { activeLocation: LocationKey };

interface BuildingDef {
  key: LocationKey;
  name: string;
  position: [number, number, number];
  audio?: string; // future positional audio log, currently not recorded
}

const BUILDINGS: BuildingDef[] = [
  // District A (Experience) near (-30, 0, -30)
  { key: 'KOFUKU_TOWER', name: 'Kofuku Tower', position: [-32, 0, -28], audio: '/audio/kofuku_tower_log.mp3' },
  { key: 'DISTRICT_A', name: 'Smytten Depot', position: [-28, 0, -32], audio: '/audio/smytten_depot_log.mp3' },
  // District B (Projects) near (30, 0, 30)
  { key: 'NEXUS_LAB', name: 'Nexus Lab', position: [28, 0, 32], audio: '/audio/nexus_lab_log.mp3' },
  { key: 'CYBERGUARD_HUB', name: 'CyberGuard Hub', position: [32, 0, 28], audio: '/audio/cyberguard_hub_log.mp3' },
  { key: 'GITHUB_PORTAL', name: 'GitHub Portal', position: [30, 0, 30], audio: '/audio/github_portal_log.mp3' },
  // District C (Central) near (0,0,0)
  { key: 'SKILLS_PAVILION', name: 'Skills Pavilion', position: [0, 0, 5], audio: '/audio/skills_plaza_log.mp3' },
];

export const ExperienceDistrict: React.FC<Props> = ({ activeLocation }) => {
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF('/models/building.glb'); // SINGLE placeholder model

  return (
    <group ref={groupRef}>
      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color="#111" metalness={0.2} roughness={0.8} />
      </mesh>

      {BUILDINGS.map(b => (
        <group key={b.key} position={b.position}>
          {/* Placeholder building geometry */}
          <primitive object={gltf.scene.clone(true)} scale={1} />
          {/* Emissive marker box (remove when custom models have emissive materials) */}
          <mesh position={[0, 2.2, 0]}>
            <boxGeometry args={[1.4, 0.3, 1.4]} />
            <meshStandardMaterial emissive="#00ffff" emissiveIntensity={2} color="#020b0f" toneMapped={false} />
          </mesh>
          {/* Positional audio placeholder: will be silent until actual recordings added */}
          {b.audio && (
            <PositionalAudio
              url={b.audio}
              distance={15}
              autoplay={false}
              loop={false}
            />
          )}
        </group>
      ))}
    </group>
  );
};

useGLTF.preload('/models/building.glb');
