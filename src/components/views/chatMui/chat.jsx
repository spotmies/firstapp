import React from 'react';
import PropTypes from 'prop-types';
import firebase from "../../../firebase";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { Button, Card, Image, Dropdown, Icon } from "semantic-ui-react";
import "../../../index.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

/* Firebase */

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
      <Mybookings data={times} />
    </div>
  );
};

export default Sekhar;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
}));

 function Mybookings(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  /*  our functions*/

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
        toast.info("response deleted succefully");
      });
  };

  return (
    <div className={classes.root} style={{width: "100%"}}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Response" {...a11yProps(0)} />
          <Tab label="Chat" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
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
    
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Chat
        </TabPanel>
      </SwipeableViews>
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