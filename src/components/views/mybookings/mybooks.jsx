import React from "react";
import firebase from "../../../firebase";
import { useState, useEffect } from "react";
import "../../../index.css";
import "../../../post.css";
import { gettbystamps } from "../../../helpers/dateconv";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "./my_book.css";

//import icons
import { IconContext } from "react-icons";

import { BiTimeFive } from "react-icons/bi";

import {
  MdChatBubble,
  MdEventAvailable,
  MdExplore,
  MdMoreHoriz,
  MdNavigateNext,
  MdNearMe,
  MdNotificationsActive,
  MdPayment,
  MdWatchLater,
} from "react-icons/md";
import { connect } from "react-redux";
import FullScreenWidget from "../../reusable/helpers";
import {
  deleteOrderById,
  getUserOrders,
} from "../../controllers/new_post/order_controller";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Cardd from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Buttonn from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import { Chip } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  cardDiv: {
    padding: "20px 0 20px 0",
  },
  card: {
    width: "70%",
    margin: "auto",
    borderRadius: 20,
  },
  cardHeader: {
    backgroundColor: "#e5e5e5",
    height: 55,
  },
  media: {
    height: 60,
    width: 60,
  },
  orderDetails: {
    display: "inline-flex",
    color: "grey",
    maxWidth: 140,
    height: "auto",
  },

  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Mybookings(props) {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loaderData, setloaderData] = useState("fetching your orders ...");

  const eventLoader = (loaderState, data = false) => {
    console.log("eventLoader", loaderState);
    setLoader(loaderState);
    if (data) setloaderData(data);
  };

  const getOrders = async () => {
    console.log(props.orders);
    if (props.orders.length < 1) {
      firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
          console.log("fetching API");
          let orders = await getUserOrders(firebase.auth().currentUser.uid);
          console.log(orders);
          setOrders(orders);
          props.updateAllOrders(orders);
          eventLoader(false);
        }
      });
    } else {
      console.log(props.orders);
      setOrders(props.orders);
      eventLoader(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, [orders.length < 1]);

  const history = useHistory();

  const viewPost = (orderId) => {
    console.log("click", orderId);
    history.push(`mybookings/id/${orderId}`);
  };

  const delpost = async (ordId) => {
    console.log("delete id", ordId);
    eventLoader(true, "Deleting Order...");
    let response = await deleteOrderById(ordId);
    if (response) {
      setOrders(orders.filter((item) => item.ordId !== ordId));
      props.deleteOrder(ordId);
      toast.info("Order Deleted Successfully");
    } else toast.info("Unable To Delete Order");
    eventLoader(false);
  };

  return (
    <div>
      {loader === false && orders.length === 0 ? (
        <FullScreenWidget
          type="noDataPlaceHolder"
          show={true}
          data="You have no data here"
        />
      ) : null}
      <FullScreenWidget type="loader" show={loader} data={loaderData} />

      {orders.length > 0 ? (
        <div style={{ paddingTop: "30px" }}>
          {orders.map((cap, key) => (
            <div className="cardDiv" key={cap._id} id={cap._id}>
              <Cardd className="orderCard">
                <CardHeader
                  className="cardHeader"
                  avatar={<BiTimeFive size="1.4rem" />}
                  action={
                    <DotMenu
                      cap={cap}
                      key={key}
                      viewPost={viewPost}
                      orderDelete={delpost}
                    />
                  }
                  title={`${gettbystamps(Number(cap.join), "fulldate")} 
                     ${gettbystamps(Number(cap.join), "time")}`}
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item className="mediaPic">
                      <CardMedia
                        className="post-img"
                        image={
                          cap.media[0] ??
                          "https://png.pngtree.com/element_pic/16/12/05/cf1b62b08a9b360b932cb93db844675a.jpg"
                        }
                        title="Paella dish"
                      />
                      {/* this below div show only in mobile view */}
                      <div className="msg-quote-count-mobile">
                        <Tooltip title="Messages">
                          <Badge
                            badgeContent={cap.messages.length}
                            color="primary"
                            showZero={cap.messages.length === 0}
                          >
                            <MdChatBubble size="3rem" />
                          </Badge>
                        </Tooltip>
                        <Tooltip title="Quotes">
                          <Badge
                            badgeContent={cap.responses.length}
                            color="primary"
                            showZero={cap.responses.length === 0}
                          >
                            <MdNotificationsActive size="3rem" />
                          </Badge>
                        </Tooltip>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <IconContext.Provider
                        value={{
                          size: "1.2rem",
                          color: "grey",
                        }}
                      >
                        <Grid item xs container direction="column">
                          <Grid item xs>
                            <h4>{cap.problem}</h4>
                            <Grid
                              item
                              md
                              container
                              direction="row"
                              justify="space-between"
                            >
                              <p className="orderDetails">
                                <MdPayment />
                                &nbsp;
                                <b> Money : &#8377; {cap.money}</b>
                              </p>
                              <p className="orderDetails">
                                <MdNearMe />
                                &nbsp;
                                <b>Distance : 5 km</b>
                              </p>
                            </Grid>
                            <Grid
                              item
                              md
                              container
                              direction="row"
                              justify="space-between"
                            >
                              <span
                                style={{
                                  display: "inline-flex",
                                }}
                              >
                                <MdEventAvailable />
                                &nbsp;
                                <p className="orderDetails">
                                  <b>
                                    {" "}
                                    Schedule :{" "}
                                    {gettbystamps(
                                      Number(cap.schedule),
                                      "fulldate"
                                    )}{" "}
                                    &nbsp;
                                    {gettbystamps(Number(cap.schedule), "time")}
                                  </b>
                                </p>
                              </span>
                              <p className="orderDetails">
                                <MdExplore />
                                &nbsp;
                                <b>Location : vizag</b>
                              </p>
                            </Grid>
                          </Grid>
                        </Grid>
                      </IconContext.Provider>
                    </Grid>
                    <Grid item xs={4} sm container>
                      <Grid
                        item
                        md
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                        className="msg-quote-count-section"
                      >
                        <Tooltip title="Messages">
                          <Badge
                            badgeContent={cap.messages.length}
                            color="primary"
                            showZero={cap.messages.length === 0}
                          >
                            <MdChatBubble size="3rem" />
                          </Badge>
                        </Tooltip>
                        <Tooltip title="Quotes">
                          <Badge
                            badgeContent={cap.responses.length}
                            color="primary"
                            showZero={cap.responses.length === 0}
                          >
                            <MdNotificationsActive size="3rem" />
                          </Badge>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Grid
                    item
                    xs={12}
                    sm
                    container
                    justify="space-between"
                    alignItems="center"
                  >
                    <Buttonn
                      endIcon={<MdNavigateNext />}
                      onClick={() => {
                        viewPost(cap.ordId);
                      }}
                    >
                      View order
                    </Buttonn>
                    <Chip
                      icon={<MdWatchLater size="1rem" />}
                      label={orderState(cap.ordState)}
                      color="primary"
                    />
                  </Grid>
                </CardActions>
              </Cardd>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
const orderState = (state) => {
  switch (state) {
    case "req":
      return "Active";

    case "noPartner":
      return "noPartner";

    case "updated":
      return "updated";

    case "onGoing":
      return "onGoing";

    case "completed":
      return "order completed";

    case "cancel":
      return "order cancelled";

    default:
      return "Invalid";
      break;
  }
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    orders: state.orders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewOrder: (data) => {
      dispatch({ type: "ADD_NEW_ORDER", value: data });
    },
    updateAllOrders: (data) => {
      dispatch({ type: "UPDATE_ALL_ORDERS", value: data });
    },
    deleteOrder: (ordId) => {
      dispatch({ type: "DELETE_ORDER", value: ordId });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mybookings);

function DotMenu({ cap, orderDelete, viewPost }) {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const edit = (ordId) => {
    console.log("click", ordId);
    history.push(`mybookings/id/edit/${ordId}`);
  };

  return (
    <div id={cap.ordId}>
      <IconButton
        aria-label="settings"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MdMoreHoriz />
      </IconButton>
      <Menu
        id="long-menu"
        keepMounted
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            console.log(cap._id);
            viewPost(cap.ordId);
          }}
        >
          View{" "}
        </MenuItem>
        <MenuItem
          onClick={() => {
            edit(cap.ordId);
          }}
        >
          Edit{" "}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            orderDelete(cap.ordId);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
