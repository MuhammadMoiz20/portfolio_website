'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories, skillHighlights } from '@/data/skills';
import SkillCategoryTabs from './skills/SkillCategoryTabs';
import SkillBar from './skills/SkillBar';
import SkillHighlight from './skills/SkillHighlight';

/**
 * Skills component displays the user's technical skills and expertise
 * It includes categorized skill sets with proficiency levels and highlights
 */
export default function Skills() {
  // State to track the currently selected skill category
  const [activeTab, setActiveTab] = useState(skillCategories[0].name);
  
  // Get skills for the currently active category
  const activeSkills = skillCategories.find(category => category.name === activeTab)?.skills || [];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels as a Dartmouth Junior.
          </p>
        </motion.div>

        {/* Skills Category Tabs Component */}
        <SkillCategoryTabs 
          categories={skillCategories}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Skills Bars Container */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            {activeSkills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>

        {/* Skill Highlights Section */}
        <div className="mt-10 grid gap-y-8 gap-x-6 md:grid-cols-3">
          {skillHighlights.map((highlight, index) => (
            <SkillHighlight 
              key={highlight.title}
              title={highlight.title}
              description={highlight.description}
              icon={highlight.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
