import type { LocationKey } from '../store/useStore';

export type CommandResult =
  | { type: 'NAVIGATE'; target: LocationKey }
  | { type: 'HELP' }
  | { type: 'LIST_LOCATIONS' }
  | { type: 'ABOUT' }
  | { type: 'OPEN_MODAL'; modal: 'CONTACT' }
  | { type: 'DOWNLOAD_RESUME' }
  | { type: 'CLEAR' }
  | { type: 'MESSAGE'; content: string }
  | { type: 'UNKNOWN' };

export function parseCommand(input: string): CommandResult {
  const cmd = input.toLowerCase().trim();

  if (/^(goto|nav|cd)\s+(experience|exp|work|jobs?)$/.test(cmd)) {
    return { type: 'NAVIGATE', target: 'DISTRICT_A' };
  }
  if (/^(goto|nav|cd)\s+(projects?|github)$/.test(cmd)) {
    return { type: 'NAVIGATE', target: 'DISTRICT_B' };
  }
  if (/^(goto|nav|cd)\s+(skills?|about|center|home)$/.test(cmd)) {
    return { type: 'NAVIGATE', target: 'DISTRICT_C' };
  }
  if (/nexus/.test(cmd)) {
    return { type: 'NAVIGATE', target: 'NEXUS_LAB' };
  }
  if (/kofuku|tower/.test(cmd)) {
    return { type: 'NAVIGATE', target: 'KOFUKU_TOWER' };
  }
  if (/cyberguard|security/.test(cmd)) {
    return { type: 'NAVIGATE', target: 'CYBERGUARD_HUB' };
  }
  if (/github|portal/.test(cmd)) {
    return { type: 'NAVIGATE', target: 'GITHUB_PORTAL' };
  }
  if (/skills?|pavilion/.test(cmd)) {
    return { type: 'NAVIGATE', target: 'SKILLS_PAVILION' };
  }

  if (/^(help|\?)$/.test(cmd)) return { type: 'HELP' };
  if (/^(ls|list|dir)$/.test(cmd)) return { type: 'LIST_LOCATIONS' };
  if (/^whoami$/.test(cmd)) return { type: 'ABOUT' };
  if (/^(contact|email|linkedin)$/.test(cmd)) return { type: 'OPEN_MODAL', modal: 'CONTACT' };
  if (/^(resume|cv|download)$/.test(cmd)) return { type: 'DOWNLOAD_RESUME' };
  if (/^clear$/.test(cmd)) return { type: 'CLEAR' };
  if (/^(exit|quit|logout)$/.test(cmd)) return { type: 'MESSAGE', content: "Nice try. You can't escape the Sentient City. 🌃" };

  return { type: 'UNKNOWN' };
}

export function helpText() {
  return `NAVIGATION:\n  goto experience | projects | skills\n  goto nexus | kofuku | cyberguard | github | skills\nINFO:\n  whoami | contact | resume\nSYSTEM:\n  help | clear\n`;
}
