import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Minus } from 'lucide-react';

/* ── Command output types ── */
interface OutputLine {
  text: string;
  type: 'input' | 'output' | 'accent' | 'success' | 'error' | 'progress';
}

/* ── Skill loading animation component ── */
function SkillProgressBar({
  name,
  level,
  delay,
}: {
  name: string;
  level: number;
  delay: number;
}) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += Math.random() * 15 + 5;
        if (current >= level) {
          current = level;
          setDone(true);
          clearInterval(interval);
        }
        setProgress(Math.round(current));
      }, 80);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [level, delay]);

  const filled = Math.round((progress / 100) * 20);
  const bar = '█'.repeat(filled) + '░'.repeat(20 - filled);

  return (
    <div className="font-mono text-xs">
      <span className="text-neon-cyan">{name.padEnd(22)}</span>
      <span className={done ? 'text-green-400' : 'text-yellow-400'}>{bar}</span>
      <span className="text-gray-400"> {progress}%</span>
      {done && <span className="text-green-400"> ✓</span>}
    </div>
  );
}

/* ── Command processor ── */
function processCommand(raw: string): OutputLine[] | 'clear' | 'skills' {
  const cmd = raw.trim().toLowerCase();

  if (cmd === '') return [];

  if (cmd === 'clear') return 'clear';

  if (cmd === 'help') {
    return [
      { text: '┌─────────────────────────────────────────┐', type: 'accent' },
      { text: '│  AVAILABLE COMMANDS                      │', type: 'accent' },
      { text: '├─────────────────────────────────────────┤', type: 'accent' },
      { text: '│  help          → Show this help menu     │', type: 'output' },
      { text: '│  whoami        → Operator profile        │', type: 'output' },
      { text: '│  projects      → Active deployments      │', type: 'output' },
      { text: '│  skills --all  → Arsenal diagnostic      │', type: 'output' },
      { text: '│  clear         → Purge terminal buffer   │', type: 'output' },
      { text: '└─────────────────────────────────────────┘', type: 'accent' },
    ];
  }

  if (cmd === 'whoami') {
    return [
      { text: '', type: 'output' },
      { text: '  ╔══════════════════════════════════════╗', type: 'accent' },
      { text: '  ║  OPERATOR DOSSIER                    ║', type: 'accent' },
      { text: '  ╠══════════════════════════════════════╣', type: 'accent' },
      { text: '  ║  Name   : MohammedAnas Shakil Kazi   ║', type: 'output' },
      { text: '  ║  Role   : AI Engineer                ║', type: 'output' },
      { text: '  ║  Focus  : Python • ML • RAG          ║', type: 'output' },
      { text: '  ║  Status : Active @ Journalyst        ║', type: 'success' },
      { text: '  ╚══════════════════════════════════════╝', type: 'accent' },
      { text: '', type: 'output' },
      {
        text: '  AI Engineer specializing in Python and Machine Learning.',
        type: 'output',
      },
      {
        text: '  Currently building intelligent systems that bridge the',
        type: 'output',
      },
      {
        text: '  gap between complex data and human psychology.',
        type: 'output',
      },
      { text: '', type: 'output' },
    ];
  }

  if (cmd === 'projects') {
    return [
      { text: '', type: 'output' },
      { text: '  ▸ ACTIVE DEPLOYMENTS', type: 'accent' },
      { text: '  ─────────────────────────────────────', type: 'output' },
      { text: '', type: 'output' },
      { text: '  [01] NexusAI', type: 'success' },
      { text: '       Multi-agent AI system for generating', type: 'output' },
      { text: '       strategic proposals.', type: 'output' },
      { text: '       Tags: Multi-Agent Systems • Python • Strategy', type: 'accent' },
      { text: '', type: 'output' },
      { text: '  [02] CyberGuard', type: 'success' },
      { text: '       Browser extension to detect cyberbullying', type: 'output' },
      { text: '       in real-time using a Bi-LSTM model.', type: 'output' },
      { text: '       Tags: Bi-LSTM • NLP • Browser Extension • Safety', type: 'accent' },
      { text: '', type: 'output' },
    ];
  }

  if (cmd === 'skills --all') {
    return 'skills';
  }

  return [
    {
      text: `  Command not recognized: "${raw.trim()}"`,
      type: 'error',
    },
    { text: '  Type "help" for available commands.', type: 'output' },
  ];
}

/* ── Skills panel that animates ── */
const SKILL_LIST = [
  { name: 'Python', level: 95 },
  { name: 'AI / ML', level: 88 },
  { name: 'RAG', level: 85 },
  { name: 'Deep Learning', level: 82 },
  { name: 'NLP', level: 80 },
  { name: 'Trading Psychology AI', level: 78 },
];

function SkillsOutput() {
  return (
    <div className="space-y-1 py-1">
      <p className="font-mono text-xs text-neon-cyan mb-2">
        {'  '}▸ ARSENAL DIAGNOSTIC — Loading modules...
      </p>
      {SKILL_LIST.map((s, i) => (
        <div key={s.name} className="pl-4">
          <SkillProgressBar name={s.name} level={s.level} delay={i * 300} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TERMINAL COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<(OutputLine | 'skills-widget')[]>([
    { text: 'Welcome to KAZI_OS v1.0', type: 'accent' },
    { text: 'Type "help" for available commands.', type: 'output' },
    { text: '', type: 'output' },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (!input.trim() && input === '') return;

    const inputLine: OutputLine = {
      text: `visitor@kazi-os:~$ ${input}`,
      type: 'input',
    };

    const result = processCommand(input);

    if (result === 'clear') {
      setHistory([]);
    } else if (result === 'skills') {
      setHistory((prev) => [...prev, inputLine, 'skills-widget']);
    } else {
      setHistory((prev) => [...prev, inputLine, ...result]);
    }

    if (input.trim()) {
      setCmdHistory((prev) => [input, ...prev]);
    }
    setHistoryIndex(-1);
    setInput('');
  }, [input]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const next = Math.min(historyIndex + 1, cmdHistory.length - 1);
        setHistoryIndex(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const next = historyIndex - 1;
        setHistoryIndex(next);
        setInput(cmdHistory[next]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const lineColor = (type: OutputLine['type']) => {
    switch (type) {
      case 'input':
        return 'text-gray-300';
      case 'accent':
        return 'text-neon-cyan';
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <>
      {/* ── Floating trigger button ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-24 md:bottom-24 right-6 z-50 w-12 h-12 rounded-xl
                       bg-dark-800/80 backdrop-blur-md border border-neon-cyan/20
                       flex items-center justify-center text-neon-cyan
                       hover:bg-neon-cyan/10 hover:border-neon-cyan/40 hover:shadow-neon-cyan
                       transition-all duration-300 cursor-pointer group"
            aria-label="Open terminal"
          >
            <TerminalIcon
              size={20}
              className="group-hover:scale-110 transition-transform"
            />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-xl border border-neon-cyan/20 animate-ping opacity-30" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Terminal window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[560px] z-50
                       max-h-[70vh] flex flex-col
                       rounded-2xl overflow-hidden
                       bg-[#0c0c0c]/95 backdrop-blur-xl
                       border border-neon-cyan/15
                       shadow-[0_0_40px_rgba(0,243,255,0.08),0_20px_60px_rgba(0,0,0,0.6)]"
          >
            {/* Scanline overlay on terminal */}
            <div
              className="absolute inset-0 pointer-events-none z-20 rounded-2xl overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="w-full h-full"
                style={{
                  background: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0, 243, 255, 0.015) 2px,
                    rgba(0, 243, 255, 0.015) 4px
                  )`,
                }}
              />
            </div>

            {/* ── Title bar ── */}
            <div className="relative z-30 flex items-center justify-between px-4 py-2.5
                            bg-dark-800/60 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-pointer"
                    aria-label="Close terminal"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors cursor-pointer"
                    aria-label="Minimize terminal"
                  />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-500 tracking-wider">
                  <TerminalIcon size={12} className="text-neon-cyan" />
                  KAZI_OS://terminal
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-gray-300 transition-colors cursor-pointer"
                  aria-label="Minimize"
                >
                  <Minus size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-600 hover:text-gray-300 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ── Terminal body ── */}
            <div
              ref={scrollRef}
              onClick={() => inputRef.current?.focus()}
              className="relative z-10 flex-1 overflow-y-auto p-4 font-mono text-xs
                         leading-relaxed cursor-text min-h-[200px]"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#00f3ff33 transparent' }}
            >
              {history.map((line, i) =>
                line === 'skills-widget' ? (
                  <SkillsOutput key={i} />
                ) : (
                  <p key={i} className={`${lineColor(line.type)} whitespace-pre`}>
                    {line.text || '\u00A0'}
                  </p>
                )
              )}

              {/* ── Input line ── */}
              <div className="flex items-center mt-1">
                <span className="text-green-400 mr-1.5 flex-shrink-0">
                  visitor@kazi-os:~$
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-gray-200 caret-neon-cyan
                             font-mono text-xs"
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                />
                <span className="w-[6px] h-3.5 bg-neon-cyan/80 animate-pulse ml-0.5" />
              </div>
            </div>

            {/* ── Status bar ── */}
            <div className="relative z-30 flex items-center justify-between px-4 py-1.5
                            bg-dark-800/40 border-t border-white/5
                            text-[10px] font-mono text-gray-600 tracking-wider">
              <span>UTF-8 • BASH</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                CONNECTED
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
