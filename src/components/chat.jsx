import React from "react";
import firebase from "../firebase";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { Button, Card, Image, Dropdown, Icon } from "semantic-ui-react";
import "../index.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

//import icons

import {
  MdStar,
  MdChatBubble,
  MdFeaturedPlayList,
  MdCheckCircle,
  MdCancel,
} from "react-icons/md";

const db = firebase.firestore();

async function useTimes() {
  const [times, setTimes] = useState([]);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        db.collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("response")
          .onSnapshot((snap) => {
            const newtimes = snap.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setTimes(newtimes);
          });
      }
    });
  }, []);
  return times;
}
const Sekhar = () => {
  const times = useTimes();
  console.log(times);
  return (
    <div className="responses">
      <Headings />
      <Mybookings data={times} />
    </div>
  );
};

export default Sekhar;

function Mybookings(props) {
  const history = useHistory();

  const click = (prop) => {
    console.log("click", prop);
    history.push(`mybookings/id/${prop}`);
  };
  const pdet = (prop) => {
    history.push(`pdetails/${prop}`);
  };
  const click2 = (prope) => {
    console.log("click2", prope);
    db.collection("messaging")
      .doc(prope)
      .update({
        chatbuild: true,
        userid: firebase.auth().currentUser.uid,
        uname: uname,
        upic: upic,
      })
      .then(() => {
        // alert("go to chat for make a conversation")
        history.push("chats-section");
      });
  };
  const delpost = (pro) => {
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("response")
      .doc(pro)
      .delete()
      .then(() => {
        //  alert("response deleted succefully");
        toast.info("response deleted succefully");
      });
  };

  return (
    <div>
      {props.data.length > 0
        ? props.data.map((cap) => (
            <div id={cap.id} style={{ marginLeft: "22%" }}>
              <Card.Group>
                <Card
                  color="blue"
                  style={{
                    width: "80%",
                    borderRadius: "1.5rem",
                    backgroundColor: "#F9F9F9",
                  }}
                >
                  <Card.Content>
                    <Card.Meta style={{ display: "inline-flex" }}>
                      <Icon name="time" />{" "}
                      {String(cap.time.toDate()).replace(
                        "GMT+0530 (India Standard Time)",
                        ""
                      )}
                    </Card.Meta>

                    <Dropdown
                      item
                      icon="ellipsis horizontal"
                      backgroundColor="white"
                      simple
                      style={{ float: "right" }}
                      color="white"
                    >
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={(e) => pdet(cap.partnerid)}>
                          Technician details
                        </Dropdown.Item>
                        <Dropdown.Item onClick={(e) => click2(cap.msgid)}>
                          chat with partner
                        </Dropdown.Item>
                        <Dropdown.Item onClick={(e) => click(cap.orderid)}>
                          view job
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={(e) => delpost(cap.id)}>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Card.Content>
                  <Card.Content>
                    <Image
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "1rem",
                        cursor: "pointer",
                      }}
                      floated="left"
                      size="mini"
                      src={cap.ppic}
                    />
                    <Card.Header>
                      <u>{cap.pname}</u>
                    </Card.Header>
                    <Card.Meta>
                      <small>computer</small> | <small>4.5</small>
                      <MdStar color="gold" />
                    </Card.Meta>
                    <div
                      style={{
                        display: "inline-flex",
                        fontSize: "22px",
                        paddingLeft: "15%",
                      }}
                    >
                      <p>
                        {" "}
                        Money: <strong>&#8377; {cap.pmoney}</strong>{" "}
                      </p>
                      <p style={{ marginLeft: "30px" }}>
                        Away: <strong> 1km</strong>
                      </p>
                    </div>
                  </Card.Content>
                  <Card.Content extra>
                    <div>
                      <Button color="blue">
                        Aprove <MdCheckCircle />
                      </Button>
                      <Button
                        onClick={(e) => delpost(cap.id)}
                        color="gray"
                        floated="right"
                        style={{ display: "inline-flex" }}
                      >
                        Decline <MdCancel />
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
              </Card.Group>
            </div>
          ))
        : null}
    </div>
  );
}

function Headings() {
  return (
    <div
      style={{
        display: "inline-flex",
        background: "#f6f6f6",
        color: "white",
        width: "100%",
        height: "70px",
        paddingTop: "28px",
        marginTop: "-20px",
        marginBottom: "30px",
      }}
    >
      <Row style={{ width: "100%", textAlign: "center" }}>
        <Col style={{ borderBottom: "3px solid #007bff", marginBottom: "0" }}>
          <Link to="/chat" style={{ color: "#007bff", textDecoration: "none" }}>
            <h2>
              <MdFeaturedPlayList size="2.1rem" color="#007bff" /> Responses
            </h2>
          </Link>
        </Col>
        <Col>
          <Link
            to="/chats-section"
            style={{ color: "gray", textDecoration: "none" }}
          >
            <h2>
              <MdChatBubble size="2.1rem" color="gray" /> Chats
            </h2>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

var uname;
var upic;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snap) => {
        if (snap.data()) {
          uname = snap.data().name;
          upic = snap.data().pic;
        }
      });
  }
});
