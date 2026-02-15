import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Briefcase,
  FolderGit2,
  Cpu,
  Mail,
  Menu,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero', label: 'HOME', icon: Home },
  { id: 'about', label: 'PROFILE', icon: User },
  { id: 'experience', label: 'LOG', icon: Briefcase },
  { id: 'projects', label: 'PROJECTS', icon: FolderGit2 },
  { id: 'skills', label: 'ARSENAL', icon: Cpu },
  { id: 'contact', label: 'CONNECT', icon: Mail },
];

export default function Navigation() {
  const [active, setActive] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { threshold: 0.35 }
    );

    sections.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Desktop HUD Dock (bottom center) ── */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex
                   glass-card rounded-2xl px-2 py-2 gap-1
                   shadow-[0_0_30px_rgba(0,243,255,0.1)]"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl
                         transition-all duration-300 group cursor-pointer
                         ${isActive
                           ? 'bg-neon-cyan/10 text-neon-cyan'
                           : 'text-gray-500 hover:text-neon-cyan/70'
                         }`}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-mono tracking-wider">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-neon-cyan rounded-full shadow-neon-cyan"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </motion.nav>

      {/* ── Mobile hamburger ── */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 right-4 z-50 md:hidden glass-card p-2.5 rounded-xl
                   text-neon-cyan border border-neon-cyan/20"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-dark-900/95 backdrop-blur-lg md:hidden
                       flex flex-col items-center justify-center gap-6"
          >
            {NAV_ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl text-lg font-mono
                             tracking-wider transition-colors cursor-pointer
                             ${active === item.id
                               ? 'text-neon-cyan text-glow-cyan'
                               : 'text-gray-400 hover:text-neon-cyan'
                             }`}
                >
                  <Icon size={22} />
                  {item.label}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Top HUD bar (status line) ── */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-30 h-8 bg-dark-900/80 backdrop-blur-md
                   border-b border-neon-cyan/5 flex items-center justify-between px-4
                   text-[10px] font-mono text-gray-600 tracking-widest"
      >
        <span>SYS://KAZI_PORTFOLIO <span className="text-neon-cyan">v1.0</span></span>
        <span className="hidden sm:inline">SECTOR: <span className="text-neon-cyan uppercase">{active}</span></span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          ONLINE
        </span>
      </motion.div>
    </>
  );
}
