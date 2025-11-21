import React, { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

const OFFSET = new THREE.Vector3(0, 3, 6); // above and behind
const DAMPING = 0.1; // 0..1

export const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const playerPos = useStore(s => s.playerPosition);
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    target.current.set(playerPos[0], playerPos[1], playerPos[2]).add(OFFSET);
    camera.position.lerp(target.current, DAMPING);
    camera.lookAt(playerPos[0], playerPos[1], playerPos[2]);
  });

  return null;
};
