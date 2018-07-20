import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import queryString from "query-string";

import history from "./history";
import onClientNavigation from "./navigation";
import createStore from "./store/createStore";
import Application from "./application";

import styles from "./stylesheets/main.scss";

const store = createStore();

const renderApp = component => {
  try {
    render(
      <Provider store={store}>
        <div>
          <Application component={component} />
        </div>
      </Provider>,
      document.getElementById("app")
    );
  } catch (e) {
    console.log(e);
  }
};

const onNavigation = onClientNavigation(renderApp, store);

history.listen(location => {
  onNavigation(
    window.location.pathname,
    queryString.parse(window.location.search)
  );
});

onNavigation(
  window.location.pathname,
  queryString.parse(window.location.search)
);
