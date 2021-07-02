import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { Card } from "semantic-ui-react";
import firebase from "../../../firebase";
import { createHashHistory } from "history";
import "../../../index.css";
import { toast } from "react-toastify";
import ComingSoon from "../../reusable/coming_soon_widget";

//import icons
import {
  MdAccountCircle,
  MdSmartphone,
  MdHttps,
  MdTagFaces,
} from "react-icons/md";

const db = firebase.firestore();
var usrno;
const history = createHashHistory();

export default class signup extends Component {
  render() {
    return (
      <>
        <ComingSoon />

        <div className="signupform">
          <Card centered color="blue" style={{ width: "400px" }}>
            <Card.Content>
              <Card.Header>
                <MdAccountCircle size="2rem" />
                <u>Signup or Login</u>
              </Card.Header>
            </Card.Content>
            <Card.Content extra>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>
                    <MdSmartphone />
                    <b>Enter your Mobile number</b>
                  </Form.Label>
                  <Form.Control
                    type="phone"
                    placeholder="phone number"
                    id="phno"
                    required
                  />
                </Form.Group>
                <Button variant="outline-info" type="button" onClick={genotp}>
                  Get Otp
                </Button>
                <div
                  id="recaptcha-container"
                  style={{ marginTop: "10px" }}
                ></div>

                <Form.Group
                  controlId="formBasicPassword"
                  id="otpdiv"
                  style={{ marginTop: "10px", display: "none" }}
                >
                  <Form.Label>
                    <MdHttps />
                    <b>Enter otp here</b>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="OTP"
                    id="otp"
                    required
                  />
                  <br />
                  <Button
                    variant="outline-info"
                    type="button"
                    onClick={vrfyotp}
                  >
                    Verify
                  </Button>
                </Form.Group>

                <Form.Group
                  controlId="username"
                  style={{ display: "none" }}
                  className="username"
                >
                  <Form.Label>
                    <MdTagFaces />
                    <b>Enter your name here</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="sweetname here"
                    id="username"
                    required
                  />
                </Form.Group>

                <Button
                  variant="outline-info"
                  type="button"
                  onClick={rgstusr}
                  style={{ display: "none" }}
                  className="signsub"
                >
                  Submit
                </Button>
              </Form>
            </Card.Content>
          </Card>
        </div>
      </>
    );
  }
}

function genotp(e) {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container"
  );
  const phno = "+91" + document.getElementById("phno").value;
  console.log(phno);
  firebase
    .auth()
    .signInWithPhoneNumber(phno, window.recaptchaVerifier)
    .then(function (confirmationResult) {
      window.confirmationResult = confirmationResult;
      console.log(confirmationResult);
      document.querySelector("#recaptcha-container").style.display = "none";
      document.querySelector("#otpdiv").style.display = "block";
    })
    .catch(function (error) {
      // alert(error)
      toast.error(error);
    });
}

function vrfyotp(e) {
  const otp = document.getElementById("otp");
  if (otp.value === "") toast.error("Please enter valid OTP");
  window.confirmationResult
    .confirm(otp.value)
    .then(function (result) {
      usrno = document.getElementById("phno").value;
      console.log(result);
      var doc = db.collection("users").doc(firebase.auth().currentUser.uid);
      doc
        .get()
        .then((docData) => {
          if (docData.exists) {
            // document exists (online/offline)
            console.log("document exist");
            history.go(-1);
          } else {
            // document does not exist (only on online)
            console.log("document not exist");
            document.querySelector(".username").style.display = "block";
            document.querySelector(".signsub").style.display = "block";
          }
        })
        .catch((fail) => {
          console.log("error while reading document");
        });
    })
    .catch((err) => {
      console.log(err);
      toast.error(err.code);
    });
}

function rgstusr(e) {
  e.preventDefault();

  let name = document.getElementById("username").value;
  let userid = firebase.auth().currentUser.uid;
  if (name) {
    db.collection("users")
      .doc(userid)
      .set({
        name: name,
        phone: usrno,
        email: "",
        pic: "https://www.sunsetlearning.com/wp-content/uploads/2019/09/User-Icon-Grey-300x300.png",
        altnum: "",
      })
      .then(() => {
        history.go(-1);
      });
  } else {
    toast.warning("Please enter your name");
  }
}
