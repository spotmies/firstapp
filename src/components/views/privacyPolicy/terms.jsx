import React, { useRef } from "react";
import FooterBar from "../home/footer_bar/footer_bar";
import "./privacy.css";

function Terms() {
  const ref1 = useRef(null);
  const executeScroll = () =>
    ref1.current.scrollIntoView({ behavior: "smooth" });
  return (
    <div>
      <div className="privacyDiv">
        <article>
          <h1>Terms and Conditions</h1>
          <p onClick={executeScroll}>
            1. Spotmies partner not supposed to Save customer details,as well as
            not supposed to give contact information to customer
          </p>
          <p>
            2. Spotmies partners are not supposed to share customer details to
            others,it will be considered as an illegal activity
          </p>
          <p>
            3. we do not Entertain any illegal activities.if perform severe
            actions will be taken
          </p>
          <p>
            4. partners are responsible for the damages done during the services
            and they bare whole forfeit
          </p>
          <p>
            5. We do not provide any kind of training,equipment/material and
            labor to perform any Service
          </p>
          <p>6. We do not provide any shipping charges,travelling fares</p>
          <p>
            7. Partner should take good care of their appearance ,language
            ,behaviour while they perform service.
          </p>
          <p>8. Partner should fellow all the covid regulations.</p>
          <br />
        </article>
      </div>
      <FooterBar />
    </div>
  );
}

export default Terms;
