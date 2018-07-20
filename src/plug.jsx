import TestDashBoard, {} from './test_dashboard';
import React from 'react';
import { Provider }         from 'react-redux';
import createStore          from './stores/createStore';

let TestDashBoardPlug = (props) => {
  const store = createStore({data: props.data})
  return (
    <Provider store={store}>
      <TestDashBoard />
    </Provider>
  )
}




export {TestDashBoardPlug};
