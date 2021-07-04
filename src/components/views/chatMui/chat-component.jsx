import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import firebase from "../../../firebase";
import { getConversasions } from "../../controllers/chat/chat_controller";
import "./chat.css";
import constants from "../../../helpers/constants";
import { connect } from "react-redux";
import { gettbystamps } from "../../../helpers/dateconv";

const useStyles = makeStyles((theme) => ({
  mainScreen: {
    height: "auto",
  },
  chatSection: {
    width: "100%",
    height: "100%",
    margin: "auto",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "65vh",
    overflowY: "auto",
  },
  fab: {
    // position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function Chat(props) {
  const classes = useStyles();
  const [listChats, setListChats] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [currentMsgId, setCurrentMsgId] = useState(null);
  const [targetObject, setTargetObject] = useState(null);
  const messageInput = useRef(null);
  const scrollRef = useRef();
  const socket = io.connect(
    constants.constants.localBacked
      ? constants.localHostSocketUrl
      : constants.socketUrl,
    {
      transports: ["websocket", "polling", "flashsocket"],
    }
  );

  useEffect(() => {
    // getUserConversasions();
    setListChats(props.userChats);
    return () => {};
  }, [props.userChats]);
  useEffect(() => {
    console.log("use effect >>>");

    socket.on("connect", (socket) => {
      console.log("user connected chat >...");
    });
    socket.on("disconnect", () => {
      console.log("user disconnected chat >>>");
    });
  }, [constants.localHostSocketUrl]);

  const chatBox = (msgId) => {
    const found = listChats.find((element) => element.msgId === msgId);
    let parsedMsgs = [];

    for (let i = 0; i < found.msgs.length; i++) {
      parsedMsgs.push(JSON.parse(found.msgs[Number(i)]));
    }
    // console.log(parsedMsgs);
    let tempTarget = {
      uId: found.uId,
      pId: found.pId,
      msgId: found.msgId,
      ordId: found.ordId,
    };
    setTargetObject(tempTarget);
    setCurrentChat(parsedMsgs);
  };

  useEffect(() => {
    if (currentMsgId != null) chatBox(currentMsgId);
  }, [listChats]);

  //scroll to bottom useeffect below
  useEffect(() => {
    if (currentMsgId !== null)
      scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat]);

  const selectChat = (msgId) => {
    setCurrentMsgId(msgId);
    console.log(msgId);
    chatBox(msgId);
  };
  const sendMessage = () => {
    if (messageInput.current.value === "" || messageInput.current.value == null)
      return;
    console.log("sending msg >>>>>>");
    let msgObject = {
      type: "text",
      msg: messageInput.current.value,
      sender: "user",
      time: new Date().valueOf(),
    };
    socket.emit("sendNewMessage", {
      object: JSON.stringify(msgObject),
      target: targetObject,
    });
    // setCurrentChat((ele) => [...ele, msgObject]);
    messageInput.current.value = null;
  };
  return (
    <div className={classes.mainScreen}>
      <Grid container component={Paper} className={classes.chatSection} xs={12}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            {listChats.map((list, key) => (
              <ListItem
                selected={currentMsgId === list.msgId}
                button
                key={key}
                onClick={() => {
                  selectChat(list.msgId);
                }}
              >
                <ListItemIcon>
                  <Avatar alt="Remy Sharp" src={list.pDetails.partnerPic} />
                </ListItemIcon>
                <ListItemText secondary="last message">
                  {list.pDetails.name}
                </ListItemText>
                <ListItemText secondary="online" align="right">
                  {gettbystamps(Number(list.lastModified), "time")}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            {currentChat.map((chatBody, key) => (
              <ListItem key={key}>
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      align={chatBody.sender === "user" ? "right" : "left"}
                      primary={chatBody.msg}
                    ></ListItemText>
                  </Grid>
                  <Grid item xs={12}>
                    <div ref={scrollRef}>
                      <ListItemText
                        align={chatBody.sender === "user" ? "right" : "left"}
                        secondary={gettbystamps(Number(chatBody.time), "time")}
                      ></ListItemText>
                    </div>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
            {currentChat.length === 0 ? (
              <div>select anyone to start conversation</div>
            ) : null}
            <span className={classes.fab}>
              <Fab color="secondary" size="small" aria-label="add">
                <SendIcon />
              </Fab>
            </span>
          </List>
          <Divider />
          <Grid
            container
            style={{ padding: "5px" }}
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item xs={9}>
              <TextField
                id="filled-basic"
                variant="filled"
                label="Enter your message Here"
                inputRef={messageInput}
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab
                color="primary"
                aria-label="add"
                onClick={sendMessage}
                disabled={currentMsgId === null}
              >
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    isUserLogin: state.isUserLogin,
    userChats: state.userChats,
  };
};

export default connect(mapStateToProps)(Chat);
