import { motion } from 'framer-motion';
import { Briefcase, Calendar, ArrowRight } from 'lucide-react';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  current: boolean;
  description: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'AI Engineer',
    company: 'Journalyst',
    period: 'Nov 2025 – Present',
    current: true,
    description:
      'Developing a "Voice Feature" that acts as a friendly psychologist for traders, utilizing RAG on trading psychology books to provide real-time mental support.',
  },
  {
    role: 'Machine Learning Engineer Intern',
    company: 'Kofuku Idea Labs Pvt Ltd',
    period: '2024 – 2025',
    current: false,
    description:
      'Worked on core ML models and data processing pipelines.',
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

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6 max-w-4xl mx-auto">
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
          {'// 02'}
        </p>
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-white">
          Experience_<span className="text-neon-cyan">Log</span>
        </h2>
        <div className="mt-3 w-20 h-[2px] bg-gradient-to-r from-neon-cyan to-transparent" />
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon-cyan/30 via-neon-purple/20 to-transparent" />

        <div className="space-y-12">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              custom={i + 1}
              className="relative pl-16 md:pl-20"
            >
              {/* Timeline dot */}
              <div className={`absolute left-[18px] md:left-[26px] top-2 w-4 h-4 rounded-full border-2
                              ${exp.current
                                ? 'border-neon-cyan bg-neon-cyan/20 shadow-neon-cyan'
                                : 'border-neon-purple/50 bg-neon-purple/10'
                              }`}
              >
                {exp.current && (
                  <span className="absolute inset-0 rounded-full bg-neon-cyan/30 animate-ping" />
                )}
              </div>

              {/* Card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 hover:border-neon-cyan/15 transition-all duration-500 group">
                {/* Period */}
                <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-3">
                  <Calendar size={12} />
                  <span>{exp.period}</span>
                  {exp.current && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan text-[10px] border border-neon-cyan/20">
                      ACTIVE
                    </span>
                  )}
                </div>

                {/* Role */}
                <h3 className="font-mono text-lg sm:text-xl font-semibold text-white mb-1">
                  {exp.role}
                </h3>
                <p className="font-mono text-sm text-neon-cyan flex items-center gap-1.5 mb-4">
                  <ArrowRight size={12} />
                  {exp.company}
                </p>

                {/* Description */}
                <p className="text-gray-400 font-sans text-sm leading-relaxed">
                  {exp.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-neon-cyan/0
                               group-hover:border-neon-cyan/20 transition-all duration-500 rounded-tr-2xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
