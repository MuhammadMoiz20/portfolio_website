'use client';

import { SkillCategory } from '@/data/skills';

interface SkillCategoryTabsProps {
  categories: SkillCategory[];
  activeTab: string;
  onTabChange: (tabName: string) => void;
}


export default function SkillCategoryTabs({ 
  categories, 
  activeTab, 
  onTabChange 
}: SkillCategoryTabsProps) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onTabChange(category.name)}
          className={`flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === category.name
              ? 'bg-primary-600 text-white dark:bg-primary-500'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          <category.icon className="mr-2" size={16} />
          {category.name}
        </button>
      ))}
    </div>
  );
}
