import React from 'react';
import { BuildingBase } from '../Buildings/BuildingBase';

export const DistrictB: React.FC = () => {
  return (
    <group>
      {/* Nexus Lab */}
      <BuildingBase 
        position={[28, 0, 32]} 
        audio="/audio/nexus_lab_log.mp3" 
      />
      
      {/* CyberGuard Hub */}
      <BuildingBase 
        position={[32, 0, 28]} 
        audio="/audio/cyberguard_hub_log.mp3" 
      />

      {/* GitHub Portal - Main Building */}
      <BuildingBase 
        position={[30, 0, 30]} 
        audio="/audio/github_portal_log.mp3"
        scale={1.5}
      />
    </group>
  );
};
