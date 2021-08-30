import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Fab from "@material-ui/core/Fab";
import "./chat.css";
import constants from "../../../helpers/constants";
import { connect } from "react-redux";
import { getFileType, gettbystamps } from "../../../helpers/dateconv";
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
  MdImage,
  MdKeyboardArrowLeft,
  MdMenu,
  MdMic,
  MdPhone,
  MdSend,
  MdSlowMotionVideo,
  MdStar,
} from "react-icons/md";
import emptychatPic from "../../../images/emptychatPic.svg";

import useRecorder from "../newpost/useRecorder";
import { imageCompressor } from "../../../helpers/image_compressor";
import ListMediaFiles from "../../reusable/list_media_files";
import LinearProgress from "@material-ui/core/LinearProgress";
import ImageViewerDialog from "./image_viewer";

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
  const [deviceHeight, deviceWidth] = useWindowSize();
  const [listChats, setListChats] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [currentMsgId, setCurrentMsgId] = useState(null);
  const [targetObject, setTargetObject] = useState(null);
  const [orderDetails, setorderDetails] = useState(null);
  const [loader, setLoader] = useState(false);
  const chatListScrollControl = useRef(null);
  const [statusBarValue, setstatusBarValue] = useState(2); //0 null 1 scrolled to bottom 2 sending message 3 read tick
  const [sendStatus, setsendStatus] = useState(null);

  const [localMedia, setlocalMedia] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isFilesUploaded, setisFilesUploaded] = useState(false);

  const messageInput = useRef(null);
  const scrollRef = useRef(null);


  const chatBox = (msgId) => {
    const found = props.userChats.find((element) => element.msgId === msgId);
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
  }, [props.userChats]);

  //scroll to bottom useeffect below
  useEffect(() => {
    if (currentMsgId !== null) executeScroll();
    setstatusBarValue(0);
  }, [currentChat]);

  const selectChat = (msgId) => {
    setCurrentMsgId(msgId);
    // console.log(msgId);
    if (msgId != null) {
      chatBox(msgId);
      props.disableChatResponseTab(true);
      props.disableBottomBar(true);
      props.history.push(`/chat/${msgId}`);
    } else {
      props.disableChatResponseTab(false);
      props.disableBottomBar(false);
    }
  };
  useEffect(() => {
    props.history.listen((location) => {
      let browserPath = location.pathname.split("/");
      if (
        browserPath[2] == "" ||
        browserPath[2] == undefined ||
        browserPath[2] == null
      ) {
        selectChat(null);
      }
    });
  }, [props.history.location]);

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
      props.addMessageToQueue({
        object: JSON.stringify(msgObject),
        target: targetObject,
      })
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


    props.addNewMessage({
      object: JSON.stringify(msgObject),
      target: targetObject,
    });
    props.addMessageToQueue({
      object: JSON.stringify(msgObject),
      target: targetObject,
    })
    messageInput.current.value = null;
 
  };

  //enter click to send message
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

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
      {deviceWidth > 700 ? (
        <Grid
          container
          component={Paper}
          className={classes.chatSection}
          xs={12}
        >
          <Grid item xs={3} className={classes.borderRight500}>
            <ListChatPersons
              listChats={props.userChats}
              currentMsgId={currentMsgId}
              selectChat={selectChat}
            />
          </Grid>

          <Grid item xs={9}>
            {/* appbar */}
            {currentMsgId !== null ? (
              <div>
                <ChatBanner orderDetails={orderDetails} prop={props} />

                <div>
                  <ChatArea
                    chatListScrollControl={chatListScrollControl}
                    scrollhandle={scrollhandle}
                    currentChat={currentChat}
                    scrollRef={scrollRef}
                    dateBetweenMessages={dateBetweenMessages}
                    sendStatus={sendStatus}
                    orderDetails = {orderDetails}
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
      ) : (
        <MobileChat
          //list chat props
          listChats={props.userChats}
          currentChat={currentChat}
          currentMsgId={currentMsgId}
          selectChat={selectChat}
          //chat banner props
          orderDetails={orderDetails}
          //chatArea props
          chatListScrollControl={chatListScrollControl}
          scrollhandle={scrollhandle}
          currentChat={currentChat}
          scrollRef={scrollRef}
          dateBetweenMessages={dateBetweenMessages}
          sendStatus={sendStatus}
          //statusbar props
          executeScroll={executeScroll}
          status={statusBarValue}
          //message tools props
          onKeyDownHandler={onKeyDownHandler}
          messageInput={messageInput}
          sendMessage={sendMessage}
          uploadMediaToCloud={uploadMediaToCloud}
          clearMediaFiles={clearMediaFiles}
          getMediaFiles={getMediaFiles}
          //list media files props
          mediaFiles={localMedia}
          typeOfMode="offline"
          deleteMedia={deleteLocalMedia}
          addMore={getMediaFiles}
          // loader props
          loader={loader}
          prop={props}
        />
      )}
    </div>
  );
}

const ChatBanner = React.memo(
  (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

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
    const backToChatList = () => {
      console.log(props);
      props.selectChat(null);
    };
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }

      prevOpen.current = open;
    }, [open]);
    useEffect(() => {
      return () => {
        props.prop.disableChatResponseTab(false);
        props.prop.disableBottomBar(false);
      };
    }, []);
    return (
      <div>
        <AppBar position="static" className="chat-appbar" elevation="0">
          <Toolbar>
            {props.mobile ? (
              <MdKeyboardArrowLeft
                size="3rem"
                color="grey"
                onClick={backToChatList}
              />
            ) : null}
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Avatar
                className="appbar-avatar"
                src={props.orderDetails?.pDetails?.partnerPic}
              />
            </IconButton>
            <div className="appbar-title">
              <h2>
                <u>{props.orderDetails?.pDetails?.name ?? "unknown"}</u>
              </h2>
              <p style={{ marginTop: "-15px" }}>
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
                              <MenuItem onClick={handleClose}>Delete</MenuItem>
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
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.orderDetails.msgId !== nextProps.orderDetails.msgId) {
      console.log("<<<<<<<<<<<<Refress chat banner>>>>>>>>>>>>>>>>>")
      return false; // props are not  equal update 
    }
    return true;
  }
);

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

                {(() => {
                  switch (
                    getFileType(JSON.parse(list.msgs[list.msgs.length - 1]).msg)
                  ) {
                    case "text":
                      return (
                        <p className="last-msg-list">
                          {JSON.parse(list.msgs[list.msgs.length - 1]).msg}
                        </p>
                      );
                    case "audio":
                      return (
                        <p className="last-msg-list">
                          <MdMic /> Audio file
                        </p>
                      );
                    case "img":
                      return (
                        <p className="last-msg-list">
                          <MdImage /> Image file
                        </p>
                      );
                    case "video":
                      return (
                        <p className="last-msg-list">
                          <MdSlowMotionVideo /> Video file
                        </p>
                      );
                    default:
                      return null;
                  }
                })()}
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
        {audioFile == "" ? (
          <>
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
          </>
        ) : null}
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

        {audioFile == "" ? (
          <MdSend className="message-icons" onClick={props.sendMessage} />
        ) : null}
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
    const [viewerSrc, setviewerSrc] = useState("");
    const [openViewer, setOpenViewer] = useState(false);
    const imageViewerCallBack = (state) => {
      setOpenViewer(state);
    };
    console.log("reder chatArea>>>");
    return (
      <div>
        {!openViewer ? (
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
                            <audio
                              src={chatBody.msg}
                              controls
                              className="Audio-msg"
                              // style={{ width: "fit-content" }}
                            />
                          </p>
                        );
                      case "img":
                        return (
                          <p
                            className="msg-content"
                            onClick={() => {
                              setviewerSrc(chatBody.msg);
                              imageViewerCallBack(true);
                            }}
                          >
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
                        switch (props.orderDetails.uState) {
                          case 0:
                            return <MdAlarm className="sendingStatus" />;

                          case 1:
                            return <MdDone />;
                          case 2:
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
            {/* <ImageViewerDialog
                 open={openViewer}
                 imageViewerCallBack={imageViewerCallBack}
                 src={viewerSrc}
                 allSrc={props.currentChat}
               /> */}
          </div>
        ) : (
          <div className="img-viewer">
            <div className="viewer-close">
              <MdClose
                size="2rem"
                onClick={() => {
                  setOpenViewer(false);
                }}
              />
              {/* <Button>Close </Button> */}
            </div>
            <div className="viewer-content">
              <img src={viewerSrc} alt="simething" className="view-image" />
            </div>
          </div>
        )}
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

// mobile component

const MobileChat = React.memo(
  (props) => {
    console.log("mobile hat>>>");
    return (
      <div>
        {props.currentMsgId == null ? (
          <ListChatPersons
            listChats={props.listChats}
            currentMsgId={props.currentMsgId}
            selectChat={props.selectChat}
          />
        ) : (
          <div>
            <ChatBanner
              orderDetails={props.orderDetails}
              mobile={true}
              selectChat={props.selectChat}
              prop={props.prop}
            />
            <ChatArea
              chatListScrollControl={props.chatListScrollControl}
              scrollhandle={props.scrollhandle}
              currentChat={props.currentChat}
              scrollRef={props.scrollRef}
              dateBetweenMessages={props.dateBetweenMessages}
              sendStatus={props.sendStatus}
                        orderDetails={props.orderDetails}

            />
            <Statusbar
              executeScroll={props.executeScroll}
              status={props.status}
            />
            <ListMediaFiles
              mediaFiles={props.mediaFiles}
              typeOfMode="offline"
              deleteMedia={props.deleteMedia}
              addMore={props.addMore}
            />
            {props.loader ? (
              <div className="linear-progress">
                <LinearProgress />
              </div>
            ) : null}
            <MessageTools
              onKeyDownHandler={props.onKeyDownHandler}
              messageInput={props.messageInput}
              sendMessage={props.sendMessage}
              uploadMediaToCloud={props.uploadMediaToCloud}
              clearMediaFiles={props.clearMediaFiles}
              getMediaFiles={props.getMediaFiles}
            />
          </div>
        )}
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

function useWindowSize() {
  const [size, setSize] = useState([window.innerHeight, window.innerWidth]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerHeight, window.innerWidth]);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return size;
}

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
    disableChatResponseTab: (data) => {
      dispatch({ type: "DISABLE_CHAT_RESPONSE_TAB", value: data });
    },
    disableBottomBar: (data) => {
      dispatch({ type: "DISABLE_BOTTOM_BAR", value: data });
    },
    addMessageToQueue: (data) =>{
      dispatch({type:"ADD_MESSAGE_TO_QUEUE",value:data})
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
