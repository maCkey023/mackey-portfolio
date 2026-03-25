import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LiveTerminal = () => {
  const [phase, setPhase] = useState(1); // 1: typing, 2: booting, 3: request
  const [charIndex, setCharIndex] = useState(0);

  const codeImports = `from fastapi import FastAPI, Depends\nfrom vector_db import PineconeDB\nfrom agents import JarvisAgent\n\n`;

  const codeBody = `app = FastAPI(title="Enterprise AI System")\ndb = PineconeDB(namespace="portfolio")\njarvis = JarvisAgent(model="LLM-Pro")\n\n@app.post("/api/v1/process_query")\nasync def process_query(query: str):\n    context = await db.similarity_search(query)\n    return await jarvis.generate(query, context)`;

  // Phase logic
  useEffect(() => {
    let timer;
    if (phase === 1) {
      if (charIndex < codeBody.length) {
        timer = setTimeout(() => {
          setCharIndex(prev => prev + 1);
        }, 15); // Very fast typing
      } else {
        timer = setTimeout(() => setPhase(2), 500); // 0.5s pause after typing
      }
    } else if (phase === 2) {
      timer = setTimeout(() => setPhase(3), 2000); // 2s showing server boot
    } else if (phase === 3) {
      timer = setTimeout(() => {
        setPhase(1);
        setCharIndex(0);
      }, 3000); // 3s showing API request, then loop back
    }
    return () => clearTimeout(timer);
  }, [phase, charIndex, codeBody.length]);

  const renderCodeWithHighlights = (codeStr) => {
    const tokens = codeStr.split(/(\s+|"[\w- ]+"|@[\w.]+|def|async|await|return|import|from|=|:)/g);
    return tokens.map((token, i) => {
      if (!token) return null;
      if (['import', 'from', 'def', 'async', 'await', 'return'].includes(token)) {
        return <span key={i} className="text-pink-500">{token}</span>;
      }
      if (token.startsWith('"') && token.endsWith('"')) {
        return <span key={i} className="text-green-400">{token}</span>;
      }
      if (token.startsWith('@')) {
        return <span key={i} className="text-purple-400">{token}</span>;
      }
      if (['FastAPI', 'PineconeDB', 'JarvisAgent'].includes(token)) {
        return <span key={i} className="text-blue-400">{token}</span>;
      }
      if (token === '=' || token === ':') {
        return <span key={i} className="text-pink-500">{token}</span>;
      }
      return <span key={i} className="text-slate-300">{token}</span>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto rounded-xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)] bg-[#0d1117] border border-white/10 flex flex-col h-[350px]"
    >
      {/* MAC Header */}
      <div className="bg-[#161b22] px-4 py-3 flex items-center relative border-b border-white/5 shrink-0">
        <div className="flex gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.span 
            key={phase}
            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
            className="text-xs font-mono text-zinc-400 tracking-wider"
          >
            {phase === 1 ? 'core_architecture.py' : 'server.log'}
          </motion.span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-mono text-sm leading-[1.7] overflow-y-auto grow flex flex-col relative w-full">
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="phase1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 whitespace-pre-wrap break-all sm:break-normal w-full"
            >
              {renderCodeWithHighlights(codeImports)}
              {renderCodeWithHighlights(codeBody.substring(0, charIndex))}
              <span className="inline-block w-2 bg-primary animate-pulse ml-0.5" style={{ height: '1.2em', verticalAlign: 'middle' }}></span>
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="phase2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2 text-zinc-300 w-full"
            >
              <div className="text-green-400 font-bold">$ uvicorn main:app --reload</div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                 <span className="text-blue-400">[INFO]</span> Started server process [12345]
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                 <span className="text-blue-400">[INFO]</span> Waiting for application startup.
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
                 <span className="text-blue-400">[INFO]</span> Application startup complete.
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
                 <span className="text-blue-400">[INFO]</span> Uvicorn running on http://127.0.0.1:8000
              </motion.div>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div
              key="phase3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2 text-zinc-300 w-full"
            >
              <div className="text-purple-400 font-bold">POST /api/v1/process_query</div>
              <div className="text-zinc-500">{"{"} "query": "Optimize my Postgres DB" {"}"}</div>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <span className="text-yellow-400">►</span> Retrieving Pinecone vectors... <span className="text-green-400">[OK]</span>
              </motion.div>
              
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
                <span className="text-yellow-400">►</span> Generating LLM response...
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ delay: 1.8 }} 
                className="mt-3 p-3 bg-white/5 border border-white/10 rounded-md"
              >
                <div className="mb-2">
                  <span className="text-green-400 font-bold">200 OK</span> 
                  <span className="text-zinc-500 ml-2">840ms</span>
                </div>
                <div className="text-sm text-zinc-300 leading-relaxed italic">
                  "I recommend adding a partial unnest() B-Tree index to match your specific similarity search..."
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LiveTerminal;
