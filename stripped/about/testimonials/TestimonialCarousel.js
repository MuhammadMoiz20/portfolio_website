"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TestimonialCarousel;
var _react = require("react");
var _TestimonialCard = _interopRequireDefault(require("./TestimonialCard"));
var _CarouselControls = _interopRequireDefault(require("./CarouselControls"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function TestimonialCarousel(_ref) {
  var testimonials = _ref.testimonials;
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    activeIndex = _useState2[0],
    setActiveIndex = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = _slicedToArray(_useState3, 2),
    autoplay = _useState4[0],
    setAutoplay = _useState4[1];
  (0, _react.useEffect)(function () {
    if (!autoplay) return;
    var interval = setInterval(function () {
      setActiveIndex(function (prev) {
        return (prev + 1) % testimonials.length;
      });
    }, 5000);
    return function () {
      return clearInterval(interval);
    };
  }, [autoplay, testimonials.length]);
  var handleManualNavigation = function handleManualNavigation(index) {
    setActiveIndex(index);
    setAutoplay(false);
    setTimeout(function () {
      return setAutoplay(true);
    }, 10000);
  };
  var handlePrev = function handlePrev() {
    var newIndex = activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    handleManualNavigation(newIndex);
  };
  var handleNext = function handleNext() {
    var newIndex = (activeIndex + 1) % testimonials.length;
    handleManualNavigation(newIndex);
  };
  return React.createElement("div", {
    className: "relative mx-auto max-w-4xl"
  }, React.createElement("div", {
    className: "overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800"
  }, React.createElement("div", {
    className: "relative h-full w-full"
  }, testimonials.map(function (testimonial, index) {
    return React.createElement(_TestimonialCard["default"], {
      key: testimonial.id,
      testimonial: testimonial,
      isActive: activeIndex === index
    });
  }))), React.createElement(_CarouselControls["default"], {
    onPrev: handlePrev,
    onNext: handleNext,
    activeIndex: activeIndex,
    totalItems: testimonials.length,
    onDotClick: handleManualNavigation
  }));
}