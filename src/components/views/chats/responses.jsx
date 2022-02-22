import React from "react";

import { useState, useEffect } from "react";
import "../../../index.css";
import "../../../post.css";
import { gettbystamps } from "../../../helpers/dateconv";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
// import "../mybookings/my_book.css";
import "./response.css";

import constants from "../../../helpers/constants";
//import icons
import { IconContext } from "react-icons";

import { BiTimeFive } from "react-icons/bi";

import {
  MdEventAvailable,
  MdExplore,
  MdMoreHoriz,
  MdCheck,
  MdClose,
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
import { deleteResponseById } from "../../controllers/responses/responses_controller";
import Avatar from "@material-ui/core/Avatar";
import { distanceBetweenCoordinates } from "../../../helpers/convertions";

function MyResponses(props) {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(true); //
  const [loaderData, setloaderData] = useState("fetching your data ...");

  const eventLoader = (loaderState, data = false) => {
    console.log("eventLoader", loaderState);
    setLoader(loaderState);
    if (data) setloaderData(data);
  };

  const history = useHistory();

  const viewPost = (orderId) => {
    console.log("click", orderId);
    history.push(`mybookings/id/${orderId}`);
  };
  const chatWithPartner = (orderId, pId, pdet) => {
    console.log("click", orderId, pId);
    history.push(`chat/?ordId=${orderId}&pId=${pId}&pdet=${pdet}`);
  };

  const deleteResponse = async (iD) => {
    console.log("delete id", iD);
    eventLoader(true, "Deleting response...");
    let response = await deleteResponseById(iD);
    if (response) {
      setOrders(orders?.filter((item) => item.responseId !== iD));
      toast.info("Order Deleted Successfully");
      props.deleteResponse(iD);
    } else toast.info("Unable To Delete Order");
    eventLoader(false);
  };

  //compoent didmount and willunMount
  const calculateDistance = async () => {
    let tempResponses = props?.responses;
    for (let i = 0; i < tempResponses?.length; i++) {
      const element = tempResponses[i];
      tempResponses[i].distance = distanceBetweenCoordinates(
        element.loc[0],
        element.loc[1],
        element?.orderDetails?.loc?.coordinates[0],
        element?.orderDetails?.loc?.coordinates[1]
      );
      // setOrders(tempResponses);
      if (i === tempResponses?.length - 1) {
        setOrders(tempResponses);
      }
    }

    // tempResponses.distance = distanceBetweenCoordinates(tempResponses)
  };
  useEffect(() => {
    console.log("use effect prop", props.responses);
    setOrders(props.responses);
    eventLoader(false);
    calculateDistance();
  }, [props.responses]);
  const acceptResp = (id) => {
    console.log("accept", id);
    props.acceptResponse(id);
  };
  const rejectResp = (id) => {
    console.log("reject", id);
    props.rejectResponse(id);
  };
  return (
    <div>
      {loader === false && orders?.length === 0 ? (
        <FullScreenWidget
          type="noDataPlaceHolder"
          show={true}
          data="You have no data here"
        />
      ) : null}
      <FullScreenWidget type="loader" show={loader} data={loaderData} />

      {orders?.length > 0 ? (
        <div style={{ paddingTop: "30px" }}>
          {orders
            .slice(0)
            .reverse()
            .map((cap, key) => (
              <div className="cardDiv" key={cap?._id} id={cap?._id}>
                {ResponseCard(
                  cap,
                  key,
                  viewPost,
                  deleteResponse,
                  chatWithPartner,
                  acceptResp,
                  rejectResp
                )}
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

function ResponseCard(
  cap,
  key,
  viewPost,
  deleteResponse,
  chatWithPartner,
  acceptResp,
  rejectResp
) {
  // const [distance, setdistance] = useState(null);
  return (
    <div className="responseCard">
      <div className="card-title">
        <p>
          <BiTimeFive size="1.4rem" style={{ marginRight: "15px" }} />{" "}
          {`${gettbystamps(Number(cap?.join), "fulldate")} 
                    ${gettbystamps(Number(cap?.join), "time")}`}
        </p>
        <h2>{cap?.orderDetails?.problem}</h2>
        <DotMenu
          className="dotMenu"
          cap={cap}
          key={key}
          viewPost={viewPost}
          deleteResp={deleteResponse}
          onChat={chatWithPartner}
        />
      </div>
      <div className="card-body">
        <div className="pic">
          <img
            src={cap?.pDetails?.partnerPic}
            alt="profile"
            className="profile"
          />
          <div className="btn-div">
            <p
              className="sub-btn pointer"
              onClick={() => {
                acceptResp(cap?.responseId);
              }}
            >
              <MdCheck />
            </p>
            <p
              className="dec-btn pointer"
              onClick={() => {
                rejectResp(cap?.responseId);
              }}
            >
              <MdClose />
            </p>
          </div>
        </div>
        <div className="rest-body">
          <h3>{cap?.pDetails?.name}</h3>
          <div className="p-div">
            <p>
              {" "}
              <b> Money: &#8377; {cap?.money}</b>
            </p>
            <p>
              <b>Location: vizag</b>
            </p>
          </div>
          <div className="p-div">
            <p>
              {" "}
              <b>{`Distance: ${cap.distance}  km`}</b>
            </p>
            <p>
              {" "}
              <b>
                {" "}
                Schedule: {gettbystamps(Number(cap?.schedule), "fulldate")}{" "}
                &nbsp;
                {gettbystamps(Number(cap?.schedule), "time")}
              </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DotMenu({ cap, deleteResp, viewPost, onChat }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modal, setModal] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
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
    <div id={cap?.ordId}>
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
        <MenuItem
          onClick={() => {
            onChat(cap?.ordId, cap?.pId, cap?.pDetails?._id);
          }}
        >
          Chat with Partner{" "}
        </MenuItem>
        <MenuItem>Call Partner</MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            deleteResp(cap?.responseId);
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
            <div
            //  className={classes.root}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <div className={classes.centerDiv}>
                    <Avatar
                      alt="Remy Sharp"
                      src={cap?.pDetails?.partnerPic}
                      className={classes?.partnerPic}
                      // className="partnerPic"
                    />
                    <h3>{cap?.pDetails?.name}</h3>
                    <div className="partnerThings">
                      <p>online</p>
                      <p>5 stars</p>
                      <p>vizag</p>
                    </div>
                  </div>
                </Grid>
                <div className="otherDetails">
                  <div className="miniCards">
                    <p>{cap?.pDetails?.phNum}</p>
                  </div>
                  <div className="miniCards">
                    <p>{cap?.pDetails?.eMail}</p>
                  </div>
                  <div className="miniCards">
                    <p>{cap?.pDetails?.businessName}</p>
                  </div>
                  <div className="miniCards">
                    <p>{cap?.pDetails?.lang[0]}</p>
                    <p>{cap?.pDetails?.lang[1]}</p>
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
    userDetails: state?.userDetails,
    responses: state?.responses,
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
    acceptResponse: (responseId) => {
      dispatch({ type: "ACCEPT_RESPONSE", value: responseId });
    },
    rejectResponse: (responseId) => {
      dispatch({ type: "REJECT_RESPONSE", value: responseId });
    },
  };
};
// export default MyResponses;
export default connect(mapStateToProps, mapDispatchToProps)(MyResponses);
