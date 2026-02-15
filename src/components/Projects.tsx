import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers, Shield } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  techKeywords: string[];
  icon: React.ReactNode;
  accentColor: 'cyan' | 'purple';
}

const PROJECTS: Project[] = [
  {
    title: 'NexusAI',
    description:
      'A multi-agent AI system designed for generating strategic proposals.',
    techKeywords: ['Multi-Agent Systems', 'Python', 'Strategy Automation'],
    icon: <Layers size={24} />,
    accentColor: 'cyan',
  },
  {
    title: 'CyberGuard',
    description:
      'A browser extension to detect cyberbullying in real-time using a Bi-LSTM model.',
    techKeywords: ['Bi-LSTM', 'NLP', 'Browser Extension', 'Cyber Safety'],
    icon: <Shield size={24} />,
    accentColor: 'purple',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isCyan = project.accentColor === 'cyan';
  const borderHover = isCyan
    ? 'hover:border-neon-cyan/30 hover:shadow-[0_0_30px_rgba(0,243,255,0.08)]'
    : 'hover:border-neon-purple/30 hover:shadow-[0_0_30px_rgba(188,19,254,0.08)]';
  const accent = isCyan ? 'text-neon-cyan' : 'text-neon-purple';
  const accentBg = isCyan ? 'bg-neon-cyan/10' : 'bg-neon-purple/10';
  const tagBorder = isCyan ? 'border-neon-cyan/15 text-neon-cyan/70' : 'border-neon-purple/15 text-neon-purple/70';

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      custom={index + 1}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass-card rounded-2xl p-8 ${borderHover} 
                  transition-all duration-500 cursor-pointer group relative overflow-hidden`}
    >
      {/* Corner decorations */}
      <div className={`absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 rounded-tl-2xl
                       ${isCyan ? 'border-neon-cyan/0 group-hover:border-neon-cyan/30' : 'border-neon-purple/0 group-hover:border-neon-purple/30'}
                       transition-all duration-500`} />
      <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-2xl
                       ${isCyan ? 'border-neon-cyan/0 group-hover:border-neon-cyan/30' : 'border-neon-purple/0 group-hover:border-neon-purple/30'}
                       transition-all duration-500`} />

      {/* Holographic glow on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700
                       ${isCyan
                         ? 'bg-gradient-to-br from-neon-cyan/[0.03] to-transparent'
                         : 'bg-gradient-to-br from-neon-purple/[0.03] to-transparent'
                       }`} />

      <div className="relative z-10">
        {/* Icon + project index */}
        <div className="flex items-center justify-between mb-6">
          <div className={`w-12 h-12 rounded-xl ${accentBg} flex items-center justify-center ${accent}`}>
            {project.icon}
          </div>
          <span className="font-mono text-[11px] text-gray-600 tracking-wider">
            PRJ_0{index + 1}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-mono text-xl sm:text-2xl font-bold text-white mb-3 group-hover:${accent.replace('text-', 'text-')} transition-colors duration-300`}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 font-sans text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techKeywords.map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full text-[11px] font-mono border ${tagBorder}`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className={`flex items-center gap-4 text-xs font-mono ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
          <span className="flex items-center gap-1.5 hover:underline">
            <Github size={13} /> Source
          </span>
          <span className="flex items-center gap-1.5 hover:underline">
            <ExternalLink size={13} /> Demo
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6 max-w-5xl mx-auto">
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        custom={0}
        className="mb-16"
      >
        <p className="font-mono text-xs text-neon-cyan tracking-[0.3em] uppercase mb-2">
          {'// 03'}
        </p>
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-white">
          Project_<span className="text-neon-cyan">Grid</span>
        </h2>
        <div className="mt-3 w-20 h-[2px] bg-gradient-to-r from-neon-cyan to-transparent" />
      </motion.div>

      {/* Project cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
