import React from "react";
import { constants } from "../../helpers/constants";
import { createHashHistory } from "history";

const history = createHashHistory();
function Coming_soon_widget() {
  return (
    <div>
      {constants.demoVersion ? (
        <div className="comingSoon">
          <h1 className="soonText">Coming Soon ...</h1>
          <h3
            style={{ textAlign: "center", cursor: "pointer" }}
            onClick={() => {
              history.go(-1);
            }}
          >
            Click here to go back
          </h3>
        </div>
      ) : null}
    </div>
  );
}

export default Coming_soon_widget;
