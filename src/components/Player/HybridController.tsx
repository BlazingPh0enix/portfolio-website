import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboardControls } from '../../hooks/useKeyboardControls';
import { useStore } from '../../store/useStore';

const SPEED = 5; // units per second
const CLICK_EPS = 0.1;

export const HybridController: React.FC = () => {
  const keys = useKeyboardControls();
  const { camera, size } = useThree();
  const setPlayerPosition = useStore(s => s.setPlayerPosition);
  const playerPos = useStore(s => s.playerPosition);
  const targetRef = useRef<THREE.Vector3>(new THREE.Vector3(playerPos[0], playerPos[1], playerPos[2]));
  const tmpVec = useRef(new THREE.Vector3()).current;
  const raycaster = useRef(new THREE.Raycaster()).current;
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)).current; // y=0 plane

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      // ignore clicks on inputs or UI
      const el = e.target as HTMLElement;
      if (el && (el.closest('input,textarea,button') || el.closest('.ignore-3d-click'))) return;
      const ndcX = (e.clientX / size.width) * 2 - 1;
      const ndcY = -(e.clientY / size.height) * 2 + 1;
      const ndc = new THREE.Vector2(ndcX, ndcY);
      raycaster.setFromCamera(ndc, camera);
      const hit = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, hit);
      if (isFinite(hit.x) && isFinite(hit.y) && isFinite(hit.z)) {
        targetRef.current.copy(hit);
      }
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [camera, plane, raycaster, size.width, size.height]);

  useFrame((_, dt) => {
    // Keyboard move vector
    const dir = tmpVec.set(0, 0, 0);
    if (keys.current['KeyW'] || keys.current['ArrowUp']) dir.z -= 1;
    if (keys.current['KeyS'] || keys.current['ArrowDown']) dir.z += 1;
    if (keys.current['KeyA'] || keys.current['ArrowLeft']) dir.x -= 1;
    if (keys.current['KeyD'] || keys.current['ArrowRight']) dir.x += 1;

    const p = tmpVec.set(playerPos[0], playerPos[1], playerPos[2]);

    if (dir.lengthSq() > 0) {
      dir.normalize().multiplyScalar(SPEED * dt);
      p.add(dir);
      // clicking target is overridden while using keyboard
      targetRef.current.copy(p);
    } else {
      // Click-to-move: move towards target
      const toTarget = tmpVec.copy(targetRef.current).sub(p);
      const dist = toTarget.length();
      if (dist > CLICK_EPS) {
        toTarget.normalize().multiplyScalar(Math.min(SPEED * dt, dist));
        p.add(toTarget);
      }
    }

    // Keep on ground plane and clamp world bounds
    p.y = 0;
    p.x = THREE.MathUtils.clamp(p.x, -55, 55);
    p.z = THREE.MathUtils.clamp(p.z, -55, 55);
    setPlayerPosition([p.x, p.y, p.z]);
  });

  return null;
};
