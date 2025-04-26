"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Testimonials;
var _framerMotion = require("framer-motion");
var _testimonials = require("@/data/testimonials");
var _TestimonialCarousel = _interopRequireDefault(require("./testimonials/TestimonialCarousel"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function Testimonials() {
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
  }, "What People Say"), React.createElement("p", {
    className: "text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
  }, "Testimonials from professors, colleagues, and project partners about my work and collaboration.")), React.createElement(_TestimonialCarousel["default"], {
    testimonials: _testimonials.testimonials
  })));
}