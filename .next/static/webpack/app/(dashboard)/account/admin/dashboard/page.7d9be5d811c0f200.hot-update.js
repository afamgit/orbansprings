"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(dashboard)/account/admin/dashboard/page",{

/***/ "(app-pages-browser)/./app/ui/charts/pie-chart.js":
/*!************************************!*\
  !*** ./app/ui/charts/pie-chart.js ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var chart_js_auto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js/auto */ \"(app-pages-browser)/./node_modules/chart.js/auto/auto.js\");\n\n(async function() {\n    const data = [\n        {\n            year: 2010,\n            count: 10\n        },\n        {\n            year: 2011,\n            count: 20\n        },\n        {\n            year: 2012,\n            count: 15\n        },\n        {\n            year: 2013,\n            count: 25\n        },\n        {\n            year: 2014,\n            count: 22\n        },\n        {\n            year: 2015,\n            count: 30\n        },\n        {\n            year: 2016,\n            count: 28\n        }\n    ];\n    new chart_js_auto__WEBPACK_IMPORTED_MODULE_0__[\"default\"](document.getElementById(\"acquisitions\"), {\n        type: \"bar\",\n        data: {\n            labels: data.map((row)=>row.year),\n            datasets: [\n                {\n                    label: \"Acquisitions by year\",\n                    data: data.map((row)=>row.count)\n                }\n            ]\n        }\n    });\n})();\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC91aS9jaGFydHMvcGllLWNoYXJ0LmpzIiwibWFwcGluZ3MiOiI7O0FBQWlDO0FBRWhDO0lBQ0MsTUFBTUMsT0FBTztRQUNYO1lBQUVDLE1BQU07WUFBTUMsT0FBTztRQUFHO1FBQ3hCO1lBQUVELE1BQU07WUFBTUMsT0FBTztRQUFHO1FBQ3hCO1lBQUVELE1BQU07WUFBTUMsT0FBTztRQUFHO1FBQ3hCO1lBQUVELE1BQU07WUFBTUMsT0FBTztRQUFHO1FBQ3hCO1lBQUVELE1BQU07WUFBTUMsT0FBTztRQUFHO1FBQ3hCO1lBQUVELE1BQU07WUFBTUMsT0FBTztRQUFHO1FBQ3hCO1lBQUVELE1BQU07WUFBTUMsT0FBTztRQUFHO0tBQ3pCO0lBRUQsSUFBSUgscURBQUtBLENBQ1BJLFNBQVNDLGNBQWMsQ0FBQyxpQkFDeEI7UUFDRUMsTUFBTTtRQUNOTCxNQUFNO1lBQ0pNLFFBQVFOLEtBQUtPLEdBQUcsQ0FBQ0MsQ0FBQUEsTUFBT0EsSUFBSVAsSUFBSTtZQUNoQ1EsVUFBVTtnQkFDUjtvQkFDRUMsT0FBTztvQkFDUFYsTUFBTUEsS0FBS08sR0FBRyxDQUFDQyxDQUFBQSxNQUFPQSxJQUFJTixLQUFLO2dCQUNqQzthQUNEO1FBQ0g7SUFDRjtBQUVKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2FwcC91aS9jaGFydHMvcGllLWNoYXJ0LmpzPzk4ZjAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENoYXJ0IGZyb20gJ2NoYXJ0LmpzL2F1dG8nXG5cbihhc3luYyBmdW5jdGlvbigpIHtcbiAgY29uc3QgZGF0YSA9IFtcbiAgICB7IHllYXI6IDIwMTAsIGNvdW50OiAxMCB9LFxuICAgIHsgeWVhcjogMjAxMSwgY291bnQ6IDIwIH0sXG4gICAgeyB5ZWFyOiAyMDEyLCBjb3VudDogMTUgfSxcbiAgICB7IHllYXI6IDIwMTMsIGNvdW50OiAyNSB9LFxuICAgIHsgeWVhcjogMjAxNCwgY291bnQ6IDIyIH0sXG4gICAgeyB5ZWFyOiAyMDE1LCBjb3VudDogMzAgfSxcbiAgICB7IHllYXI6IDIwMTYsIGNvdW50OiAyOCB9LFxuICBdO1xuXG4gIG5ldyBDaGFydChcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWNxdWlzaXRpb25zJyksXG4gICAge1xuICAgICAgdHlwZTogJ2JhcicsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGxhYmVsczogZGF0YS5tYXAocm93ID0+IHJvdy55ZWFyKSxcbiAgICAgICAgZGF0YXNldHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsYWJlbDogJ0FjcXVpc2l0aW9ucyBieSB5ZWFyJyxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEubWFwKHJvdyA9PiByb3cuY291bnQpXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfVxuICApO1xufSkoKTsiXSwibmFtZXMiOlsiQ2hhcnQiLCJkYXRhIiwieWVhciIsImNvdW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInR5cGUiLCJsYWJlbHMiLCJtYXAiLCJyb3ciLCJkYXRhc2V0cyIsImxhYmVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/ui/charts/pie-chart.js\n"));

/***/ }),

/***/ "(app-pages-browser)/./node_modules/chart.js/auto/auto.js":
/*!********************************************!*\
  !*** ./node_modules/chart.js/auto/auto.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Animation: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Animation; },\n/* harmony export */   Animations: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Animations; },\n/* harmony export */   ArcElement: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.ArcElement; },\n/* harmony export */   BarController: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.BarController; },\n/* harmony export */   BarElement: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.BarElement; },\n/* harmony export */   BasePlatform: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.BasePlatform; },\n/* harmony export */   BasicPlatform: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.BasicPlatform; },\n/* harmony export */   BubbleController: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.BubbleController; },\n/* harmony export */   CategoryScale: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.CategoryScale; },\n/* harmony export */   Chart: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart; },\n/* harmony export */   Colors: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Colors; },\n/* harmony export */   DatasetController: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.DatasetController; },\n/* harmony export */   Decimation: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Decimation; },\n/* harmony export */   DomPlatform: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.DomPlatform; },\n/* harmony export */   DoughnutController: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.DoughnutController; },\n/* harmony export */   Element: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Element; },\n/* harmony export */   Filler: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Filler; },\n/* harmony export */   Interaction: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Interaction; },\n/* harmony export */   Legend: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Legend; },\n/* harmony export */   LineController: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.LineController; },\n/* harmony export */   LineElement: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.LineElement; },\n/* harmony export */   LinearScale: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.LinearScale; },\n/* harmony export */   LogarithmicScale: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.LogarithmicScale; },\n/* harmony export */   PieController: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.PieController; },\n/* harmony export */   PointElement: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.PointElement; },\n/* harmony export */   PolarAreaController: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.PolarAreaController; },\n/* harmony export */   RadarController: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.RadarController; },\n/* harmony export */   RadialLinearScale: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.RadialLinearScale; },\n/* harmony export */   Scale: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Scale; },\n/* harmony export */   ScatterController: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.ScatterController; },\n/* harmony export */   SubTitle: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.SubTitle; },\n/* harmony export */   Ticks: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Ticks; },\n/* harmony export */   TimeScale: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.TimeScale; },\n/* harmony export */   TimeSeriesScale: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.TimeSeriesScale; },\n/* harmony export */   Title: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Title; },\n/* harmony export */   Tooltip: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Tooltip; },\n/* harmony export */   _adapters: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__._adapters; },\n/* harmony export */   _detectPlatform: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__._detectPlatform; },\n/* harmony export */   animator: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.animator; },\n/* harmony export */   controllers: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.controllers; },\n/* harmony export */   defaults: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.defaults; },\n/* harmony export */   elements: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.elements; },\n/* harmony export */   layouts: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.layouts; },\n/* harmony export */   plugins: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.plugins; },\n/* harmony export */   registerables: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.registerables; },\n/* harmony export */   registry: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.registry; },\n/* harmony export */   scales: function() { return /* reexport safe */ _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.scales; }\n/* harmony export */ });\n/* harmony import */ var _dist_chart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dist/chart.js */ \"(app-pages-browser)/./node_modules/chart.js/dist/chart.js\");\n\n\n_dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.register(..._dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.registerables);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_dist_chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL25vZGVfbW9kdWxlcy9jaGFydC5qcy9hdXRvL2F1dG8uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXNEOztBQUV0RCxpREFBSyxhQUFhLHlEQUFhOztBQUVFO0FBQ2pDLCtEQUFlLGlEQUFLLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbm9kZV9tb2R1bGVzL2NoYXJ0LmpzL2F1dG8vYXV0by5qcz9jOTI1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhcnQsIHJlZ2lzdGVyYWJsZXN9IGZyb20gJy4uL2Rpc3QvY2hhcnQuanMnO1xuXG5DaGFydC5yZWdpc3RlciguLi5yZWdpc3RlcmFibGVzKTtcblxuZXhwb3J0ICogZnJvbSAnLi4vZGlzdC9jaGFydC5qcyc7XG5leHBvcnQgZGVmYXVsdCBDaGFydDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./node_modules/chart.js/auto/auto.js\n"));

/***/ })

});