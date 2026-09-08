import { motion } from 'motion/react';
import { EXPERIENCES } from '../data/portfolioData';

function TimelineCard({
  item,
  index,
  isLast
}: {
  key?: string;
  item: (typeof EXPERIENCES)[0];
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.div
      className="timeline__item"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {/* Left Rail: Square Card with centered brand logo */}
      <div className="timeline__rail">
        <div className="timeline__logo">
          <img
            src={item.logo}
            alt={`${item.company} logo`}
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.timeline__fallback')) {
                const fallback = document.createElement('div');
                fallback.className = 'timeline__fallback';
                fallback.style.cssText = `width:100%;height:100%;display:grid;place-items:center;background:${item.fallbackColor};color:#fff;font-weight:700;font-size:18px;border-radius:10px;`;
                fallback.textContent = item.fallbackLetter;
                parent.appendChild(fallback);
              }
            }}
          />
        </div>
      </div>

      {/* Dashed connector line seamlessly linking to the next logo box */}
      {!isLast && <div className="timeline__line" aria-hidden="true" />}

      {/* Right Column: Visual Hierarchy of Company, Role, and Period */}
      <div className="timeline__content">
        <h3 className="timeline__company">{item.company}</h3>
        <p className="timeline__role">{item.role}</p>
        <span className="timeline__period">{item.period}</span>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <section className="section experience">
      <motion.div
        className="section__head"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h4 className="section__title">My Career Journey</h4>
        <p className="section__sub">
          So far, I've worked across diverse industries including fintech, e-commerce, and logistics
        </p>
      </motion.div>

      <div className="timeline">
        {EXPERIENCES.map((item, index) => (
          <TimelineCard
            key={item.id}
            item={item}
            index={index}
            isLast={index === EXPERIENCES.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

