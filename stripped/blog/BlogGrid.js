"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BlogGrid;
var _framerMotion = require("framer-motion");
var _BlogCard = _interopRequireDefault(require("./BlogCard"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function BlogGrid(_ref) {
  var posts = _ref.posts,
    title = _ref.title,
    description = _ref.description,
    category = _ref.category;
  var displayPosts = category ? posts.filter(function (post) {
    return post.category === category;
  }) : posts;
  return React.createElement("div", {
    className: "container-custom py-16"
  }, (title || description) && React.createElement(_framerMotion.motion.div, {
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
  }, title && React.createElement("h2", {
    className: "mb-4 text-3xl font-bold"
  }, title), description && React.createElement("p", {
    className: "mx-auto max-w-2xl text-gray-600 dark:text-gray-400"
  }, description), category && React.createElement("div", {
    className: "mt-4"
  }, React.createElement("span", {
    className: "inline-block rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"
  }, "Category: ", category))), React.createElement("div", {
    className: "grid gap-8 md:grid-cols-2 lg:grid-cols-3"
  }, displayPosts.map(function (post, index) {
    return React.createElement(_BlogCard["default"], {
      key: post.id,
      post: post,
      index: index
    });
  })), displayPosts.length === 0 && React.createElement("div", {
    className: "py-12 text-center"
  }, React.createElement("p", {
    className: "text-gray-600 dark:text-gray-400"
  }, "No posts found", category ? " in the \"".concat(category, "\" category") : '', ".")));
}