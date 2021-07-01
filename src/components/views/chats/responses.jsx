import React from "react";
import firebase from "../../../firebase";
import { useState, useEffect } from "react";
import "../../../index.css";
import "../../../post.css";
import { gettbystamps } from "../../../helpers/dateconv";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "../mybookings/my_book.css";
import io from "socket.io-client";
import constants from "../../../helpers/constants";
//import icons
import { IconContext } from "react-icons";

import { BiTimeFive } from "react-icons/bi";

import {
  MdEventAvailable,
  MdExplore,
  MdMoreHoriz,
  MdNearMe,
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
import Badge from "@material-ui/core/Badge";
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  deleteResponseById,
  getResponses,
} from "../../controllers/responses/responses_controller";
import Avatar from "@material-ui/core/Avatar";
import { loadState } from "../../../helpers/localStorage";

function Mybookings(props) {
  const socket = io.connect(constants.socketUrl, {
    transports: ["websocket", "polling", "flashsocket"],
  });
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false); //
  const [callApi, setcallApi] = useState(true);
  const [loaderData, setloaderData] = useState("fetching your orders ...");

  const eventLoader = (loaderState, data = false) => {
    console.log("eventLoader", loaderState);
    setLoader(loaderState);
    if (data) setloaderData(data);
  };

  const getOrders = async () => {
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        socket.emit("join-room", firebase.auth().currentUser.uid);
        console.log("fetching API");
        let resp = await getResponses(firebase.auth().currentUser.uid);
        console.log(resp);
        setcallApi(false);
        setOrders(resp);
        props.updateAllResponses(resp);
        //eventLoader(false);
      }
    });
  };

  useEffect(() => {
    getOrders();
  }, [callApi == true]);

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
      props.deleteResponse(iD);
    } else toast.info("Unable To Delete Order");
    eventLoader(false);
  };

  //compoent didmount and willunMount
  useEffect(() => {
    console.log("DidMount >>>", props.responses);
    setOrders(props.responses);
    socket.on("connect", (userSocket) => {
      console.log("user connected >>>");
    });

    socket.on("newResponse", (newDoc) => {
      console.log("new resp >>", newDoc);
      setOrders((oldElement) => [...oldElement, newDoc]);
      props.addNewResponse(newDoc);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected>>>");
    });
    return () => {
      // console.log("unMount>>>");
      // socket.disconnect();
    };
  }, [constants.socketUrl]);

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
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: 400,
  },
  partnerPic: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: "auto",
  },
  centerDiv: {
    margin: "auto",
    textAlign: "center",
  },
}));

function DotMenu({ cap, deleteResp, viewPost }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modal, setModal] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
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
        <MenuItem onClick={openModal}>Partner Details</MenuItem>
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
      <div>
        <Dialog
          open={modal}
          onClose={closeModal}
          aria-labelledby="customized-dialog-title"
        >
          <DialogTitle id="customized-dialog-title" onClose={closeModal}>
            Partner Details
          </DialogTitle>
          <DialogContent>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <div className={classes.centerDiv}>
                    <Avatar
                      alt="Remy Sharp"
                      src={cap.pDetails.partnerPic}
                      className={classes.partnerPic}
                      // className="partnerPic"
                    />
                    <h3>{cap.pDetails.name}</h3>
                    <div className="partnerThings">
                      <p>online</p>
                      <p>5 stars</p>
                      <p>vizag</p>
                    </div>
                  </div>
                </Grid>
                <div className="otherDetails">
                  <div className="miniCards">
                    <p>{cap.pDetails.phNum}</p>
                  </div>
                  <div className="miniCards">
                    <p>{cap.pDetails.eMail}</p>
                  </div>
                  <div className="miniCards">
                    <p>{cap.pDetails.businessName}</p>
                  </div>
                  <div className="miniCards">
                    <p>{cap.pDetails.lang[0]}</p>
                    <p>{cap.pDetails.lang[1]}</p>
                  </div>
                </div>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Buttonn onClick={closeModal} color="primary">
              Know more
            </Buttonn>
            <Buttonn onClick={closeModal} color="primary" autoFocus>
              Close
            </Buttonn>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    responses:
      state.responses.length != 0
        ? state.responses
        : loadState("responses") ?? [],
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewResponse: (data) => {
      dispatch({ type: "ADD_NEW_RESPONSE", value: data });
    },
    updateAllResponses: (data) => {
      dispatch({ type: "UPDATE_ALL_RESPONSES", value: data });
    },
    deleteResponse: (responseId) => {
      dispatch({ type: "DELETE_RESPONSE", value: responseId });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mybookings);
