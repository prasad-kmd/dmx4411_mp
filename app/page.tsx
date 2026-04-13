"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import contentData from '../data/content.json';
import codeSnippets from '../data/code-snippets.json';
import MathEquation from '@/components/features/MathEquation';
import CodeBlock from '@/components/features/CodeBlock';
import AudioPlayer from '@/components/features/AudioPlayer';
import SNRChart from '@/components/features/SNRChart';
import ComparisonTable from '@/components/features/ComparisonTable';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { useStore } from '@/lib/store';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { theme } = useStore();
  const mainRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContent = useMemo(() => {
    if (!searchTerm) return contentData;
    const term = searchTerm.toLowerCase();
    return contentData.filter(section => {
      const inTitle = section.title.toLowerCase().includes(term);
      const inContent = section.content.some((item: any) => {
        const val = typeof item === 'string' ? item : item.value;
        return val.toLowerCase().includes(term);
      });
      return inTitle || inContent;
    });
  }, [searchTerm]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("section", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "main",
          start: "top 80%",
        }
      });
    }, mainRef);
    return () => ctx.revert();
  }, [filteredContent]);

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
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-500 selection:bg-indigo-100 dark:selection:bg-indigo-900/50">

        <Navbar onSearch={setSearchTerm} />

        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row gap-16">

          <Sidebar />

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
                className="text-xl text-gray-500 dark:text-gray-500 leading-relaxed max-w-2xl"
              >
                A comprehensive study on frequency domain analysis and filter design to recover signals from complex noise environments.
              </motion.p>
            </header>

            <AnimatePresence mode="wait">
              <motion.div
                key={searchTerm}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-32"
              >
                {filteredContent.length > 0 ? filteredContent.map((section: any) => (
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
                        const val = typeof item === 'string' ? item : item.value;
                        const type = typeof item === 'string' ? 'text' : item.type;

                        if (type === 'text') return <p key={idx} className="text-lg leading-relaxed text-gray-600 dark:text-gray-500 font-normal">{val}</p>;
                        if (type === 'equation') return (
                          <div key={idx} className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 transition-all hover:shadow-2xl hover:shadow-indigo-500/5">
                            <MathEquation equation={val} />
                          </div>
                        );
                        return null;
                      })}
                    </div>

                    {section.title.toUpperCase().includes('METHODOLOGY') && (
                      <>
                        <SNRChart />
                        <ComparisonTable />
                      </>
                    )}

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
                )) : (
                  <div className="text-center py-24">
                    <p className="text-2xl font-bold text-gray-500">No results found for "{searchTerm}"</p>
                    <button onClick={() => setSearchTerm('')} className="mt-4 text-indigo-600 font-bold hover:underline">Clear search</button>
                  </div>
                )}

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
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
}
