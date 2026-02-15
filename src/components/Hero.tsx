import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Terminal as TerminalIcon } from 'lucide-react';

function useTypingEffect(text: string, speed = 60, startDelay = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let charIndex = 0;

    const startTyping = () => {
      const type = () => {
        if (charIndex < text.length) {
          setDisplayed(text.slice(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(type, speed);
        } else {
          setDone(true);
        }
      };
      type();
    };

    timeout = setTimeout(startTyping, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function Hero() {
  const { displayed, done } = useTypingEffect('Architecting Intelligence.', 70, 2200);
  const [showInit, setShowInit] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setShowInit(true), 400);
      return () => clearTimeout(t);
    }
  }, [done]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[600px] bg-neon-cyan/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4
                      w-[400px] h-[400px] bg-neon-purple/[0.02] rounded-full blur-[100px] pointer-events-none" />

      {/* Boot sequence lines */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="font-mono text-[11px] text-gray-600 mb-8 text-center space-y-1"
      >
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          [BOOT] Loading neural interface...
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          [OK] Cognitive systems initialized
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
          [READY] Operator identified ▸
        </motion.p>
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8, ease: 'easeOut' }}
        className="font-mono text-4xl sm:text-5xl md:text-7xl font-bold text-center
                   tracking-tight leading-tight"
      >
        <span className="text-white">Mohammed</span>
        <span className="text-neon-cyan text-glow-cyan">Anas</span>
        <br />
        <span className="text-white text-3xl sm:text-4xl md:text-5xl">Shakil Kazi</span>
      </motion.h1>

      {/* Title */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        className="mt-4 font-mono text-sm sm:text-base text-gray-400 tracking-[0.3em] uppercase"
      >
        AI Engineer <span className="text-neon-purple">|</span> Python Specialist
      </motion.p>

      {/* Tagline with typing effect */}
      <div className="mt-8 h-10 flex items-center">
        <TerminalIcon size={16} className="text-neon-cyan mr-2 flex-shrink-0" />
        <span className="font-mono text-lg sm:text-xl text-neon-cyan text-glow-cyan">
          {displayed}
          <span className={`inline-block w-[2px] h-5 bg-neon-cyan ml-0.5 align-middle
                           ${done ? 'animate-pulse' : ''}`}
          />
        </span>
      </div>

      {/* System Initialize button */}
      {showInit && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() =>
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="mt-12 group relative px-8 py-3 font-mono text-sm tracking-widest
                     uppercase text-neon-cyan border border-neon-cyan/30 rounded-lg
                     hover:bg-neon-cyan/10 hover:border-neon-cyan/60
                     hover:shadow-neon-cyan transition-all duration-300 cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-2">
            {'>'} System_Initialize
            <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </span>
        </motion.button>
      )}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-gray-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
