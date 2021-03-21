"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "NHello", {
  enumerable: true,
  get: function get() {
    return _NHello["default"];
  }
});
Object.defineProperty(exports, "NWorld", {
  enumerable: true,
  get: function get() {
    return _NWorld["default"];
  }
});

var _NHello = _interopRequireDefault(require("./NHello"));

var _NWorld = _interopRequireDefault(require("./NWorld"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
