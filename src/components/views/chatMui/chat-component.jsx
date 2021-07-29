import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
import { getFileType, gettbystamps } from "../../../helpers/dateconv";
import Phone from "@material-ui/icons/Phone";
import Photoalbum from "@material-ui/icons/PhotoAlbum";
import Menu from "@material-ui/icons/Menu";
import firebase from "../../../firebase";
import "firebase/storage";

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
  MdCheck,
  MdClose,
  MdDone,
  MdDoneAll,
  MdMenu,
  MdMic,
  MdMoreHoriz,
  MdMoreVert,
  MdPhone,
  MdSend,
  MdStar,
} from "react-icons/md";
import emptychatPic from "../../../images/emptychatPic.svg";

import Tooltip from "@material-ui/core/Tooltip";
import useRecorder from "../newpost/useRecorder";
import { imageCompressor } from "../../../helpers/image_compressor";
import ListMediaFiles from "../../reusable/list_media_files";
import LinearProgress from "@material-ui/core/LinearProgress";

const storage = firebase.storage();
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
  const [orderDetails, setorderDetails] = useState(null);
  const [loader, setLoader] = useState(false);
  const chatListScrollControl = useRef(null);
  // const [scrollDisplay, setScrolldisplay] = useState(false);
  const [statusBarValue, setstatusBarValue] = useState(2); //0 null 1 scrolled to bottom 2 sending message 3 read tick
  const [sendStatus, setsendStatus] = useState(null);

  const [localMedia, setlocalMedia] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isFilesUploaded, setisFilesUploaded] = useState(false);

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
  // useEffect(() => {
  // console.log("list changed >>");
  // let temo = listChats.sort(function (x, y) {
  //   return x.lastModified - y.lastModified;
  // });
  // console.log(temo);
  // }, [listChats]);
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
    console.log(found);
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
    setorderDetails(found);
    setTargetObject(tempTarget);
    setCurrentChat(parsedMsgs);
  };
  const clearMediaFiles = () => {
    setlocalMedia([]);
    setUploadedFiles([]);
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
  const sendMediaFile = (files) => {
    let tempFiles = files ?? uploadedFiles;
    for (let i = 0; i < tempFiles.length; i++) {
      console.log("sending", i, "of", tempFiles.length);
      let msgObject = {
        type: "text",
        msg: tempFiles[i],
        sender: "user",
        time: new Date().valueOf(),
      };
      props.addNewMessage({
        object: JSON.stringify(msgObject),
        target: targetObject,
      });
      socket.emit(
        "sendNewMessageCallback",
        {
          object: JSON.stringify(msgObject),
          target: targetObject,
        },
        (response) => {
          console.log("return resp ", response);
          if (response === "success") {
            setsendStatus("send");
          }
        } // ok
      );
    }
  };
  const sendMessage = () => {
    if (localMedia.length > 0) {
      uploadMediaToCloud();
      return;
    }
    if (
      messageInput?.current?.value === "" ||
      messageInput?.current?.value == null
    )
      return;
    setsendStatus("sending");
    console.log("sending msg >>>>>>");
    let msgObject = {
      type: "text",
      msg: messageInput.current.value,
      sender: "user",
      time: new Date().valueOf(),
    };

    // setCurrentChat((ele) => [...ele, msgObject]);
    // socket.emit(
    //   "sendNewMessage",
    //   {
    //     object: JSON.stringify(msgObject),
    //     target: targetObject,
    //   } // ok
    // );
    // messageInput.current.value = null;

    //  this code is for send message with callback
    //  setCurrentChat((ele) => [...ele, msgObject]);
    props.addNewMessage({
      object: JSON.stringify(msgObject),
      target: targetObject,
    });
    socket.emit(
      "sendNewMessageCallback",
      {
        object: JSON.stringify(msgObject),
        target: targetObject,
      },
      (response) => {
        console.log(response);
        if (response === "success") {
          setsendStatus("send");
          messageInput.current.value = null;
        }
      } // ok
    );
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
  useEffect(() => {
    if (isFilesUploaded) {
      console.log(uploadedFiles);
      sendMediaFile();
      setlocalMedia([]);
      setUploadedFiles([]);
      setisFilesUploaded(false);
    }
  }, [isFilesUploaded]);
  const uploadMediaToCloud = async (files) => {
    setLoader(true);
    console.log(files); //files will be undefined if no files
    let tempFiles = files ?? localMedia;
    let localUploads = [];
    console.log(tempFiles);
    for (let i = 0; i < tempFiles.length; i++) {
      console.log(tempFiles[i]);
      try {
        let k = Number(i);
        const uploadTask = storage
          .ref(
            `users/${firebase.auth().currentUser.uid}/chatMedia/${
              tempFiles[k].name
            }`
          )
          .put(tempFiles[k]);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log("uploading...", progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            try {
              storage
                .ref(`users/${firebase.auth().currentUser.uid}/chatMedia/`)
                .child(tempFiles[k].name)
                .getDownloadURL()
                .then((url) => {
                  console.log(url);
                  localUploads.push(url);
                  if (localUploads.length === tempFiles.length) {
                    setUploadedFiles([...uploadedFiles, ...localUploads]);
                    console.log("all files uploaded..");
                    setisFilesUploaded(true);
                    setLoader(false);
                  }
                });
            } catch (error) {
              console.log(error);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };
  const getMediaFiles = async (e, { resetPrevMedia = false } = {}) => {
    console.log(resetPrevMedia);
    let filesFromWeb = [];
    for (let i = 0; i < e.target.files.length; i++) {
      filesFromWeb.push(e.target.files[i]);
    }
    let compressedFiles = [];
    const compressedFile = (file) => {
      compressedFiles.push(file);
      if (compressedFiles.length === filesFromWeb.length) {
        console.log(compressedFiles);
        resetPrevMedia
          ? setlocalMedia(compressedFiles)
          : setlocalMedia([...localMedia, ...compressedFiles]);
      }
    };
    const unCompressedFile = (file) => {
      filesFromWeb = filesFromWeb.filter((item) => item !== file); //->this will remove uncompressed file
    };
    await imageCompressor(filesFromWeb, compressedFile, unCompressedFile);
  };
  const deleteLocalMedia = (key, typeOfMode) => {
    const newPeople = localMedia.filter(
      (person) => localMedia.indexOf(person) !== key
    );
    setlocalMedia(newPeople);
  };
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
          {currentMsgId !== null ? (
            <div>
              <div>
                <AppBar position="static" className="chat-appbar" elevation="0">
                  <Toolbar>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                    >
                      <Avatar
                        className="appbar-avatar"
                        src={orderDetails?.pDetails?.partnerPic}
                      />
                    </IconButton>
                    <div className="appbar-title">
                      <h2>
                        <u>{orderDetails?.pDetails?.name ?? "unknown"}</u>
                      </h2>
                      <p>
                        business name | 4.5
                        <MdStar color="gold" />
                      </p>
                    </div>

                    <MdPhone className="message-icons" />

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
                            <MdMenu className="message-icons" />
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
                <Statusbar
                  executeScroll={executeScroll}
                  status={statusBarValue}
                />
                <ListMediaFiles
                  mediaFiles={localMedia}
                  typeOfMode="offline"
                  deleteMedia={deleteLocalMedia}
                  addMore={getMediaFiles}
                />
                {loader ? (
                  <div className="linear-progress">
                    <LinearProgress />
                  </div>
                ) : null}
              </div>

              <Divider />
              <MessageTools
                onKeyDownHandler={onKeyDownHandler}
                messageInput={messageInput}
                sendMessage={sendMessage}
                uploadMediaToCloud={uploadMediaToCloud}
                clearMediaFiles={clearMediaFiles}
                getMediaFiles={getMediaFiles}
              />
            </div>
          ) : (
            <div className="introChatContainer">
              <img src={emptychatPic} className="chat-intro-image" />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}

const ListChatPersons = React.memo(
  (props) => {
    console.log("render chatlist>>>");
    const SmallAvatar = withStyles((theme) => ({
      root: {
        width: 12,
        height: 12,
        color: "lime",
        backgroundColor: "lime",
        border: `2px solid ${theme.palette.background.paper}`,
        right: -20,
        bottom: -20,
        position: "absolute",
      },
    }))(Avatar);
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
                  overlap="circular"
                  badgeContent={<SmallAvatar alt="Remy Sharp" src="" />}
                >
                  <Avatar alt="Travis Howard" src={list.pDetails.partnerPic} />
                </Badge>
              </ListItemIcon>

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

const MessageTools = React.memo(
  (props) => {
    const [audioFile, setaudioFile] = useState("");
    let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
    useEffect(() => {
      setaudioFile(audioURL);
      console.log(audioURL);
    }, [audioURL]);
    const startRecord = () => {
      props.clearMediaFiles();
      startRecording();
    };
    const setFile = () => {
      //send file to message here
      let audioArray = [];
      audioArray.push(audioFile);
      props.uploadMediaToCloud(audioArray);
      setaudioFile("");
    };
    const deleteFile = () => {
      setaudioFile("");
    };
    return (
      <div className="message-tools">
        <input
          accept="image/*,video/*"
          className="getMediaButton"
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) => {
            props.getMediaFiles(e, { resetPrevMedia: true });
          }}
        />
        <label htmlFor="contained-button-file">
          <MdAttachFile className="message-icons" />
        </label>

        {isRecording === false ? (
          <MdMic
            className="message-icons"
            onClick={audioFile === "" ? startRecord : null}
          />
        ) : (
          <MdMic
            className="message-icons"
            color="red"
            onClick={stopRecording}
          />
        )}
        {audioFile !== "" ? (
          <audio
            src={URL.createObjectURL(audioURL)}
            controls
            style={{ margin: "10px" }}
          />
        ) : (
          <input
            className="input-message"
            placeholder="Enter your message Here.................."
            onKeyDown={props.onKeyDownHandler}
            ref={props.messageInput}
          />
        )}
        {audioFile !== "" ? (
          <>
            <Fab style={{ margin: "10px" }} size="small" onClick={setFile}>
              <MdCheck size="1.4rem" color="green" />
            </Fab>
            <Fab style={{ margin: "10px" }} size="small" onClick={deleteFile}>
              <MdClose size="1.4rem" color="red" />
            </Fab>
          </>
        ) : null}

        <MdSend className="message-icons" onClick={props.sendMessage} />
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps === nextProps) {
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
              {(() => {
                switch (getFileType(chatBody.msg)) {
                  case "text":
                    return <p className="msg-content">{chatBody.msg}</p>;
                  case "audio":
                    return (
                      <p className="msg-content">
                        <audio src={chatBody.msg} controls />
                      </p>
                    );
                  case "img":
                    return (
                      <p className="msg-content">
                        <img className="msg-image" src={chatBody.msg} />
                      </p>
                    );
                  case "video":
                    return (
                      <p className="msg-content">
                        <video
                          className="msg-image"
                          controls
                          src={chatBody.msg}
                          type="video/mp4"
                        />
                      </p>
                    );
                  default:
                    return null;
                }
              })()}

              <p className="msg-time">
                {gettbystamps(Number(chatBody.time), "time")}
              </p>
            </div>
            <div>
              {key === props.currentChat.length - 1 &&
              chatBody.sender === "user" ? (
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
          </div>
        ))}
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
const Statusbar = React.memo(
  (props) => {
    return (
      <div>
        <div className="status-bar-icon">
          {(() => {
            switch (props.status) {
              case 1:
                return (
                  <IoIosArrowDropdown
                    className="bottomNavigateIcon"
                    size="2rem"
                    onClick={props.executeScroll}
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
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps === nextProps) {
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

const mapDispatchToProps = (dispatch) => {
  return {
    addNewMessage: (data) => {
      dispatch({ type: "ADD_NEW_MESSAGE", value: data });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
