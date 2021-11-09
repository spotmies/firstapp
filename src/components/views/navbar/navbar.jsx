import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavDropdown, Navbar, Nav, Container } from "react-bootstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import { toast } from "react-toastify";
import "./navbar.css";
import firebase from "../../../firebase";
import { useHistory } from "react-router-dom";
import Lottie from "lottie-web";
import animationData from "../../../images/spotmies_logo.json";
// import SmLogo from "../../../images/logo.svg";
import SmLogo from "../../../images/spotmies_logo2.png";

// import SmLogo from "../../../images/sm3dlogo.svg";

import { connect } from "react-redux";
import { validURL } from "../../../helpers/dateconv";
import { loadState } from "../../../helpers/localStorage";
import { getUserOrders } from "../../controllers/new_post/order_controller";
import { loginUser } from "../../controllers/login/login_controller";
//react icons
import { IconContext } from "react-icons";
import {
  MdAccountCircle,
  MdSettings,
  MdChatBubble,
  MdWork,
  MdAddCircle,
  MdEmail,
} from "react-icons/md";

import { BiLogOutCircle } from "react-icons/bi";
import { FaCarAlt, FaGraduationCap } from "react-icons/fa";
// import { fa } from "react-icons/fa";
import io from "socket.io-client";
import constants from "../../../helpers/constants";
import { getResponses } from "../../controllers/responses/responses_controller";
import { getConversasions } from "../../controllers/chat/chat_controller";
import LabelBottomNavigation from "./bottom_navigation";
function Navibar(props) {
  const [name, setName] = useState("user name");
  const [pic, setpic] = useState(undefined);
  const [isLogged, setisLogged] = useState(false);

  const history = useHistory();
  useEffect(() => {
    console.log("loader state", props.loader);
  }, [props.loader]);
  const socket = io.connect(
    constants.constants.localBacked
      ? constants.localHostSocketUrl
      : constants.socketUrl,
    {
      transports: ["websocket", "polling", "flashsocket"],
    }
  );

  const hitAllApis = async () => {
    firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        console.log("hitting all apis");
        let userId = firebase.auth().currentUser.uid;
        let userResponses = await getResponses(userId);
        console.log(userResponses);
        let userChats = await getConversasions(userId);
        console.log(userChats);
        let userOrders = await getUserOrders(userId);
        props.updateAllOrders(userOrders);
        props.updateAllChats(userChats);
        props.updateAllResponses(userResponses);
        props.enableBottomBar(true);
      }
    });
  };
  useEffect(() => {
    console.log("started ..");

    socket.on("connect", (socket) => {
      console.log("user connected ...");
    });
    socket.on("newResponse", (doc) => {
      console.log("new resp nav", doc);
      props.addNewResponse(doc);
      toast.info("new response came");
    });
    socket.on("recieveNewMessage", (data) => {
      console.log("recived msg >>", data);
      props.addNewMessage(data);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected>>>");
    });
    hitAllApis();
  }, [constants.localHostSocketUrl, constants.socketUrl]);

  const sendMessageThroghtSocket = () => {
    let queue = props.getMessageQueue;
    if (!props.readyToSendMessage || queue.length < 1) {
      console.log("already in progress >>>>>>>>>>>>>..");
      return;
    }
    console.log("msg queue>>>>>>>>>>", queue);
    props.readyToSend(false);
    queue.forEach((element, key) => {
      socket.emit(
        "sendNewMessageCallback",
        element,
        (response) => {
          console.log(response, element.object);
          if (response === "success") {
            props.removeMessageFromQueue(element);
            if (key == queue.length - 1) {
              props.readyToSend(true);

              console.log("queue completed");
            }
          }
        } // ok
      );
    });
  };
  useEffect(() => {
    sendMessageThroghtSocket();
    // let refreshIntervalId = setInterval(sendMessageThroghtSocket(), 3000);

    //   if(props.getMessageQueue.length <1)clearInterval(refreshIntervalId);
  }, [props.getMessageQueue, props.sendRemaingMessages]);

  firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      socket.emit(
        "join-room",
        firebase.auth().currentUser.uid,
        function (confirmation) {
          console.log(confirmation, "join rome>>");
        }
      );

      if (Object.keys(props.userDetails).length === 0) {
        let localUserDetails = loadState("userDetails");
        if (localUserDetails !== null) props.updateUser(localUserDetails);

        let newLoginResponse = await loginUser(firebase.auth().currentUser.uid);
        if (newLoginResponse !== false) props.updateUser(newLoginResponse);

        let localOrders = loadState("orders");
        if (localOrders !== null) props.updateAllOrders(localOrders);
        else {
          let apiOrders = await getUserOrders(firebase.auth().currentUser.uid);

          props.updateAllOrders(apiOrders);
        }
      }

      setName(props.userDetails.name);
      setpic(props.userDetails.pic);
      setisLogged(true);
    } else {
      setisLogged(false);
    }
  });

  async function userlogout() {
    await firebase
      .auth()
      .signOut()
      .then(function () {
        localStorage.removeItem("userDetails");
        localStorage.removeItem("orders");
        history.push("/");
        setTimeout(() => {}, 1000);
        window.location.reload();
      });
  }

  return (
    <div style={{ paddingBottom: "80px" }}>
      <header style={{ zIndex: "9999" }} className="navi-bar">
        <Container>
          <Navbar collapseOnSelect expand="lg" variant="light">
            <IconContext.Provider
              value={{ size: "1.5em", className: "nav-icons" }}
            >
              <Link to="/">
                {/* <Navbar.Brand className="title">
                  <img src={SmLogo} />
                  <div>
                    <h2 className="navbar-title">SPOTMIES</h2>
                    <p>Experience the Excellence</p>
                  </div>
                </Navbar.Brand> */}
                <div className="logo-banner">
                  <img src={SmLogo} className="navbar-logo" />
                  <div className="nav-tag-title">
                    <h1 className="navbar-title">SPOTMIES</h1>
                    <p className="tag-line">Experience the Excellence</p>
                  </div>
                </div>
              </Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse
                id="responsive-navbar-nav"
                className="justify-content-end"
              >
                <Nav className="mr-auto"></Nav>
                <Nav
                  className="nav-linkList"
                  style={{ color: "black", display: "inline-flex" }}
                >
                  <Link className="nav-links" to="/careers">
                    <Nav className="chaticon" id="mybooks">
                      <FaGraduationCap className="chaticon2" />
                      <b>Careers</b>
                    </Nav>
                  </Link>
                  {isLogged ? (
                    <>
                      {/* <Link className="nav-links" to="/rentals">
                        <Nav className="chaticon" id="mybooks">
                          <FaCarAlt className="chaticon2" />
                          <b>Rentals</b>
                        </Nav>
                      </Link> */}

                      <Link className="nav-links" to="/mybookings">
                        <Nav
                          className="chaticon"
                          id="mybooks"
                          style={{
                            display: name === "undefined" ? "none" : "block",
                          }}
                        >
                          <MdWork className="chaticon2" />
                          <b>My Bookings</b>
                        </Nav>
                      </Link>
                      <Link className="nav-links" to="/chat">
                        <Nav className="chaticon" id="mychats">
                          <MdChatBubble className="chaticon2" />
                          <b>Chat</b>
                        </Nav>
                      </Link>
                    </>
                  ) : null}

                  <Link className="nav-links" to="/contact">
                    <Nav className="chaticon" id="contact">
                      <MdEmail size="1.3rem" className="chaticon2" />
                      <b>Contact</b>
                    </Nav>
                  </Link>
                  {isLogged ? (
                    <div
                      className="nav-links"
                      style={{
                        display: "inline-flex",
                        color: "black",
                        marginRight: "0",
                      }}
                    >
                      <span>
                        {validURL(pic) ? (
                          <img
                            alt="noting"
                            src={pic}
                            className="userdp"
                            style={{
                              height: "20px",
                              width: "20px",
                              borderRadius: "1rem",
                              marginTop: "10px",
                              marginLeft: "6px",
                            }}
                          />
                        ) : (
                          <MdAccountCircle style={{ marginTop: "10px" }} />
                        )}
                      </span>
                      <NavDropdown
                        title={name}
                        style={{ marginTop: "3px" }}
                        variant="dark"
                        id="collapsible-nav-dropdown"
                        className="userhere"
                        active
                      >
                        <Link to="/account">
                          <NavDropdown.Item href="#action/3">
                            <MdAccountCircle color="gray" size="1.5em" />
                            <b> Account</b>{" "}
                          </NavDropdown.Item>
                        </Link>
                        <Link to="/mybookings">
                          <NavDropdown.Item href="#action/3.1">
                            <MdWork color="gray" size="1.5em" />
                            <b> My Bookings</b>
                          </NavDropdown.Item>
                        </Link>
                        <Link to="/chat">
                          <NavDropdown.Item href="#action/3.2">
                            <MdChatBubble color="gray" size="1.5em" />
                            <b> Chats</b>
                          </NavDropdown.Item>
                        </Link>
                        <Link to="/account">
                          <NavDropdown.Item href="#action/3.3">
                            <MdSettings color="gray" size="1.5em" />
                            <b> Settings</b>
                          </NavDropdown.Item>
                        </Link>
                        <Link to="/newpost">
                          <NavDropdown.Item href="#action/3.4">
                            <MdAddCircle color="gray" size="1.5em" />
                            <b> Get Service</b>
                          </NavDropdown.Item>
                        </Link>

                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={userlogout}>
                          <BiLogOutCircle
                            className="chaticon2"
                            color="gray"
                            size="1.3em"
                          />{" "}
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  ) : null}
                  {isLogged === false ? (
                    <Link className="nav-links" to="/signup">
                      <Nav className="chaticon" id="signup">
                        <MdAccountCircle className="chaticon2" />
                        <b> Signup/Login</b>
                      </Nav>
                    </Link>
                  ) : null}
                  <Link className="nav-links" to="/newpost">
                    {" "}
                    <Nav className="chaticon">
                      <MdAddCircle size="1.4rem" className="chaticon2" />
                      <b>Get Service</b>
                    </Nav>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </IconContext.Provider>
          </Navbar>
        </Container>
      </header>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    isUserLogin: state.isUserLogin,
    loader: state.universalLoader,
    disableBottomBar: state.disableBottomBar,
    getMessageQueue: state.sendMessageQueue,
    readyToSendMessage: state.readyToSendMessage,
    sendRemaingMessages: state.sendRemaingMessages,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewResponse: (data) => {
      dispatch({ type: "ADD_NEW_RESPONSE", value: data });
    },
    addNewMessage: (data) => {
      dispatch({ type: "ADD_NEW_MESSAGE", value: data });
    },
    updateAllResponses: (data) => {
      dispatch({ type: "UPDATE_ALL_RESPONSES", value: data });
    },
    updateAllChats: (data) => {
      dispatch({ type: "UPDATE_ALL_CHATS", value: data });
    },
    updateUser: (data) => {
      dispatch({ type: "UPDATE_USER_DETAILS", value: data });
    },
    updateAllOrders: (data) => {
      dispatch({ type: "UPDATE_ALL_ORDERS", value: data });
    },
    enableBottomBar: (data) => {
      dispatch({ type: "DISABLE_BOTTOM_BAR", value: !data });
    },
    removeMessageFromQueue: (data) => {
      dispatch({ type: "REMOVE_MESSAGE_FROM_QUEUE", value: data });
    },
    readyToSend: (data) => {
      dispatch({ type: "READY_TO_SEND_MESSAGE", value: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navibar);
