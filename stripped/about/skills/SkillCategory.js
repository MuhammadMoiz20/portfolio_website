"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SkillCategory;
var _framerMotion = require("framer-motion");
var _SkillBar = _interopRequireDefault(require("./SkillBar"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function SkillCategory(_ref) {
  var name = _ref.name,
    Icon = _ref.icon,
    skills = _ref.skills,
    isActive = _ref.isActive;
  return React.createElement(_framerMotion.AnimatePresence, null, isActive && React.createElement(_framerMotion.motion.div, {
    initial: {
      opacity: 0,
      height: 0
    },
    animate: {
      opacity: 1,
      height: 'auto'
    },
    exit: {
      opacity: 0,
      height: 0
    },
    transition: {
      duration: 0.3
    },
    className: "overflow-hidden"
  }, React.createElement("div", {
    className: "grid gap-4 md:grid-cols-2"
  }, skills.map(function (skill, index) {
    return React.createElement(_framerMotion.motion.div, {
      key: skill.name,
      initial: {
        opacity: 0,
        x: -10
      },
      animate: {
        opacity: 1,
        x: 0
      },
      transition: {
        duration: 0.3,
        delay: index * 0.05
      }
    }, React.createElement(_SkillBar["default"], {
      name: skill.name,
      proficiency: skill.proficiency,
      color: skill.color
    }));
  }))));
}