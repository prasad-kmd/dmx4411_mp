"use client";

import React, { useEffect, useRef } from 'react';
import content from '../data/content.json';
import codeSnippets from '../data/code-snippets.json';
import MathEquation from '@/components/features/MathEquation';
import CodeBlock from '@/components/features/CodeBlock';
import AudioPlayer from '@/components/features/AudioPlayer';
import { useStore } from '@/lib/store';
import { Moon, Sun, Globe as GithubIcon, ChevronRight, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { theme, toggleTheme } = useStore();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("section", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "main",
          start: "top 80%",
        }
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  // Click Spark Effect
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const spark = document.createElement('div');
      spark.className = 'click-spark';
      spark.style.left = `${e.pageX}px`;
      spark.style.top = `${e.pageY}px`;
      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 1000);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <style jsx global>{`
        .click-spark {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #4f46e5;
          pointer-events: none;
          z-index: 9999;
          animation: spark-anim 1s ease-out forwards;
        }
        @keyframes spark-anim {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(4); opacity: 0; }
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #4f46e5;
          border-radius: 10px;
        }
      `}</style>

      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-500 selection:bg-indigo-100 dark:selection:bg-indigo-900/50">

        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="text-white font-black text-xl">A</span>
              </div>
              <span className="font-bold text-xl tracking-tight hidden sm:inline-block">DSP.Audio</span>
            </motion.div>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
              </button>
              <div className="w-px h-6 bg-gray-200 dark:bg-gray-800 mx-2" />
              <a
                href="/MP_Full-Report.pdf"
                target="_blank"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Full Report <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row gap-16">

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div>
                <h3 className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] mb-6">Navigation</h3>
                <ul className="space-y-1">
                  {content.map((section: any) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="group flex items-center gap-2 py-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium"
                      >
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                        <span className="line-clamp-1">{section.title}</span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href="#code"
                      className="group flex items-center gap-2 py-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium"
                    >
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      <span>MATLAB Source</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50">
                <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-100 mb-2">Technical Overview</h4>
                <p className="text-xs text-indigo-700/70 dark:text-indigo-300/60 leading-relaxed">
                  Analyzing noise patterns and designing Butterworth filters for optimal SNR improvement.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main ref={mainRef} className="flex-1 max-w-4xl overflow-hidden">
            <header className="mb-24 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold mb-8 uppercase tracking-widest border border-indigo-100 dark:border-indigo-800"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Undergraduate Research 2024
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl lg:text-7xl font-black mb-8 tracking-tight leading-[0.95]"
              >
                Audio Signal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Denoising</span> System
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl"
              >
                A comprehensive study on frequency domain analysis and filter implementation to recover pure signals from complex noise environments.
              </motion.p>
            </header>

            <div className="space-y-32">
              {content.map((section: any) => (
                <section key={section.id} id={section.id} className="scroll-mt-32 group">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900 transition-colors" />
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                    <div className="h-px w-12 bg-gray-100 dark:bg-gray-800" />
                  </div>

                  <div className="space-y-6">
                    {section.content.map((item: any, idx: number) => {
                      if (typeof item === 'string') return <p key={idx} className="text-lg leading-relaxed text-gray-600 dark:text-gray-400 font-normal">{item}</p>;
                      if (item.type === 'text') return <p key={idx} className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">{item.value}</p>;
                      if (item.type === 'equation') return (
                        <div key={idx} className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 transition-all hover:shadow-2xl hover:shadow-indigo-500/5">
                          <MathEquation equation={item.value} />
                        </div>
                      );
                      return null;
                    })}
                  </div>

                  {/* Contextual Audio Players */}
                  {(section.title.includes('Analysis') || section.title.includes('IDENTIFICATION')) && section.content.some((c:any) => (c.value || c).includes('Signal 1') || (c.value || c).includes('Crysis')) && (
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 p-2 bg-gray-50 dark:bg-gray-900/30 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                      <AudioPlayer src="/audio/Noisy/wav/Crysis3Intro.wav" title="Input: Crysis 3 Noisy" />
                      <AudioPlayer src="/audio/Filtered/filtered_Crysis3Intro_LPF.wav" title="Output: LPF Filtered" />
                    </div>
                  )}
                  {(section.title.includes('Analysis') || section.title.includes('IDENTIFICATION')) && section.content.some((c:any) => (c.value || c).includes('Signal 2') || (c.value || c).includes('Dreams')) && (
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 p-2 bg-gray-50 dark:bg-gray-900/30 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                      <AudioPlayer src="/audio/Noisy/wav/DreamsBenSound.wav" title="Input: Dreams Noisy" />
                      <AudioPlayer src="/audio/Filtered/filtered_DreamsBenSound_BSF.wav" title="Output: BSF Filtered" />
                    </div>
                  )}
                  {(section.title.includes('Analysis') || section.title.includes('IDENTIFICATION')) && section.content.some((c:any) => (c.value || c).includes('Signal 3') || (c.value || c).includes('Last Summer')) && (
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 p-2 bg-gray-50 dark:bg-gray-900/30 rounded-[2.5rem] border border-gray-100 dark:border-gray-800">
                      <AudioPlayer src="/audio/Noisy/wav/LastSummer.wav" title="Input: Last Summer Noisy" />
                      <AudioPlayer src="/audio/Filtered/filtered_LastSummer_HPF.wav" title="Output: HPF Filtered" />
                    </div>
                  )}
                </section>
              ))}

              <section id="code" className="scroll-mt-32">
                 <div className="flex items-center gap-4 mb-10">
                    <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                      MATLAB Implementation
                    </h2>
                    <div className="h-px w-12 bg-gray-100 dark:bg-gray-800" />
                  </div>
                <div className="rounded-[2rem] overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">
                  <div className="bg-gray-100 dark:bg-gray-900 px-6 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs font-mono text-gray-500">full_code.m</span>
                  </div>
                  <CodeBlock code={codeSnippets[0].code} />
                </div>
              </section>
            </div>
          </main>
        </div>

        <footer className="border-t border-gray-200 dark:border-gray-800 py-24 mt-48 bg-gray-50/50 dark:bg-gray-900/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-2xl mx-auto mb-8 flex items-center justify-center">
               <GithubIcon className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-900 dark:text-white font-bold mb-2">DSP Audio Analysis Research</p>
            <p className="text-gray-500 text-sm mb-8">Developed as part of the Digital Signal Processing Undergraduate Module.</p>
            <div className="flex justify-center gap-6 text-gray-400">
              <a href="#" className="hover:text-indigo-600 transition-colors">Documentation</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Source Code</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">License</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
