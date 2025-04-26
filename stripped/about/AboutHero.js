"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = AboutHero;
var _image = _interopRequireDefault(require("next/image"));
var _framerMotion = require("framer-motion");
var _fi = require("react-icons/fi");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function AboutHero() {
  return React.createElement("section", {
    className: "relative py-24 bg-gradient-to-b from-primary-50 to-white dark:from-gray-900 dark:to-gray-800"
  }, React.createElement("div", {
    className: "container mx-auto px-4 sm:px-6 lg:px-8"
  }, React.createElement("div", {
    className: "grid gap-y-10 gap-x-8 lg:grid-cols-2 items-center"
  }, React.createElement(_framerMotion.motion.div, {
    initial: {
      opacity: 0,
      x: -20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      duration: 0.6
    },
    className: "order-2 lg:order-1"
  }, React.createElement("div", {
    className: "relative h-96 w-full lg:h-[500px] overflow-hidden rounded-lg shadow-xl"
  }, React.createElement(_image["default"], {
    src: "/images/about-hero.jpg",
    alt: "About Me",
    fill: true,
    className: "object-cover",
    priority: true
  }), React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
  }), React.createElement("div", {
    className: "absolute bottom-0 left-0 p-6"
  }, React.createElement("span", {
    className: "inline-block px-4 py-1 rounded-full bg-primary-500 text-sm font-medium text-white mb-2"
  }, "Dartmouth College"), React.createElement("h3", {
    className: "text-xl font-bold text-white"
  }, "Class of 2026")))), React.createElement(_framerMotion.motion.div, {
    initial: {
      opacity: 0,
      x: 20
    },
    animate: {
      opacity: 1,
      x: 0
    },
    transition: {
      duration: 0.6,
      delay: 0.2
    },
    className: "order-1 lg:order-2"
  }, React.createElement("h1", {
    className: "text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
  }, "About ", React.createElement("span", {
    className: "bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent dark:from-primary-400 dark:to-secondary-400"
  }, "Me")), React.createElement("p", {
    className: "text-xl text-gray-700 dark:text-gray-300 mb-8"
  }, "I'm a passionate Junior at Dartmouth College, dedicated to creating digital experiences that inspire and make a difference."), React.createElement("div", {
    className: "grid gap-6 md:grid-cols-3"
  }, React.createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
  }, React.createElement("div", {
    className: "rounded-full bg-primary-100 p-3 inline-flex text-primary-600 dark:bg-primary-900 dark:text-primary-400 mb-3"
  }, React.createElement(_fi.FiUser, {
    size: 24
  })), React.createElement("h3", {
    className: "font-bold mb-1"
  }, "Student"), React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Passionate learner and academic achiever")), React.createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
  }, React.createElement("div", {
    className: "rounded-full bg-primary-100 p-3 inline-flex text-primary-600 dark:bg-primary-900 dark:text-primary-400 mb-3"
  }, React.createElement(_fi.FiCode, {
    size: 24
  })), React.createElement("h3", {
    className: "font-bold mb-1"
  }, "Developer"), React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Creator of meaningful digital solutions")), React.createElement("div", {
    className: "bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
  }, React.createElement("div", {
    className: "rounded-full bg-primary-100 p-3 inline-flex text-primary-600 dark:bg-primary-900 dark:text-primary-400 mb-3"
  }, React.createElement(_fi.FiBookOpen, {
    size: 24
  })), React.createElement("h3", {
    className: "font-bold mb-1"
  }, "Innovator"), React.createElement("p", {
    className: "text-sm text-gray-600 dark:text-gray-400"
  }, "Always exploring new technologies"))), React.createElement("div", {
    className: "mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border-l-4 border-primary-500"
  }, React.createElement("p", {
    className: "italic text-gray-700 dark:text-gray-300"
  }, "\"I believe in the power of technology to solve real-world problems and create meaningful connections. My goal is to build digital experiences that enhance people's lives and make a positive impact.\""))))));
}