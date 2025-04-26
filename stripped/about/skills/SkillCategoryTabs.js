"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SkillCategoryTabs;
function SkillCategoryTabs(_ref) {
  var categories = _ref.categories,
    activeTab = _ref.activeTab,
    onTabChange = _ref.onTabChange;
  return React.createElement("div", {
    className: "mb-8 flex flex-wrap justify-center gap-2"
  }, categories.map(function (category) {
    return React.createElement("button", {
      key: category.name,
      onClick: function onClick() {
        return onTabChange(category.name);
      },
      className: "flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ".concat(activeTab === category.name ? 'bg-primary-600 text-white dark:bg-primary-500' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700')
    }, React.createElement(category.icon, {
      className: "mr-2",
      size: 16
    }), category.name);
  }));
}