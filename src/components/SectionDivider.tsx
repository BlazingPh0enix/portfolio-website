import { motion } from 'framer-motion';

/**
 * A reusable section divider with a neon horizontal rule
 * and an optional label for visual sectioning.
 */
export default function SectionDivider({ label }: { label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="max-w-5xl mx-auto px-6 flex items-center gap-4"
    >
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-cyan/15 to-transparent" />
      {label && (
        <span className="font-mono text-[10px] text-gray-600 tracking-[0.4em] uppercase flex-shrink-0">
          {label}
        </span>
      )}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-cyan/15 to-transparent" />
    </motion.div>
  );
}
