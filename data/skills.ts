import { IconType } from "react-icons";
import {
  FiCode,
  FiLayers,
  FiTool,
  FiLoader,
  FiDatabase,
  FiServer,
  FiActivity,
} from "react-icons/fi";

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
    name: "Languages",
    icon: FiCode,
    description: "Programming languages I am proficient in",
    skills: [
      { name: "Python", proficiency: 92 },
      { name: "Java", proficiency: 88 },
      { name: "JavaScript/TypeScript", proficiency: 92 },
      { name: "C/C++", proficiency: 85 },
    ],
  },
  {
    name: "Frameworks",
    icon: FiTool,
    description: "Frameworks I use for development",
    skills: [
      { name: "React", proficiency: 90 },
      { name: "Node.js", proficiency: 85 },
      { name: "Flask", proficiency: 85 },
    ],
  },
  {
    name: "Cloud & Infrastructure",
    icon: FiServer,
    description: "Cloud platforms and infrastructure tools",
    skills: [
      { name: "AWS (Lambda, S3, DynamoDB)", proficiency: 85 },
      { name: "Docker", proficiency: 88 },
      { name: "Kubernetes", proficiency: 70 },
      { name: "GitHub Actions", proficiency: 88 },
    ],
  },
  {
    name: "Databases",
    icon: FiDatabase,
    description: "Database systems I work with",
    skills: [
      { name: "PostgreSQL", proficiency: 88 },
      { name: "MongoDB", proficiency: 82 },
      { name: "Redis", proficiency: 78 },
    ],
  },
  {
    name: "Testing & Quality",
    icon: FiActivity,
    description: "Testing frameworks and QA automation",
    skills: [
      { name: "Jest", proficiency: 80 },
      { name: "PyTest", proficiency: 78 },
      { name: "Cypress", proficiency: 75 },
    ],
  },
];

/**
 * Additional skill highlights with descriptions
 */
export const skillHighlights = [
  {
    title: "Constantly Learning",
    description:
      "Always exploring new technologies and frameworks to expand my skill set.",
    icon: FiCode,
  },
  {
    title: "Problem Solver",
    description:
      "Approach challenges with analytical thinking and creative solutions.",
    icon: FiTool,
  },
  {
    title: "Detail Oriented",
    description:
      "Focus on creating clean, maintainable, and well-documented code.",
    icon: FiLayers,
  },
];
