"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SkillBar;
var _framerMotion = require("framer-motion");
function SkillBar(_ref) {
  var skill = _ref.skill,
    index = _ref.index;
  return React.createElement(_framerMotion.motion.div, {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.3,
      delay: index * 0.05
    }
  }, React.createElement("div", {
    className: "flex justify-between mb-2"
  }, React.createElement("span", {
    className: "font-medium text-gray-700 dark:text-gray-300"
  }, skill.name), React.createElement("span", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, skill.proficiency, "%")), React.createElement("div", {
    className: "h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700"
  }, React.createElement(_framerMotion.motion.div, {
    className: "h-2.5 rounded-full bg-primary-600 dark:bg-primary-500",
    initial: {
      width: 0
    },
    whileInView: {
      width: "".concat(skill.proficiency, "%")
    },
    transition: {
      duration: 1,
      ease: "easeOut"
    },
    viewport: {
      once: true
    }
  })));
}