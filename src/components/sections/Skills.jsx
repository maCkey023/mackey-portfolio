import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import TiltCard from '../ui/TiltCard';

const Skills = () => {
  const { skills } = portfolioData;

  const skillCategories = [
    { title: "Frontend Engineering", items: skills.frontend },
    { title: "Backend Systems", items: skills.backend },
    { title: "AI & Machine Learning", items: skills.ai },
    { title: "Databases & DevOps", items: skills.tools }
  ];

  return (
    <section id="skills" className="py-24 bg-surface/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeading>Technical Arsenal</SectionHeading>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltCard className="h-full">
                <Card hover={false} className="h-full flex flex-col">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                    <span className="w-8 h-1 bg-primary rounded-full shrink-0"></span>
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
