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
import MenuIcon from "@material-ui/icons/Menu";
import { IoIosArrowDropdown, IoMdDoneAll } from "react-icons/io";

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
    setstatusBarValue(2);
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
    // console.log(`scrolling>> ${scrolly} - ${scrolltop} = ${clientheight}`);
    if (scrolly - scrolltop === clientheight) {
      console.log("scrolled to bottom >>");
      setstatusBarValue(0);
    } else {
      setstatusBarValue(1);
    }
  }
  const executeScroll = () =>
    scrollRef?.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  chatListScrollControl?.current?.scrollIntoView({
    block: "end",
    behavior: "smooth",
    inline: "nearest",
  });
  function cmpmsg(msg1, msg2) {
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
            <div
              className="message-area"
              ref={chatListScrollControl}
              onScroll={(e) => {
                scrollhandle(e);
              }}
            >
              {currentChat.map((chatBody, key, array) => (
                <div className="list-message">
                  <p
                    className={
                      cmpmsg(chatBody, array[key - 1]) ? "cmpmsg" : null
                    }
                  >
                    {cmpmsg(chatBody, array[key - 1])}
                  </p>
                  <div
                    key={key}
                    className={
                      chatBody.sender === "user"
                        ? "chat-message-send"
                        : "chat-message-recieve"
                    }
                  >
                    <p className="msg-content">{chatBody.msg}</p>
                    <p
                      className="msg-time"
                      ref={scrollRef}
                      id={
                        key == currentChat.length - 1 ? "scrollRef" : "message"
                      }
                    >
                      {gettbystamps(Number(chatBody.time), "time")}
                    </p>
                  </div>
                </div>
              ))}

              {currentChat.length === 0 ? (
                <div>select anyone to start conversation</div>
              ) : null}
            </div>
            <Statusbar executeScroll={executeScroll} status={statusBarValue} />
          </div>

          <Divider />
          <Grid
            container
            style={{ padding: "5px" }}
            direction="row"
            justify="flex-end"
            alignItems="center"
          >
            <Grid item xs={2}>
              <Photoalbum style={{ fontSize: "44px", width: "70px" }} />
            </Grid>
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
