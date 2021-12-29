import React from "react";
import hotgunta from "./hot.jpg";
import sgirl from "./sgirl.jpg";
import "./partner.css";
import CircularProgress from '@mui/material/CircularProgress';

function PartnerOverview(props) {
  return (
    <div>
      <p onClick={props.viewed(true)}>X</p>
      <div className="main">
        <div className="leftDiv">
          <img src={hotgunta} className="profile" alt="partnerimg" />
          <p className="name">Sruthi</p>
          <p className="mobile">9502831877</p>
          <CircularProgress variant="determinate" value={75} className="progress" /><p>4.2</p>
          <p className="order">Total Orders-125</p>
          <div className="job">
            <p className="order">Graphic Designer</p>
            <p className="price">200/-</p>
          </div>
          <p className="city">Visakhapatnam</p>
        </div>
        <div className="rightDiv">
          <div className="catDiv">
            <h3>Catalog</h3>
            <h3>Reviews</h3>
          </div>
          <div>
            <div className="jobCard">
              <img src={sgirl} alt="" className="cardProfile" />
              <div>
                <div className="jobDiv">
                  <h4>Plumber</h4>
                  <p>600/-</p>
                </div>
                <p>description from the reviewer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerOverview;
