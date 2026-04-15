'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-10 space-y-4">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-3xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '80px' }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="h-1.5 bg-accent-primary rounded-full"
      />
    </div>
  );
}
