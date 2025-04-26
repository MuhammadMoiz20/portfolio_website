"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = EducationSection;
var _react = require("react");
var _image = _interopRequireDefault(require("next/image"));
var _framerMotion = require("framer-motion");
var _fi = require("react-icons/fi");
var _SectionHeading = _interopRequireDefault(require("@/components/ui/SectionHeading"));
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
function EducationSection(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? 'Education' : _ref$title,
    subtitle = _ref.subtitle,
    education = _ref.education,
    _ref$enableFiltering = _ref.enableFiltering,
    enableFiltering = _ref$enableFiltering === void 0 ? true : _ref$enableFiltering,
    _ref$displayStyle = _ref.displayStyle,
    displayStyle = _ref$displayStyle === void 0 ? 'cards' : _ref$displayStyle,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    activeType = _useState2[0],
    setActiveType = _useState2[1];
  var types = enableFiltering ? Array.from(new Set(education.filter(function (edu) {
    return edu.type;
  }).map(function (edu) {
    return edu.type;
  }))) : [];
  var filteredEducation = activeType ? education.filter(function (edu) {
    return edu.type === activeType;
  }) : education;
  var sortedEducation = _toConsumableArray(filteredEducation).sort(function (a, b) {
    if (a.endDate.toLowerCase().includes('present')) return -1;
    if (b.endDate.toLowerCase().includes('present')) return 1;
    return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
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
    className: "rounded-full px-3 py-1 text-sm font-medium ".concat(activeType === null ? 'bg-primary-600 text-white dark:bg-primary-500' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600')
  }, "All"), types.map(function (type) {
    return React.createElement("button", {
      key: type,
      onClick: function onClick() {
        return setActiveType(type);
      },
      className: "rounded-full px-3 py-1 text-sm font-medium ".concat(activeType === type ? 'bg-primary-600 text-white dark:bg-primary-500' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600')
    }, type);
  })))), sortedEducation.length > 0 ? React.createElement("div", {
    className: displayStyle === 'timeline' ? 'relative' : ''
  }, displayStyle === 'timeline' && React.createElement("div", {
    className: "absolute left-0 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700 md:left-1/2 md:ml-px"
  }), React.createElement("div", {
    className: "".concat(displayStyle === 'cards' ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3' : displayStyle === 'timeline' ? 'space-y-12' : 'space-y-8')
  }, sortedEducation.map(function (edu, index) {
    if (displayStyle === 'cards') {
      return React.createElement(_framerMotion.motion.div, {
        key: edu.id,
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
        },
        className: "rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
      }, React.createElement("div", {
        className: "flex items-start justify-between"
      }, edu.logo ? React.createElement("div", {
        className: "relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md"
      }, React.createElement(_image["default"], {
        src: edu.logo,
        alt: edu.institution,
        fill: true,
        sizes: "56px",
        className: "object-contain"
      })) : React.createElement("div", {
        className: "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300"
      }, React.createElement(_fi.FiBook, {
        size: 24
      })), edu.type && React.createElement("span", {
        className: "inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      }, edu.type)), React.createElement("h3", {
        className: "mt-4 text-lg font-bold text-gray-900 dark:text-white"
      }, edu.degree, " in ", edu.fieldOfStudy), React.createElement("p", {
        className: "mt-1 text-base font-medium text-gray-700 dark:text-gray-300"
      }, edu.institution), React.createElement("div", {
        className: "mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400"
      }, React.createElement("span", {
        className: "flex items-center"
      }, React.createElement(_fi.FiCalendar, {
        className: "mr-1",
        size: 14
      }), edu.startDate, " - ", edu.endDate), edu.location && React.createElement("span", {
        className: "flex items-center"
      }, React.createElement(_fi.FiMapPin, {
        className: "mr-1",
        size: 14
      }), edu.location)), edu.grade && React.createElement("div", {
        className: "mt-3 flex items-center text-sm"
      }, React.createElement(_fi.FiAward, {
        className: "mr-1 text-amber-500",
        size: 14
      }), React.createElement("span", {
        className: "font-medium text-gray-700 dark:text-gray-300"
      }, edu.grade)), edu.description && React.createElement("p", {
        className: "mt-3 text-sm text-gray-600 dark:text-gray-400"
      }, edu.description), edu.honors && edu.honors.length > 0 && React.createElement("div", {
        className: "mt-4"
      }, React.createElement("h4", {
        className: "mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
      }, "Honors & Awards"), React.createElement("ul", {
        className: "list-inside list-disc space-y-1 pl-1 text-sm text-gray-600 dark:text-gray-400"
      }, edu.honors.map(function (honor, i) {
        return React.createElement("li", {
          key: i
        }, honor);
      }))), edu.courses && edu.courses.length > 0 && React.createElement("div", {
        className: "mt-4"
      }, React.createElement("h4", {
        className: "mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
      }, "Relevant Courses"), React.createElement("div", {
        className: "flex flex-wrap gap-1"
      }, edu.courses.map(function (course, i) {
        return React.createElement("span", {
          key: i,
          className: "inline-flex rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
        }, course);
      }))));
    }
    if (displayStyle === 'timeline') {
      return React.createElement("div", {
        key: edu.id,
        className: "relative"
      }, React.createElement(_framerMotion.motion.div, {
        initial: {
          opacity: 0,
          x: index % 2 === 0 ? -20 : 20
        },
        animate: {
          opacity: 1,
          x: 0
        },
        transition: {
          duration: 0.3,
          delay: index * 0.05
        },
        className: "relative mx-auto w-full md:w-5/12 ".concat(index % 2 === 0 ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0')
      }, React.createElement("div", {
        className: "rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
      }, React.createElement("div", {
        className: "absolute -left-3 top-6 hidden h-6 w-6 rounded-full border-4 border-white bg-primary-500 dark:border-gray-900 md:-left-3 md:block"
      }, index % 2 === 1 && React.createElement("div", {
        className: "absolute -right-3 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 md:block"
      })), React.createElement("div", {
        className: "absolute top-6 hidden h-px w-8 bg-gray-200 dark:bg-gray-700 md:block ".concat(index % 2 === 0 ? 'left-full' : 'right-full')
      }), React.createElement("div", {
        className: "flex items-center space-x-4"
      }, edu.logo ? React.createElement("div", {
        className: "relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md"
      }, React.createElement(_image["default"], {
        src: edu.logo,
        alt: edu.institution,
        fill: true,
        sizes: "48px",
        className: "object-contain"
      })) : React.createElement("div", {
        className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300"
      }, React.createElement(_fi.FiBook, {
        size: 24
      })), React.createElement("div", null, React.createElement("h3", {
        className: "text-lg font-bold text-gray-900 dark:text-white"
      }, edu.degree), React.createElement("p", {
        className: "text-sm font-medium text-gray-700 dark:text-gray-300"
      }, edu.fieldOfStudy))), React.createElement("div", {
        className: "mt-4"
      }, React.createElement("p", {
        className: "text-base font-medium text-gray-800 dark:text-gray-200"
      }, edu.institution, edu.type && React.createElement("span", {
        className: "ml-2 inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      }, edu.type)), React.createElement("div", {
        className: "mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400"
      }, React.createElement("span", {
        className: "flex items-center"
      }, React.createElement(_fi.FiCalendar, {
        className: "mr-1",
        size: 14
      }), edu.startDate, " - ", edu.endDate), edu.location && React.createElement("span", {
        className: "flex items-center"
      }, React.createElement(_fi.FiMapPin, {
        className: "mr-1",
        size: 14
      }), edu.location), edu.grade && React.createElement("span", {
        className: "flex items-center"
      }, React.createElement(_fi.FiAward, {
        className: "mr-1 text-amber-500",
        size: 14
      }), edu.grade))), edu.description && React.createElement("p", {
        className: "mt-3 text-sm text-gray-600 dark:text-gray-400"
      }, edu.description), React.createElement("div", {
        className: "mt-4 flex flex-wrap gap-4"
      }, edu.honors && edu.honors.length > 0 && React.createElement("div", {
        className: "flex-1"
      }, React.createElement("h4", {
        className: "mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
      }, "Honors"), React.createElement("ul", {
        className: "list-inside list-disc space-y-0.5 text-xs text-gray-600 dark:text-gray-400"
      }, edu.honors.map(function (honor, i) {
        return React.createElement("li", {
          key: i
        }, honor);
      }))), edu.courses && edu.courses.length > 0 && React.createElement("div", {
        className: "flex-1"
      }, React.createElement("h4", {
        className: "mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
      }, "Courses"), React.createElement("div", {
        className: "flex flex-wrap gap-1"
      }, edu.courses.map(function (course, i) {
        return React.createElement("span", {
          key: i,
          className: "inline-flex rounded-full bg-gray-50 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
        }, course);
      })))))));
    }
    return React.createElement(_framerMotion.motion.div, {
      key: edu.id,
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
    }, edu.degree, " in ", edu.fieldOfStudy), React.createElement("p", {
      className: "mt-1 text-base font-medium text-gray-700 dark:text-gray-300"
    }, edu.institution), React.createElement("div", {
      className: "mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400"
    }, React.createElement("span", {
      className: "flex items-center"
    }, React.createElement(_fi.FiCalendar, {
      className: "mr-1",
      size: 14
    }), edu.startDate, " - ", edu.endDate), edu.location && React.createElement("span", {
      className: "flex items-center"
    }, React.createElement(_fi.FiMapPin, {
      className: "mr-1",
      size: 14
    }), edu.location), edu.grade && React.createElement("span", {
      className: "flex items-center"
    }, React.createElement(_fi.FiAward, {
      className: "mr-1 text-amber-500",
      size: 14
    }), edu.grade))), edu.type && React.createElement("span", {
      className: "inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }, edu.type)), edu.description && React.createElement("p", {
      className: "mt-3 text-sm text-gray-600 dark:text-gray-400"
    }, edu.description));
  }))) : React.createElement("div", {
    className: "py-8 text-center"
  }, React.createElement("p", {
    className: "text-lg text-gray-600 dark:text-gray-400"
  }, "No education entries found."), activeType && React.createElement("button", {
    onClick: function onClick() {
      return setActiveType(null);
    },
    className: "mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
  }, "Show all"))));
}