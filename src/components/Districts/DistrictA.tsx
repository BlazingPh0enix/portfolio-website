import React from 'react';
import { BuildingBase } from '../Buildings/BuildingBase';

export const DistrictA: React.FC = () => {
  return (
    <group>
      {/* Kofuku Tower */}
      <BuildingBase 
        position={[-32, 0, -28]} 
        audio="/audio/kofuku_tower_log.mp3" 
        scale={1.2} // Slightly taller
      />
      
      {/* Smytten Depot */}
      <BuildingBase 
        position={[-28, 0, -32]} 
        audio="/audio/smytten_depot_log.mp3" 
      />
    </group>
  );
};
