/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

__webpack_require__(2);

var _helpers = __webpack_require__(3);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  const queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, tabs => {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    const tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    const urlInfo = _helpers2.default.urlInfo(tab.url)();
    const url = _helpers2.default.parseURL(urlInfo);
    console.info(urlInfo);

    const content = url.length ? _helpers2.default.printTable(url) : _helpers2.default.printEmptyMsg();
    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    _helpers2.default.injectContent(content);

    callback(urlInfo);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl(urlInfo => {
    const button = document.querySelector('#button');

    button.addEventListener('click', evt => {
      const params = document.querySelectorAll('[refs="params"]');
      const newTuples = [];

      params.forEach(tuple => {
        const { key } = tuple.dataset;
        const { value } = tuple;
        newTuples.push(`${key}=${value}`);
      });

      chrome.tabs.update({
        url: _helpers2.default.getNewRoute(urlInfo, newTuples)
      });
    });
  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function injectContent(content) {
  document.querySelector('#container').innerHTML = content;
}

function getSplitElement(url) {
  const SPLIT_IDENTIFIERS = ['?', '#'];

  // TODO
  // - Implement custom identifier
  return SPLIT_IDENTIFIERS.find(identifier => url.includes(identifier));
}

function parseURL(urlObj = {}) {
  const QS_DIVIDER = '&';
  const TUPLE_DIVIDER = '=';
  const { info: { queryString } } = urlObj;
  const arrKeyValue = queryString ? decodeURI(queryString).split(QS_DIVIDER).map(tuple => {
    const [key, value] = tuple.split(TUPLE_DIVIDER);

    return {
      key,
      value
    };
  }) : [];

  return arrKeyValue;
}

function printTable(arr) {
  const tableContent = arr.reduce((acc, value, index) => acc.concat(`
    <tr data-index="${index}">
      <td>${value.key}</td>
      <td>
        <input refs="params" style="width: 100%" data-key="${value.key}" value="${value.value}" type="textbox">
      </td>
    </tr>
  `), '');

  const TABLE = `
    <table id="url-parsed-table" class="pure-table pure-table-striped">
      <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
          </tr>
      </thead>
      <tbody>
        ${tableContent}
      </tbody>
    </table>
  `;

  return TABLE;
}

function printEmptyMsg() {
  return '<strong>Url without query string.</strong>';
}

function urlInfo(plainUrl) {
  const SPLIT_IDENTIFIERS = ['?', '#'];

  // TODO
  // - Implement custom identifier
  const qs = SPLIT_IDENTIFIERS.find(identifier => plainUrl.includes(identifier));
  const [pathname, queryString] = plainUrl.split(qs);

  const info = {
    url: plainUrl,
    pathname,
    queryString,
    urlDivider: qs
  };

  return () => ({
    info
  });
}

function getNewRoute(urlObj, newTuples) {
  return `${urlObj.info.pathname}${urlObj.info.urlDivider}${newTuples.join('&')}`;
}

exports.default = {
  injectContent,
  getSplitElement,
  parseURL,
  printEmptyMsg,
  printTable,
  getNewRoute,
  urlInfo
};

/***/ })
/******/ ]);
//# sourceMappingURL=popup.js.map