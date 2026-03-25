import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolio';
import SectionHeading from '../ui/SectionHeading';
import Card from '../ui/Card';
import TiltCard from '../ui/TiltCard';
import { Code2, Database, BrainCircuit } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeading>About Me</SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-8">
          {/* Left Column: Photo */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <img 
                src="/images/photo_mackey6.webp" 
                alt="Mackey Abdul Raheem" 
                loading="lazy"
                className="relative rounded-2xl object-cover w-[300px] h-[350px] md:w-[350px] md:h-[400px] shadow-[0_0_15px_rgba(6,182,212,0.15)] grayscale-[20%] hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </motion.div>

          {/* Right Column: Content & Bentos */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-4">
              <p className="text-lg text-muted leading-relaxed">
                {portfolioData.hero.description}
              </p>
              <p className="text-lg text-muted leading-relaxed">
                My approach integrates rigorous software engineering practices with the latest advancements in Large Language Models to build systems that are not only intelligent but also scalable and highly reliable.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TiltCard className="h-full">
                <Card className="flex flex-col gap-3 h-full">
                  <Code2 className="text-primary w-8 h-8" />
                  <h3 className="font-semibold text-lg">Frontend Arch</h3>
                  <p className="text-sm text-muted">React, Vite, Tailwind</p>
                </Card>
              </TiltCard>
              
              <TiltCard className="h-full">
                <Card className="flex flex-col gap-3 h-full">
                  <Database className="text-primary w-8 h-8" />
                  <h3 className="font-semibold text-lg">Backend Systems</h3>
                  <p className="text-sm text-muted">Python, FastAPI, Postgres</p>
                </Card>
              </TiltCard>

              <TiltCard className="sm:col-span-2">
                <Card className="flex flex-col gap-3 h-full">
                  <BrainCircuit className="text-primary w-8 h-8" />
                  <h3 className="font-semibold text-lg">AI Engineering</h3>
                  <p className="text-sm text-muted">RAG pipelines, Vector DBs, LLM Guardrails</p>
                </Card>
              </TiltCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
