import React from "react";
import Router from "universal-router";
import history from "./history";

import TestDashboard, {fetchData} from "./test_dashboard";

const routes = [
  {
    path: "/test",
    action: context => {
      return fetchData().then((payload) => {
        context.store.dispatch({
          type: "update_data",
          payload
        })
        return <TestDashboard />
      })
    }
  }
];

const createRouteWithContext = store => {
  const context = {
    store
  };

  return new Router(routes, { context });
};

const onClientNavigation = (callback, store) => {
  const router = createRouteWithContext(store);
  return (pathname, queryParams = {}) => {
    router.context.queryParams = queryParams;

    callback(<div>Loading..</div>);
    router
      .resolve(pathname)
      .then(result => {
        callback(result);
      })
      .catch(err => {
        callback(<div>Page Not found</div>);
      });
  };
};

export default onClientNavigation;
