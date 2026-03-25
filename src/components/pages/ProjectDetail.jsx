import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, GitBranch, Database, Server, Component } from 'lucide-react';
import ImageCarousel from '../ui/ImageCarousel';

const Highlight = ({ children }) => (
  <span className="text-cyan-400 font-mono text-sm bg-cyan-950/30 px-1.5 py-0.5 rounded border border-cyan-500/20">
    {children}
  </span>
);

const projectsData = {
  "documind": {
    title: "DocuMind Enterprise (RAG AI)",
    techStack: ['Python', 'FastAPI', 'React', 'Pinecone', 'LangChain', 'OpenAI'],
    github: "https://github.com/maCkey023/DocuMind-Enterprise",
    headerMedia: (
      <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)] border border-zinc-800 aspect-[16/9] mb-16 relative">
        <iframe 
          width="100%" height="100%" className="absolute top-0 left-0"
          src="https://www.youtube.com/embed/TZmlJW5EXAY?rel=0" 
          title="DocuMind Enterprise Demo" frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
        ></iframe>
      </div>
    ),
    content: (
      <>
        <p className="text-zinc-300 text-lg leading-relaxed mb-8">
          DocuMind Enterprise is a high-performance Retrieval-Augmented Generation (RAG) system built to parse, index, and query thousands of dense PDF documents with sub-second latency. It leverages state-of-the-art vector embeddings and LLM guardrails to prevent hallucination in critical corporate environments.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-white border-b border-zinc-800 pb-2 mt-12">Architecture</h2>
        <p className="text-zinc-300 mb-8">
          The backend is built entirely on asynchronous Python utilizing FastAPI for extreme throughput. The document ingestion pipeline uses chunking and parallelized embedding generation before pushing vectors to Pinecone. The querying layer enforces strict role-based access control and relevance-thresholding before generating responses.
        </p>
        <h2 className="text-2xl font-bold mb-4 text-white border-b border-zinc-800 pb-2 mt-12">Key Features</h2>
        <ul className="list-disc list-inside text-zinc-300 mb-12 space-y-2">
          <li><strong>Zero Hallucination Guardrails:</strong> Strictly limits generative scope to the retrieved context.</li>
          <li><strong>Advanced API Rate Limiting:</strong> Custom Redis-backed token bucket algorithm for endpoint protection.</li>
          <li><strong>Dynamic Source Citation:</strong> All answers provide direct clickable references to the exact page of the ingested document.</li>
          <li><strong>Real-time Analytics:</strong> Admin dashboard monitoring query volume, latency, and embedding drift.</li>
        </ul>
      </>
    )
  },
  "us-petrol": {
    title: "U.S-Petrol E-Commerce Platform",
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Tailwind', 'JWT'],
    github: "https://github.com/maCkey023/U.S-Petrol",
    headerMedia: (
      <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.15)] border border-zinc-800 mb-16 relative">
        <img 
          src="/images/us-petrol-schema.png" 
          alt="System Architecture Diagram" 
          className="w-full h-auto object-cover min-h-[300px] bg-zinc-900" 
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="hidden absolute inset-0 items-center justify-center bg-zinc-900 text-zinc-500 font-medium">
          Architecture Diagram Image Not Found (/images/us-petrol-schema.png)
        </div>
        <div className="relative z-10 p-4 bg-zinc-900/90 backdrop-blur border-t border-zinc-800 text-center text-sm text-zinc-400">
          U.S-Petrol MERN System Architecture Overview
        </div>
      </div>
    ),
    content: (
      <>
        <p className="text-zinc-300 text-lg leading-relaxed mb-8">
          U.S-Petrol is a comprehensive MERN-stack e-commerce platform engineered specifically to handle both B2B wholesale and B2C retail transactions. It implements a secure, scalable architecture optimized for high-volume inventory streaming, role-based access control, and seamless checkout operations.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white border-b border-zinc-800 pb-2 mt-12">System Architecture Overview</h2>
        <p className="text-zinc-300 mb-8">
          The platform utilizes a decoupled MERN architecture where the <Highlight>React.js</Highlight> frontend communicates asynchronously with a robust <Highlight>Node/Express</Highlight> backend via strict <Highlight>RESTful APIs</Highlight>. State management across the client is highly optimized, minimizing re-renders during deep-cart nesting, while the backend utilizes scalable controller-service patterns to isolate business logic from network routing.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white border-b border-zinc-800 pb-2 mt-12">Authentication Flow (The Flex)</h2>
        <p className="text-zinc-300 mb-8">
          Security is fundamental to the platform. I implemented a stateless, cryptographically secure <Highlight>JWT (JSON Web Token)</Highlight> authentication pipeline. 
          Upon successful login, the server signs a <Highlight>JWT payload</Highlight> containing the user's encoded role and ID, setting it securely via <Highlight>HttpOnly cookies</Highlight> to prevent XSS attacks. 
          Every subsequent private API request passes through custom <Highlight>Express Middleware</Highlight> that decodes and validates the token signature, strictly denying unauthorized access to admin dashboards or checkout operations.
        </p>

        <h2 className="text-2xl font-bold mb-4 text-white border-b border-zinc-800 pb-2 mt-12">Database Schema Design</h2>
        <p className="text-zinc-300 mb-8">
          Data relationships are meticulously managed within the <Highlight>MongoDB / Mongoose NoSQL</Highlight> ecosystem using embedded documents and logical referencing to optimize read performance.
        </p>
        <ul className="list-disc list-inside text-zinc-300 mb-12 space-y-3">
          <li><strong>Users Collection:</strong> Stores hashed credentials (via bcrypt) and utilizes an enum `role` field (`admin`, `wholesale`, `retail`) to dynamically restrict access limits globally.</li>
          <li><strong>Products Collection:</strong> Implements comprehensive indexing on SKUs and categories for sub-millisecond querying. It includes embedded reviews and dynamic stock trackers.</li>
          <li><strong>Orders Collection:</strong> Resolves relational integrity by storing historical snapshots of product prices and user details at the exact time of checkout, ensuring financial immutable records despite future product modifications.</li>
        </ul>

        {/* Dynamic Image Carousel */}
        <h2 className="text-2xl font-bold mb-6 text-white border-b border-zinc-800 pb-2 mt-12">Application Interface</h2>
        <ImageCarousel />
      </>
    )
  }
};

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData[id];

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-20 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 font-medium mb-10 transition-colors duration-300"
        >
          <ArrowLeft size={20} />
          ← Back to Portfolio
        </Link>
        
        {project.headerMedia}

        {/* Content Container */}
        <div className="max-w-3xl mx-auto px-4 md:px-0 prose prose-invert prose-cyan max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-center md:text-left">{project.title}</h1>
          
          <h3 className="text-xl font-semibold mb-3 text-white">Tech Stack</h3>
          <div className="flex flex-wrap gap-2 mb-10">
            {project.techStack.map(tech => (
              <span key={tech} className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-sm font-medium">
                {tech === 'MongoDB' || tech === 'FastAPI' || tech === 'Pinecone' ? <Database size={14} /> : null}
                {tech === 'React' ? <Component size={14} /> : null}
                {tech === 'Node.js' || tech === 'Python' ? <Server size={14} /> : null}
                {tech}
              </span>
            ))}
          </div>

          {project.content}

          {/* Footer CTA */}
          <div className="mt-16 text-center md:text-left">
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-zinc-100 hover:bg-white text-zinc-900 py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
            >
              <GitBranch size={20} />
              View Source Code on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
