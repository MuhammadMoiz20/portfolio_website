'use client';

import { motion } from 'framer-motion';
import SkillBar from './SkillBar';
import { Skill } from '@/data/skills';

interface SkillListProps {
  skills: Skill[];

  twoColumns?: boolean;
}

export default function SkillList({ skills, twoColumns = true }: SkillListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid gap-4 ${twoColumns ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}
    >
      {skills.map((skill) => (
        <motion.div key={skill.name} variants={itemVariants}>
          <SkillBar 
            name={skill.name} 
            proficiency={skill.proficiency} 
            color={skill.color} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
