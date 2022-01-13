import React from "react";
import girl from "./girl1.jpg";

function TopSection() {
  return (
    <div className="topMain">
      <div className="top-main">
        <div className="top-div txt-div">
            <h2>Life Should Be Easy</h2>
        </div>
        <div className="top-div">
            <img src={girl} alt="girl" className="girl-img" />
        </div>
      </div>
    </div>
  );
}

export default TopSection;
