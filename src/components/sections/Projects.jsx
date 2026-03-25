import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { PlayCircle, GitBranch } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-surface/30">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeading>Featured Projects</SectionHeading>

        <div className="flex flex-col gap-20">
          {portfolioData.projects.map((project, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-center`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group overflow-hidden rounded-xl border border-glass aspect-video">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                  <h3 className="text-3xl font-bold">{project.title}</h3>
                  <Card hover={false} className="p-6">
                    <p className="text-muted leading-relaxed">
                      {project.description}
                    </p>
                  </Card>
                  
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map(tag => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-2">
                    {project.title === 'DocuMind Enterprise (RAG AI)' ? (
                      <Link to="/project/documind" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                        <PlayCircle size={18} /> Watch Case Study
                      </Link>
                    ) : project.title === 'U.S-Petrol E-Commerce' ? (
                      <Link to="/project/us-petrol" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 bg-primary/10 text-primary hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                        <PlayCircle size={18} /> Watch Case Study
                      </Link>
                    ) : project.demo && (
                      <Button href={project.demo} target="_blank" rel="noopener noreferrer" variant="primary">
                        <PlayCircle size={18} /> Watch Demo
                      </Button>
                    )}
                    {project.github && (
                      <Button href={project.github} target="_blank" rel="noopener noreferrer" variant="secondary">
                        <GitBranch size={18} /> Source Code
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
