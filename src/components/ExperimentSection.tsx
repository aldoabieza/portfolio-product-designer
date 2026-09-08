import { motion } from 'motion/react';
import { EXPERIMENTS } from '../data/portfolioData';

function ExpCard({
  item,
  index
}: {
  key?: string;
  item: (typeof EXPERIMENTS)[0];
  index: number;
}) {
  return (
    <motion.a
      href={item.dribbbleUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="exp-item"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.22 } }}
    >
      <img
        src={item.imageUrl}
        alt={`Experimental UI exploration — ${item.title}`}
        loading="lazy"
      />
      <div className="exp-item__overlay">
        <span>{item.title}</span>
        <span className="exp-item__source">{item.source}</span>
      </div>
    </motion.a>
  );
}

export default function ExperimentSection() {
  return (
    <section className="section experimental">
      <motion.div
        className="section__head"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h4 className="section__title">Experimental Projects</h4>
        <p className="section__sub">
          Explorations, side quests, and unfiltered practice — mostly living on Dribbble.
        </p>
      </motion.div>

      <div className="exp-grid">
        {EXPERIMENTS.map((item, index) => (
          <ExpCard
            key={item.id}
            item={item}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
