"use client";

import React from 'react';
import content from '@/data/content.json';
import { ChevronRight } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="lg:sticky lg:top-32 space-y-8">
        <div>
          <h3 className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] mb-6">Navigation</h3>
          <ul className="space-y-1">
            {content.map((section: any) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group flex items-center gap-2 py-2 text-gray-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium"
                >
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  <span className="line-clamp-1">{section.title}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href="#code"
                className="group flex items-center gap-2 py-2 text-gray-600 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium"
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
  );
};

export default Sidebar;
