import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';

const Experience = () => {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionHeading>Work Experience</SectionHeading>

        <div className="relative border-l border-glass ml-4 md:ml-0">
          {portfolioData.experience.map((job, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="mb-12 ml-8 relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-1.5 w-4 h-4 bg-primary rounded-full ring-4 ring-background"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">{job.role}</h3>
                  <p className="text-lg text-primary font-medium">{job.company}</p>
                </div>
                <span className="text-sm text-muted bg-surface px-3 py-1 rounded-full border border-glass inline-block self-start md:self-auto">
                  {job.date}
                </span>
              </div>

              <ul className="space-y-3 text-muted">
                {job.points.map((point, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-primary mt-1.5">▹</span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
