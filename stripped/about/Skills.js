"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Skills;
var _react = require("react");
var _framerMotion = require("framer-motion");
var _skills = require("@/data/skills");
var _SkillCategoryTabs = _interopRequireDefault(require("./skills/SkillCategoryTabs"));
var _SkillBar = _interopRequireDefault(require("./skills/SkillBar"));
var _SkillHighlight = _interopRequireDefault(require("./skills/SkillHighlight"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function Skills() {
  var _skillCategories$find;
  var _useState = (0, _react.useState)(_skills.skillCategories[0].name),
    _useState2 = _slicedToArray(_useState, 2),
    activeTab = _useState2[0],
    setActiveTab = _useState2[1];
  var activeSkills = ((_skillCategories$find = _skills.skillCategories.find(function (category) {
    return category.name === activeTab;
  })) === null || _skillCategories$find === void 0 ? void 0 : _skillCategories$find.skills) || [];
  return React.createElement("section", {
    className: "py-16"
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
  }, "Skills & Expertise"), React.createElement("p", {
    className: "text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
  }, "A comprehensive overview of my technical skills and proficiency levels as a Dartmouth Junior.")), React.createElement(_SkillCategoryTabs["default"], {
    categories: _skills.skillCategories,
    activeTab: activeTab,
    onTabChange: setActiveTab
  }), React.createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 md:p-8"
  }, React.createElement("div", {
    className: "grid gap-6 md:grid-cols-2"
  }, activeSkills.map(function (skill, index) {
    return React.createElement(_SkillBar["default"], {
      key: skill.name,
      skill: skill,
      index: index
    });
  }))), React.createElement("div", {
    className: "mt-10 grid gap-y-8 gap-x-6 md:grid-cols-3"
  }, _skills.skillHighlights.map(function (highlight, index) {
    return React.createElement(_SkillHighlight["default"], {
      key: highlight.title,
      title: highlight.title,
      description: highlight.description,
      icon: highlight.icon,
      index: index
    });
  }))));
}