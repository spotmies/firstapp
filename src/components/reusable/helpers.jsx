import React from "react";
import { Loader, Button } from "semantic-ui-react";
import "./reuse_style.css";
import { MdSentimentDissatisfied } from "react-icons/md";
const FullScreenWidget = (props) => {
  switch (props.type) {
    case "loader":
      return (
        <div>
          {props.show === true ? (
            <div className="fullScreenLoad">
              <Loader size="massive" active inline="centered">
                {props.data ?? "Loading..."}
              </Loader>
            </div>
          ) : null}
        </div>
      );
    case "noDataPlaceHolder":
      return (
        <div>
          {props.show === true ? (
            <div className="fullScreenLoad">
              <div style={{ display: "block" }}>
                <div className="centerDiv">
                  <MdSentimentDissatisfied size="6rem" />
                </div>
                <h2>{props.data ?? "You have no data here"}</h2>
                {props.buttonLabel ? (
                  <Button primary onClick={props.onButtonClick}>
                    {props.buttonLabel}
                  </Button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      );

    default:
      return <></>;
  }
};



export default FullScreenWidget;
