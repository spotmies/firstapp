import React from "react";
import "./landingUser.css";
import Services from "./newHome/services";
import TopSection from "./newHome/topSection";
import How from "./newHome/how";

function LandingUser() {
  return (
    <div>
      <TopSection />
      <Services />
      <How />
    </div>
  );
}

export default LandingUser;
