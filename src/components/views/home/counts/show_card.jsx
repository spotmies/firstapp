import React from "react";
import { AiOutlineUserAdd, AiOutlineYoutube } from "react-icons/ai";

export default function ShowCard() {
  return (
    <div className="center">
      <div className="show-card">
        <div className="show-card-content">
          <p className="head-center">Get started with Spotmies Today</p>
          <p className="description">
            Turn your idea into incredebil business with 30 days trial period.
          </p>

          <div className="center-div">
            <div className="small-card">
              <AiOutlineUserAdd
                size="2.2rem"
                color="#008fdb"
                className="horizontal-spacer"
              />
              <p className="shead2">Join as service partner</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
