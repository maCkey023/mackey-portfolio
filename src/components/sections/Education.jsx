import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';

const educationData = [
  {
    id: 1,
    degree: 'Master of Computer Applications (MCA)',
    institution: 'College of Engineering, Vadakara',
    period: '2023 - 2025',
    score: 'CGPA: 7.9',
    icon: GraduationCap,
  },
  {
    id: 2,
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Don Bosco Arts & Science College',
    period: '2020 - 2023',
    score: 'CGPA: 7.2',
    icon: GraduationCap,
  },
  {
    id: 3,
    degree: 'Higher Secondary Education',
    institution: 'Govt Sanskrit HSS, Vadakara',
    period: '2018 - 2020',
    score: '71.82%',
    icon: BookOpen,
  },
  {
    id: 4,
    degree: 'SSLC',
    institution: 'Memunda HSS, Vadakara',
    period: 'Completed 2018',
    score: '97%',
    icon: BookOpen,
  },
];

const Education = () => {
  return (
    <section id="education" className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
            Education
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            My academic journey and qualifications.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyan-500/80 via-cyan-500/20 to-transparent rounded-full" />

          {/* Mobile Timeline Line */}
          <div className="md:hidden absolute left-8 w-0.5 h-full bg-gradient-to-b from-cyan-500/80 via-cyan-500/20 to-transparent rounded-full" />

          <div className="space-y-12">
            {educationData.map((item, index) => {
              const isEven = index % 2 === 0;
              const Icon = item.icon;

              return (
                <div key={item.id} className="relative flex items-center justify-between md:justify-center w-full group">

                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-900 border-2 border-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.6)] z-10 group-hover:scale-150 group-hover:bg-cyan-400 transition-all duration-300" />

                  {/* Desktop Layout - Alternating Cards */}
                  <div className={`hidden md:flex w-full ${isEven ? 'justify-end' : 'justify-start'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      className={`w-5/12 ${isEven ? 'pl-8 md:pl-10 lg:pl-16' : 'pr-8 md:pr-10 lg:pr-16'}`}
                    >
                      <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:border-cyan-500/40">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20">
                            <Icon size={24} />
                          </div>
                          <div>
                            <h3 className="text-[1.15rem] md:text-xl font-bold text-cyan-400 leading-tight">
                              {item.degree}
                            </h3>
                            <span className="text-sm font-medium text-zinc-400 mt-1 block tracking-wide">
                              {item.period}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-3 text-zinc-300">
                          <p className="font-medium text-white/90">{item.institution}</p>
                          <div className="inline-flex items-center">
                            <span className="text-sm px-3 py-1 bg-zinc-800/80 rounded-full text-cyan-300 border border-zinc-700/50 font-medium">
                              {item.score}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Mobile Layout - Single Column */}
                  <div className="md:hidden w-full pl-16">
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      className="w-full"
                    >
                      <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-xl p-5 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:border-cyan-500/30 transition-all duration-300">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 mt-0.5 shrink-0 ring-1 ring-cyan-500/20">
                            <Icon size={20} />
                          </div>
                          <div>
                            <h3 className="text-[1.05rem] font-bold text-cyan-400 leading-tight">
                              {item.degree}
                            </h3>
                            <span className="text-xs font-medium text-zinc-400 mt-1 block">
                              {item.period}
                            </span>
                          </div>
                        </div>
                        <div className="pl-[3.5rem] space-y-2">
                          <p className="font-medium text-[0.9rem] text-white/90">{item.institution}</p>
                          <div className="inline-flex">
                            <span className="text-xs px-2.5 py-1 bg-zinc-800/80 rounded-full text-cyan-300 border border-zinc-700/50 font-medium">
                              {item.score}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
