import React from "react";
import firebase from "../../../firebase";
import { useState, useEffect } from "react";
import "../../../index.css";
import "../../../post.css";
import { gettbystamps } from "../../../helpers/dateconv";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "../mybookings/my_book.css";

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

// material ui
import Cardd from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Buttonn from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import { Chip } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  deleteResponseById,
  getResponses,
} from "../../controllers/responses/responses_controller";
import Avatar from "@material-ui/core/Avatar";

function Mybookings(props) {
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
          let orders = await getResponses(firebase.auth().currentUser.uid);
          console.log(orders);
          setOrders(orders);
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

  const deleteResponse = async (iD) => {
    console.log("delete id", iD);
    eventLoader(true, "Deleting response...");
    let response = await deleteResponseById(iD);
    if (response) {
      setOrders(orders.filter((item) => item.responseId !== iD));
      toast.info("Order Deleted Successfully");
    } else toast.info("Unable To Delete Order");
    eventLoader(false);
  };

  return (
    <div>
      {loader == false && orders.length == 0 ? (
        <FullScreenWidget
          type="noDataPlaceHolder"
          show={true}
          data="You have no data here"
        />
      ) : null}
      <FullScreenWidget type="loader" show={loader} data={loaderData} />

      {orders.length > 0 ? (
        <div style={{ paddingTop: "30px" }}>
          {orders
            .slice(0)
            .reverse()
            .map((cap, key) => (
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
                        deleteResp={deleteResponse}
                      />
                    }
                    title={`${gettbystamps(Number(cap.join), "fulldate")} 
                     ${gettbystamps(Number(cap.join), "time")}`}
                  />
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item className="mediaPic">
                        <Badge
                          overlap="circle"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent={
                            <Avatar
                              alt="Remy Sharp"
                              src={cap.pDetails.partnerPic}
                            />
                          }
                        >
                          <CardMedia
                            className="post-img"
                            image={
                              cap.orderDetails.media[0] ??
                              "https://png.pngtree.com/element_pic/16/12/05/cf1b62b08a9b360b932cb93db844675a.jpg"
                            }
                            title="Paella dish"
                          />
                        </Badge>
                        {/* this div for mobile view only */}
                        <div className="problemTitle-Mobile">
                          <h3>{cap.orderDetails.problem}</h3>
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
                              <h3 className="problemTitle">
                                {cap.orderDetails.problem}
                              </h3>
                              <Grid
                                item
                                md
                                container
                                direction="row"
                                justify="space-evenly"
                              >
                                <p className="orderDetails">
                                  <MdPayment />
                                  &nbsp;
                                  <b> Money : &#8377; {cap.money}</b>
                                </p>
                                <p className="orderDetails">
                                  <MdNearMe />
                                  &nbsp;
                                  <b>Distance from you : 5 km</b>
                                </p>
                              </Grid>
                              <Grid
                                item
                                md
                                container
                                direction="row"
                                justify="space-evenly"
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
                                      {gettbystamps(
                                        Number(cap.schedule),
                                        "time"
                                      )}
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
                      <Chip
                        icon={<MdWatchLater size="1rem" />}
                        label="Accept"
                        color="primary"
                      />
                      <Chip
                        icon={<MdWatchLater size="1rem" />}
                        label="Decline"
                        color="secondary"
                        onClick={() => {
                          deleteResponse(cap.responseId);
                        }}
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

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    orders: [],
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

function DotMenu({ cap, deleteResp, viewPost }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          ViewOrder
        </MenuItem>
        <MenuItem>Partner Details</MenuItem>
        <MenuItem>Chat with Partner </MenuItem>
        <MenuItem>Call Partner</MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            deleteResp(cap.responseId);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
