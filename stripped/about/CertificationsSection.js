"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CertificationsSection;
var _react = require("react");
var _image = _interopRequireDefault(require("next/image"));
var _framerMotion = require("framer-motion");
var _fi = require("react-icons/fi");
var _SectionHeading = _interopRequireDefault(require("@/components/ui/SectionHeading"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function CertificationsSection(_ref) {
  var _ref$title = _ref.title,
    title = _ref$title === void 0 ? 'Certifications & Awards' : _ref$title,
    subtitle = _ref.subtitle,
    certifications = _ref.certifications,
    _ref$enableFiltering = _ref.enableFiltering,
    enableFiltering = _ref$enableFiltering === void 0 ? true : _ref$enableFiltering,
    _ref$enableSearch = _ref.enableSearch,
    enableSearch = _ref$enableSearch === void 0 ? true : _ref$enableSearch,
    _ref$layout = _ref.layout,
    layout = _ref$layout === void 0 ? 'grid' : _ref$layout,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    searchQuery = _useState2[0],
    setSearchQuery = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    activeCategory = _useState4[0],
    setActiveCategory = _useState4[1];
  var categories = enableFiltering ? Array.from(new Set(certifications.filter(function (cert) {
    return cert.category;
  }).map(function (cert) {
    return cert.category;
  }))) : [];
  var filteredCertifications = certifications.filter(function (cert) {
    var _cert$description, _cert$skills;
    var matchesSearch = !searchQuery || cert.name.toLowerCase().includes(searchQuery.toLowerCase()) || cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) || ((_cert$description = cert.description) === null || _cert$description === void 0 ? void 0 : _cert$description.toLowerCase().includes(searchQuery.toLowerCase())) || ((_cert$skills = cert.skills) === null || _cert$skills === void 0 ? void 0 : _cert$skills.some(function (skill) {
      return skill.toLowerCase().includes(searchQuery.toLowerCase());
    }));
    var matchesCategory = !activeCategory || cert.category === activeCategory;
    return matchesSearch && matchesCategory;
  });
  var resetFilters = function resetFilters() {
    setSearchQuery('');
    setActiveCategory(null);
  };
  return React.createElement("section", {
    className: "py-12 ".concat(className)
  }, React.createElement("div", {
    className: "container mx-auto px-4"
  }, React.createElement(_SectionHeading["default"], {
    title: title,
    subtitle: subtitle,
    centered: true,
    className: "mb-10"
  }), (enableSearch || enableFiltering) && React.createElement("div", {
    className: "mb-8"
  }, React.createElement("div", {
    className: "flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-x-4 md:space-y-0"
  }, enableSearch && React.createElement("div", {
    className: "relative"
  }, React.createElement("div", {
    className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
  }, React.createElement(_fi.FiSearch, {
    className: "h-5 w-5 text-gray-400"
  })), React.createElement("input", {
    type: "text",
    value: searchQuery,
    onChange: function onChange(e) {
      return setSearchQuery(e.target.value);
    },
    placeholder: "Search by name or skill...",
    className: "block w-full rounded-lg border border-gray-300 bg-white p-2.5 pl-10 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
  })), enableFiltering && categories.length > 0 && React.createElement("div", {
    className: "flex items-center space-x-2"
  }, React.createElement(_fi.FiFilter, {
    className: "h-5 w-5 text-gray-500"
  }), React.createElement("span", {
    className: "mr-2 text-sm font-medium text-gray-700 dark:text-gray-300"
  }, "Filter:"), React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, React.createElement("button", {
    onClick: function onClick() {
      return setActiveCategory(null);
    },
    className: "rounded-full px-3 py-1 text-xs font-medium ".concat(activeCategory === null ? 'bg-primary-600 text-white dark:bg-primary-500' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600')
  }, "All"), categories.map(function (category) {
    return React.createElement("button", {
      key: category,
      onClick: function onClick() {
        return setActiveCategory(category);
      },
      className: "rounded-full px-3 py-1 text-xs font-medium ".concat(activeCategory === category ? 'bg-primary-600 text-white dark:bg-primary-500' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600')
    }, category);
  }))), (searchQuery || activeCategory) && React.createElement("button", {
    onClick: resetFilters,
    className: "flex items-center text-sm text-gray-600 underline hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
  }, "Reset filters")), React.createElement("div", {
    className: "mt-4 text-sm text-gray-600 dark:text-gray-400"
  }, "Showing ", filteredCertifications.length, " of ", certifications.length, " certifications")), filteredCertifications.length > 0 ? React.createElement("div", {
    className: "".concat(layout === 'grid' ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-6')
  }, filteredCertifications.map(function (cert, index) {
    if (layout === 'grid') {
      return React.createElement(_framerMotion.motion.div, {
        key: cert.id,
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
      }, cert.logo ? React.createElement("div", {
        className: "relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md"
      }, React.createElement(_image["default"], {
        src: cert.logo,
        alt: cert.issuer,
        fill: true,
        sizes: "48px",
        className: "object-contain"
      })) : React.createElement("div", {
        className: "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300"
      }, React.createElement(_fi.FiAward, {
        size: 24
      })), cert.category && React.createElement("span", {
        className: "inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      }, cert.category)), React.createElement("h3", {
        className: "mt-4 text-lg font-bold text-gray-900 dark:text-white"
      }, cert.name), React.createElement("p", {
        className: "mt-1 text-sm font-medium text-gray-700 dark:text-gray-300"
      }, cert.issuer), React.createElement("p", {
        className: "mt-1 text-sm text-gray-500 dark:text-gray-400"
      }, cert.date, cert.expirationDate && " - ".concat(cert.expirationDate)), cert.description && React.createElement("p", {
        className: "mt-3 text-sm text-gray-600 dark:text-gray-400"
      }, cert.description), cert.skills && cert.skills.length > 0 && React.createElement("div", {
        className: "mt-4"
      }, React.createElement("div", {
        className: "flex flex-wrap gap-1"
      }, cert.skills.map(function (skill) {
        return React.createElement("span", {
          key: skill,
          className: "inline-flex rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
        }, skill);
      }))), cert.verificationUrl && React.createElement("div", {
        className: "mt-4"
      }, React.createElement("a", {
        href: cert.verificationUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
      }, React.createElement("span", null, "Verify"), React.createElement(_fi.FiExternalLink, {
        className: "ml-1",
        size: 14
      }))), cert.credentialId && React.createElement("div", {
        className: "mt-2"
      }, React.createElement("p", {
        className: "text-xs text-gray-500 dark:text-gray-400"
      }, "Credential ID: ", cert.credentialId)));
    }
    return React.createElement(_framerMotion.motion.div, {
      key: cert.id,
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
      className: "flex rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    }, cert.logo ? React.createElement("div", {
      className: "relative mr-6 h-16 w-16 flex-shrink-0 overflow-hidden rounded-md"
    }, React.createElement(_image["default"], {
      src: cert.logo,
      alt: cert.issuer,
      fill: true,
      sizes: "64px",
      className: "object-contain"
    })) : React.createElement("div", {
      className: "mr-6 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-md bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300"
    }, React.createElement(_fi.FiAward, {
      size: 32
    })), React.createElement("div", {
      className: "flex-grow"
    }, React.createElement("div", {
      className: "flex items-start justify-between"
    }, React.createElement("div", null, React.createElement("h3", {
      className: "text-lg font-bold text-gray-900 dark:text-white"
    }, cert.name), React.createElement("p", {
      className: "mt-1 text-sm font-medium text-gray-700 dark:text-gray-300"
    }, cert.issuer), React.createElement("p", {
      className: "mt-1 text-sm text-gray-500 dark:text-gray-400"
    }, cert.date, cert.expirationDate && " - ".concat(cert.expirationDate))), cert.category && React.createElement("span", {
      className: "inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }, cert.category)), cert.description && React.createElement("p", {
      className: "mt-3 text-sm text-gray-600 dark:text-gray-400"
    }, cert.description), React.createElement("div", {
      className: "mt-4 flex flex-wrap items-center justify-between gap-2"
    }, cert.skills && cert.skills.length > 0 && React.createElement("div", {
      className: "flex flex-wrap gap-1"
    }, cert.skills.map(function (skill) {
      return React.createElement("span", {
        key: skill,
        className: "inline-flex rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
      }, skill);
    })), cert.verificationUrl && React.createElement("a", {
      href: cert.verificationUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
    }, React.createElement("span", null, "Verify Certificate"), React.createElement(_fi.FiExternalLink, {
      className: "ml-1",
      size: 14
    }))), cert.credentialId && React.createElement("div", {
      className: "mt-2"
    }, React.createElement("p", {
      className: "text-xs text-gray-500 dark:text-gray-400"
    }, "Credential ID: ", cert.credentialId))));
  })) : React.createElement("div", {
    className: "py-12 text-center"
  }, React.createElement("p", {
    className: "text-lg text-gray-600 dark:text-gray-400"
  }, "No certifications found."), React.createElement("button", {
    onClick: resetFilters,
    className: "mt-4 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
  }, "Reset filters"))));
}