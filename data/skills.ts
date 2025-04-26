import { IconType } from 'react-icons';
import { FiCode, FiLayers, FiTool, FiLoader, FiDatabase, FiServer, FiActivity } from 'react-icons/fi';

export interface Skill {
  name: string;
  proficiency: number;
}
export interface SkillCategory {
  name: string;
  icon: IconType;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    icon: FiCode,
    description: 'Programming languages I am proficient in',
    skills: [
      { name: 'Java', proficiency: 90 },
      { name: 'Python', proficiency: 88 },
      { name: 'C/C++', proficiency: 85 },
      { name: 'JavaScript', proficiency: 92 },
      { name: 'HTML/CSS', proficiency: 95 },
      { name: 'SQL', proficiency: 80 },
      { name: 'Haskell', proficiency: 75 },
    ],
  },
  {
    name: 'Frameworks & Tools',
    icon: FiTool,
    description: 'Frameworks and tools I use for development',
    skills: [
      { name: 'React', proficiency: 90 },
      { name: 'Flask', proficiency: 85 },
      { name: 'TensorFlow', proficiency: 75 },
      { name: 'Selenium', proficiency: 88 },
      { name: 'REST APIs', proficiency: 90 },
      { name: 'Git', proficiency: 92 },
      { name: 'Android Studio', proficiency: 80 },
      { name: 'Flutter', proficiency: 78 },
    ],
  },
  {
    name: 'Databases',
    icon: FiDatabase,
    description: 'Database systems I work with',
    skills: [
      { name: 'SQL', proficiency: 85 },
      { name: 'PostgreSQL', proficiency: 82 },
      { name: 'NoSQL', proficiency: 78 },
      { name: 'Database Design', proficiency: 85 },
      { name: 'Data Modeling', proficiency: 80 },
    ],
  },
  {
    name: 'Libraries',
    icon: FiLoader,
    description: 'Libraries I use for development and data analysis',
    skills: [
      { name: 'Pandas', proficiency: 88 },
      { name: 'Matplotlib', proficiency: 85 },
      { name: 'NumPy', proficiency: 85 },
      { name: 'BeautifulSoup', proficiency: 90 },
      { name: 'React Libraries', proficiency: 88 },
    ],
  },
  {
    name: 'Other Skills',
    icon: FiLayers,
    description: 'Additional technical skills',
    skills: [
      { name: 'Assembly Language', proficiency: 75 },
      { name: 'ANTLR', proficiency: 80 },
      { name: 'UI/UX Design', proficiency: 85 },
      { name: 'Algorithms', proficiency: 90 },
      { name: 'Software Design', proficiency: 88 },
      { name: 'Security & Privacy', proficiency: 82 },
    ],
  },
];

/**
 * Additional skill highlights with descriptions
 */
export const skillHighlights = [
  {
    title: "Constantly Learning",
    description: "Always exploring new technologies and frameworks to expand my skill set.",
    icon: FiCode,
  },
  {
    title: "Problem Solver",
    description: "Approach challenges with analytical thinking and creative solutions.",
    icon: FiTool,
  },
  {
    title: "Detail Oriented",
    description: "Focus on creating clean, maintainable, and well-documented code.",
    icon: FiLayers,
  },
];
