import React from "react";
import {
  AiOutlineArrowRight,
  AiOutlineCheck,
  AiOutlineCheckSquare,
  AiOutlineGlobal,
} from "react-icons/ai";

export default function Benefits4() {
  return (
    <div className="center">
      <div className="benefit4">
        <div className="benefits4-parent">
          <div className="center">
            <div className="benefit4-card">
              <span className="icon-wrapper">
                <AiOutlineGlobal size="2.8rem" />
              </span>
              <p className="shead"> Global solution</p>
              <p className="description">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text.
              </p>
              <p className="read-more">
                Read more &nbsp;
                <AiOutlineArrowRight />
              </p>
            </div>
          </div>
          <div className="verticle-line" />
          <div className="spacer" />
          <div className="center">
            <div className="benefit4-card">
              <span className="icon-wrapper">
                <AiOutlineCheckSquare size="2.8rem" />
              </span>
              <p className="shead"> Immediat Sandbox Access</p>
              <p className="description">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text.
              </p>
              <p className="read-more">
                Read more &nbsp;
                <AiOutlineArrowRight />
              </p>
            </div>
          </div>
        </div>
        <div className="spacer" />
        <div className="horizontal-line" />
      </div>
    </div>
  );
}
