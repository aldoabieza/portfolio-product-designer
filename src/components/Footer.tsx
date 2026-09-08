import { motion } from 'motion/react';

interface FooterProps {
  standalone?: boolean;
}

export default function Footer({ standalone = true }: FooterProps) {
  return (
    <motion.footer
      className={`footer ${standalone ? 'footer--standalone' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <span>© 2026 Aldo Abieza. Designed &amp; built with care.</span>
    </motion.footer>
  );
}
