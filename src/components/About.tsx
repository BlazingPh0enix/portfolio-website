import { motion } from 'framer-motion';
import { User, GraduationCap, MapPin } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 max-w-5xl mx-auto">
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
          {'// 01'}
        </p>
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-white">
          Profile_<span className="text-neon-cyan">Overview</span>
        </h2>
        <div className="mt-3 w-20 h-[2px] bg-gradient-to-r from-neon-cyan to-transparent" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Bio Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          custom={1}
          className="glass-card rounded-2xl p-8 hover:border-neon-cyan/20 transition-all duration-500"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center">
              <User size={20} className="text-neon-cyan" />
            </div>
            <h3 className="font-mono text-sm text-neon-cyan tracking-wider uppercase">
              Bio_Data
            </h3>
          </div>
          <p className="text-gray-300 leading-relaxed font-sans text-[15px]">
            I am an AI Engineer specializing in Python and Machine Learning. Currently
            building intelligent systems at{' '}
            <span className="text-neon-cyan font-medium">Journalyst</span>. I bridge the
            gap between complex data and human psychology.
          </p>
          <div className="mt-6 flex items-center gap-2 text-xs font-mono text-gray-500">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            STATUS: ACTIVE
          </div>
        </motion.div>

        {/* Education Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          custom={2}
          className="glass-card rounded-2xl p-8 hover:border-neon-purple/20 transition-all duration-500"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-neon-purple/10 flex items-center justify-center">
              <GraduationCap size={20} className="text-neon-purple" />
            </div>
            <h3 className="font-mono text-sm text-neon-purple tracking-wider uppercase">
              Education_Log
            </h3>
          </div>
          <h4 className="text-white font-semibold text-lg font-sans">
            B.Tech in Computer Science & Engineering
          </h4>
          <p className="text-neon-purple/80 font-mono text-sm mt-1">
            Specialization: AI & ML
          </p>
          <div className="flex items-center gap-2 mt-4 text-gray-400 text-sm">
            <MapPin size={14} className="text-gray-500" />
            <span className="font-sans">Vellore Institute of Technology, AP</span>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="font-mono text-[11px] text-gray-600 space-y-1">
              <p>{'>'} CORE: Deep Learning, NLP, Computer Vision</p>
              <p>{'>'} FOCUS: Retrieval-Augmented Generation</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
