"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ExperienceSection;
var _react = require("react");
var _framerMotion = require("framer-motion");
var _fi = require("react-icons/fi");
var _SectionHeading = _interopRequireDefault(require("@/components/ui/SectionHeading"));
var _Timeline = _interopRequireDefault(require("@/components/timeline/Timeline"));
var _ExperienceTimelineItem = _interopRequireDefault(require("@/components/timeline/ExperienceTimelineItem"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ExperienceSection(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? 'Professional Experience' : _ref$title,
    subtitle = _ref.subtitle,
    experiences = _ref.experiences,
    _ref$enableFiltering = _ref.enableFiltering,
    enableFiltering = _ref$enableFiltering === void 0 ? true : _ref$enableFiltering,
    _ref$displayStyle = _ref.displayStyle,
    displayStyle = _ref$displayStyle === void 0 ? 'detailed' : _ref$displayStyle,
    _ref$expandedByDefaul = _ref.expandedByDefault,
    expandedByDefault = _ref$expandedByDefaul === void 0 ? false : _ref$expandedByDefaul,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    activeType = _useState2[0],
    setActiveType = _useState2[1];
  var types = enableFiltering ? Array.from(new Set(experiences.filter(function (exp) {
    return exp.type;
  }).map(function (exp) {
    return exp.type;
  }))) : [];
  var filteredExperiences = activeType ? experiences.filter(function (exp) {
    return exp.type === activeType;
  }) : experiences;
  var sortedExperiences = _toConsumableArray(filteredExperiences).sort(function (a, b) {
    var _a$date$split$, _b$date$split$;
    var aEndYear = ((_a$date$split$ = a.date.split('-')[1]) === null || _a$date$split$ === void 0 ? void 0 : _a$date$split$.trim()) || '';
    var bEndYear = ((_b$date$split$ = b.date.split('-')[1]) === null || _b$date$split$ === void 0 ? void 0 : _b$date$split$.trim()) || '';
    if (aEndYear.toLowerCase().includes('present')) return -1;
    if (bEndYear.toLowerCase().includes('present')) return 1;
    return parseInt(bEndYear) - parseInt(aEndYear);
  });
  return React.createElement("section", {
    className: "py-12 ".concat(className)
  }, React.createElement("div", {
    className: "container mx-auto px-4"
  }, React.createElement(_SectionHeading["default"], {
    title: title,
    subtitle: subtitle,
    centered: true,
    className: "mb-10"
  }), enableFiltering && types.length > 0 && React.createElement("div", {
    className: "mb-8 flex justify-center"
  }, React.createElement("div", {
    className: "flex items-center space-x-2"
  }, React.createElement(_fi.FiFilter, {
    className: "h-5 w-5 text-gray-500"
  }), React.createElement("span", {
    className: "mr-2 text-sm font-medium text-gray-700 dark:text-gray-300"
  }, "Filter:"), React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, React.createElement("button", {
    onClick: function onClick() {
      return setActiveType(null);
    },
    className: "rounded-full px-3 py-1 text-sm font-medium transition-colors ".concat(activeType === null ? 'bg-primary-600 text-white dark:bg-primary-500' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600')
  }, "All"), types.map(function (type) {
    return React.createElement("button", {
      key: type,
      onClick: function onClick() {
        return setActiveType(type);
      },
      className: "rounded-full px-3 py-1 text-sm font-medium transition-colors ".concat(activeType === type ? 'bg-primary-600 text-white dark:bg-primary-500' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600')
    }, type);
  })))), sortedExperiences.length > 0 ? React.createElement("div", null, displayStyle === 'timeline' && React.createElement(_Timeline["default"], {
    items: sortedExperiences,
    linePosition: "left",
    defaultIcon: React.createElement(_fi.FiBriefcase, {
      size: 16,
      className: "text-white"
    }),
    animated: true
  }), displayStyle === 'detailed' && React.createElement("div", {
    className: "space-y-8"
  }, sortedExperiences.map(function (experience, index) {
    return React.createElement(_framerMotion.motion.div, {
      key: experience.id,
      initial: {
        opacity: 0,
        y: 20
      },
      animate: {
        opacity: 1,
        y: 0
      },
      transition: {
        duration: 0.3,
        delay: index * 0.05
      }
    }, React.createElement(_ExperienceTimelineItem["default"], {
      experience: experience,
      expandedByDefault: expandedByDefault,
      initialResponsibilitiesShown: 2
    }));
  })), displayStyle === 'compact' && React.createElement("div", {
    className: "space-y-6"
  }, sortedExperiences.map(function (experience, index) {
    return React.createElement(_framerMotion.motion.div, {
      key: experience.id,
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
      },
      className: "border-b border-gray-200 pb-6 dark:border-gray-700 last:border-b-0"
    }, React.createElement("div", {
      className: "flex items-start justify-between"
    }, React.createElement("div", null, React.createElement("h3", {
      className: "text-lg font-bold text-gray-900 dark:text-white"
    }, experience.title), experience.subtitle && React.createElement("p", {
      className: "mt-1 text-base font-medium text-gray-700 dark:text-gray-300"
    }, experience.subtitle), React.createElement("div", {
      className: "mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400"
    }, React.createElement("span", null, experience.date), experience.location && React.createElement("span", null, experience.location))), experience.type && React.createElement("span", {
      className: "inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }, experience.type)), experience.description && React.createElement("div", {
      className: "mt-3 text-sm text-gray-600 dark:text-gray-400"
    }, experience.description), experience.technologies && experience.technologies.length > 0 && React.createElement("div", {
      className: "mt-3"
    }, React.createElement("div", {
      className: "flex flex-wrap gap-1"
    }, experience.technologies.map(function (tech) {
      return React.createElement("span", {
        key: tech,
        className: "rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-600 dark:bg-primary-900/30 dark:text-primary-300"
      }, tech);
    }))));
  }))) : React.createElement("div", {
    className: "py-8 text-center"
  }, React.createElement("p", {
    className: "text-lg text-gray-600 dark:text-gray-400"
  }, "No experience entries found."), activeType && React.createElement("button", {
    onClick: function onClick() {
      return setActiveType(null);
    },
    className: "mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
  }, "Show all"))));
}