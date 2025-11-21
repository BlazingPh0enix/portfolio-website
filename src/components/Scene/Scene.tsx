import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { DistrictA } from '../Districts/DistrictA';
import { DistrictB } from '../Districts/DistrictB';
import { DistrictC } from '../Districts/DistrictC';
import { CityGround } from './CityGround';
import { HybridController } from '../Player/HybridController';
import { CameraRig } from '../Player/CameraRig';
import { RainAmbience } from '../Audio/RainAmbience';
import { ThunderEffect } from '../Audio/ThunderEffect';
import { NavigateOnCommand } from '../Player/NavigateOnCommand';

export const Scene: React.FC = () => {
  return (
    <Canvas camera={{ position: [10, 8, 12], fov: 55 }} shadows dpr={[1, 1.5]}>
      <color attach="background" args={["#04040a"]} />
      <fog attach="fog" args={["#000428", 10, 100]} />
      {/* Basic lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[15, 25, 10]} intensity={1.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <Suspense fallback={null}>
        <CityGround />
        <DistrictA />
        <DistrictB />
        <DistrictC />
        {/* Environment HDRI (could be replaced later) */}
        <Environment preset="night" />
        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
        </EffectComposer>
      </Suspense>
      {/* Hybrid movement + camera follow */}
      <HybridController />
      <CameraRig />
      <NavigateOnCommand />
      {/* Ambient weather audio */}
      <RainAmbience />
      <ThunderEffect />
    </Canvas>
  );
};
