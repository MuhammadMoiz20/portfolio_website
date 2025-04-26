'use client';

import { motion } from 'framer-motion';
import { 
  FiCode, 
  FiLayout, 
  FiDatabase, 
  FiServer, 
  FiTool, 
  FiActivity 
} from 'react-icons/fi';

export default function SkillsSection() {
  const skills = [
    {
      category: 'Programming Languages',
      description: 'Proficient in multiple programming languages',
      icon: FiCode,
      items: ['Java', 'Python', 'C', 'C++', 'JavaScript', 'Haskell', 'SQL', 'HTML', 'CSS'],
    },
    {
      category: 'Frameworks & Tools',
      description: 'Frameworks and development tools I use',
      icon: FiTool,
      items: ['React', 'Flask', 'TensorFlow', 'Selenium', 'REST APIs', 'Git', 'Android Studio', 'Flutter'],
    },
    {
      category: 'Database Systems',
      description: 'Database technologies and management',
      icon: FiDatabase,
      items: ['SQL', 'PostgreSQL', 'Database Design', 'Data Modeling'],
    },
    {
      category: 'Libraries & Packages',
      description: 'Libraries for development and data analysis',
      icon: FiLayout,
      items: ['Pandas', 'Matplotlib', 'NumPy', 'BeautifulSoup'],
    },
    {
      category: 'Software Development',
      description: 'Software engineering practices and methodologies',
      icon: FiServer,
      items: ['Object-Oriented Programming', 'Algorithms', 'Software Design', 'Full-Stack Development'],
    },
    {
      category: 'Specialized Skills',
      description: 'Additional technical expertise',
      icon: FiActivity,
      items: ['Assembly Language', 'ANTLR', 'Security & Privacy', 'UI/UX Design'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold">Technical Skills</h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
            As a Computer Science student at Dartmouth, I've developed a diverse set of technical skills through coursework, internships, and hands-on projects.
          </p>
        </motion.div>

        <div className="grid gap-y-8 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.div 
              key={index} 
              className="card h-full"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="mb-4 rounded-full bg-primary-100 p-3 inline-flex text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                <skill.icon size={24} />
              </div>
              <h3 className="mb-2 text-xl font-bold">{skill.category}</h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">{skill.description}</p>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, itemIndex) => (
                  <span
                    key={itemIndex}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
