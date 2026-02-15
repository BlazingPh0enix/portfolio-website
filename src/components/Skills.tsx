import { motion } from 'framer-motion';
import { Zap, Brain, Database, MessageSquare, Book, TrendingUp } from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number; // 0-100
  primary?: boolean;
  color: 'cyan' | 'purple';
}

const SKILLS: Skill[] = [
  {
    name: 'Python',
    icon: <Zap size={20} />,
    level: 95,
    primary: true,
    color: 'cyan',
  },
  {
    name: 'AI / ML',
    icon: <Brain size={20} />,
    level: 88,
    color: 'cyan',
  },
  {
    name: 'RAG',
    icon: <Database size={20} />,
    level: 85,
    color: 'purple',
  },
  {
    name: 'Deep Learning',
    icon: <TrendingUp size={20} />,
    level: 82,
    color: 'cyan',
  },
  {
    name: 'NLP',
    icon: <MessageSquare size={20} />,
    level: 80,
    color: 'purple',
  },
  {
    name: 'Trading Psychology AI',
    icon: <Book size={20} />,
    level: 78,
    color: 'purple',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const isCyan = skill.color === 'cyan';

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={fadeUp}
      custom={index + 1}
      className={`glass-card rounded-xl p-5 hover:border-${isCyan ? 'neon-cyan' : 'neon-purple'}/20
                  transition-all duration-500 group
                  ${skill.primary ? 'md:col-span-2 ring-1 ring-neon-cyan/10' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center
                          ${isCyan ? 'bg-neon-cyan/10 text-neon-cyan' : 'bg-neon-purple/10 text-neon-purple'}`}>
            {skill.icon}
          </div>
          <div>
            <h4 className="font-mono text-sm font-semibold text-white tracking-wider">
              {skill.name}
            </h4>
            {skill.primary && (
              <span className="text-[10px] font-mono text-neon-cyan tracking-widest">
                PRIMARY WEAPON
              </span>
            )}
          </div>
        </div>
        <span className={`font-mono text-sm ${isCyan ? 'text-neon-cyan' : 'text-neon-purple'}`}>
          {skill.level}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: (index + 1) * 0.1 + 0.3, duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            isCyan
              ? 'bg-gradient-to-r from-neon-cyan/60 to-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.4)]'
              : 'bg-gradient-to-r from-neon-purple/60 to-neon-purple shadow-[0_0_10px_rgba(188,19,254,0.4)]'
          }`}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 max-w-4xl mx-auto">
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
          {'// 04'}
        </p>
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-white">
          The_<span className="text-neon-cyan">Arsenal</span>
        </h2>
        <div className="mt-3 w-20 h-[2px] bg-gradient-to-r from-neon-cyan to-transparent" />
      </motion.div>

      {/* Skills grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {SKILLS.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </section>
  );
}
