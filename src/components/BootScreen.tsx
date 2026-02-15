import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: '> Initializing kernel modules...', delay: 0 },
  { text: '> Loading neural-net drivers...', delay: 400 },
  { text: '> Mounting cognitive filesystem...', delay: 800 },
  { text: '> Compiling interface shaders...', delay: 1200 },
  { text: '', delay: 1600 },
];

const MAIN_LINE = 'System.Initialize(MohammedAnas_Portfolio)...';

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedMain, setTypedMain] = useState('');
  const [showOk, setShowOk] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Show boot lines one by one
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((line, i) => {
      timers.push(
        setTimeout(() => setVisibleLines(i + 1), line.delay)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // After boot lines, type the main command
  useEffect(() => {
    if (visibleLines < BOOT_LINES.length) return;

    let charIdx = 0;
    const typeDelay = setTimeout(() => {
      const interval = setInterval(() => {
        charIdx++;
        setTypedMain(MAIN_LINE.slice(0, charIdx));
        if (charIdx >= MAIN_LINE.length) {
          clearInterval(interval);
          // Show [OK] after a short pause
          setTimeout(() => setShowOk(true), 300);
        }
      }, 40);
    }, 300);

    return () => clearTimeout(typeDelay);
  }, [visibleLines]);

  // After [OK] is shown, fade out and call onComplete
  useEffect(() => {
    if (!showOk) return;
    const t1 = setTimeout(() => setFadeOut(true), 800);
    const t2 = setTimeout(() => onComplete(), 1600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [showOk, onComplete]);

  return (
    <AnimatePresence>
      {!fadeOut ? (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center"
        >
          {/* Scanline effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 243, 255, 0.012) 2px,
                rgba(0, 243, 255, 0.012) 4px
              )`,
            }}
          />

          {/* Subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                          w-[400px] h-[400px] bg-neon-cyan/[0.02] rounded-full blur-[100px]" />

          <div className="relative max-w-lg w-full px-8">
            {/* Terminal frame */}
            <div className="rounded-xl border border-neon-cyan/10 bg-[#0a0a0a]/80 overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-1.5 px-4 py-2 bg-dark-800/50 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-3 font-mono text-[10px] text-gray-600 tracking-wider">
                  KAZI_OS://boot
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-6 font-mono text-xs sm:text-sm space-y-1.5 min-h-[200px]">
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-600"
                  >
                    {line.text}
                  </motion.p>
                ))}

                {/* Main initialization line */}
                {visibleLines >= BOOT_LINES.length && (
                  <p className="text-neon-cyan text-glow-cyan mt-3">
                    {'> '}
                    {typedMain}
                    {!showOk && (
                      <span className="inline-block w-[6px] h-3.5 bg-neon-cyan ml-0.5 align-middle animate-pulse" />
                    )}
                    {showOk && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-400 font-bold ml-1"
                      >
                        [OK]
                      </motion.span>
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* Loading bar at bottom */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: showOk ? '100%' : `${(visibleLines / BOOT_LINES.length) * 80}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-neon-cyan/60 to-neon-cyan rounded-full
                             shadow-[0_0_8px_rgba(0,243,255,0.4)]"
                />
              </div>
              <span className="font-mono text-[10px] text-gray-600 w-8 text-right">
                {showOk ? '100' : Math.round((visibleLines / BOOT_LINES.length) * 80)}%
              </span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
