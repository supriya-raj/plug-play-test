webpackJsonp([1],{7:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchData=void 0;var u=a(0),r=n(u),o=a(1),d=a(25),l=n(d),c=function(){return l.default.get("https://api.github.com/users/mralexgray/repos").then(function(e){return e.body})},f=function(e){return r.default.createElement("div",{className:"pink"},"Hello!!!",JSON.stringify(e.data))},i=function(e){return{data:e.data}};t.fetchData=c,t.default=(0,o.connect)(i)(f)},8:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=a(5),u=a(9),r=function(e){return e&&e.__esModule?e:{default:e}}(u),o=e.env&&!1;t.default=function(e){var t=[],a=[],u=n.compose;if(o){var d=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;"function"==typeof d&&(u=d)}return(0,n.createStore)(r.default,e,u.apply(void 0,[n.applyMiddleware.apply(void 0,t)].concat(a)))}}).call(t,a(27))},85:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchData=t.TestDashBoardPlug=void 0;var u=a(7),r=n(u),o=a(0),d=n(o),l=a(1),c=a(8),f=n(c),i=function(e){var t=(0,f.default)({data:e.data});return d.default.createElement(l.Provider,{store:t},d.default.createElement(r.default,null))};t.TestDashBoardPlug=i,t.fetchData=u.fetchData},9:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments[1];return"update_data"===t.type&&(e.data=t.payload),e}}},[85]);