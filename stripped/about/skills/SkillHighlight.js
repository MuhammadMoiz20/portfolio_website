"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SkillHighlight;
var _framerMotion = require("framer-motion");
function SkillHighlight(_ref) {
  var title = _ref.title,
    description = _ref.description,
    Icon = _ref.icon,
    index = _ref.index;
  return React.createElement(_framerMotion.motion.div, {
    initial: {
      opacity: 0,
      y: 20
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.5,
      delay: index * 0.1
    },
    viewport: {
      once: true
    },
    className: "rounded-lg bg-gray-50 p-6 text-center dark:bg-gray-900"
  }, React.createElement("div", {
    className: "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400"
  }, React.createElement(Icon, {
    size: 28
  })), React.createElement("h3", {
    className: "mb-2 text-xl font-bold"
  }, title), React.createElement("p", {
    className: "text-gray-600 dark:text-gray-400"
  }, description));
}