import React from 'react';
import { Mail, MessageCircle, Globe } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { portfolioData } from '../../data/portfolio';

const Contact = () => {
  const { contact } = portfolioData;

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6 max-w-4xl flex flex-col items-center">
        <SectionHeading>Contact</SectionHeading>
        
        <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl p-10 mt-8 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle Glow inside the card */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/20 blur-[80px] rounded-full pointer-events-none"></div>

          <h3 className="text-3xl font-bold text-white mb-4 relative z-10">Let's build something together.</h3>
          <p className="text-zinc-400 text-lg mb-10 relative z-10">
            I am currently looking for full-stack opportunities.
          </p>

          <div className="flex flex-col gap-4 items-center relative z-10">
            <a 
              href={`mailto:${contact.email}`} 
              className="w-full max-w-md flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 text-white py-4 px-6 rounded-xl border border-white/5 transition-all duration-300 font-medium hover:-translate-y-1 hover:shadow-lg"
            >
              <Mail className="text-primary shrink-0" size={20} />
              <span className="truncate">{contact.email}</span>
            </a>

            <a 
              href={`tel:${contact.phone.replace(/\s+/g, '')}`} 
              className="w-full max-w-md flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 text-white py-4 px-6 rounded-xl border border-white/5 transition-all duration-300 font-medium hover:-translate-y-1 hover:shadow-lg"
            >
              <MessageCircle className="text-primary shrink-0" size={20} />
              <span>{contact.phone}</span>
            </a>

            <a 
              href={contact.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full max-w-md flex items-center justify-center gap-3 bg-zinc-900 hover:bg-zinc-800 text-white py-4 px-6 rounded-xl border border-white/5 transition-all duration-300 font-medium hover:-translate-y-1 hover:shadow-lg"
            >
              <Globe className="text-primary shrink-0" size={20} />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
