"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Authuser = function Authuser() {
  var navigate = (0, _reactRouterDom.useNavigate)(); // Helper functions for session management

  var getToken = function getToken() {
    try {
      var tokenString = sessionStorage.getItem('token');
      return tokenString ? JSON.parse(tokenString) : null;
    } catch (error) {
      console.error('Failed to parse token:', error);
      return null;
    }
  };

  var getUser = function getUser() {
    try {
      var userString = sessionStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Failed to parse user:', error);
      return null;
    }
  };

  var saveToken = function saveToken(user, token) {
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(user)); // Save user data

    setToken(token);
    setUser(user);
  };

  var _useState = (0, _react.useState)(getToken()),
      _useState2 = _slicedToArray(_useState, 2),
      token = _useState2[0],
      setToken = _useState2[1];

  var _useState3 = (0, _react.useState)(getUser()),
      _useState4 = _slicedToArray(_useState3, 2),
      user = _useState4[0],
      setUser = _useState4[1]; // Create Axios instance with dynamic headers


  var http = _axios["default"].create({
    baseURL: 'http://localhost:5001/userAPI',
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token ? "Bearer ".concat(token) : ''
    }
  }); // Update axios headers whenever the token changes


  (0, _react.useEffect)(function () {
    http.defaults.headers.Authorization = token ? "Bearer ".concat(token) : '';
  }, [token]); // Handle logout and navigate to home

  var logout = function logout() {
    sessionStorage.clear();
    setToken(null);
    setUser(null);
    navigate('/');
  };

  return {
    setToken: saveToken,
    token: token,
    user: user,
    http: http,
    logout: logout
  };
};

var _default = Authuser;
exports["default"] = _default;
//# sourceMappingURL=Authuser.dev.js.map
