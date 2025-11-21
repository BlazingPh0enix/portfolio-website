import React, { useState, useRef, useEffect } from 'react';
import { parseCommand, helpText } from '../../utils/CommandParser';
import { useStore } from '../../store/useStore';

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>(["Sentient City Terminal v0.1", 'Type "help" for commands.']);
  const [input, setInput] = useState('');
  const setLocation = useStore(s => s.setLocation);
  const setLastCommand = useStore(s => s.setLastCommand);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight });
  }, [history]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const cmdText = input.trim();
    const result = parseCommand(cmdText);
    setLastCommand(cmdText);

    let output: string | null = null;
    switch (result.type) {
      case 'NAVIGATE':
        setLocation(result.target);
        output = `→ Navigating to ${result.target}`;
        break;
      case 'HELP':
        output = helpText();
        break;
      case 'LIST_LOCATIONS':
        output = 'DISTRICT_A, DISTRICT_B, DISTRICT_C, NEXUS_LAB, KOFUKU_TOWER, CYBERGUARD_HUB, GITHUB_PORTAL, SKILLS_PAVILION';
        break;
      case 'ABOUT':
        output = 'AI Engineer: MohammedAnas Shakil Kazi – Exploring autonomous systems & immersive UIs.';
        break;
      case 'OPEN_MODAL':
        output = 'Contact modal not implemented yet.';
        break;
      case 'DOWNLOAD_RESUME':
        output = 'Resume download not wired yet.';
        break;
      case 'CLEAR':
        setHistory([]);
        setInput('');
        return;
      case 'MESSAGE':
        output = result.content;
        break;
      case 'UNKNOWN':
        output = 'Unknown command. Type "help".';
        break;
    }

    setHistory(h => [...h, `$ ${cmdText}`, ...(output ? output.split('\n') : [])]);
    setInput('');
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-sm border-t border-cyan-500 font-mono text-sm">
      <div ref={terminalRef} className="max-h-52 overflow-y-auto p-3 terminal-scrollbar leading-relaxed">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">{line}</div>
        ))}
      </div>
      <form onSubmit={onSubmit} className="border-t border-cyan-700 flex">
        <span className="px-2 py-1 text-cyan-400">$</span>
        <input
          autoFocus
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none px-2 py-1 placeholder-gray-500"
          placeholder="enter command..."
        />
      </form>
    </div>
  );
};
