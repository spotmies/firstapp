import React from "react";
import { Loader } from "semantic-ui-react";
import "./reuse_style.css";
const FullScreenLoader = (props) => {
  return (
    <div>
      {props.loader == true ? (
        <div className="fullScreenLoad">
          <Loader size="massive" active inline="centered">
            {props.data ?? "Loading..."}
          </Loader>
        </div>
      ) : null}
    </div>
  );
};

export default FullScreenLoader;
