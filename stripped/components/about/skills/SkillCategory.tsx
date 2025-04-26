'use client';

import { useState } from 'react';
import { IconType } from 'react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import SkillBar from './SkillBar';
import { Skill } from '@/data/skills';

interface SkillCategoryProps {
  name: string;

  icon: IconType;
  
  skills: Skill[];
  

  isActive: boolean;
}


export default function SkillCategory({ name, icon: Icon, skills, isActive }: SkillCategoryProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <SkillBar 
                  name={skill.name} 
                  proficiency={skill.proficiency} 
                  color={skill.color} 
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
