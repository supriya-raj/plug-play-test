"use strict";

import React from 'react';
import { Provider }         from 'react-redux';

import TestDashBoard, {fetchData} from './test_dashboard';
import createStore          from './store/createStore';
//import styles from './stylesheets/main.scss';

let TestDashBoardPlug = (props) => {
  const store = createStore({data: props.data});
  return (
    <Provider store={store}>
      <TestDashBoard />
    </Provider>
  )
}

// var TestDashBoardPlug = () => {
// 	return <div>dkudsfhgsd</div>
// }


//module.exports = TestDashBoardPlug

module.exports = {TestDashBoardPlug, fetchData};
