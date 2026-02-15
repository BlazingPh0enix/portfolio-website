import { motion } from 'framer-motion';
import { Mail, Linkedin, Send, ArrowUpRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 px-6 max-w-3xl mx-auto text-center">
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        custom={0}
        className="mb-12"
      >
        <p className="font-mono text-xs text-neon-cyan tracking-[0.3em] uppercase mb-2">
          {'// 05'}
        </p>
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-white">
          Establish_<span className="text-neon-cyan">Connection</span>
        </h2>
        <div className="mt-3 w-20 h-[2px] bg-gradient-to-r from-neon-cyan to-transparent mx-auto" />
      </motion.div>

      {/* Terminal-style message */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        custom={1}
        className="glass-card rounded-2xl p-8 mb-10"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="ml-3 font-mono text-[11px] text-gray-600 tracking-wider">
            COMMS_TERMINAL
          </span>
        </div>
        <div className="text-left font-mono text-sm text-gray-400 space-y-2">
          <p>
            <span className="text-neon-cyan">{'>'}</span> Ready to collaborate on AI
            projects, research, or just talk tech?
          </p>
          <p>
            <span className="text-neon-cyan">{'>'}</span> Open communication channel
            below.
          </p>
          <p className="text-neon-cyan animate-pulse">▐</p>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
        custom={2}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        {/* Email Button */}
        <a
          href="mailto:anaskazi.tech@gmail.com"
          className="group relative px-8 py-4 font-mono text-sm tracking-wider uppercase
                     text-dark-900 bg-neon-cyan rounded-xl font-semibold
                     hover:shadow-neon-cyan-lg transition-all duration-300
                     flex items-center gap-3"
        >
          <Mail size={18} />
          Connect via Email
          <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        {/* LinkedIn Button */}
        <a
          href="https://www.linkedin.com/in/mohammedanas-kazi"
          target="_blank"
          rel="noopener noreferrer"
          className="group px-8 py-4 font-mono text-sm tracking-wider uppercase
                     text-neon-purple border border-neon-purple/30 rounded-xl
                     hover:bg-neon-purple/10 hover:border-neon-purple/60
                     hover:shadow-neon-purple transition-all duration-300
                     flex items-center gap-3"
        >
          <Linkedin size={18} />
          LinkedIn
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-24 pt-8 border-t border-white/5"
      >
        <p className="font-mono text-[11px] text-gray-600 tracking-wider">
          DESIGNED & BUILT BY{' '}
          <span className="text-neon-cyan">MOHAMMEDANAS SHAKIL KAZI</span>
        </p>
        <p className="font-mono text-[10px] text-gray-700 mt-1">
          © {new Date().getFullYear()} • ALL SYSTEMS OPERATIONAL
        </p>
      </motion.footer>
    </section>
  );
}
