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
  MdOutlineDescription,
} from "react-icons/md";
import {
  BsFillQuestionCircleFill,
  BsThreeDotsVertical,
  BsImage,
} from "react-icons/bs";

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
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import ServiceStatus from "./serviceStatus";

const db = firebase.firestore();

function NewBook(props) {
  const { services } = useStores();
  const history = useHistory();
  // const { postdata, posttime } = useTimes();
  const [postdata, setPostData] = useState({});
  const [loader, setLoader] = useState(true);
  const [showTime, setShowTime] = useState(false);
  const [showComplete, setShowComplete] = useState(true);
  const [loaderData, setloaderData] = useState("fetching your order ...");
  const [schedule, setSchedule] = useState(new Date());

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

  const updateSchedules = (date) => {
    setSchedule(date);
    console.log(date);
  }

  return (
    <div>
      <div className="head-card">
        <MdArrowBack
          className="head-icons1"
          onClick={() => {
            history.go(-1);
          }}
          style={{ cursor: "pointer" }}
        />
        <div className="head-details">
          <h2>{services.convertor(postdata.job)}</h2>
          <p>Order-ID: {postdata.ordId}</p>
          <div>
            <Button
              variant="outlined"
              className="head-cancel-btn"
              onClick={() => {
                services.updateOrder(3, postdata.ordId);
              }}
            >
              <MdCancel className="button-icons" />
              &nbsp;&nbsp; Cancel
            </Button>
            <Button
              className="head-buttons"
              variant="contained"
              color="primary"
              onClick={() => {
                if (postdata.orderState == 8) {
                  services.updateOrder(7, postdata.ordId);
                  setShowTime(true);
                  
                }  else return setShowTime(true);
              }}
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
      <div>
        {showTime ? (
          <div className="date-picker">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                required
                margin="normal"
                variant="filled"
                id="time-picker"
                label="Schedule"
                value={schedule}
                className="picker-card"
                // value={new Date()}
                onChange={
                  updateSchedules
                }
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <p
              onClick={() => {
                setShowTime(false);
                services.updateSchedule(new Date(schedule).valueOf(), postdata.ordId);
              }}
            >
              x
            </p>
          </div>
        ) : null}
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
              <MdOutlineDescription className="detail-icons" />
              <div>
                <h4>Description</h4>
                <p>{postdata.desc}</p>
              </div>
            </div>
            <div className="detail-div">
              <MdSchedule className="detail-icons" />
              <div>
                <h4>Schedule</h4>
                <p>
                  {gettbystamps(Number(postdata.schedule), "fulldate")}
                  ,&nbsp;&nbsp;
                  {gettbystamps(Number(postdata.schedule), "time")}
                </p>
              </div>
            </div>
            <div className="detail-div">
              <MdLocationOn className="detail-icons" />
              <div>
                <h4>Location</h4>
                <p>
                  {/* {JSON.parse(postdata.address).featureName} */}
                  {/* , <br />
                  {JSON.parse(postdata.address).subLocality},
                  <br />
                  {JSON.parse(postdata.address).locality} - {postdata.address.postalCode} */}
                  {/* {postdata.address.featureName} <br /> */}
                </p>
              </div>
            </div>
          </div>
          <hr className="line" />
          <div className="media-div">
            <div className="media-card">
              <h2>Media Files:</h2>
              <BsImage className="image-icon" />
              {/* <img src={postdata.media[0]} /> */}
              <br />
              <BsImage className="image-icon" />
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
          <ServiceStatus />

          {showComplete ? (
            <div className="conclusion">
              <p>Is this order completed?</p>
              <div>
                <Button
                  variant="outlined"
                  className="head-cancel-btn"
                  onClick={() => {
                    setShowComplete(false);
                  }}
                >
                  <MdCancel className="button-icons" />
                  &nbsp;&nbsp; Not Yet
                </Button>
                <Button
                  className="head-buttons"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    services.updateOrder(9, postdata.ordId);
                    setShowComplete(false);
                  }}
                >
                  <MdCheckCircle className="button-icons" />
                  &nbsp;&nbsp;Completed
                </Button>
              </div>
            </div>
          ) : null}
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
