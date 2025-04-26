"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = StatsSection;
var _react = require("react");
var _framerMotion = require("framer-motion");
var _SectionHeading = _interopRequireDefault(require("@/components/ui/SectionHeading"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function StatsSection(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? 'By the Numbers' : _ref$title,
    subtitle = _ref.subtitle,
    stats = _ref.stats,
    _ref$layout = _ref.layout,
    layout = _ref$layout === void 0 ? 'grid' : _ref$layout,
    _ref$animationDuratio = _ref.animationDuration,
    animationDuration = _ref$animationDuratio === void 0 ? 2 : _ref$animationDuratio,
    _ref$showDividers = _ref.showDividers,
    showDividers = _ref$showDividers === void 0 ? false : _ref$showDividers,
    _ref$backgroundStyle = _ref.backgroundStyle,
    backgroundStyle = _ref$backgroundStyle === void 0 ? 'light' : _ref$backgroundStyle,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    shouldAnimate = _useState2[0],
    setShouldAnimate = _useState2[1];
  var sectionRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var observer = new IntersectionObserver(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 1),
        entry = _ref3[0];
      if (entry.isIntersecting) {
        setShouldAnimate(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.2
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return function () {
      return observer.disconnect();
    };
  }, []);
  var getBackgroundClass = function getBackgroundClass() {
    switch (backgroundStyle) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'gradient':
        return 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white';
      case 'transparent':
        return '';
      case 'light':
      default:
        return 'bg-gray-50 dark:bg-gray-800';
    }
  };
  var getContainerClasses = function getContainerClasses() {
    switch (layout) {
      case 'row':
        return 'flex flex-wrap justify-center items-center gap-8';
      case 'cards':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';
      case 'grid':
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6';
    }
  };
  var getStatItemClasses = function getStatItemClasses(index) {
    var baseClasses = 'flex flex-col items-center text-center p-4';
    if (layout === 'cards') {
      return "".concat(baseClasses, " bg-white dark:bg-gray-700 rounded-lg shadow-md");
    }
    if (layout === 'row' && showDividers && index < stats.length - 1) {
      return "".concat(baseClasses, " relative pr-8 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-12 after:w-px after:bg-gray-300 dark:after:bg-gray-600");
    }
    return baseClasses;
  };
  var AnimatedCounter = function AnimatedCounter(_ref4) {
    var value = _ref4.value,
      _ref4$unit = _ref4.unit,
      unit = _ref4$unit === void 0 ? '' : _ref4$unit,
      _ref4$precision = _ref4.precision,
      precision = _ref4$precision === void 0 ? 0 : _ref4$precision,
      _ref4$duration = _ref4.duration,
      duration = _ref4$duration === void 0 ? animationDuration : _ref4$duration;
    var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      displayValue = _useState4[0],
      setDisplayValue = _useState4[1];
    (0, _react.useEffect)(function () {
      if (!shouldAnimate) return;
      var startTime;
      var animationFrame;
      var _updateValue = function updateValue(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setDisplayValue(Math.floor(progress * value));
        if (progress < 1) {
          animationFrame = requestAnimationFrame(_updateValue);
        } else {
          setDisplayValue(value);
        }
      };
      animationFrame = requestAnimationFrame(_updateValue);
      return function () {
        return cancelAnimationFrame(animationFrame);
      };
    }, [value, duration, shouldAnimate]);
    return React.createElement("span", null, displayValue.toLocaleString(undefined, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    }), unit);
  };
  return React.createElement("section", {
    ref: sectionRef,
    className: "py-12 ".concat(getBackgroundClass(), " ").concat(className)
  }, React.createElement("div", {
    className: "container mx-auto px-4"
  }, (title || subtitle) && React.createElement(_SectionHeading["default"], {
    title: title,
    subtitle: subtitle,
    centered: true,
    className: "mb-10"
  }), React.createElement("div", {
    className: getContainerClasses()
  }, stats.map(function (stat, index) {
    return React.createElement("div", {
      key: stat.id,
      className: getStatItemClasses(index)
    }, stat.icon && React.createElement("div", {
      className: "mb-4 flex h-16 w-16 items-center justify-center rounded-full ".concat(stat.color || 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300')
    }, stat.icon), React.createElement(_framerMotion.motion.div, {
      initial: {
        scale: 0.5,
        opacity: 0
      },
      animate: shouldAnimate ? {
        scale: 1,
        opacity: 1
      } : {},
      transition: {
        duration: 0.5,
        delay: index * 0.1
      },
      className: "mb-2 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl"
    }, React.createElement(AnimatedCounter, {
      value: stat.value,
      unit: stat.unit,
      precision: stat.precision || 0
    })), React.createElement("h3", {
      className: "text-lg font-medium text-gray-700 dark:text-gray-300"
    }, stat.label), stat.description && React.createElement("p", {
      className: "mt-1 text-sm text-gray-500 dark:text-gray-400"
    }, stat.description));
  }))));
}