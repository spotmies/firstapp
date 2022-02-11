import React from "react";
import firebase from "../../../firebase";
import "./newbook.scss";
import {
  MdArrowBack,
  MdCancel,
  MdSettings,
  MdModeEdit,
  MdSchedule,
  MdLocationOn,
  MdCheckCircle,
  MdCheck,
  MdClose,
  MdOutlineDescription,
  MdStarRate,
  MdStar,
  MdPhone,
  MdChat,
} from "react-icons/md";
import {
  BsFillQuestionCircleFill,
  BsThreeDotsVertical,
  BsImage,
} from "react-icons/bs";

import { Button } from "@material-ui/core";
import {
  Alert,
  AlertTitle,
  Stack,
  Rating,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

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
import { useStores } from "../../stateManagement/index";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import ServiceStatus from "./serviceStatus";
import { useRef } from "react";

const db = firebase.firestore();

function NewBook(props) {
  const { services, commonStore } = useStores();
  const history = useHistory();
  // const { postdata, posttime } = useTimes();
  const [postdata, setPostData] = useState({});
  const [loader, setLoader] = useState(true);
  const [showTime, setShowTime] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [loaderData, setloaderData] = useState("fetching your order ...");
  const [schedule, setSchedule] = useState(new Date());
  const [allOrder, setAllOrder] = useState([]);

  const eventLoader = (loaderState, data = false) => {
    setLoader(loaderState);
    if (data) setloaderData(data);
  };

  const getOrder = async () => {
    let ordId = window.location.pathname;
    ordId = ordId.replace("/mybookings/id/", "");
    let orders = props.orders;
    setAllOrder(orders);
    console.log("orders", orders);
    let order = orders.filter((item) => item.ordId == ordId);
    if (order.length > 0) {
      setPostData(order[0]);
      setShowComplete(
        order[0].orderState < 9 && order[0].orderState != 3 ? true : false
      );
    } else console.log("unable to load data");
    eventLoader(false);
  };

  useEffect(() => {
    getOrder();
  }, [allOrder != props.orders]);

  useEffect(() => {
    setSchedule(new Date(postdata.schedule));
  }, [postdata]);

  useEffect(() => {
    commonStore.setNavBar(false);

    return () => {
      commonStore.setNavBar(true);
    };
  }, []);

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
  };
  const reviewSubmit = (rating, comment) => {
    services.submitReview(rating, comment, postdata, props.updateOrder);
  };

  const serviceStatus = (status) => {
    const statusName = () => {
      switch (status) {
        case 0:
          return "You Requested for the Service";
        case 1:
          return "No service provider found";
        case 2:
          return "This service updated by you";
        case 3:
          return "Cancelled by you";
        case 4:
          return "Rejected by service provider";
        case 5:
          return "Something went wrong";
        case 6:
          return "Something went wrong";
        case 7:
          return "You have rescheduled the service";
        case 8:
          return "Service ongoing...";
        case 9:
          return "Service completed";
        case 10:
          return "Order completed successfully";
        default:
          return "Pending";
      }
    };
    switch (status) {
      case 0:
      case 1:
      case 2:
      case 5:
      case 7:
        return (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="info">
              <AlertTitle>Status</AlertTitle>
              {statusName()}
            </Alert>
          </Stack>
        );

      case 8:
        return (
          <div>
            {" "}
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
                      services.updateOrder(
                        9,
                        postdata.ordId,
                        props.updateOrder
                      );
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
        );
      case 3:
      case 4:
        return (
          <div>
            <Stack sx={{ width: "100%" }} spacing={3}>
              <Alert severity="error">
                {status == 3
                  ? "This order is cancelled by the customer."
                  : "This order is cancelled by the service provider."}
              </Alert>
            </Stack>
          </div>
        );
      case 9:
        return (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">Service completed successfully</Alert>
            <div style={{ margin: "0 auto", paddingTop: "5px" }}>
              <HoverRating onSubmit={reviewSubmit} />
            </div>
          </Stack>
        );
      case 10:
        return (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">Order completed successfully</Alert>
          </Stack>
        );

      default:
        return <p>service {status}</p>;
    }
  };

  const chatWithPartner = (orderId, pId, pdet) => {
    console.log("click", orderId, pId);
    history.push(`/chat/?ordId=${orderId}&pId=${pId}&pdet=${pdet}`);
  };
  const callPartner = () => {
    window.open(`tel:${postdata?.pDetails?.phNum}`);
  };
  return (
    <div className="order-overview">
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
          {postdata.orderState != 3 &&
          postdata.orderState != 9 &&
          postdata.orderState != 10 ? (
            <div className="btn-div">
              <p
                // variant="outlined"
                className="head-cancel-btn"
                onClick={() => {
                  services.updateOrder(3, postdata.ordId, props.updateOrder);
                }}
              >
                <MdCancel className="button-icons" />
                Cancel
              </p>
              <p
                className="head-buttons"
                // variant="contained"
                // color="primary"
                onClick={() => {
                  if (postdata.orderState == 8) {
                    //  services.updateOrder(7, postdata.ordId,props.updateOrder);
                    setShowTime(true);
                  } else return setShowTime(true);
                }}
              >
                <AiOutlineReload className="button-icons" />
                Re-Schedule
              </p>
            </div>
          ) : null}
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
                onChange={updateSchedules}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <div style={{ paddingTop: "10px" }}>
              <p
                className="ok-btn"
                onClick={() => {
                  setShowTime(false);
                  services.updateSchedule(
                    new Date(schedule).valueOf(),
                    postdata.ordId,
                    props.updateOrder
                  );
                }}
              >
                <MdCheck />
              </p>
              <p
                className="close-btn"
                onClick={() => {
                  setShowTime(false);
                }}
              >
                <MdClose />
              </p>
            </div>
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
              {(() => {
                if (postdata?.media?.length > 0) {
                  return postdata.media.map((item, index) => {
                    return (
                      <div className="media-div" key={index}>
                        <img src={item} className="order-image" />
                      </div>
                    );
                  });
                } else {
                  return <p>No media files found</p>;
                }
              })()}
            </div>
            {/* <div className="media-card">
              <h2>Warranty card</h2>
              <div className="warranty">warranty card</div>
            </div> */}
          </div>
        </div>
        <div className="right-card">
          {postdata.orderState == 0 ||
          postdata.orderState == 1 ||
          postdata.orderState == 2 ? (
            <div style={{ display: "inline-flex" }}>
              <h3 className="heading">Service Status</h3>
              <Button variant="outlined" className="service-btn">
                <AiOutlineReload className="button-icons" />
                &nbsp;&nbsp; Request order again
              </Button>
            </div>
          ) : null}
          <ServiceStatus status={postdata.orderState} />
          {serviceStatus(postdata.orderState)}
        </div>
      </div>
      {postdata.orderState > 7 ? partnerDetailsCard(postdata.pDetails) : null}
    </div>
  );

  function partnerDetailsCard(props) {
    const getRating = (ratings) => {
      //average rating
      console.log(ratings);
      try {
        let sum = 0;
        for (let i = 0; i < ratings?.length; i++) {
          sum += ratings[i]?.rate;
        }
        let avg = sum / ratings?.length;
        return avg;
      } catch (error) {
        console.log(error);
        return "*";
      }
    };
    return (
      <div className="sp-details">
        <h2>Service partner details: </h2>
        <div className="details-container">
          <div className="details">
            <img src={props.partnerPic} className="partner-pic" />
            <div className="info">
              <div className="info-1">
                <p className="title">{props.name}</p>
                <p className="title">
                  &nbsp;{" "}
                  {props.rate.length < 1 ? "No ratings" : getRating(props.rate)}{" "}
                  &nbsp;
                  <MdStar color="#f0a926" />{" "}
                </p>
              </div>
              <div className="info-2">
                <span className="info-3">
                  <p>{services.getServiceNameById(props?.job)}</p>
                  <p>
                    {" "}
                    {props.lang.map((item, key) => {
                      if (key == props.lang.length - 1) return item;
                      return item + ",  ";
                    })}
                  </p>
                  {/* <p>Telugu, Hindi</p> */}
                </span>
                <span className="info-4">
                  <p>
                    <MdPhone /> {props.phNum}
                  </p>
                  <p>
                    <MdLocationOn /> {props.workArea ?? "Vizag"}
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div className="communication">
            <span className="pointer" onClick={callPartner}>
              <MdPhone className="phone-msg" />
              <h4>Call</h4>
            </span>
            <span
              className="pointer"
              onClick={() => {
                chatWithPartner(
                  postdata.ordId,
                  postdata.pId,
                  postdata?.pDetails?._id
                );
              }}
            >
              <MdChat className="phone-msg" />
              <h4>Message</h4>
            </span>
          </div>
        </div>
      </div>
    );
  }
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
    updateOrder: (data) => {
      dispatch({ type: "UPDATE_ORDER", value: data });
    },
    updateOrderState: (data) => {
      dispatch({ type: "UPDATE_ORDER_STATE", value: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewBook);

function HoverRating(props) {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const reviewBody = useRef("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const labels = {
    0.5: "Useless",
    1: "Useless+",
    1.5: "Poor",
    2: "Poor+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  return (
    <div>
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating
          name="hover-feedback"
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
            handleClickOpen();
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={
            <MdStarRate style={{ opacity: 0.55 }} fontSize="inherit" />
          }
        />
        {value !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
        )}
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth={true}>
        <DialogTitle>Share Your Experience</DialogTitle>
        <DialogContent>
          <TextField
            // autoFocus
            margin="dense"
            id="outlined-multiline-static"
            label="Want to say something?"
            fullWidth
            variant="filled"
            inputRef={reviewBody}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              console.log(reviewBody.current?.value);
              props.onSubmit(value, reviewBody.current?.value);
              handleClose();
            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
