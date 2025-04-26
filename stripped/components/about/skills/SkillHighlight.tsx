'use client';

import { motion } from 'framer-motion';
import { IconType } from 'react-icons';

interface SkillHighlightProps {
  title: string;
  description: string;
  icon: IconType;
  index: number;
}

export default function SkillHighlight({ 
  title, 
  description, 
  icon: Icon, 
  index 
}: SkillHighlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="rounded-lg bg-gray-50 p-6 text-center dark:bg-gray-900"
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
        <Icon size={28} />
      </div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
}
