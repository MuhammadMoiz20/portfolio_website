'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ContactInfoProps {
    icon: ReactNode;
  
    title: string;
  
    content: string;
  
    link?: string;
}

export default function ContactInfo({ icon, title, content, link }: ContactInfoProps) {
  
  const Container = ({ children }: { children: ReactNode }) => (
    <motion.div
      whileHover={{ x: 5 }}
      className="flex items-start space-x-4 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      {children}
    </motion.div>
  );
  
  
  const IconWrapper = () => (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
      {icon}
    </div>
  );
  
  
  const TextContent = () => (
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{content}</p>
    </div>
  );

  
  return link ? (
    <a href={link} className="block">
      <Container>
        <IconWrapper />
        <TextContent />
      </Container>
    </a>
  ) : (
    <Container>
      <IconWrapper />
      <TextContent />
    </Container>
  );
}
