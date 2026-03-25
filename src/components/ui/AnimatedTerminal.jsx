import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const codeLines = [
  { text: "from fastapi import FastAPI, Depends", type: "import" },
  { text: "from enterprise_rag import VectorDB, AICore, LLMGuardrails", type: "import" },
  { text: "", type: "empty" },
  { text: "# Initialize Enterprise AI System", type: "comment" },
  { text: "app = FastAPI(title=\"Core Architecture\")", type: "code" },
  { text: "vector_store = VectorDB(namespace=\"portfolio\")", type: "code" },
  { text: "agent = AICore(llm=\"gpt-4o-mini\", guardrails=True)", type: "code" },
  { text: "", type: "empty" },
  { text: "@app.post(\"/api/v1/process_query\")", type: "decorator" },
  { text: "async def process_query(query: str):", type: "def" },
  { text: "    context = await vector_store.similarity_search(query)", type: "code", indent: 1 },
  { text: "    response = await agent.generate(query, context)", type: "code", indent: 1 },
  { text: "    return {\"status\": \"success\", \"data\": response}", type: "code", indent: 1 }
];

const renderLine = (line) => {
  let content = line.text;
  
  if (line.type === 'comment') {
    return <span className="text-zinc-500">{content}</span>;
  }
  
  if (line.type === 'decorator') {
    return <span className="text-purple-400">{content}</span>;
  }
  
  const highlighted = content.split(/(\s+|"[\w-/\\]+"|{|\}|def|async|import|from|return|=)/g).map((part, i) => {
    if (!part) return null;
    if (['import', 'from', 'def', 'async', 'return', 'await'].includes(part)) {
      return <span key={i} className="text-pink-500 font-medium">{part}</span>;
    }
    if (part.startsWith('"') && part.endsWith('"')) {
      return <span key={i} className="text-green-400">{part}</span>;
    }
    if (['FastAPI', 'VectorDB', 'AICore', 'LLMGuardrails'].includes(part)) {
      return <span key={i} className="text-blue-400">{part}</span>;
    }
    if (part === '=') {
      return <span key={i} className="text-pink-500">{part}</span>;
    }
    return <span key={i} className="text-slate-300">{part}</span>;
  });

  return highlighted;
};

const AnimatedTerminal = () => {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < codeLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)] bg-[#0d1117] border border-white/10"
    >
      {/* MAC Window Header */}
      <div className="bg-[#161b22] px-4 py-3 flex items-center relative border-b border-white/5">
        <div className="flex gap-2 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xs font-mono text-zinc-400 tracking-wider">core_architecture.py</span>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-6 font-mono text-sm leading-[1.7] overflow-x-auto min-h-[350px]">
        <div className="flex flex-col">
          {codeLines.slice(0, currentLine + 1).map((line, index) => {
            const isActive = index === currentLine;
            const indentSpaces = line.indent ? '\u00A0\u00A0\u00A0\u00A0'.repeat(line.indent) : '';

            return (
              <div key={index} className="flex">
                <span className="w-6 text-right mr-4 text-zinc-600 select-none block shrink-0">{index + 1}</span>
                <div className="flex-1 whitespace-pre break-all sm:break-normal">
                  {indentSpaces}
                  {renderLine(line)}
                  {isActive && (
                    <span className="inline-block w-2.5 h-4 ml-1 align-middle bg-primary animate-pulse"></span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedTerminal;
