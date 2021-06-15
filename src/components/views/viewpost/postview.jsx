import React from "react";
import firebase from "../../../firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import {
  Card,
  Icon,
  Dropdown,
  Label,
  Step,
  Button,
  Rating,
} from "semantic-ui-react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FullScreenWidget from "../../reusable/helpers";

import {
  MdLocationOn,
  MdWatchLater,
  MdCheckCircle,
  MdAssignmentTurnedIn,
  MdBuild,
  MdThumbDown,
  MdAccountCircle,
  MdSmartphone,
  MdPhone,
  MdEmail,
} from "react-icons/md";
import { RiUserSettingsFill, RiTimeFill } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import "../../../assets/css/postView.css";
import { categoryAssign } from "../../../helpers/categories";
import { gettbystamps } from "../../../helpers/dateconv";
import { connect } from "react-redux";
import { loadState } from "../../../helpers/localStorage";
import { deleteOrderById } from "../../controllers/new_post/order_controller";

const db = firebase.firestore();

function useTimes() {
  const [postdata, setdata] = useState([]);
  const [posttime, setposttime] = useState([]);
  useEffect(() => {
    //
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        let arr = [];

        var personId;

        personId = window.location.pathname;
        personId = personId.replace("/mybookings/id/", "");
        db.collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("adpost")
          .doc(personId)
          .onSnapshot((snap) => {
            setdata(snap.data());
            setposttime(arr);
          });
      }
    });
    //
  }, []);
  return { postdata, posttime };
}

function ViewPost(props) {
  const history = useHistory();
  // const { postdata, posttime } = useTimes();
  const [postdata, setPostData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [loaderData, setloaderData] = useState("fetching your order ...");
  const eventLoader = (loaderState, data = false) => {
    setLoader(loaderState);
    if (data) setloaderData(data);
  };

  const getOrder = async () => {
    let ordId = window.location.pathname;
    ordId = ordId.replace("/mybookings/id/", "");
    let orders = props.orders.length > 0 ? props.orders : loadState("orders");
    let order = orders.filter((item) => item.ordId == ordId);
    console.log(order);
    if (order.length > 0) setPostData(order[0]);
    eventLoader(false);
  };

  useEffect(() => {
    getOrder();
  }, [postdata == null]);

  const click = (prop) => {
    // console.log("click", prop);
    // history.push(`edit/${prop}`);
  };
  const delpost = async (ordId) => {
    eventLoader(true, "Deleting Order...");
    let response = await deleteOrderById(ordId);
    if (response) {
      props.deleteOrder(ordId);
      toast.info("Order Deleted Successfully");
      history.go(-1);
    } else toast.info("Unable To Delete Order");
    eventLoader(false);
  };

  return (
    <div>
      <FullScreenWidget type="loader" show={loader} data={loaderData} />
      <div>
        {postdata != null ? (
          <div style={{ paddingBottom: "10px" }}>
            <Card
              centered
              color="blue"
              className="wholeCard"
              style={{
                width: "80%",
                marginBottom: "50px",
                borderRadius: "1rem",
              }}
            >
              <Card.Content>
                <Card.Meta style={{ display: "inline-flex" }}>
                  <Icon name="time" />{" "}
                  {gettbystamps(Number(postdata.join), "fulldate")}{" "}
                  &nbsp;@&nbsp;
                  <b> {gettbystamps(Number(postdata.join), "time")}</b>
                </Card.Meta>
                <Dropdown
                  item
                  icon="ellipsis horizontal"
                  simple
                  style={{ float: "right" }}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={(e) => click(postdata.ordId)}>
                      <Icon name="edit" />
                      Edit post
                    </Dropdown.Item>
                    <Dropdown.Item onClick={(e) => delpost(postdata.ordId)}>
                      <Icon name="trash" /> Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Card.Content>
              <Card.Content>
                <Carousel className="postImg">
                  {postdata.media.map((nap) => (
                    <Carousel.Item>
                      <video
                        centered
                        className="postImg"
                        src={nap}
                        poster={nap}
                        autoPlay
                        loop
                      />
                      <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </Card.Content>
              <Card.Content>
                <Card.Header textAlign="center">
                  Title: <u>{postdata.problem}</u>
                </Card.Header>
              </Card.Content>

              <div style={{ marginBottom: "20px" }}>
                <Card.Group
                  className="cardHolder"
                  style={{
                    margin: "0 auto",
                    width: "fit-content",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    className="postCard"
                    style={{ borderRadius: "1rem" }}
                    color="blue"
                  >
                    <Card.Content>
                      <Card.Meta>
                        <Icon name="sticky note" /> Description
                      </Card.Meta>
                      <Card.Description>
                        <h3>{postdata.desc}</h3>
                      </Card.Description>
                    </Card.Content>
                  </Card>

                  <Card
                    className="postCard"
                    style={{ borderRadius: "1rem" }}
                    color="green"
                  >
                    <Card.Content>
                      <Card.Meta>
                        <Icon name="rupee sign" />
                        Price
                      </Card.Meta>
                      {postdata.money != null ? (
                        <h2 style={{ textAlign: "center" }}>
                          <Icon name="rupee sign" />
                          {postdata.money}
                        </h2>
                      ) : (
                        <h2 style={{ textAlign: "center" }}>
                          <Icon name="rupee sign" />-
                        </h2>
                      )}
                    </Card.Content>
                    <Card.Content>
                      {postdata.ordState == 2 ? (
                        <Label
                          color="green"
                          attached="bottom right"
                          size="mini"
                          style={{
                            marginRight: "10px",
                            marginBottom: "2%",
                            borderRadius: "0.5rem",
                          }}
                        >
                          <MdCheckCircle /> Paid
                        </Label>
                      ) : (
                        <Label
                          color="blue"
                          attached="bottom right"
                          size="mini"
                          style={{
                            marginRight: "10px",
                            marginBottom: "2%",
                            borderRadius: "0.5rem",
                          }}
                        >
                          <MdWatchLater /> Not paid
                        </Label>
                      )}
                    </Card.Content>
                  </Card>

                  <Card
                    className="postCard"
                    style={{ borderRadius: "1rem", float: "right" }}
                    color="orange"
                  >
                    <Card.Content>
                      <Card.Meta>
                        <Icon name="info circle" /> Details
                      </Card.Meta>
                    </Card.Content>
                    <Card.Content>
                      <Card.Description>
                        <h4>
                          {" "}
                          <MdLocationOn /> Location: {postdata.location}
                        </h4>
                        <h4>
                          <RiUserSettingsFill /> category :
                          {categoryAssign(postdata.job)}
                        </h4>
                        <h4>
                          <RiTimeFill />
                          posted time:
                          {gettbystamps(Number(postdata.join), "fulldate")}{" "}
                          &nbsp;@&nbsp;
                          <b> {gettbystamps(Number(postdata.join), "time")}</b>
                        </h4>
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </div>

              <Step.Group centered>
                <Step>
                  <MdAssignmentTurnedIn size="2.8rem" />
                  <Step.Content>
                    <Step.Title> Adpost</Step.Title>
                    <Step.Description>
                      @ {gettbystamps(Number(postdata.join), "fulldate")}{" "}
                      &nbsp;@&nbsp;
                      <b> {gettbystamps(Number(postdata.join), "time")}</b>
                    </Step.Description>
                  </Step.Content>
                </Step>
                {postdata.ordState == 2 ? (
                  <Step>
                    <MdBuild size="2.8rem" />
                    <Step.Content>
                      <Step.Title> Service completed</Step.Title>
                      <Step.Description>{postdata.servcmpld}</Step.Description>
                    </Step.Content>
                  </Step>
                ) : (
                  <Step>
                    <MdBuild size="2.8rem" />
                    <Step.Content>
                      <Step.Title> Service pending</Step.Title>
                      <Step.Description>
                        please confirm when service completed
                      </Step.Description>
                    </Step.Content>
                  </Step>
                )}

                {postdata.ordState == 2 ? (
                  <Step completed>
                    <Icon name="info" />
                    <Step.Content>
                      <Step.Title>Order completed</Step.Title>
                    </Step.Content>
                  </Step>
                ) : (
                  <Step>
                    <Icon name="info" />
                    <Step.Content>
                      <Step.Title>Order pending</Step.Title>
                    </Step.Content>
                  </Step>
                )}
              </Step.Group>
              {postdata.ordState != 2 ? (
                <Cnfbtn id={postdata.orderid} />
              ) : (
                <span></span>
              )}

              {postdata.fback == 0 ? <Fback /> : <span></span>}
              {postdata.partnerid ? (
                <Partdetail id={postdata.partnerid} />
              ) : (
                <span></span>
              )}

              <Card.Content extra>
                <a onClick={(e) => click(postdata.orderid)}>
                  <Icon name="edit" />
                </a>
                &nbsp;
                <a onClick={(e) => delpost(postdata.ordId)}>
                  <Icon name="trash" />
                </a>
                {postdata.ordState == 2 ? (
                  <Label
                    color="green"
                    attached="bottom right"
                    style={{
                      marginRight: "10px",
                      marginBottom: "5px",
                      borderRadius: "0.5rem",
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
                      marginBottom: "5px",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <MdWatchLater /> Pending
                  </Label>
                )}
              </Card.Content>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  );
}

class Cnfbtn extends React.Component {
  pending = (e) => {
    console.log(e.target.parentElement.parentElement.id);
    // document.getElementById(
    //   e.target.parentElement.parentElement.id
    // ).style.display = "none";
  };
  completed = (e) => {
    console.log(this.props.id);
  };
  render() {
    return (
      <div id="cnfbutton" className="cnfButton">
        <Button.Group
          style={{
            width: "70%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onClick={this.pending}>
            <MdThumbDown size="1.6rem" /> Pending
          </Button>
          <Button.Or />
          <Button color="blue" onClick={this.completed}>
            <MdCheckCircle size="1.6rem" /> Completed
          </Button>
        </Button.Group>
      </div>
    );
  }
}

class Fback extends React.Component {
  state = {};

  handleRate = (e, { rating, maxRating }) => {
    this.setState({ rating, maxRating });
    console.log(this.state.rating);
  };

  render() {
    return (
      <div style={{ alignContent: "center", textAlign: "center" }}>
        <h3>Please rate the service</h3>
        <Rating
          maxRating={5}
          clearable
          size="massive"
          style={{ width: "30%" }}
          onRate={this.handleRate}
        />
      </div>
    );
  }
}

function Partdetail(props) {
  const [pdata, setpdata] = useState([]);
  console.log(props.id);
  useEffect(() => {
    db.collection("partner")
      .doc(props.id)
      .collection("ProfileInfo")
      .doc(props.id)
      .get()
      .then((snap) => {
        setpdata(snap.data());
      })
      .then(() => {
        console.log(pdata);
      });
  }, []);

  var dhref = "tel: +91 " + pdata.phone;

  return (
    <div style={{ paddingBottom: "50px", paddingTop: "40px" }}>
      <Card
        centered
        color="blue"
        style={{ borderRadius: "1rem", width: "80%" }}
      >
        <Card.Content>
          <Card.Header style={{ textAlign: "center" }}>
            <Card.Meta>
              <MdAccountCircle size="2rem" /> Technician Details
            </Card.Meta>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <img
            src={pdata.profilepic}
            style={{ width: "100%", borderRadius: "1rem", height: "100%" }}
          />
        </Card.Content>
        <Card.Content style={{ textAlign: "center" }}>
          <Card.Header>
            <h2>
              <MdAccountCircle /> {pdata.name}
            </h2>
          </Card.Header>
          <Card.Meta>
            <span>
              <small>
                <MdSmartphone /> {pdata.phone}
              </small>
            </span>
            <span>
              <small>
                <MdPhone /> {pdata.altNum}
              </small>
            </span>
            <span>
              <small>
                <MdEmail /> {pdata.email}
              </small>
            </span>
          </Card.Meta>
          <Card.Description>{pdata.desc}</Card.Description>
        </Card.Content>

        <Card centered color="orange" style={{ borderRadius: "1rem" }}>
          <Card.Content>
            <Card.Header>
              <FaAddressCard /> Technician address
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <Card.Description>{pdata.addrs}</Card.Description>
          </Card.Content>
        </Card>
        <Card.Content extra>
          <a href={dhref}>
            <MdPhone size="1.3rem" />
            Call
          </a>
          <a style={{ float: "right" }}>
            <Icon name="setting" />
            <Dropdown text="more">
              <Dropdown.Menu>
                <Dropdown.Item text="Raise complaint" />
                <Dropdown.Item text="Report" />
              </Dropdown.Menu>
            </Dropdown>
          </a>
        </Card.Content>
      </Card>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    orders: state.orders,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteOrder: (ordId) => {
      dispatch({ type: "DELETE_ORDER", value: ordId });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewPost);
