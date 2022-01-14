import React from "react";
import "./landingUser.css";
import Services from "./newHome/services";
import TopSection from "./newHome/topSection";
import Secure from "./newHome/secure";
// import How from "./newHome/how";

function LandingUser() {
  return (
    <div>
      <TopSection />
      <Services />
      <Secure />
      {/* <How /> */}
    </div>
  );
}

export default LandingUser;
