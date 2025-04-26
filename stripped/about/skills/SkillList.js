"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SkillList;
var _framerMotion = require("framer-motion");
var _SkillBar = _interopRequireDefault(require("./SkillBar"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function SkillList(_ref) {
  var skills = _ref.skills,
    _ref$twoColumns = _ref.twoColumns,
    twoColumns = _ref$twoColumns === void 0 ? true : _ref$twoColumns;
  var containerVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  var itemVariants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };
  return React.createElement(_framerMotion.motion.div, {
    variants: containerVariants,
    initial: "hidden",
    animate: "visible",
    className: "grid gap-4 ".concat(twoColumns ? 'md:grid-cols-2' : 'md:grid-cols-1')
  }, skills.map(function (skill) {
    return React.createElement(_framerMotion.motion.div, {
      key: skill.name,
      variants: itemVariants
    }, React.createElement(_SkillBar["default"], {
      name: skill.name,
      proficiency: skill.proficiency,
      color: skill.color
    }));
  }));
}