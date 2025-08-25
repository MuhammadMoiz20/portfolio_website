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
      { name: 'Python', proficiency: 92 },
      { name: 'Java', proficiency: 88 },
      { name: 'JavaScript/TypeScript (ES6+)', proficiency: 92 },
      { name: 'C/C++', proficiency: 85 },
      { name: 'Golang', proficiency: 70 },
      { name: 'SQL', proficiency: 85 },
      { name: 'HTML5/CSS3', proficiency: 95 },
    ],
  },
  {
    name: 'Frameworks & Tools',
    icon: FiTool,
    description: 'Frameworks and tools I use for development',
    skills: [
      { name: 'React.js', proficiency: 90 },
      { name: 'Node.js/Express', proficiency: 85 },
      { name: 'Flask', proficiency: 85 },
      { name: 'TensorFlow', proficiency: 80 },
      { name: 'PyTorch', proficiency: 75 },
      { name: 'Pandas', proficiency: 88 },
      { name: 'NumPy', proficiency: 85 },
      { name: 'Matplotlib', proficiency: 82 },
      { name: 'Selenium', proficiency: 88 },
      { name: 'ANTLR', proficiency: 80 },
      { name: 'REST APIs', proficiency: 92 },
      { name: 'Git', proficiency: 92 },
    ],
  },
  {
    name: 'Databases',
    icon: FiDatabase,
    description: 'Database systems I work with',
    skills: [
      { name: 'PostgreSQL', proficiency: 85 },
      { name: 'MongoDB', proficiency: 82 },
      { name: 'Redis', proficiency: 78 },
      { name: 'Database Design', proficiency: 85 },
      { name: 'Data Modeling', proficiency: 82 },
    ],
  },
  {
    name: 'Libraries',
    icon: FiLoader,
    description: 'Libraries I use for development and data analysis',
    skills: [
      { name: 'scikit-learn', proficiency: 82 },
      { name: 'BeautifulSoup', proficiency: 90 },
      { name: 'React Libraries', proficiency: 88 },
    ],
  },
  {
    name: 'Other Skills',
    icon: FiLayers,
    description: 'Additional technical skills',
    skills: [
      { name: 'UI/UX Design', proficiency: 85 },
      { name: 'Algorithms', proficiency: 90 },
      { name: 'Software Design & Implementation', proficiency: 88 },
      { name: 'Security & Privacy', proficiency: 82 },
    ],
  },
  {
    name: 'Cloud & DevOps',
    icon: FiServer,
    description: 'Cloud platforms and delivery pipelines',
    skills: [
      { name: 'AWS', proficiency: 85 },
      { name: 'GCP', proficiency: 75 },
      { name: 'Docker', proficiency: 85 },
      { name: 'Kubernetes', proficiency: 70 },
      { name: 'CI/CD (GitHub Actions, Jenkins)', proficiency: 85 },
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
