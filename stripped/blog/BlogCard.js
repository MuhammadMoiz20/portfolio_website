"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BlogCard;
var _image = _interopRequireDefault(require("next/image"));
var _link = _interopRequireDefault(require("next/link"));
var _framerMotion = require("framer-motion");
var _fi = require("react-icons/fi");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function BlogCard(_ref) {
  var post = _ref.post,
    index = _ref.index;
  var formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return React.createElement(_framerMotion.motion.div, {
    initial: {
      opacity: 0,
      y: 20
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.5,
      delay: index * 0.1
    },
    viewport: {
      once: true
    },
    className: "card overflow-hidden"
  }, React.createElement("div", {
    className: "relative mb-4 h-48 w-full overflow-hidden rounded-lg"
  }, React.createElement(_image["default"], {
    src: post.image,
    alt: post.title,
    fill: true,
    className: "object-cover transition-transform duration-300 hover:scale-105"
  })), React.createElement("div", null, React.createElement("div", {
    className: "mb-3 flex items-center justify-between"
  }, React.createElement("span", {
    className: "inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-600 dark:bg-primary-900 dark:text-primary-400"
  }, post.category), React.createElement("span", {
    className: "flex items-center text-xs text-gray-500 dark:text-gray-400"
  }, React.createElement(_fi.FiCalendar, {
    className: "mr-1",
    size: 14
  }), formattedDate)), React.createElement("h3", {
    className: "mb-2 text-xl font-bold hover:text-primary-600 dark:hover:text-primary-400"
  }, React.createElement(_link["default"], {
    href: "/blog/".concat(post.slug)
  }, post.title)), React.createElement("p", {
    className: "mb-4 text-gray-600 dark:text-gray-400"
  }, post.excerpt), React.createElement(_link["default"], {
    href: "/blog/".concat(post.slug),
    className: "inline-flex items-center font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
  }, "Read more ", React.createElement(_fi.FiArrowRight, {
    className: "ml-2"
  }))));
}