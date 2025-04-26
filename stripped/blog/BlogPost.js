"use strict";
'use client';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BlogPost;
var _react = require("react");
var _image = _interopRequireDefault(require("next/image"));
var _link = _interopRequireDefault(require("next/link"));
var _navigation = require("next/navigation");
var _fi = require("react-icons/fi");
var _Badge = _interopRequireDefault(require("@/components/ui/Badge"));
var _Breadcrumb = _interopRequireDefault(require("@/components/navigation/Breadcrumb"));
var _helpers = require("@/utils/helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function BlogPost(_ref) {
  var post = _ref.post,
    _ref$relatedPosts = _ref.relatedPosts,
    relatedPosts = _ref$relatedPosts === void 0 ? [] : _ref$relatedPosts,
    _ref$showShareButtons = _ref.showShareButtons,
    showShareButtons = _ref$showShareButtons === void 0 ? true : _ref$showShareButtons,
    _ref$showTableOfConte = _ref.showTableOfContents,
    showTableOfContents = _ref$showTableOfConte === void 0 ? true : _ref$showTableOfConte,
    _ref$showAuthor = _ref.showAuthor,
    showAuthor = _ref$showAuthor === void 0 ? true : _ref$showAuthor,
    readingTime = _ref.readingTime;
  var pathname = (0, _navigation.usePathname)();
  var _useState = (0, _react.useState)(readingTime || 0),
    _useState2 = _slicedToArray(_useState, 2),
    calculatedReadingTime = _useState2[0],
    setCalculatedReadingTime = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    headings = _useState4[0],
    setHeadings = _useState4[1];
  (0, _react.useEffect)(function () {
    if (!readingTime && post.content) {
      var wordCount = post.content.trim().split(/\s+/).length;
      setCalculatedReadingTime(Math.max(1, Math.ceil(wordCount / 225)));
    }
  }, [post.content, readingTime]);
  (0, _react.useEffect)(function () {
    if (showTableOfContents && post.content) {
      var headingRegex = /<h([2-3])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h\1>/g;
      var extractedHeadings = [];
      var match;
      while ((match = headingRegex.exec(post.content)) !== null) {
        extractedHeadings.push({
          level: parseInt(match[1], 10),
          id: match[2],
          text: match[3].replace(/<[^>]*>/g, '')
        });
      }
      setHeadings(extractedHeadings);
    }
  }, [post.content, showTableOfContents]);
  var shareUrl = typeof window !== 'undefined' ? "".concat(window.location.origin).concat(pathname) : '';
  var shareTitle = encodeURIComponent(post.title);
  var shareLinks = {
    twitter: "https://twitter.com/intent/tweet?url=".concat(encodeURIComponent(shareUrl), "&text=").concat(shareTitle),
    facebook: "https://www.facebook.com/sharer/sharer.php?u=".concat(encodeURIComponent(shareUrl)),
    linkedin: "https://www.linkedin.com/sharing/share-offsite/?url=".concat(encodeURIComponent(shareUrl))
  };
  return React.createElement("article", {
    className: "mx-auto max-w-4xl"
  }, React.createElement(_Breadcrumb["default"], {
    autoGenerate: true,
    pathDisplayNames: {
      blog: 'Blog'
    },
    className: "mb-6"
  }), React.createElement("div", {
    className: "relative mb-8 h-64 w-full overflow-hidden rounded-xl sm:h-80 md:h-96"
  }, React.createElement(_image["default"], {
    src: post.image,
    alt: post.title,
    fill: true,
    className: "object-cover",
    priority: true
  })), React.createElement("header", {
    className: "mb-8"
  }, React.createElement("div", {
    className: "mb-4 flex flex-wrap gap-2"
  }, React.createElement(_Badge["default"], {
    color: "primary",
    href: "/blog?category=".concat(encodeURIComponent(post.category)),
    pill: true
  }, React.createElement(_fi.FiTag, {
    className: "mr-1"
  }), post.category), React.createElement("div", {
    className: "flex items-center text-sm text-gray-500 dark:text-gray-400"
  }, React.createElement(_fi.FiCalendar, {
    className: "mr-1"
  }), (0, _helpers.formatDate)(post.date)), React.createElement("div", {
    className: "flex items-center text-sm text-gray-500 dark:text-gray-400"
  }, React.createElement(_fi.FiClock, {
    className: "mr-1"
  }), calculatedReadingTime, " min read")), React.createElement("h1", {
    className: "mb-4 text-3xl font-bold sm:text-4xl md:text-5xl"
  }, post.title), React.createElement("p", {
    className: "text-xl text-gray-600 dark:text-gray-400"
  }, post.excerpt)), React.createElement("div", {
    className: "flex flex-col lg:flex-row lg:gap-8"
  }, React.createElement("div", {
    className: "lg:w-2/3"
  }, showAuthor && post.author && React.createElement("div", {
    className: "mb-8 flex items-center rounded-xl bg-gray-50 p-4 dark:bg-gray-800"
  }, post.author.avatar && React.createElement(_image["default"], {
    src: post.author.avatar,
    alt: post.author.name,
    width: 50,
    height: 50,
    className: "mr-4 rounded-full"
  }), React.createElement("div", null, React.createElement("div", {
    className: "flex items-center text-sm text-gray-500 dark:text-gray-400"
  }, React.createElement(_fi.FiUser, {
    className: "mr-1"
  }), "Written by"), React.createElement("div", {
    className: "font-medium"
  }, post.author.name, post.author.title && React.createElement("span", {
    className: "ml-2 text-sm text-gray-500 dark:text-gray-400"
  }, post.author.title)))), React.createElement("div", {
    className: "prose max-w-none prose-img:rounded-xl dark:prose-invert lg:prose-lg",
    dangerouslySetInnerHTML: {
      __html: post.content || ''
    }
  }), post.tags && post.tags.length > 0 && React.createElement("div", {
    className: "my-8"
  }, React.createElement("h3", {
    className: "mb-2 text-lg font-medium"
  }, "Tags"), React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, post.tags.map(function (tag) {
    return React.createElement(_Badge["default"], {
      key: tag,
      color: "secondary",
      href: "/blog?tag=".concat(encodeURIComponent(tag)),
      pill: true
    }, tag);
  }))), showShareButtons && React.createElement("div", {
    className: "my-8 border-t border-b border-gray-200 py-6 dark:border-gray-700"
  }, React.createElement("h3", {
    className: "mb-4 flex items-center text-lg font-medium"
  }, React.createElement(_fi.FiShare2, {
    className: "mr-2"
  }), "Share this post"), React.createElement("div", {
    className: "flex gap-2"
  }, React.createElement("a", {
    href: shareLinks.twitter,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex h-10 w-10 items-center justify-center rounded-full bg-[#1DA1F2] text-white transition-transform hover:scale-110",
    "aria-label": "Share on Twitter"
  }, React.createElement(_fi.FiTwitter, {
    size: 18
  })), React.createElement("a", {
    href: shareLinks.facebook,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex h-10 w-10 items-center justify-center rounded-full bg-[#4267B2] text-white transition-transform hover:scale-110",
    "aria-label": "Share on Facebook"
  }, React.createElement(_fi.FiFacebook, {
    size: 18
  })), React.createElement("a", {
    href: shareLinks.linkedin,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-transform hover:scale-110",
    "aria-label": "Share on LinkedIn"
  }, React.createElement(_fi.FiLinkedin, {
    size: 18
  }))))), React.createElement("div", {
    className: "lg:w-1/3"
  }, React.createElement("div", {
    className: "sticky top-24"
  }, showTableOfContents && headings.length > 0 && React.createElement("div", {
    className: "mb-8 rounded-xl border border-gray-200 p-4 dark:border-gray-700"
  }, React.createElement("h3", {
    className: "mb-4 text-lg font-medium"
  }, "Table of Contents"), React.createElement("nav", null, React.createElement("ul", {
    className: "space-y-2 text-sm"
  }, headings.map(function (heading) {
    return React.createElement("li", {
      key: heading.id,
      className: "".concat(heading.level === 2 ? 'ml-0' : 'ml-4')
    }, React.createElement("a", {
      href: "#".concat(heading.id),
      className: "text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
    }, heading.text));
  })))), relatedPosts.length > 0 && React.createElement("div", {
    className: "rounded-xl border border-gray-200 p-4 dark:border-gray-700"
  }, React.createElement("h3", {
    className: "mb-4 text-lg font-medium"
  }, "Related Posts"), React.createElement("div", {
    className: "space-y-4"
  }, relatedPosts.map(function (relatedPost) {
    return React.createElement("div", {
      key: relatedPost.id,
      className: "flex items-start"
    }, relatedPost.image && React.createElement(_link["default"], {
      href: "/blog/".concat(relatedPost.slug),
      className: "mr-3 block h-16 w-16 flex-shrink-0 overflow-hidden rounded-md"
    }, React.createElement(_image["default"], {
      src: relatedPost.image,
      alt: relatedPost.title,
      width: 64,
      height: 64,
      className: "h-full w-full object-cover"
    })), React.createElement("div", null, React.createElement(_link["default"], {
      href: "/blog/".concat(relatedPost.slug),
      className: "block font-medium hover:text-primary-600 dark:hover:text-primary-400"
    }, relatedPost.title), React.createElement("span", {
      className: "text-xs text-gray-500 dark:text-gray-400"
    }, (0, _helpers.formatDate)(relatedPost.date))));
  })))))), (post.previousPost || post.nextPost) && React.createElement("div", {
    className: "mt-12 grid gap-4 border-t border-gray-200 pt-8 dark:border-gray-700 sm:grid-cols-2"
  }, post.previousPost && React.createElement(_link["default"], {
    href: "/blog/".concat(post.previousPost.slug),
    className: "group flex flex-col rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary-500 dark:border-gray-700 dark:hover:border-primary-500"
  }, React.createElement("span", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Previous Post"), React.createElement("span", {
    className: "mt-1 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400"
  }, post.previousPost.title)), post.nextPost && React.createElement(_link["default"], {
    href: "/blog/".concat(post.nextPost.slug),
    className: "group flex flex-col rounded-lg border border-gray-200 p-4 text-right transition-colors hover:border-primary-500 dark:border-gray-700 dark:hover:border-primary-500"
  }, React.createElement("span", {
    className: "text-sm text-gray-500 dark:text-gray-400"
  }, "Next Post"), React.createElement("span", {
    className: "mt-1 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400"
  }, post.nextPost.title))));
}