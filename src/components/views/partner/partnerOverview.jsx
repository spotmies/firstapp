import React from "react";
import { useEffect } from "react";
import hotgunta from "./hot.jpg";
import sgirl from "./sgirl.jpg";
import "./partner.css";
import CircularProgress from '@mui/material/CircularProgress';
import { connect } from "react-redux";
import { useStores } from "../../stateManagement/index";
import { useObserver } from "mobx-react";


function PartnerOverview(props) {
  const { services, reviews } = useStores();
  console.log("partner id reviews", reviews.reviewList);

  // useEffect((id) => {
  //   return () => {
  //     reviews.fetchReviews(id);
  //       console.log("review function called to fetch");
  //   }
  // }, [])

  console.log("partner Details", props.pDet);
  return useObserver(() => (
    <div>
      <p onClick={() => {props.viewed(false)}}>X</p>
      <div className="main">
        <div className="leftDiv">
          <img src={hotgunta} className="profile" alt="partnerimg" />
          <p className="name">{props.pDet?.name}</p>
          <p className="mobile">{props.pDet?.phNum}</p>
          <CircularProgress variant="determinate" value={75} className="progress" /><p>4.2</p>
          <p className="order">Total Orders-125</p>
          <div className="job">
            <p className="order">{services.convertor(props.pDet?.job)}</p>
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
            {
              reviews.reviewList.map((review) => (
                <div className="jobCard">
                <img src={review.uDetails.pic} alt="" className="cardProfile" />
                <div>
                  <div className="jobDiv">
                    <h4>{review.uDetails.name}</h4>
                    <p>600/-</p>
                  </div>
                  <p>{review.description}</p>
                </div>
              </div>
              ))
            }

          </div>
        </div>
      </div>
    </div>
  ));
}

const mapStateToProps = (state) => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewMessage: (data) => {
      dispatch({ type: "ADD_NEW_MESSAGE", value: data });
    },
    disableChatResponseTab: (data) => {
      dispatch({ type: "DISABLE_CHAT_RESPONSE_TAB", value: data });
    },
    disableBottomBar: (data) => {
      dispatch({ type: "DISABLE_BOTTOM_BAR", value: data });
    },
    addMessageToQueue: (data) => {
      dispatch({ type: "ADD_MESSAGE_TO_QUEUE", value: data });
    },
    sendRemainingMessages: () => {
      dispatch({ type: "SEND_REMAINING_MESSAGES", value: "data" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartnerOverview);

