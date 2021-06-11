import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavDropdown, Navbar, Nav, Container } from "react-bootstrap";
import "./navbar.css";
import firebase from "../../../firebase";
import { useHistory } from "react-router-dom";
import SmLogo from "../../../images/logo.svg";
import {connect} from "react-redux";

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
import { FaCarAlt } from "react-icons/fa";

const db = firebase.firestore();

function Navibar() {
  const [name, setName] = useState("undefined");
  const [pic, setpic] = useState(
    "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
  );
  const [isLogged, setisLogged] = useState(false);

  const history = useHistory();

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setisLogged(true);
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snap) => {
          if (!snap.data()) setName("demouser");
          else {
            setName(snap.data().name);
            setpic(snap.data().pic);
          }
        });
    } else {
      setisLogged(false);
    }
  });

  async function userlogout() {
    await firebase
      .auth()
      .signOut()
      .then(function () {
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
                <Navbar.Brand className="title">
                  <img src={SmLogo} />
                  <h2>SPOTMIES</h2>
                </Navbar.Brand>
              </Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto"></Nav>
                <Nav
                  className="nav-linkList"
                  style={{ color: "black", display: "inline-flex"}}
                >
                  {isLogged ? (
                    <>
                      <Link className="nav-links" to="/rentals">
                        <Nav className="chaticon" id="mybooks">
                          <FaCarAlt className="chaticon2" />
                          <b>Rentals</b>
                        </Nav>
                      </Link>
                      <Link className="nav-links" to="/mybookings">
                        <Nav
                          className="chaticon"
                          id="mybooks"
                          style={{
                            display: name == "undefined" ? "none" : "block",
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
                      <img
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
                  {isLogged == false ? (
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
export default Navibar;
