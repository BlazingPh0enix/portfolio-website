import { useState, useCallback } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import SectionDivider from './components/SectionDivider';
import Terminal from './components/Terminal';
import BootScreen from './components/BootScreen';

export default function App() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <>
      {/* Boot intro – renders on top of everything until complete */}
      {!booted && <BootScreen onComplete={handleBootComplete} />}

      <div className="relative min-h-screen bg-dark-900 text-white font-sans scanline">
        {/* Animated grid + particles */}
        <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
        <ParticleBackground />

        {/* HUD Navigation */}
        <Navigation />

        {/* Interactive Terminal */}
        <Terminal />

        {/* Page content */}
        <main className="relative z-10">
          <Hero />
          <SectionDivider label="profile" />
          <About />
          <SectionDivider label="experience" />
          <Experience />
          <SectionDivider label="projects" />
          <Projects />
          <SectionDivider label="arsenal" />
          <Skills />
          <SectionDivider label="connect" />
          <Contact />
        </main>
      </div>
    </>
  );
}
