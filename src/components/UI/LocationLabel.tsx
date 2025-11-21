import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

const NAMES: Record<string, string> = {
  DISTRICT_A: 'Experience District',
  DISTRICT_B: 'Projects District',
  DISTRICT_C: 'Central Plaza',
  NEXUS_LAB: 'Nexus Lab',
  KOFUKU_TOWER: 'Kofuku Tower',
  CYBERGUARD_HUB: 'CyberGuard Hub',
  GITHUB_PORTAL: 'GitHub Portal',
  SKILLS_PAVILION: 'Skills Pavilion'
};

export const LocationLabel: React.FC = () => {
  const loc = useStore(s => s.currentLocation);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(t);
  }, [loc]);

  return (
    <div className="pointer-events-none fixed top-4 left-1/2 -translate-x-1/2">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className="px-4 py-1 rounded bg-black/70 border border-cyan-700 text-cyan-200 shadow"
          >
            {NAMES[loc] ?? loc}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
