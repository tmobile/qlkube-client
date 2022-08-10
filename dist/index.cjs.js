'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var ServerStatus = {
  exists: 'exists',
  generating: 'generating',
  complete: 'complete'
};

require('url');

require('http');

var clientId = "client-".concat(Date.now().toString(36) + Math.random().toString(36).substr(2));

function SubscriptionHandle(queryString, subscriptionId, unsubscribe) {
  this.queryString = queryString;
  this.subscriptionId = subscriptionId;
  this.unsubscribe = unsubscribe;
}

var subscribe = function subscribe(queryString, clusterUrl, token, ws, isMono, connectionParams) {
  var messageServer = function messageServer(msg) {
    ws === null || ws === void 0 ? void 0 : ws.send(msg);
  };

  var subscriptionId = "subscription-".concat(Date.now().toString(36) + Math.random().toString(36).substring(1, 10));

  if (isMono) {
    var monoClientId = "client-".concat(Date.now().toString(36) + Math.random().toString(36).substr(2));
    messageServer(JSON.stringify({
      requestType: 'subscribe_mono',
      clientId: monoClientId,
      connectionParams: connectionParams
    }));
    return new SubscriptionHandle(queryString, subscriptionId, function () {
      return messageServer(JSON.stringify({
        requestType: 'close',
        connectionParams: {
          clusterUrl: clusterUrl,
          clientId: monoClientId,
          clientSubId: "".concat(subscriptionId)
        }
      }));
    });
  } else {
    messageServer(JSON.stringify({
      requestType: 'subscribe',
      clientId: clientId,
      query: queryString,
      connectionParams: {
        authorization: "Bearer ".concat(token),
        clusterUrl: clusterUrl,
        clientId: clientId,
        clientSubId: subscriptionId
      }
    }));
    return new SubscriptionHandle(queryString, subscriptionId, function () {
      return messageServer(JSON.stringify({
        requestType: 'close',
        connectionParams: {
          clusterUrl: clusterUrl,
          clientId: clientId,
          clientSubId: "".concat(subscriptionId)
        }
      }));
    });
  }
}; // ## Issues with web pack 5

var QlkubeContext = /*#__PURE__*/react.createContext();

var QlkubeProvider = function QlkubeProvider(_ref) {
  var children = _ref.children,
      wsUrl = _ref.wsUrl,
      queryUrl = _ref.queryUrl,
      doKeepAlive = _ref.doKeepAlive,
      _ref$pingTimeout = _ref.pingTimeout,
      pingTimeout = _ref$pingTimeout === void 0 ? 20000 : _ref$pingTimeout;

  var _useState = react.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      ws = _useState2[0],
      setWs = _useState2[1];

  var _useState3 = react.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      socketState = _useState4[0],
      setSocketState = _useState4[1];

  var _useState5 = react.useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      qlkubeSocketStatus = _useState6[0],
      setQlkubeSocketStatus = _useState6[1];

  var reconnect = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!ws) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return ws === null || ws === void 0 ? void 0 : ws.close();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function reconnect() {
      return _ref2.apply(this, arguments);
    };
  }();

  var updateQlkubeSocketStatus = function updateQlkubeSocketStatus(stat) {
    setQlkubeSocketStatus(stat);
  };

  react.useEffect(function () {
    connectWs();
  }, []);
  react.useEffect(function () {
    var pingIntervalRef;

    if (doKeepAlive && ws && socketState) {
      pingIntervalRef = serverPingPong();
    }

    return function () {
      return pingIntervalRef && clearInterval(pingIntervalRef);
    };
  }, [ws, socketState]);

  var serverPingPong = function serverPingPong() {
    return setInterval(function () {
      ws && socketState && ws.send('ping');
    }, pingTimeout);
  };

  var connectWs = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var _ws;

      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!ws) {
                _context2.next = 3;
                break;
              }

              _context2.next = 3;
              return ws === null || ws === void 0 ? void 0 : ws.close();

            case 3:
              _ws = new WebSocket(wsUrl);
              setWs(function (prev) {
                return _ws;
              });

              _ws.onopen = function () {
                setSocketState(true);
              };

              _ws.onclose = function (e) {
                setSocketState(false);
                setTimeout(function () {
                  connectWs();
                }, 1000);
              };

              _ws.onerror = function (err) {};

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function connectWs() {
      return _ref3.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/jsxRuntime.jsx(QlkubeContext.Provider, {
    value: {
      ws: ws,
      socketState: socketState,
      qlkubeSocketStatus: qlkubeSocketStatus,
      qlkubeUrl: queryUrl,
      qlkubeUrl_ws: wsUrl,
      reconnect: reconnect,
      updateQlkubeSocketStatus: updateQlkubeSocketStatus
    },
    children: children
  });
};

var useSub = function useSub() {
  var QLKUBE_PROVIDER = react.useContext(QlkubeContext);
  var _ws = QLKUBE_PROVIDER.ws;
      QLKUBE_PROVIDER.socketState;
      QLKUBE_PROVIDER.qlkubeSocketStatus;
      var updateQlkubeSocketStatus = QLKUBE_PROVIDER.updateQlkubeSocketStatus;

  var _useState = react.useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = react.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      socketStatus = _useState4[0],
      setSocketStatus = _useState4[1];

  react.useEffect(function () {
    _ws.onmessage = function (evt) {
      var received_msg = evt.data;
      var jsonData = JSON.parse(received_msg);
      var eventData = jsonData === null || jsonData === void 0 ? void 0 : jsonData.data;
      var statusData = jsonData === null || jsonData === void 0 ? void 0 : jsonData.status;
      statusData === 'exists' && updateQlkubeSocketStatus('exists');
      statusData === 'generating' && updateQlkubeSocketStatus('generating');
      statusData && setSocketStatus(function (prev) {
        return statusData;
      });
      eventData && setData(function (prev) {
        return eventData;
      });
    };

    return function () {};
  }, []);
  return {
    subscribe: function subscribe$1(query, clusterUrl, token) {
      return subscribe(query, clusterUrl, token, _ws);
    },
    eventData: data,
    serverStatus: socketStatus
  };
};

var useMonoSub = function useMonoSub() {
  var QLKUBE_PROVIDER = react.useContext(QlkubeContext);
  var qlkubeUrl_ws = QLKUBE_PROVIDER.qlkubeUrl_ws;

  var _useState5 = react.useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      socketStatus = _useState6[0];
      _useState6[1];

  return {
    monoSub: function monoSub(authToken, clusterUrl, requestString, requestVariables, serverStatusCallback, errorCallback) {
      return new Promise(function (resolve, reject) {
        var requestParameters = JSON.stringify({
          authorization: "Bearer ".concat(authToken),
          clusterUrl: clusterUrl,
          query: requestString,
          queryVariables: requestVariables
        });

        var _ws = new WebSocket(qlkubeUrl_ws);

        var subHandle;

        _ws.onopen = function () {
          subHandle = subscribe(null, clusterUrl, null, _ws, true, requestParameters);
        };

        _ws.onmessage = function (evt) {
          var received_msg = evt.data;
          var jsonData = JSON.parse(received_msg);
          var eventData = jsonData === null || jsonData === void 0 ? void 0 : jsonData.data;
          var statusData = jsonData === null || jsonData === void 0 ? void 0 : jsonData.status;

          if (eventData) {
            if (eventData.error && errorCallback) {
              var _eventData$error, _eventData$error$erro;

              var errorReason = (_eventData$error = eventData.error) === null || _eventData$error === void 0 ? void 0 : (_eventData$error$erro = _eventData$error.errorPayload) === null || _eventData$error$erro === void 0 ? void 0 : _eventData$error$erro.reason;
              errorCallback('qlkube error', errorReason || 'error fetching gql data');
            }

            resolve({
              data: eventData
            });
            subHandle.unsubscribe();

            _ws.close();
          } else if (statusData && serverStatusCallback) {
            statusData === ServerStatus.generating && serverStatusCallback(ServerStatus.generating);
            statusData === ServerStatus.exists && serverStatusCallback(ServerStatus.exists);
          }
        };
      });
    },
    socketStatus: socketStatus
  };
}; // ## Webpack 5 issues

var useLink = function useLink() {
  var QLKUBE_PROVIDER = react.useContext(QlkubeContext);
  var socketState = QLKUBE_PROVIDER.socketState,
      ws = QLKUBE_PROVIDER.ws;

  var _useState7 = react.useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      connectStatus = _useState8[0],
      setConnectStatu = _useState8[1];

  react.useEffect(function () {
    setConnectStatu(socketState);
  }, [socketState]);
  return {
    socketState: connectStatus,
    ws: ws
  };
};

exports.QlkubeContext = QlkubeContext;
exports.QlkubeProvider = QlkubeProvider;
exports.subscribe = subscribe;
exports.useLink = useLink;
exports.useMonoSub = useMonoSub;
exports.useSub = useSub;
