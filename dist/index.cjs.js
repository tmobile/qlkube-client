'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

var ServerStatus = {
  exists: 'exists',
  generating: 'generating',
  complete: 'complete'
};

// const urlParse = require('url');
// const https = require('http');

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
// export const request = async (
//   connectionParams,
//   qlkubeUrl,
//   serverStatusCallback
// ) => {
//   try {
//     const opts = urlParse.parse(qlkubeUrl)
//     opts.headers = {};
//     opts.headers['Content-Type'] = 'application/json';
//     opts.headers['connectionParams'] = connectionParams;
//     opts['timeout'] = 500000;
//     const httpRequestPromise= new Promise((resolve, reject) => {
//       https.request(opts, function (res) {
//         let chunks = []
//         res.setEncoding('utf8');
//         res.on('data', async function (body) {
//           const validJson= await isJsonString(body);
//           if(validJson){
//             const result= processData(validJson, serverStatusCallback, res);
//             if(!result.suspendResolve){
//               resolve(result)
//             }else{}
//           }else{
//             chunks.push(new Buffer.from(body))
//           }
//         });
//         res.on('error', (err) => {throw new Error(err)});
//         res.on('close', (msg) => {});
//         res.on('end', function () {
//           if(chunks?.length>0){
//             const data = Buffer.concat(chunks);
//             const parsedChunks = JSON.parse(data);
//             const result= processData(parsedChunks, serverStatusCallback, null);
//             resolve(result)
//           }
//         })
//       }).end(() => {});
//     })
//     return httpRequestPromise;
//   } catch (error) {}
// };

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

var QlkubeContext = /*#__PURE__*/react.createContext();

var QlkubeProvider = function QlkubeProvider(_ref) {
  var children = _ref.children,
      wsUrl = _ref.wsUrl,
      queryUrl = _ref.queryUrl;
      _ref.doKeepAlive;

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
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
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

  var connectWs = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _ws;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
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

  return /*#__PURE__*/React.createElement(QlkubeContext.Provider, {
    value: {
      ws: ws,
      socketState: socketState,
      qlkubeSocketStatus: qlkubeSocketStatus,
      qlkubeUrl: queryUrl,
      qlkubeUrl_ws: wsUrl,
      reconnect: reconnect,
      updateQlkubeSocketStatus: updateQlkubeSocketStatus
    }
  }, children);
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
// const useQuery = () => {
//   const QLKUBE_PROVIDER = useContext(QlkubeContext);
//   const { qlkubeUrl } = QLKUBE_PROVIDER;
//   return async (
//     authToken,
//     clusterUrl,
//     requestString,
//     requestVariables,
//     serverStatusCallback
//   ) => {
//     const requestParameters= JSON.stringify({
//       authorization: `Bearer ${authToken}`,
//       clusterUrl,
//       query: requestString,
//       queryVariables: requestVariables
//     });
//     const res = await request(
//       requestParameters,
//       qlkubeUrl,
//       serverStatusCallback
//     );
//     return res
//   }
// }


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
