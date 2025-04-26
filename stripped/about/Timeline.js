"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Timeline;
var _react = require("react");
var _framerMotion = require("framer-motion");
var _fi = require("react-icons/fi");
function Timeline() {
  var ref = (0, _react.useRef)(null);
  var isInView = (0, _framerMotion.useInView)(ref, {
    once: true,
    amount: 0.2
  });
  var timelineEvents = [{
    title: 'ManToGo - Campus Delivery Platform',
    date: 'April 2025 - Present',
    description: 'Full-stack React/Mapbox solution with real-time tracking and modular architecture, projecting 5,000+ users',
    icon: _fi.FiCode,
    category: 'Project'
  }, {
    title: 'ResumeAI Optimization System',
    date: 'March 2025 - Present',
    description: 'Full-stack Flask/React application with component-based architecture improving optimization speed by 70%',
    icon: _fi.FiCode,
    category: 'Project'
  }, {
    title: 'System Developer - Dartmouth Rauner Special Collections',
    date: 'April 2024 - Present',
    description: 'Built archival automation tools used by 60+ universities, accelerating digital asset processing from 2 hours to under 20 minutes',
    icon: _fi.FiCode,
    category: 'Work'
  }, {
    title: 'Software Developer - Astraic Tech',
    date: 'May 2023 - August 2023',
    description: 'Led AI-powered recommendation integration increasing active users by 30% and implemented chatbot cutting response times by 85%',
    icon: _fi.FiBriefcase,
    category: 'Work'
  }, {
    title: 'Software Engineering Intern - Muff Garments',
    date: 'March 2023 - May 2023',
    description: 'Improved checkout conversion by 20% through A/B testing and analytics integration',
    icon: _fi.FiBriefcase,
    category: 'Work'
  }, {
    title: 'ResumeAI Optimization System',
    date: '2023',
    description: 'Full-stack Flask/React application with component-based architecture improving optimization speed by 70%',
    icon: _fi.FiCode,
    category: 'Project'
  }, {
    title: 'Lead Developer - Maves Apparel',
    date: 'May 2021 - August 2021',
    description: 'Scaled Shopify store to 30k+ monthly visitors through frontend optimizations reducing load times by 30%',
    icon: _fi.FiBriefcase,
    category: 'Work'
  }, {
    title: 'Began at Dartmouth College',
    date: 'September 2022',
    description: 'Computer Science Modified with Engineering, GPA: 3.61',
    icon: _fi.FiBriefcase,
    category: 'Education'
  }];
  return React.createElement("section", {
    className: "py-16 bg-gray-50 dark:bg-gray-900"
  }, React.createElement("div", {
    className: "container mx-auto px-4 sm:px-6 lg:px-8"
  }, React.createElement(_framerMotion.motion.div, {
    initial: {
      opacity: 0,
      y: 20
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.5
    },
    viewport: {
      once: true
    },
    className: "mb-12 text-center"
  }, React.createElement("h2", {
    className: "text-3xl font-bold mb-4"
  }, "Experience & Journey"), React.createElement("p", {
    className: "text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
  }, "A timeline of my academic and professional milestones at Dartmouth and beyond.")), React.createElement("div", {
    ref: ref,
    className: "relative"
  }, React.createElement("div", {
    className: "absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gray-200 dark:bg-gray-700"
  }), React.createElement("div", {
    className: "space-y-12"
  }, timelineEvents.map(function (event, index) {
    return React.createElement(_framerMotion.motion.div, {
      key: index,
      initial: {
        opacity: 0,
        y: 20
      },
      animate: isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 20
      },
      transition: {
        duration: 0.5,
        delay: index * 0.1
      },
      className: "relative flex flex-col md:flex-row ".concat(index % 2 === 0 ? 'md:flex-row-reverse' : '')
    }, React.createElement("div", {
      className: "mt-24 md:mt-0 md:w-1/2 md:px-8"
    }, React.createElement("div", {
      className: "rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
    }, React.createElement("div", {
      className: "mb-2 inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"
    }, event.category), React.createElement("h3", {
      className: "mb-2 text-xl font-bold"
    }, event.title), React.createElement("p", {
      className: "mb-3 text-sm text-gray-500 dark:text-gray-400"
    }, event.date), React.createElement("p", {
      className: "text-gray-600 dark:text-gray-300"
    }, event.description))), React.createElement("div", {
      className: "absolute left-1/2 top-6 -translate-x-1/2 md:top-[50%] md:-translate-y-1/2"
    }, React.createElement("div", {
      className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white dark:bg-primary-500"
    }, React.createElement(event.icon, {
      size: 24
    }))), React.createElement("div", {
      className: "md:w-1/2"
    }));
  })))));
}