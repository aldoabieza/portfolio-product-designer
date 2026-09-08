import { motion } from 'motion/react';

const CONTACT_LINKS = [
  { label: 'LinkedIn', url: 'https://linkedin.com/in/aldoabieza', isExternal: true },
  { label: 'Email', url: 'mailto:hello@aldoabieza.com', isExternal: false }
];

export default function ContactSection() {
  return (
    <section className="section contact">
      <div className="contact__inner">
        <motion.div
          className="section__head"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <h4 className="section__title">Have a project in mind?</h4>
          <p className="section__sub">
            Feel free to reach out via email or connect with me on LinkedIn
          </p>
        </motion.div>

        <div className="contact__links">
          {CONTACT_LINKS.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.url}
              target={link.isExternal ? '_blank' : undefined}
              rel={link.isExternal ? 'noopener noreferrer' : undefined}
              className="contact__link"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.45,
                delay: 0.22 + index * 0.07,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ x: 5, transition: { duration: 0.18 } }}
            >
              <span className="contact__link-label">{link.label}</span>
              <span className="contact__link-arrow">↗</span>
            </motion.a>
          ))}
        </div>
      </div>

      <motion.footer
        className="footer"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <span>© 2026 Aldo Abieza. Designed &amp; built with care.</span>
      </motion.footer>
    </section>
  );
}
