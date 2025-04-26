"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CarouselControls;
var _fi = require("react-icons/fi");
function CarouselControls(_ref) {
  var onPrev = _ref.onPrev,
    onNext = _ref.onNext,
    activeIndex = _ref.activeIndex,
    totalItems = _ref.totalItems,
    onDotClick = _ref.onDotClick;
  return React.createElement(React.Fragment, null, React.createElement("button", {
    onClick: onPrev,
    className: "absolute -left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-all hover:bg-primary-50 hover:text-primary-600 focus:outline-none md:-left-5 md:h-12 md:w-12 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
    "aria-label": "Previous item"
  }, React.createElement(_fi.FiChevronLeft, {
    size: 24
  })), React.createElement("button", {
    onClick: onNext,
    className: "absolute -right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-all hover:bg-primary-50 hover:text-primary-600 focus:outline-none md:-right-5 md:h-12 md:w-12 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
    "aria-label": "Next item"
  }, React.createElement(_fi.FiChevronRight, {
    size: 24
  })), React.createElement("div", {
    className: "mt-6 flex justify-center gap-2"
  }, Array.from({
    length: totalItems
  }).map(function (_, index) {
    return React.createElement("button", {
      key: index,
      onClick: function onClick() {
        return onDotClick(index);
      },
      className: "h-2.5 w-2.5 rounded-full transition-colors ".concat(activeIndex === index ? 'bg-primary-600 dark:bg-primary-500' : 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500'),
      "aria-label": "Go to item ".concat(index + 1)
    });
  })));
}