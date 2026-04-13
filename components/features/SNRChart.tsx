"use client";

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Audio 1', original: -5.42, filtered: 12.35 },
  { name: 'Audio 2', original: -2.15, filtered: 15.68 },
  { name: 'Audio 3', original: -8.90, filtered: 10.12 },
];

const SNRChart = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[400px] w-full animate-pulse bg-gray-100 dark:bg-gray-900 rounded-[2rem]" />;

  return (
    <div className="h-[400px] w-full bg-white dark:bg-gray-900/50 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 my-12">
      <h4 className="text-sm font-bold uppercase tracking-widest text-indigo-500 mb-8">SNR Comparison (dB)</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888822" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#888', fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#888', fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: '#88888811' }}
            contentStyle={{
              backgroundColor: '#111',
              border: 'none',
              borderRadius: '12px',
              fontSize: '12px',
              color: '#fff'
            }}
          />
          <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="original" name="Original SNR" fill="#6366f1" radius={[4, 4, 0, 0]} />
          <Bar dataKey="filtered" name="Filtered SNR" fill="#a855f7" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SNRChart;
