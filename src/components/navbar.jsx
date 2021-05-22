import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavDropdown, Navbar, Nav, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import "../navbar.css";
import firebase from "../firebase";
import { useHistory } from "react-router-dom";
import SmLogo from "../images/l3 - Copy.svg";

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
// import { IoMdContacts } from 'react-icons/io'
import { BiLogOutCircle } from "react-icons/bi";

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log("user login");
    // document.querySelector('.userhere').innerHTML=""
    username = "sekhar";
    document.querySelector(".userhere").style.display = "block";
    document.querySelector("#mychats").style.display = "block";
    document.querySelector("#mybooks").style.display = "block";
    document.getElementById("signup").style.display = "none";
    document.querySelector(".userdp").style.display = "block";
  } else {
    console.log("user not login");
    document.querySelector(".userhere").style.display = "none";
    document.querySelector("#mychats").style.display = "none";
    document.querySelector("#mybooks").style.display = "none";
    document.querySelector(".userdp").style.display = "none";
    document.getElementById("signup").style.display = "block";
  }
});

const db = firebase.firestore();
var username = "username";
var app;

function Navibar() {
  const [name, setName] = useState("undefined");
  const [pic, setpic] = useState(
    "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
  );
  // const [isOpen, setIsOpen] = useState();
  const history = useHistory();

  // const toggleNavbar = () => {
  //   isOpen = isNavBarOpen; //fixes next time route change where isOpen=true
  //   isOpen = !isOpen; //fixes initial delay in calling setState(), where clicking first time didn't open NavBar
  //   setIsOpen({
  //     isOpen: isOpen,
  //   });
  //   let isNavBarOpen = isOpen;
  // };

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .onSnapshot((snap) => {
          if (!snap.data()) setName("demouser");
          else {
            setName(snap.data().name);
            setpic(snap.data().pic);
          }
          // setName(snap.data().name)
        });
    }
  });

  async function userlogout() {
    await firebase
      .auth()
      .signOut()
      .then(function () {
        //alert("logout successfully")
        history.push("/");
        setTimeout(() => {}, 1000);
        window.location.reload();
      });
    // window.location.reload();
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
                  {/* <h2>Spotmies</h2> */}
                </Navbar.Brand>
              </Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse
                // onClick={toggleNavbar}
                id="responsive-navbar-nav"
              >
                <Nav className="mr-auto"></Nav>
                <Nav
                  className="nav-linkList"
                  style={{ color: "black", display: "inline-flex" }}
                >
                  <Link className="nav-links" to="/rentals">
                    <Nav className="chaticon" id="mybooks">
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
                      <MdChatBubble className="chaticon2" /> <b>Chat</b>
                    </Nav>
                  </Link>
                  <Link className="nav-links" to="/contact">
                    <Nav className="chaticon" id="contact">
                      <MdEmail size="1.3rem" className="chaticon2" />
                      <b> Contact</b>
                    </Nav>
                  </Link>

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
                        display: "none",
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
                    {/* <Menu /> */}
                  </div>
                  <Link className="nav-links" to="/signup">
                    <Nav className="chaticon" id="signup">
                      <MdAccountCircle className="chaticon2" />
                      <b> Signup/Login</b>
                    </Nav>
                  </Link>
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
  // <div className="spacediv">

  // </div>
}
export default Navibar;
