import React from 'react';

export const CityGround: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[120, 120]} />
      <meshStandardMaterial color="#111" metalness={0.2} roughness={0.8} />
    </mesh>
  );
};
