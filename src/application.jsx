import React from "react";

const Application = ({ component }) => {
  return (
    <div>
      {component? component: <div>Loading......</div>}
    </div>
  );
};

export default Application;
