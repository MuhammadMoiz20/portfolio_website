"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = TestimonialCard;
var _image = _interopRequireDefault(require("next/image"));
var _framerMotion = require("framer-motion");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function TestimonialCard(_ref) {
  var testimonial = _ref.testimonial,
    isActive = _ref.isActive;
  return React.createElement(_framerMotion.motion.div, {
    initial: {
      opacity: 0,
      x: 100
    },
    animate: {
      opacity: isActive ? 1 : 0,
      x: isActive ? 0 : 100,
      display: isActive ? 'block' : 'none'
    },
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    },
    className: "p-8 md:p-12"
  }, React.createElement("div", {
    className: "mb-6 text-center"
  }, React.createElement("div", {
    className: "mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-primary-100 dark:border-primary-900"
  }, React.createElement(_image["default"], {
    src: testimonial.avatar,
    alt: testimonial.author,
    width: 80,
    height: 80,
    className: "h-full w-full object-cover"
  }))), React.createElement("blockquote", {
    className: "mb-6 text-center text-lg italic text-gray-700 dark:text-gray-300"
  }, "\"", testimonial.content, "\""), React.createElement("div", {
    className: "text-center"
  }, React.createElement("p", {
    className: "font-bold text-gray-900 dark:text-white"
  }, testimonial.author), React.createElement("p", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, testimonial.position)));
}