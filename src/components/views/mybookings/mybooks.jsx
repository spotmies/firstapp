import React from "react";
import firebase from "../../../firebase";
import { useState, useEffect } from "react";
import { Card, Image, Label, Dropdown, Icon } from "semantic-ui-react";
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
import { connect } from "react-redux";
import FullScreenLoader from "../../reusable/helpers";
import {
  deleteOrderById,
  getUserOrders,
} from "../../controllers/new_post/order_controller";

function Mybookings(props) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loaderData, setloaderData] = useState("fetching your orders ...");

  const eventLoader = (loaderState, data = false) => {
    setLoader(loaderState);
    if (data) setloaderData(data);
  };
  console.log(props);
  const getOrders = async () => {
    if (props.orders.length < 1) {
      console.log("fetching API");
      let orders = await getUserOrders(firebase.auth().currentUser.uid);
      console.log(orders);
      setData(orders);
      props.updateAllOrders(orders);
    } else setData(props.orders);

    eventLoader(false);
  };

  useEffect(() => {
    getOrders();
  }, [data.length < 1]);

  const history = useHistory();

  const viewPost = (prop) => {
    console.log("click", prop);
    history.push(`mybookings/id/${prop}`);
  };

  const edit = (prop) => {
    console.log("click", prop);
    history.push(`mybookings/id/edit/${prop}`);
  };
  const delpost = async (ordId) => {
    eventLoader(true, "Deleting Order...");
    let response = await deleteOrderById(ordId);
    if (response) {
      props.deleteOrder(ordId);
      setData(data.filter((item) => item.ordId !== ordId));
      toast.info("Order Deleted Successfully");
    } else toast.info("Unable To Delete Order");
    eventLoader(false);
  };

  return (
    <div>
      <FullScreenLoader loader={loader} data={loaderData} />
      {data.length > 0 ? (
        <div style={{ paddingTop: "30px" }}>
          {data.map((cap, key) => (
            <Card.Group key={cap._id}>
              <Card centered fluid id="book-card">
                <Card.Content>
                  <Card.Meta style={{ display: "inline-flex" }}>
                    <Icon name="time" />{" "}
                    {gettbystamps(Number(cap.join), "fulldate")} &nbsp;@&nbsp;
                    <b> {gettbystamps(Number(cap.join), "time")}</b>
                  </Card.Meta>
                  <Dropdown
                    item
                    icon="ellipsis horizontal"
                    simple
                    style={{ float: "right" }}
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={(e) => viewPost(cap.ordId)}>
                        View post
                      </Dropdown.Item>
                      <Dropdown.Item onClick={(e) => edit(cap.ordId)}>
                        Edit post
                      </Dropdown.Item>
                      <Dropdown.Item onClick={(e) => delpost(cap.ordId)}>
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Content>
                <Card.Content
                  extra
                  style={{ display: "inline-block", cursor: "pointer" }}
                  onClick={(e) => viewPost(cap.ordId)}
                >
                  <Image
                    className="post-img"
                    style={{ borderRadius: "1rem", cursor: "pointer" }}
                    floated="left"
                    src={cap.media[0]}
                  />

                  <Card.Header
                    style={{ paddingBottom: "10px", cursor: "pointer" }}
                  >
                    {cap.problem}
                  </Card.Header>
                  <div style={{ display: "inline-flex" }}>
                    <div style={{ paddingRight: "30px" }}>
                      <p>
                        <BsEyeFill /> Views:{cap.views}
                      </p>
                      <p>
                        <RiPinDistanceFill /> Distance: 1km
                      </p>
                    </div>
                    <div>
                      {cap.money != null ? (
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
                  <p
                    onClick={(e) => viewPost(cap.ordId)}
                    style={{ cursor: "pointer" }}
                  >
                    <BsEyeFill size="1.5rem" />
                    <u>
                      {" "}
                      <b>View post</b>
                    </u>
                  </p>
                  {cap.ordState == 2 ? (
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
      ) : null}
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
