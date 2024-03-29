import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import Fade from "react-reveal/Fade";
export default function ShowCard(props) {
  const data = props.data;
  return (
    <Fade>
      <div className="center">
        <div className="show-card">
          <div className="show-card-content">
            <p className="head-center head home-page-head">{data.title}</p>
            <p className="description">{data.description}</p>

            <div className="center-div">
              <div
                className="small-card"
                onClick={() => {
                  window.location.href = data.buttonLink;
                }}
              >
                <AiOutlineUserAdd
                  size="2.2rem"
                  color="#008fdb"
                  className="horizontal-spacer show-card-icon"
                />
                <p className="shead2">{data.buttonText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
