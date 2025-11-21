import React, { useRef } from 'react';
import { GroupProps } from '@react-three/fiber';
import { PositionalAudio, useGLTF } from '@react-three/drei';
import { Group } from 'three';

type Props = GroupProps & {
  audio?: string;
  scale?: number;
};

export const BuildingBase: React.FC<Props> = ({ audio, scale = 1, ...props }) => {
  const groupRef = useRef<Group>(null);
  const gltf = useGLTF('/models/building.glb');

  return (
    <group ref={groupRef} {...props}>
      {/* Placeholder building geometry */}
      <primitive object={gltf.scene.clone(true)} scale={scale} />
      
      {/* Emissive marker box (remove when custom models have emissive materials) */}
      <mesh position={[0, 2.2 * scale, 0]}>
        <boxGeometry args={[1.4 * scale, 0.3 * scale, 1.4 * scale]} />
        <meshStandardMaterial emissive="#00ffff" emissiveIntensity={2} color="#020b0f" toneMapped={false} />
      </mesh>

      {/* Positional audio placeholder - Commented out until files exist to prevent crash */}
      {/* {audio && (
        <PositionalAudio
          url={audio}
          distance={15}
          autoplay={false}
          loop={false}
        />
      )} */}
    </group>
  );
};

useGLTF.preload('/models/building.glb');
