import React from "react";
import {connect} from 'react-redux';
import request from 'superagent';

let fetchData = () => {
	return request.get('https://api.github.com/users/mralexgray/repos')
		.then((response) => {
			return response.body;
		})
};

let TestDashboard = (props) => {
  return <div className="pink">Hello!!!{JSON.stringify(props.data)}</div>
};

const mapStateToProps = (state) => {
  return {
    data: state.data
  }
}

export {fetchData};
export default connect(mapStateToProps)(TestDashboard);
