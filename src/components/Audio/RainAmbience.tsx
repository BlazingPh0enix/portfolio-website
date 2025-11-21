import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const RainAmbience = () => {
  const { camera } = useThree();
  const soundRef = useRef<THREE.Audio | null>(null);
  const listenerRef = useRef<THREE.AudioListener | null>(null);

  useEffect(() => {
    // Reuse existing listener or create one
    let listener = camera.children.find((c: any) => (c as any).isAudioListener) as THREE.AudioListener | undefined;
    if (!listener) {
      listener = new THREE.AudioListener();
      camera.add(listener);
    }
    listenerRef.current = listener;

    const audio = new THREE.Audio(listener);
    soundRef.current = audio;
    const loader = new THREE.AudioLoader();
    let disposed = false;

    loader.load('/audio/rain_ambient.mp3', (buffer) => {
      if (disposed) return;
      audio.setBuffer(buffer);
      audio.setLoop(true);
      audio.setVolume(0.35);
      const play = () => {
        try { if (!audio.isPlaying) audio.play(); } catch {}
        window.removeEventListener('pointerdown', play);
        window.removeEventListener('keydown', play);
      };
      // On mobile, require user gesture
      window.addEventListener('pointerdown', play, { once: true });
      window.addEventListener('keydown', play, { once: true });
    });

    return () => {
      disposed = true;
      try { soundRef.current?.stop(); } catch {}
      // Keep listener on camera for other sounds (ThunderEffect)
      soundRef.current = null;
    };
  }, [camera]);

  return null;
};
