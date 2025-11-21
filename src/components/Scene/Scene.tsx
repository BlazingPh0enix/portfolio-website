import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ExperienceDistrict } from '../Districts/ExperienceDistrict';
import { useStore } from '../../store/useStore';

export const Scene: React.FC = () => {
  const location = useStore(s => s.currentLocation);

  return (
    <Canvas camera={{ position: [10, 8, 12], fov: 55 }} shadows dpr={[1, 1.5]}>
      <color attach="background" args={["#04040a"]} />
      <fog attach="fog" args={["#000428", 10, 100]} />
      {/* Basic lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[15, 25, 10]} intensity={1.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <Suspense fallback={null}>
        {/* Single district component currently hosts all placeholder buildings */}
        <ExperienceDistrict activeLocation={location} />
        {/* Environment HDRI (could be replaced later) */}
        <Environment preset="night" />
        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
        </EffectComposer>
      </Suspense>
      {/* Temporary controls for exploration; will be replaced by hybrid controller */}
      <OrbitControls makeDefault enablePan={false} />
    </Canvas>
  );
};
