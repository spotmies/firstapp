import React from "react";
import firebase from "../../../firebase";
import "./newbook.css";
import {
  MdArrowBack,
  MdCancel,
  MdSettings,
  MdModeEdit,
  MdSchedule,
  MdLocationOn,
  MdCheckCircle,
} from "react-icons/md";
import { GoVerified } from "react-icons/go";
import { RiFeedbackFill } from "react-icons/ri";
import {
  BsFillQuestionCircleFill,
  BsThreeDotsVertical,
  BsImage,
} from "react-icons/bs";
import { FaUserCheck, FaShoppingBag, FaWrench } from "react-icons/fa";
import Button from "@mui/material/Button";
import { AiOutlineReload } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import "../../../assets/css/postView.css";
import { categoryAssign } from "../../../helpers/categories";
import { gettbystamps } from "../../../helpers/dateconv";
import { connect } from "react-redux";
import { loadState } from "../../../helpers/localStorage";
import { deleteOrderById } from "../../controllers/new_post/order_controller";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FullScreenWidget from "../../reusable/helpers";
import { useStores } from "../../stateManagement/index";

const db = firebase.firestore();

function NewBook(props) {
  const { Services } = useStores();
  const history = useHistory();
  // const { postdata, posttime } = useTimes();
  const [postdata, setPostData] = useState({});
  const [loader, setLoader] = useState(true);
  const [loaderData, setloaderData] = useState("fetching your order ...");
  const eventLoader = (loaderState, data = false) => {
    setLoader(loaderState);
    if (data) setloaderData(data);
  };

  const getOrder = async () => {
    let ordId = window.location.pathname;
    ordId = ordId.replace("/mybookings/id/", "");
    let orders = props.orders;
    console.log("orders", orders);
    let order = orders.filter((item) => item.ordId == ordId);
    if (order.length > 0) setPostData(order[0]);
    else console.log("unable to load data");
    eventLoader(false);
  };

  useEffect(() => {
    getOrder();
  }, []);

  const click = (prop) => {
    // console.log("click", prop);
    // history.push(`edit/${prop}`);
  };
  const delpost = async (ordId) => {
    eventLoader(true, "Deleting Order...");
    let response = await deleteOrderById(ordId);
    if (response) {
      props.deleteOrder(ordId);
      toast.info("Order Deleted Successfully");
      history.go(-1);
    } else toast.info("Unable To Delete Order");
    eventLoader(false);
  };

  return (
    <div>
      <div className="head-card">
        <MdArrowBack className="head-icons1" />
        <div className="head-details">
          <h2>{Services.convertor(postdata.job)}</h2>
          <p>Order-ID: {postdata.ordId}</p>
          <div>
            <Button variant="outlined" className="head-cancel-btn">
              <MdCancel className="button-icons" />
              &nbsp;&nbsp; Cancel
            </Button>
            <Button
              className="head-buttons"
              variant="contained"
              color="primary"
            >
              <AiOutlineReload className="button-icons" />
              &nbsp;&nbsp;Re-Schedule
            </Button>
          </div>
        </div>
        <div className="head-menu">
          <BsFillQuestionCircleFill className="head-icons" />
          <BsThreeDotsVertical className="head-icons" />
        </div>
      </div>

      <div className="body-cards">
        <div className="left-card">
          <h3 className="heading">Service Details:</h3>
          <div className="service-details">
            <div className="detail-div">
              <MdSettings className="detail-icons" />
              <div>
                <h4>Issue /Problem</h4>
                <p>{postdata.problem}</p>
              </div>
              <MdModeEdit className="detail-icons" />
            </div>
            <div className="detail-div">
              <MdSchedule className="detail-icons" />
              <div>
                <h4>Schedule</h4>
                <p>
                {gettbystamps(Number(postdata.schedule), "fulldate")},&nbsp;&nbsp;
                {gettbystamps(Number(postdata.schedule), "time")}</p>
              </div>
            </div>
            <div className="detail-div">
              <MdLocationOn className="detail-icons" />
              <div>
                <h4>Location</h4>
                <p>
                  {/* {JSON.parse(postdata.address).featureName}, <br />
                  {JSON.parse(postdata.address).subLocality},
                  <br />
                  {JSON.parse(postdata.address).locality} - {postdata.address.postalCode} */}
                </p>
              </div>
            </div>
          </div>
          <hr className="line" />
          <div className="media-div">
            <div className="media-card">
              <h2>Media Files:</h2>
              {/* <BsImage className="image-icon" /> */}
              {/* <img src={postdata.media[0]} /> */}
              <br />
              {/* <BsImage className="image-icon" /> */}
              {/* <img src={postdata.media[1]} /> */}
            </div>
            <div className="media-card">
              <h2>Warranty card</h2>
              <div className="warranty">warranty card</div>
            </div>
          </div>
        </div>
        <div className="right-card">
          <div style={{ display: "inline-flex" }}>
            <h3 className="heading">Service Status</h3>
            <Button variant="outlined" className="service-btn">
              <AiOutlineReload className="button-icons" />
              &nbsp;&nbsp; Request order again
            </Button>
          </div>
          <div className="service-status">
            <div className="status-line"></div>
            <div className="status-details">
              {/* <MdShoppingBag /> */}
              <FaShoppingBag className="status-icons1" />
              <p>Service Requested</p>
            </div>
            <div className="status-details">
              <FaUserCheck className="status-icons" />
              <p>Order Accepted</p>
            </div>
            <div className="status-details">
              <FaWrench className="status-icons" />
              <p>Service Started</p>
            </div>
            <div className="status-details">
              <GoVerified className="status-icons" />
              <p>Service Completed</p>
            </div>
            <div className="status-details">
              <RiFeedbackFill className="status-icons" />
              <p>Feedback</p>
            </div>
          </div>
          <div className="conclusion">
            <p>Is this order completed?</p>
            <div>
              <Button variant="outlined" className="head-cancel-btn">
                <MdCancel className="button-icons" />
                &nbsp;&nbsp; Not Yet
              </Button>
              <Button
                className="head-buttons"
                variant="contained"
                color="primary"
              >
                <MdCheckCircle className="button-icons" />
                &nbsp;&nbsp;Completed
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    orders: state.orders.length > 0 ? state.orders : loadState("orders"),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteOrder: (ordId) => {
      dispatch({ type: "DELETE_ORDER", value: ordId });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewBook);