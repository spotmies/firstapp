import React from "react";
import firebase from "../../../firebase";
import { useState, useEffect } from "react";
import {
  Card,
  Image,
  Label,
  Dropdown,
  Icon,
  Segment,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import "../../../index.css";
import "../../../post.css";
import { gettbystamps } from "../../../helpers/dateconv";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
//import icons
import { BsEyeFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { RiPinDistanceFill } from "react-icons/ri";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdCheckCircle } from "react-icons/md";

const db = firebase.firestore();

function useTimes() {
  const [times, setTimes] = useState([]);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        db.collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("adpost")
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
  // console.log(times[0].media)
  return (
    <div className="responses">
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

  const edit = (prop) => {
    console.log("click", prop);
    history.push(`mybookings/id/edit/${prop}`);
  };
  const delpost = (pro) => {
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("adpost")
      .doc(pro)
      .delete()
      .then(() => {
        toast.success("ad deleted succefully");
      });
  };
  return (
    <div>
      {props.data.length == 0 ? (
        <Card.Group>
          <Card centered fluid id="book-card">
            <Card.Content>
              <Card.Meta style={{ display: "inline-flex" }}>
                <Icon name="time" />{" "}
              </Card.Meta>
              <Dropdown
                item
                icon="ellipsis horizontal"
                simple
                style={{ float: "right" }}
              ></Dropdown>
            </Card.Content>
            <Card.Content
              extra
              style={{ display: "inline-block", cursor: "pointer" }}
            >
              <Segment className="post-img">
                <Dimmer active inverted>
                  <Loader size="large">Loading</Loader>
                </Dimmer>

                <Image src="/images/wireframe/paragraph.png" />
              </Segment>
            </Card.Content>
          </Card>
        </Card.Group>
      ) : (
        <Sematiccard data={props.data} />
      )}
    </div>
  );
}

function Sematiccard(props) {
  const history = useHistory();
  const click = (prop) => {
    console.log("click", prop);
    history.push(`mybookings/id/${prop}`);
  };

  const edit = (prop) => {
    console.log("click", prop);
    history.push(`mybookings/id/edit/${prop}`);
  };
  const delpost = (pro) => {
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .collection("adpost")
      .doc(pro)
      .delete()
      .then(() => {
        alert("ad deleted succefully");
        toast.success("ad deleted succefully");
      });
  };

  return (
    <div style={{ paddingTop: "30px" }}>
      {props.data.map((cap, key) => (
        <Card.Group>
          <Card centered fluid id="book-card">
            <Card.Content>
              <Card.Meta style={{ display: "inline-flex" }}>
                <Icon name="time" />{" "}
                {gettbystamps(Number(cap.posttime), "fulldate")} &nbsp;@&nbsp;
                <b> {gettbystamps(Number(cap.posttime), "time")}</b>
              </Card.Meta>
              <Dropdown
                item
                icon="ellipsis horizontal"
                simple
                style={{ float: "right" }}
              >
                <Dropdown.Menu>
                  <Dropdown.Item onClick={(e) => click(cap.id)}>
                    View post
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e) => edit(cap.orderid)}>
                    Edit post
                  </Dropdown.Item>
                  <Dropdown.Item onClick={(e) => delpost(cap.orderid)}>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Card.Content>
            <Card.Content
              extra
              style={{ display: "inline-block", cursor: "pointer" }}
              onClick={(e) => click(cap.id)}
            >
              <Image
                className="post-img"
                style={{ borderRadius: "1rem", cursor: "pointer" }}
                floated="left"
                src={cap.media[0]}
              />

              <Card.Header style={{ paddingBottom: "10px", cursor: "pointer" }}>
                {cap.problem}
              </Card.Header>
              <div style={{ display: "inline-flex" }}>
                <div style={{ paddingRight: "30px" }}>
                  <p>
                    <BsEyeFill /> Views: {cap.views}
                  </p>
                  <p>
                    <RiPinDistanceFill /> Distance: 1km
                  </p>
                </div>
                <div>
                  {String(cap.money) != "NaN" ? (
                    <p>
                      <HiOutlineCurrencyRupee /> Money: &#8377;{cap.money}
                    </p>
                  ) : (
                    <p>
                      <HiOutlineCurrencyRupee /> Money: &#8377;--
                    </p>
                  )}

                  <p>
                    <BiTimeFive /> Time: 1hr
                  </p>
                </div>
              </div>
            </Card.Content>
            <Card.Content style={{ display: "inline-flex" }}>
              <p onClick={(e) => click(cap.id)} style={{ cursor: "pointer" }}>
                <BsEyeFill size="1.5rem" />
                <u>
                  {" "}
                  <b>View post</b>
                </u>
              </p>
              {cap.orderstate == 2 ? (
                <Label
                  color="green"
                  attached="bottom right"
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    borderRadius: "0.7rem",
                  }}
                >
                  <MdCheckCircle /> Completed
                </Label>
              ) : (
                <Label
                  color="blue"
                  attached="bottom right"
                  style={{
                    marginRight: "10px",
                    marginBottom: "10px",
                    borderRadius: "0.7rem",
                  }}
                >
                  Active
                </Label>
              )}
            </Card.Content>
          </Card>
        </Card.Group>
      ))}
    </div>
  );
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
  }
});
