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
import Badge from "@material-ui/core/Badge";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import "./chat.css";
import constants from "../../../helpers/constants";
import { connect } from "react-redux";
import { gettbystamps } from "../../../helpers/dateconv";
import Phone from "@material-ui/icons/Phone";
import Photoalbum from "@material-ui/icons/PhotoAlbum";
import Menu from "@material-ui/icons/Menu";

// dropdown menu

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

// appbar

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { IoIosArrowDropdown, IoMdDoneAll } from "react-icons/io";
import {
  MdAlarm,
  MdAttachFile,
  MdDone,
  MdDoneAll,
  MdMic,
  MdSend,
} from "react-icons/md";

import Tooltip from "@material-ui/core/Tooltip";
const useStyles = makeStyles((theme) => ({
  mainScreen: {
    height: "auto",
    position: "relative",
  },
  chatSection: {
    padding: "0",
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
    position: "fixed",
    zIndex: "999",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  //   appbar
  root: {
    flexGrow: 1,
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Chat(props) {
  const classes = useStyles();
  const [listChats, setListChats] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [currentMsgId, setCurrentMsgId] = useState(null);
  const [targetObject, setTargetObject] = useState(null);
  const chatListScrollControl = useRef(null);
  // const [scrollDisplay, setScrolldisplay] = useState(false);
  const [statusBarValue, setstatusBarValue] = useState(2); //0 null 1 scrolled to bottom 2 sending message 3 read tick
  const [sendStatus, setsendStatus] = useState(null);

  const messageInput = useRef(null);
  const scrollRef = useRef(null);
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
    setsendStatus("send");
  };

  useEffect(() => {
    if (currentMsgId != null) chatBox(currentMsgId);
  }, [listChats]);

  //scroll to bottom useeffect below
  useEffect(() => {
    if (currentMsgId !== null) executeScroll();
    setstatusBarValue(0);
  }, [currentChat]);

  const selectChat = (msgId) => {
    setCurrentMsgId(msgId);
    console.log(msgId);
    chatBox(msgId);
  };

  const sendMessage = () => {
    if (messageInput.current.value === "" || messageInput.current.value == null)
      return;
    setsendStatus("sending");
    console.log("sending msg >>>>>>");
    let msgObject = {
      type: "text",
      msg: messageInput.current.value,
      sender: "user",
      time: new Date().valueOf(),
    };
    setCurrentChat((ele) => [...ele, msgObject]);
    socket.emit(
      "sendNewMessage",
      {
        object: JSON.stringify(msgObject),
        target: targetObject,
      } // ok
    );
    messageInput.current.value = null;

    setCurrentChat((ele) => [...ele, msgObject]);

    //this code is for send message with callback
    // socket.emit(
    //   "sendNewMessageCallback",
    //   {
    //     object: JSON.stringify(msgObject),
    //     target: targetObject,
    //   },
    //   (response) => {
    //     console.log(response);
    //     if (response === "success") {
    //       setsendStatus("sended");
    //       messageInput.current.value = null;
    //     }
    //   } // ok
    // );
  };

  //enter click to send message
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  // dropdown menu

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  function scrollhandle(e) {
    const scrolly = Math.floor(chatListScrollControl.current.scrollHeight);
    const scrolltop = Math.floor(chatListScrollControl.current.scrollTop);
    const clientheight = chatListScrollControl.current.clientHeight;
    // console.log(
    //   `scrolling>> ${scrolly} - ${scrolltop} = ${clientheight} here ${
    //     scrolly - scrolltop
    //   }`
    // );
    if (
      scrolly - scrolltop === clientheight ||
      scrolly - scrolltop === clientheight + 1 ||
      scrolly - scrolltop === clientheight - 1
    ) {
      console.log("scrolled to bottom >>");
      setstatusBarValue(0);
    } else {
      setstatusBarValue(1);
    }
  }
  const executeScroll = () =>
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  function dateBetweenMessages(msg1, msg2) {
    let temp1 = msg1;
    let temp2 = msg2 === undefined ? msg1 : msg2;

    let ct = Number(temp1.time);
    let pt = Number(temp2.time);
    if (gettbystamps(ct, "date") !== gettbystamps(pt, "date")) {
      let temp = gettbystamps(ct, "fulldate");
      return temp;
    } else if (msg2 === undefined) {
      let temp = gettbystamps(ct, "fulldate");
      return temp;
    } else return null;
  }

  return (
    <div className={classes.mainScreen}>
      {/* chats */}
      <Grid container component={Paper} className={classes.chatSection} xs={12}>
        <Grid item xs={3} className={classes.borderRight500}>
          <ListChatPersons
            listChats={listChats}
            currentMsgId={currentMsgId}
            selectChat={selectChat}
          />
        </Grid>

        <Grid item xs={9}>
          {/* appbar */}
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <Avatar />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Satish
                </Typography>
                <Phone />

                {/* dropdown menu */}
                <Button color="inherit">
                  <div className={classes.root}>
                    <div>
                      <Button
                        ref={anchorRef}
                        aria-controls={open ? "menu-list-grow" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                      >
                        <Menu style={{ color: "white" }} />
                      </Button>
                      <Popper
                        open={open}
                        anchorEl={anchorRef.current}
                        role={undefined}
                        transition
                        disablePortal
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin:
                                placement === "bottom"
                                  ? "center top"
                                  : "center bottom",
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                  autoFocusItem={open}
                                  id="menu-list-grow"
                                  onKeyDown={handleListKeyDown}
                                >
                                  <MenuItem onClick={handleClose}>
                                    Technician Details
                                  </MenuItem>
                                  <MenuItem onClick={handleClose}>
                                    View Job
                                  </MenuItem>
                                  <MenuItem onClick={handleClose}>
                                    Delete
                                  </MenuItem>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </div>
                  </div>
                </Button>
              </Toolbar>
            </AppBar>
          </div>

          <div>
            <ChatArea
              chatListScrollControl={chatListScrollControl}
              scrollhandle={scrollhandle}
              currentChat={currentChat}
              scrollRef={scrollRef}
              dateBetweenMessages={dateBetweenMessages}
              sendStatus={sendStatus}
            />
            <Statusbar executeScroll={executeScroll} status={statusBarValue} />
          </div>

          <Divider />
          <div className="message-tools">
            <MdAttachFile className="message-icons" />
            <MdMic className="message-icons" />
            <input
              className="input-message"
              placeholder="Enter your message Here.................."
              onKeyDown={onKeyDownHandler}
              ref={messageInput}
            />

            <MdSend className="message-icons" onClick={sendMessage} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const ListChatPersons = React.memo(
  (props) => {
    console.log("render chatlist>>>");
    return (
      <div>
        <List className="contact-list">
          {props.listChats.map((list, key) => (
            <ListItem
              selected={props.currentMsgId === list.msgId}
              button
              key={key}
              onClick={() => {
                props.selectChat(list.msgId);
              }}
            >
              <ListItemIcon>
                <Badge
                  className="badgeDiv"
                  overlap="circular"
                  badgeContent={<span className="badgeContent"></span>}
                >
                  <Avatar alt="Remy Sharp" src={list.pDetails.partnerPic} />
                </Badge>
              </ListItemIcon>
              {/* <div className="column1">
                <div className="row1">
                  <p>sekhar</p>
                  <p>13:25pm</p>
                </div>
                <div className="row2">
                  <p>lastmessage</p>
                  <p>online</p>
                </div>
              </div> */}
              <ListItemText>
                {list.pDetails.name}
                <p className="last-msg-list">
                  {JSON.parse(list.msgs[list.msgs.length - 1]).msg}
                </p>
              </ListItemText>
              <ListItemText align="right">
                {gettbystamps(
                  Number(JSON.parse(list.msgs[list.msgs.length - 1]).time),
                  "time"
                )}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.currentMsgId !== nextProps.currentMsgId) return false;
    if (prevProps.listChats === nextProps.listChats) {
      return true; // props are equal
    }
    return false; // props are not equal -> update the component
  }
);

const ChatArea = React.memo(
  (props) => {
    console.log("reder chatArea>>>");
    return (
      <div
        className="message-area"
        ref={props.chatListScrollControl}
        onScroll={(e) => {
          props.scrollhandle(e);
        }}
      >
        {props.currentChat.map((chatBody, key, array) => (
          <div className="list-message" key={key}>
            {props.dateBetweenMessages(chatBody, array[key - 1]) ? (
              <p className="cmpmsg">
                {props.dateBetweenMessages(chatBody, array[key - 1])}
              </p>
            ) : null}
            <div
              className={
                chatBody.sender === "user"
                  ? "chat-message-send"
                  : "chat-message-recieve"
              }
            >
              <p className="msg-content">{chatBody.msg}</p>

              <p className="msg-time">
                {gettbystamps(Number(chatBody.time), "time")}
              </p>
            </div>
            {key === props.currentChat.length - 1 &&
            chatBody.sender === "user" ? (
              // <p className="readStatus">{props.sendStatus}</p>
              <span className="readStatus">
                {(() => {
                  switch (props.sendStatus) {
                    case "sending":
                      return <MdAlarm className="sendingStatus" />;

                    case "send":
                      return <MdDone />;
                    case "seen":
                      return <MdDoneAll color="blue" />;

                    default:
                      return null;
                  }
                })()}
              </span>
            ) : null}
          </div>
        ))}

        {props.currentChat.length === 0 ? (
          <div>select anyone to start conversation</div>
        ) : null}
        <div ref={props.scrollRef} />
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.sendStatus != nextProps.sendStatus) return false;
    if (prevProps.currentChat === nextProps.currentChat) {
      return true; // props are equal
    }
    return false; // props are not equal -> update the component
  }
);

const mapStateToProps = (state) => {
  return {
    userDetails: state.userDetails,
    isUserLogin: state.isUserLogin,
    userChats: state.userChats,
  };
};

export default connect(mapStateToProps)(Chat);

function Statusbar({ executeScroll, status }) {
  return (
    <div style={{ height: "30px" }}>
      {(() => {
        switch (status) {
          case 1:
            return (
              <IoIosArrowDropdown
                className="bottomNavigateIcon"
                size="2rem"
                onClick={executeScroll}
              />
            );

          case 2:
            return <p className="bottomNavigateIcon">sending...</p>;
          case 3:
            return (
              <IoMdDoneAll
                className="bottomNavigateIcon"
                size="1.5rem"
                color="blue"
              />
            );

          default:
            return null;
        }
      })()}
    </div>
  );
}
