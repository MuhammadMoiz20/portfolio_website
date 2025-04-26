'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Skill data interface for comparison chart
 */
export interface SkillComparisonData {
  /**
   * Skill name/label
   */
  name: string;
  
  /**
   * Proficiency value (0-100)
   */
  value: number;
  
  /**
   * Optional color for this specific skill bar
   */
  color?: string;
}

interface SkillComparisonChartProps {
  /**
   * Chart title
   */
  title?: string;
  
  /**
   * Skills data to display
   */
  skills: SkillComparisonData[];
  
  /**
   * Type of chart to display
   * @default 'horizontal'
   */
  chartType?: 'horizontal' | 'vertical' | 'radar';
  
  /**
   * Base color for the chart
   * (individual skill colors take precedence)
   * @default '#3B82F6' (blue-500)
   */
  baseColor?: string;
  
  /**
   * Whether to animate the chart on scroll into view
   * @default true
   */
  animate?: boolean;
  
  /**
   * Whether to show values on the bars
   * @default true
   */
  showValues?: boolean;
  
  /**
   * Maximum value (for scaling)
   * @default 100
   */
  maxValue?: number;
  
  /**
   * Custom CSS class
   */
  className?: string;
}

/**
 * SkillComparisonChart component
 * Visualizes skill proficiency with various chart types
 */
export default function SkillComparisonChart({
  title,
  skills,
  chartType = 'horizontal',
  baseColor = '#3B82F6', // blue-500
  animate = true,
  showValues = true,
  maxValue = 100,
  className = '',
}: SkillComparisonChartProps) {
  const [isInView, setIsInView] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Observer for animation on scroll
  useEffect(() => {
    if (!animate) {
      setIsInView(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    
    if (chartRef.current) {
      observer.observe(chartRef.current);
    }
    
    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, [animate]);
  
  // Get custom color or fall back to base color
  const getColor = (skill: SkillComparisonData) => skill.color || baseColor;
  
  // Render horizontal bar chart
  const renderHorizontalChart = () => (
    <div className="space-y-4">
      {skills.map((skill, index) => {
        const percentage = (skill.value / maxValue) * 100;
        
        return (
          <div key={skill.name} className="w-full">
            <div className="mb-1 flex justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {skill.name}
              </span>
              {showValues && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {skill.value}%
                </span>
              )}
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <motion.div
                className="h-full rounded-full"
                style={{
                  backgroundColor: getColor(skill),
                  width: isInView ? `${percentage}%` : '0%',
                }}
                initial={{ width: '0%' }}
                animate={{ width: isInView ? `${percentage}%` : '0%' }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
  
  // Render vertical bar chart
  const renderVerticalChart = () => (
    <div className="flex h-64 items-end justify-around space-x-2">
      {skills.map((skill, index) => {
        const percentage = (skill.value / maxValue) * 100;
        
        return (
          <div key={skill.name} className="flex flex-col items-center">
            <div className="relative flex h-full w-12 items-end justify-center">
              <motion.div
                className="w-full rounded-t-md"
                style={{
                  backgroundColor: getColor(skill),
                  height: isInView ? `${percentage}%` : '0%',
                }}
                initial={{ height: '0%' }}
                animate={{ height: isInView ? `${percentage}%` : '0%' }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
              {showValues && (
                <span className="absolute -top-6 text-xs font-medium text-gray-700 dark:text-gray-300">
                  {skill.value}%
                </span>
              )}
            </div>
            <span className="mt-2 max-w-[80px] overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-xs font-medium text-gray-700 dark:text-gray-300">
              {skill.name}
            </span>
          </div>
        );
      })}
    </div>
  );
  
  // Render radar chart
  const renderRadarChart = () => {
    const sides = skills.length;
    const angleStep = (2 * Math.PI) / sides;
    const radius = 100;
    const center = { x: 150, y: 150 };
    
    // Calculate points for the radar
    const calculatePoint = (index: number, value: number) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const distanceFromCenter = (value / maxValue) * radius;
      
      return {
        x: center.x + distanceFromCenter * Math.cos(angle),
        y: center.y + distanceFromCenter * Math.sin(angle),
      };
    };
    
    // Calculate axis points (100% points)
    const axisPoints = Array.from({ length: sides }).map((_, i) => 
      calculatePoint(i, maxValue)
    );
    
    // Calculate skill data points
    const dataPoints = skills.map((skill, i) => calculatePoint(i, skill.value));
    
    // Create SVG path for the polygon
    const polygonPoints = dataPoints.map(point => `${point.x},${point.y}`).join(' ');
    
    return (
      <div className="mx-auto h-[300px] w-[300px]">
        <svg
          viewBox="0 0 300 300"
          className="overflow-visible"
        >
          {/* Background grid */}
          {[20, 40, 60, 80, 100].map((level) => {
            const gridPoints = Array.from({ length: sides }).map((_, i) => 
              calculatePoint(i, (level / 100) * maxValue)
            );
            
            const gridPolygon = gridPoints.map(point => `${point.x},${point.y}`).join(' ');
            
            return (
              <polygon
                key={level}
                points={gridPolygon}
                fill="none"
                stroke="currentColor"
                strokeOpacity={0.1}
                strokeWidth="1"
              />
            );
          })}
          
          {/* Axis lines */}
          {axisPoints.map((point, i) => (
            <line
              key={`axis-${i}`}
              x1={center.x}
              y1={center.y}
              x2={point.x}
              y2={point.y}
              stroke="currentColor"
              strokeOpacity={0.2}
              strokeWidth="1"
            />
          ))}
          
          {/* Data polygon */}
          <motion.polygon
            points={polygonPoints}
            fill={baseColor}
            fillOpacity={0.2}
            stroke={baseColor}
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.5 }}
            transition={{ duration: 0.8 }}
          />
          
          {/* Data points */}
          {dataPoints.map((point, i) => (
            <motion.circle
              key={`point-${i}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={skills[i].color || baseColor}
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
            />
          ))}
          
          {/* Labels */}
          {skills.map((skill, i) => {
            const point = calculatePoint(i, maxValue * 1.1); // Slightly outside the chart
            
            return (
              <motion.text
                key={`label-${i}`}
                x={point.x}
                y={point.y}
                fontSize="11"
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="currentColor"
                className="fill-gray-700 dark:fill-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.05 }}
              >
                {skill.name}
                {showValues && ` (${skill.value}%)`}
              </motion.text>
            );
          })}
        </svg>
      </div>
    );
  };
  
  // Determine which chart to render
  const renderChart = () => {
    switch (chartType) {
      case 'vertical':
        return renderVerticalChart();
      case 'radar':
        return renderRadarChart();
      case 'horizontal':
      default:
        return renderHorizontalChart();
    }
  };

  return (
    <div className={`${className}`} ref={chartRef}>
      {title && (
        <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      
      {renderChart()}
    </div>
  );
}
