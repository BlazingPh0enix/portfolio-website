import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

function randomDelay() {
  return 20000 + Math.random() * 20000; // 20-40s
}

export const ThunderEffect = () => {
  const { camera } = useThree();
  const timer = useRef<number | null>(null);
  const soundRef = useRef<THREE.Audio | null>(null);

  useEffect(() => {
    // Ensure a single AudioListener on the camera
    let listener = camera.children.find((c: any) => (c as any).isAudioListener) as THREE.AudioListener | undefined;
    if (!listener) {
      listener = new THREE.AudioListener();
      camera.add(listener);
    }

    const audio = new THREE.Audio(listener);
    soundRef.current = audio;
    const loader = new THREE.AudioLoader();
    let loaded = false;
    let disposed = false;

    loader.load('/audio/thunder_distant.mp3', (buffer) => {
      if (disposed) return;
      audio.setBuffer(buffer);
      audio.setLoop(false);
      audio.setVolume(0.6);
      loaded = true;
    });

    const schedule = () => {
      if (!loaded) { timer.current = window.setTimeout(schedule, 1000); return; }
      timer.current = window.setTimeout(() => {
        try { if (!audio.isPlaying) audio.play(); } catch {}
        schedule();
      }, randomDelay());
    };

    // start scheduling after first user interaction (iOS)
    const start = () => { schedule(); cleanupStart(); };
    const cleanupStart = () => {
      window.removeEventListener('pointerdown', start);
      window.removeEventListener('keydown', start);
    };
    window.addEventListener('pointerdown', start);
    window.addEventListener('keydown', start);

    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      cleanupStart();
      try { soundRef.current?.stop(); } catch {}
      soundRef.current = null;
      disposed = true;
    };
  }, [camera]);

  return null;
};
