'use client';

import { ReactNode } from 'react';
import { motion, Variant, Variants } from 'framer-motion';

export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface AnimatedElementProps {
    children: ReactNode;
  
    direction?: AnimationDirection;
  
    duration?: number;
  
    delay?: number;
  
    once?: boolean;
  
    customVariants?: Variants;
  
    className?: string;
}

export default function AnimatedElement({
  children,
  direction = 'up',
  duration = 0.5,
  delay = 0,
  once = true,
  customVariants,
  className = '',
}: AnimatedElementProps) {
  // Define standard animation variants based on direction
  const getAnimationVariants = (): Variants => {
    // If custom variants are provided, use those instead
    if (customVariants) {
      return customVariants;
    }
    
    // Define offset based on direction
    const offset = 30;
    
    // Map direction to x/y values
    const directionToOffset = {
      up: { y: offset },
      down: { y: -offset },
      left: { x: offset },
      right: { x: -offset },
      none: {}
    };
    
    // Set the appropriate offset
    const offsetProps = directionToOffset[direction];
    
    return {
      hidden: {
        opacity: 0,
        ...offsetProps,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          delay,
          ease: 'easeOut',
        },
      },
    };
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={getAnimationVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}
