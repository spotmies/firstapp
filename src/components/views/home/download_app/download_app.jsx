import React from "react";
import downloadApp from "../../../../assets/images/m-1.png";

import Fade from "react-reveal/Fade";
import { FaGooglePlay } from "react-icons/fa";
import {
  redirectToAnotherPage,
  redirectToPartnerApp,
} from "../../../../helpers/redirect";
export default function DownloadMobileApp(props) {
  const data = props.data;
  return (
    <>
      <Fade>
        <div className="main-content">
          <div className="image">
            <img src={data.image ?? downloadApp} alt="downloadApp" />
          </div>
          <div className="content">
            <p className="head home-page-head">{data.title}</p>
            <p className="description">{data.description}</p>
            <div
              className="playstore"
              onClick={() =>
                redirectToAnotherPage(
                  data.link ??
                    "play.google.com/store/apps/details?id=com.spotmies"
                )
              }
            >
              <FaGooglePlay size="2rem" />
              <p> Play Store</p>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
}
