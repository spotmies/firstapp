import React, { Component, useCallback } from "react";
import firebase from "../firebase";
import react, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form } from "react-bootstrap";
import {
  Button,
  Segment,
  Dimmer,
  Loader,
  Label,
  TextArea,
} from "semantic-ui-react";
import "../index.css";
import "./chats.css";

import { BiArrowBack } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Image,
  List,
  Grid,
  Input,
  Modal,
  ImageGroup,
  Dropdown,
  Header,
} from "semantic-ui-react";
import imageCompression from "browser-image-compression";
//import ImageViewer from "react-simple-image-viewer";
// import { UniversalM } from "./reusable/Modal";
import "firebase/storage";
//micro service
import { getpdetailsbyid, disablechat } from "../mservices/upldmedia";
import { gettbystamps, ValidURL } from "../mservices/dateconv";
import { toast } from "react-toastify";
import { msgdot } from "./reusable/msgdot";
//import icons
import { BsEyeFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { RiPinDistanceFill } from "react-icons/ri";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import {
  MdDelete,
  MdStar,
  MdChatBubble,
  MdAccessTime,
  MdPhone,
  MdImage,
  MdAddToPhotos,
  MdList,
  MdFeaturedPlayList,
  MdSend,
  MdArrowDropDownCircle,
  MdPerson,
  MdViewDay,
  MdRemoveRedEye,
  MdClose,
  MdThumbUp,
  MdAttachment,
  MdThumbDown,
} from "react-icons/md";

import { AiFillEdit } from "react-icons/ai";
import { RiSendPlaneLine, RiImageAddFill } from "react-icons/ri";
import { FaFolderPlus } from "react-icons/fa";
import { sharemydetails } from "../mservices/userDB";

const db = firebase.firestore();
const storage = firebase.storage();
var chatid;
var showChat = false;
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

// function chatHead() {
//   const [showChat,setShowChat] = useState(false);
//   return showChat;
// }

function useTimes() {
  // const[times,setTimes]=useState([])
  const [chit, setchit] = useState([]);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var tempChat = [];
        db.collection("messaging")
          .where("userid", "==", firebase.auth().currentUser.uid)
          .where("chatbuild", "==", true)
          .orderBy("createdAt", "desc")
          .onSnapshot((querySnapshot) => {
            //  tempChat=[];
            setchit([]);
            querySnapshot.forEach((doc) => {
              // tempChat.push(doc.data());
              setchit((x) => x.concat(doc.data()));
            });
          });
      }
    });
  }, []);
  return chit;
}
const Sekhar = () => {
  const chit = useTimes();
  console.log(chit);
  if (chit.body) {
    console.log(chit);
  }
  return (
    <div className="responses">
      {/* <div className="comingSoon">
        <h1 className="soonText">Coming Soon ...</h1>
        </div> */}
      <Headings />
      {chit ? <Mybookings data={chit} /> : <Empty />}
    </div>
  );
};

export default Sekhar;

// function settrue() {
//   return setShowChat(true);
//  }

function settrue() {
  showChat = true;
  return showChat;
}

function Mybookings(props) {
  const history = useHistory();
  const [chat, setchat] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [listChat, setlistChat] = useState([]);
  const [unrChat, setunrChat] = useState([]);
  const [heights, widths] = useWindowSize();

  useEffect(() => {
    setlistChat(props.data);
    console.log("new chat list");
    console.log(props.data);
  }, [props.data]);

  const click = async (prop) => {
    // setlistChat(props.data);
    //  update_newmsg();
    console.log("click", prop);
    await db
      .collection("messaging")
      .doc(prop)
      .onSnapshot((snap) => {
        setchat(snap.data());
      });
    console.log("new chat fetched");
  };

  function settrue() {
    return setShowChat(true);
  }

  if (widths <= 420) {
    return (
      <div style={{ height: "100%" }}>
        {props.data == 0 ? (
          <Grid>
            {!showChat ? (
              <Grid.Column floated="left" mobile={16} tablet={16} computer={4}>
                <div style={{ position: "-webkit-sticky" }}>
                  <List celled>
                    <List.Item>
                      <Segment className="post-img">
                        <Dimmer active inverted>
                          <Loader size="large">Loading</Loader>
                        </Dimmer>

                        <Image src="/images/wireframe/paragraph.png" />
                      </Segment>
                      <List.Content>
                        <List.Header as="a"></List.Header>
                        <List.Description></List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                </div>
              </Grid.Column>
            ) : null}
          </Grid>
        ) : (
          // original data
          <Grid style={{ marginRight: "0" }} fluid={true} className="gridHead">
            {!showChat ? (
              <Grid.Column
                className="gridHead"
                floated="left"
                mobile={16}
                tablet={16}
                computer={4}
              >
                <div
                  style={{ position: "-webkit-sticky" }}
                  onClick={() => {
                    settrue();
                  }}
                >
                  <List celled>
                    {listChat.map((nap, key) => (
                      <List.Item
                        id={nap.id}
                        onClick={(e) => click(nap.id)}
                        key={key}
                        // style={{ backgroundColor: "yellow", width: "250px" }}
                      >
                        <Image avatar src={nap.ppic} />
                        <List.Content style={{ width: "250px" }}>
                          <div
                            style={{
                              display: "inline-flex",
                              //    backgroundColor: "red",
                              width: "250px",
                            }}
                          >
                            <List.Header as="a">{nap.pname} </List.Header>
                            <p style={{ marginRight: "0", marginLeft: "auto" }}>
                              <small
                                style={{ color: nap.uread ? "gray" : "black" }}
                              >
                                {" "}
                                {getmsgtime(
                                  JSON.parse(nap.body[nap.body.length - 1])
                                    .timestamp
                                )}
                              </small>
                            </p>
                          </div>

                          <List.Description
                            style={{
                              display: "inline-flex",
                              width: "250px",
                              height: "100%",
                              //  backgroundColor: "red",
                            }}
                          >
                            <p style={{ color: nap.uread ? "gray" : "black" }}>
                              {ValidURL(nap.body[nap.body.length - 1]) ==
                              false ? (
                                msgdot(
                                  JSON.parse(nap.body[nap.body.length - 1]).msg,
                                  24
                                )
                              ) : (
                                <span style={{ display: "inline-flex" }}>
                                  <MdAttachment />{" "}
                                  <small>send you attachment </small>
                                </span>
                              )}
                            </p>
                            {nap.uread == false ? (
                              <Label
                                size="mini"
                                color="blue"
                                style={{
                                  marginRight: "0",
                                  marginLeft: "auto",
                                  height: "100%",
                                }}
                              >
                                New Message
                              </Label>
                            ) : null}
                          </List.Description>
                        </List.Content>
                      </List.Item>
                    ))}
                  </List>
                </div>
              </Grid.Column>
            ) : null}
            {showChat ? (
              <Grid.Column
                className="gridHead1"
                floated="right"
                mobile={16}
                tablet={16}
                computer={12}
                centered
                style={{ padding: "14px 0 0 0", height: "90%" }}
              >
                <div>
                  {chat.body ? (
                    <Chatarea chat={chat} onNameChange={setShowChat} />
                  ) : (
                    <Empty />
                  )}
                </div>
              </Grid.Column>
            ) : null}
          </Grid>
        )}
      </div>
    );
  } else {
    return (
      <div style={{ height: "100%" }}>
        <Grid fluid={true}>
          <Grid.Column
            floated="left"
            mobile={16}
            tablet={16}
            computer={4}
            style={{
              marginTop: "20px",
              border: "0 1px 0 0",
              boxShadow: "0px 0px 1px rgb(141, 139, 139)",
              // backgroundColor: "yellow",
              height: "100%",
            }}
          >
            <div style={{ position: "-webkit-sticky" }}>
              <List>
                {listChat.map((nap, key) => (
                  <List.Item
                    id={nap.id}
                    onClick={(e) => click(nap.id)}
                    key={key}
                  >
                    <Image avatar src={nap.ppic} />
                    <List.Content style={{ width: "250px" }}>
                      <div
                        style={{
                          display: "inline-flex",
                          // backgroundColor: "red",
                          width: "250px",
                        }}
                      >
                        <List.Header as="a">{nap.pname} </List.Header>
                        <p style={{ marginRight: "0", marginLeft: "auto" }}>
                          <small
                            style={{ color: nap.uread ? "gray" : "black" }}
                          >
                            {" "}
                            {getmsgtime(
                              JSON.parse(nap.body[nap.body.length - 1])
                                .timestamp
                            )}
                          </small>
                        </p>
                      </div>

                      <List.Description
                        style={{
                          display: "inline-flex",
                          width: "250px",
                          height: "100%",
                          //  backgroundColor: "red",
                        }}
                      >
                        <p style={{ color: nap.uread ? "gray" : "black" }}>
                          {ValidURL(nap.body[nap.body.length - 1]) == false ? (
                            msgdot(
                              JSON.parse(nap.body[nap.body.length - 1]).msg,
                              24
                            )
                          ) : (
                            <span style={{ display: "inline-flex" }}>
                              <MdAttachment />{" "}
                              <small>send you attachment </small>
                            </span>
                          )}
                        </p>
                        {nap.uread == false ? (
                          <Label
                            size="mini"
                            color="blue"
                            style={{
                              marginRight: "0",
                              marginLeft: "auto",
                              height: "100%",
                            }}
                          >
                            New Message
                          </Label>
                        ) : null}
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </div>
          </Grid.Column>

          <Grid.Column
            floated="right"
            mobile={16}
            tablet={16}
            computer={12}
            centered
            style={{ padding: "14px 0 0 0", height: "90%" }}
          >
            <div>{chat.body ? <Chatarea chat={chat} /> : <Empty />}</div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function Chatarea(props) {
  const history = useHistory();
  const [ordst, setordst] = useState();
  const [image, setimage] = useState([]);
  const [image2, setimage2] = useState([]);
  const [chid, setchid] = useState("");
  const [pdetails, setpdetails] = useState({ businessname: "business" });
  const [tempimg, settempimg] = useState([]);
  const [upload, setupload] = useState(false);
  const divRef = useRef(null);
  const [mflag, setmflag] = useState(null);
  const [mimage, setmimage] = useState(null);
  const scrollref = useRef(null);
  const [heights, widths] = useWindowSize();
  const [typemsg, settypemsg] = useState("");
  // var [showChat,setShowChat] = useState(false);

  db.collection("users")
    .doc(firebase.auth().currentUser.uid)
    .collection("adpost")
    .doc(props.chat.orderid)
    .get()
    .then((snap) => {
      setordst(snap.data().orderstate);
      //console.log(snap.data())
    });

  useEffect(async () => {
    let data;
    console.log("fetching partner details..");
    data = await getpdetailsbyid(props.chat.partnerid);
    console.log(data);
    setpdetails(data);
    console.log("effect1");
  }, [props.chat.partnerid]);

  //const divRef = useRef(null);
  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      // this.sendMessage();
      console.log("enter key");
      // document.getElementById(props.chat.id).click();
      // divRef.current.click();
      click(props.chat.id);
    }
  };

  let chat = [];
  chat = props.chat;
  let onNameChange = props.onNameChange;
  // console.log(JSON.parse(chat.body));
  useEffect(async () => {
    // console.log(await getpdetailsbyid("KrJkoNpybQM7svmRo7CcWOwRGQA3"));

    if (document.getElementById("scrollbtn")) {
      document.getElementById("scrollbtn").click();
      console.log("new message");
    }
    console.log("effect2");
    console.log(chat);
  }, [chat.body]);

  const click = (prop) => {
    if (typemsg != "") {
      let newbody = [];
      newbody = chat.body;

      console.log("click", prop);
      let timestamp = Math.round(+new Date() / 1000);
      //let msg = typemsg + "`" + timestamp + "`";
      var msg2 = {};
      msg2.msg = typemsg;
      msg2.timestamp = timestamp;
      msg2.type = "text";
      msg2.sender = "u";
      var msg = JSON.stringify(msg2);
      if (msg != "") {
        newbody.push(msg);
        db.collection("messaging")
          .doc(prop)
          .update({
            body: newbody,
            createdAt: new Date(),
            pread: false,
          })
          .then(() => {
            settypemsg("");
            // tempChat=[];
          });
      }
    }
  };

  const click2 = (id, msg) => {
    let newbody = [];
    newbody = chat.body;

    console.log("click");
    let timestamp = Math.round(+new Date() / 1000);
    //let msg = typemsg + "`" + timestamp + "`";
    var msg2 = {};
    msg2.msg = msg;
    msg2.timestamp = timestamp;
    msg2.type = "photo";
    msg2.sender = "u";
    var msgg = JSON.stringify(msg2);
    newbody.push(msgg);

    // let timestamp = Math.round(+new Date() / 1000);

    db.collection("messaging")
      .doc(id)
      .update({
        body: newbody,
        createdAt: new Date(),
        pread: false,
      })
      .then(() => {});
  };
  const umread = async () => {
    await db.collection("messaging").doc(chat.id).update({
      uread: true,
    });
    return true;
  };
  function orderstatus(e) {
    console.log(e.target.innerText, e.target.parentElement.id);
    console.log(ordst);
  }

  const handleInputChange = useCallback(
    (event) => {
      onNameChange(false);
    },
    [onNameChange]
  );

  const inputFile = useRef(null);

  const mediashare = (e) => {
    inputFile.current.click();
    console.log(image);
    console.log(image2);
    setchid(props.chat.id);
  };

  useEffect(() => {
    if (upload == true) {
      console.log("uploading..");
      //  toast.info("uploading...");
      uitf();
    }
    console.log("effect4");
  }, [upload]);

  async function uitf() {
    let image3 = tempimg;
    for (var i = 0; i < image3.length; i++) {
      let k = Number(i);
      const uploadTask = storage
        .ref(`users/${firebase.auth().currentUser.uid}/chat/${image3[k].name}`)
        .put(image3[k]);
      let upldtask = await uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
          toast.info(error);
        },
        () => {
          storage
            .ref(`users/${firebase.auth().currentUser.uid}/chat/`)
            .child(image3[k].name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              // toast.info(url);
              setimage2((temp) => [...temp, url]);
            });
        }
      );
    }
    setupload(false);
    settempimg([]);
    setimage2([]);
  }

  useEffect(() => {
    console.log(image2);
    if (image2.length > 0) {
      click2(chid, image2[image2.length - 1]);
    }
    console.log("effect5");
  }, [image2]);

  async function compressimage(e) {
    const options = {
      maxSizeMB: 0.15,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    let cfile;
    setimage([]);

    for (var i = 0; i < e.target.files.length; i++) {
      let k = Number(i);
      //  toast.info("loop start");
      imageCompression(e.target.files[k], options)
        .then((x) => {
          cfile = x;
          // setimage(temp=>[...temp,cfile]);
          settempimg((temp) => [...temp, cfile]);
          //   toast.info(`image compressed ${k}`);
        })
        .catch(function (error) {
          console.log(error.message);
          //  toast.info(error.message);
          //  toast.info(error);
        });
      // settempimg((temp) => [...temp, e.target.files[k]]);
    }
    // setimage(temp=>[...temp,"dummy"]);
  }
  async function uploadmedia(e) {
    setimage([]);
    setimage2([]);
    compressimage(e);
  }
  function uploadmediatemp(e) {
    //  toast.info("func called");
    console.log(e);
    compressimage(e);
  }

  const showimage = (e) => {
    setmflag(true);
    setmimage(e.target.src);
    console.log(e);
  };

  const pdet = (e, prop) => {
    history.push(`pdetails/${prop}`);
    console.log(prop);
  };
  const vieworder = (prop) => {
    console.log("click", prop);
    history.push(`mybookings/id/${prop}`);
  };
  const delchat = async (prop) => {
    if ((await disablechat(prop)) == 200) toast.info("chat deleted");
    else toast.info("unable to delete chat try again later");
  };

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };

  async function sharemydet() {
    let details = await sharemydetails(firebase.auth().currentUser.uid);
    console.log(details);
    settypemsg(
      `contact me at name : ${details.name}  phone: ${details.phone} / ${details.altnum}`
    );
  }

  const [scrollDisplay, setScrolldisplay] = useState(false);
  const [tbody, settbody] = useState([]);
  function scrollhandle(e) {
    //console.log(e,"scrolling mobile");
    const scrolly = scrollref.current.scrollHeight;
    const scrolltop = scrollref.current.scrollTop;
    const clientheight = scrollref.current.clientHeight;
    //console.log(scrolly, scrolltop, clientheight);
    if (scrolly - scrolltop == clientheight) {
      setScrolldisplay(false);
      if (tbody != chat.body) {
        umread();
        settbody(chat.body);
        console.log("message read");
      }
      //console.log("bottom scroll");
    } else {
      //console.log("top scroll")
      setScrolldisplay(true);
    }
  }

  if (widths <= 1000) {
    return (
      <div style={{ float: "right", width: "100%", overflowY: "auto" }}>
        {/* {showChat ?  */}
        <List className="chatHead" horizontal>
          <List.Item>
            <BiArrowBack
              style={{
                width: "50px",
                fontSize: "24px",
                background: "rgba(255, 255, 255, 0.92)",
              }}
              onClick={handleInputChange}
            />
            <Image avatar src={props.chat.ppic} />
            <List.Content>
              <List.Header>{props.chat.pname}</List.Header>
              computer technician
            </List.Content>
          </List.Item>
          <List.Item style={{ float: "right", marginRight: "20px" }}>
            <a href={"tel: +91 " + pdetails.phone}>
              <MdPhone
                size="1.5rem"
                id="hgffj"
                color="black"
                style={{ marginRight: "10px" }}
                onClick={console.log("phone number clicked")}
              />
            </a>
            <Dropdown
              item
              icon="ellipsis vertical"
              backgroundColor="white"
              simple
              direction="left"
              color="white"
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={(e) => {
                    // alert("make a call");
                    toast.info(`+91 ${pdetails.phone}`);
                    setmimage(`+91 ${pdetails.phone}`);
                  }}
                >
                  <MdPhone /> Make A Call
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={(e) => {
                    pdet(e, props.chat.partnerid);
                  }}
                >
                  <MdPerson /> Technician details
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    vieworder(props.chat.orderid);
                  }}
                >
                  <MdRemoveRedEye /> View job
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    delchat(props.chat.id);
                  }}
                >
                  <MdDelete /> Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </List.Item>
        </List>
        {/* : null} */}

        {ordst == 0 ? (
          <Button.Group
            style={{ width: "100%" }}
            onClick={orderstatus}
            id={props.chat.id}
          >
            <Button>
              <MdThumbDown /> Cancel partner
            </Button>
            <Button.Or />
            <Button primary>
              <MdThumbUp />
              Confirm partner
            </Button>
          </Button.Group>
        ) : null}

        <div
          className="chatdiv"
          style={{ overflow: "auto" }}
          ref={scrollref}
          onScroll={(e) => {
            scrollhandle(e);
          }}
        >
          {chat.body.map((nap, key, array) => {
            var chatobj = JSON.parse(nap);
            return (
              <div className={chatobj.sender == "u" ? "out-chat" : "in-chat"}>
                <p className={cmpmsg(nap, array[key - 1]) ? "cmpmsg" : null}>
                  {cmpmsg(nap, array[key - 1])}
                </p>

                <div
                  className={
                    chatobj.sender == "u" ? "out-chatbox" : "in-chatbox"
                  }
                  key={key}
                  id={key == chat.body.length - 1 ? "scrolltobottom" : null}
                >
                  {chatobj.type == "text" ? (
                    <p
                      className={
                        chatobj.sender == "u" ? "chatList" : "chatListp"
                      }
                    >
                      {chatobj.msg}

                      <small
                        className={
                          chatobj.sender == "u" ? "textTime" : "textTimep"
                        }
                      >
                        {" "}
                        {getmsgtime(chatobj.timestamp)}
                      </small>
                    </p>
                  ) : chatobj.type == "photo" ? (
                    <Image
                      floated={chatobj.sender == "u" ? "right" : "left"}
                      className="chatPic"
                      onClick={showimage}
                      src={chatobj.msg}
                      size="small"
                    />
                  ) : null}
                </div>
                {/* <UniversalM /> */}
              </div>
            );
          })}

          {JSON.parse(chat.body[chat.body.length - 1]).sender == "u" ? (
            <div>
              <p>
                <small className={chat.pread ? "readText" : "unreadText"}>
                  {chat.pread ? "seen" : "unseen"}
                </small>
              </p>
            </div>
          ) : null}
          {scrollDisplay ? (
            <a href="#scrolltobottom" id="scrollbtn">
              <MdArrowDropDownCircle
                size="3rem"
                style={{ position: "fixed", bottom: "150px", float: "right" }}
              />
            </a>
          ) : (
            <a href="#scrolltobottom" id="scrollbtn">
              <MdArrowDropDownCircle
                size="3rem"
                style={{
                  position: "fixed",
                  bottom: "150px",
                  float: "right",
                  display: "none",
                }}
              />
            </a>
          )}
        </div>

        <Form.Group
          className="chat-form"
          style={{
            position: "fixed",
            bottom: "2px",
            margin: "0",
            backgroundColor: "#f6f6f6",
          }}
        >
          <Row className="align-items-center" noGutters>
            {/* <input type='file' id={props.chat.id} ref={inputFile} accept="image/x-png,image/gif,image/jpeg" onChange={uploadmedia} style={{display: 'none'}} multiple/> */}
            <input
              type="file"
              id={props.chat.id}
              ref={inputFile}
              accept="image/x-png,image/gif,image/jpeg"
              onChange={uploadmediatemp}
              style={{ display: "none" }}
              multiple
            />

            <Col className="chatformicons" xs={2}>
              {" "}
              <MdAddToPhotos
                style={{ marginLeft: "20px" }}
                onClick={mediashare}
                size="2rem"
                color="gray"
              />
              <Dropdown style={{ marginLeft: "15px" }}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="address card"
                    text="Share your Contact Details"
                    onClick={sharemydet}
                  />
                  <Dropdown.Item icon="trash" text="Move to trash" />
                  <Dropdown.Divider />
                  <Dropdown.Item text="E-mail Collaborators" />
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xs={6}>
              <Form.Control
                type="text"
                placeholder="Message Here"
                value={typemsg}
                onChange={(e) => {
                  settypemsg(e.target.value);
                }}
                id="msgtext"
              />
            </Col>
            <Col className="chatformicons" xs={4}>
              <a href="#scrolltobottom">
                {" "}
                <Button
                  primary
                  style={{ marginLeft: "20px" }}
                  className="chatSend"
                  id={props.chat.id}
                  ref={divRef}
                  onClick={(e) => click(props.chat.id)}
                >
                  Send
                  <MdSend />
                </Button>
              </a>
            </Col>
          </Row>
        </Form.Group>
        <ImageModal
          className="uploadModal"
          image={mimage}
          setflag={setmimage}
        />
        <ImageModal2
          image={tempimg}
          flag={setupload}
          setimage={settempimg}
          addmore={mediashare}
          removeitems={removeitems}
        />
      </div>
    );
  } else {
    return (
      <div style={{ float: "right", width: "100%", overflowY: "auto" }}>
        <List className="chatHead" horizontal>
          <List.Item
            onClick={(e) => {
              pdet(e, props.chat.partnerid);
            }}
            style={{ cursor: "pointer" }}
          >
            <Image avatar src={pdetails.profilepic} />
            <List.Content>
              <List.Header>
                <b style={{ fontSize: "19px" }}>{pdetails.name}</b>{" "}
                <small>
                  {pdetails.rate > 5 ? pdetails.rate / 20 : pdetails.rate}
                  <MdStar color="yellow" size="1.1rem" />
                </small>
              </List.Header>
              {/* {pdetails.businessname} */}
              Title here
            </List.Content>
          </List.Item>
          <List.Item style={{ float: "right", marginRight: "20px" }}>
            <a href={"tel: +91 " + pdetails.phone}>
              <MdPhone
                size="1.5rem"
                id="hgffj"
                color="black"
                style={{ marginRight: "10px" }}
                onClick={console.log("phone number clicked")}
              />
            </a>

            <Dropdown
              item
              icon="ellipsis vertical"
              backgroundColor="white"
              simple
              direction="left"
              color="white"
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={(e) => {
                    // alert("make a call");
                    toast.info(`+91 ${pdetails.phone}`);
                    setmimage(`+91 ${pdetails.phone}`);
                  }}
                >
                  <MdPhone /> Make A Call
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={(e) => {
                    pdet(e, props.chat.partnerid);
                  }}
                >
                  <MdPerson /> Technician details
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    vieworder(props.chat.orderid);
                  }}
                >
                  <MdRemoveRedEye /> View job
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    delchat(props.chat.id);
                  }}
                >
                  <MdDelete /> Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </List.Item>
        </List>
        {ordst == 0 ? (
          <Button.Group
            style={{ width: "100%" }}
            onClick={orderstatus}
            id={props.chat.id}
          >
            <Button>
              <MdThumbDown /> Cancel partner
            </Button>
            <Button.Or />
            <Button primary>
              <MdThumbUp />
              Confirm partner
            </Button>
          </Button.Group>
        ) : null}

        <div
          className="chatdiv"
          // style={{ overflow: "auto", paddingBottom: "10px" }}
          ref={scrollref}
          onScroll={(e) => {
            scrollhandle(e);
          }}
        >
          {chat.body.map((nap, key, array) => {
            var chatobj = JSON.parse(nap);
            return (
              <div className={chatobj.sender == "u" ? "out-chat" : "in-chat"}>
                <p className={cmpmsg(nap, array[key - 1]) ? "cmpmsg" : null}>
                  {cmpmsg(nap, array[key - 1])}
                </p>

                <div
                  className={
                    chatobj.sender == "u" ? "out-chatbox" : "in-chatbox"
                  }
                  key={key}
                  id={key == chat.body.length - 1 ? "scrolltobottom" : null}
                >
                  {chatobj.type == "text" ? (
                    <p
                      className={
                        chatobj.sender == "u" ? "chatList" : "chatListp"
                      }
                    >
                      {chatobj.msg}

                      <small
                        className={
                          chatobj.sender == "u" ? "textTime" : "textTimep"
                        }
                      >
                        {" "}
                        {getmsgtime(chatobj.timestamp)}
                      </small>
                    </p>
                  ) : chatobj.type == "photo" ? (
                    <Image
                      floated={chatobj.sender == "u" ? "right" : "left"}
                      className="chatPic"
                      onClick={showimage}
                      src={chatobj.msg}
                      size="small"
                    />
                  ) : null}
                </div>
                {/* <UniversalM /> */}
              </div>
            );
          })}

          {JSON.parse(chat.body[chat.body.length - 1]).sender == "u" ? (
            <div>
              <p>
                <small className={chat.pread ? "readText" : "unreadText"}>
                  {chat.pread ? "seen" : "unseen"}
                </small>
              </p>
            </div>
          ) : null}
          {scrollDisplay ? (
            <a href="#scrolltobottom" id="scrollbtn">
              <MdArrowDropDownCircle
                size="3rem"
                style={{ position: "fixed", bottom: "150px", float: "right" }}
              />
            </a>
          ) : (
            <a href="#scrolltobottom" id="scrollbtn">
              <MdArrowDropDownCircle
                size="3rem"
                style={{
                  position: "fixed",
                  bottom: "150px",
                  float: "right",
                  display: "none",
                }}
              />
            </a>
          )}
        </div>

        <Form.Group
          className="chat-form"
          onKeyDown={onKeyDownHandler}
          style={{
            position: "fixed",
            bottom: "2px",
            margin: "0",
            backgroundColor: "#f6f6f6",
            minHeight: "50px",
          }}
        >
          <Row style={{ margin: "0", marginTop: "20px" }}>
            <input
              type="file"
              id={props.chat.id}
              ref={inputFile}
              accept="image/x-png,image/gif,image/jpeg"
              onChange={uploadmediatemp}
              style={{ display: "none" }}
              multiple
            />

            <Col xs={2}>
              {" "}
              <MdAddToPhotos
                onClick={mediashare}
                style={{ cursor: "pointer" }}
                size="2rem"
                color="gray"
              />
              <Dropdown text="More" style={{ marginLeft: "15px" }}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon="address card"
                    text="Share your Contact Details"
                    onClick={sharemydet}
                  />
                  <Dropdown.Item icon="trash" text="Move to trash" />
                  <Dropdown.Divider />
                  <Dropdown.Item text="E-mail Collaborators" />
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col xs={8} style={{ marginRight: "0" }}>
              <Form.Control
                type="text"
                //   style={{ height: "100px" }}
                placeholder="Message Here"
                value={typemsg}
                onChange={(e) => {
                  settypemsg(e.target.value);
                }}
                id="msgtext"
              />
              {/* <TextArea
                style={{ minHeight: "50px", minWidth: "300px" }}
                placeholder="Enter Message Here"
                onKeyDown={handleKeyDown}
              /> */}
            </Col>
            <Col xs={2} style={{ marginRight: "0" }}>
              <Button
                primary
                className="chatSend"
                id={props.chat.id}
                ref={divRef}
                onClick={(e) => click(props.chat.id)}
              >
                Sendw
                <MdSend />
              </Button>
              {/* <MdSend size="2rem" color="grey" /> */}
            </Col>
            {/* <Button primary className="chatSend" id={props.chat.id} ref={divRef} onClick={(e)=>tsend(e,props.chat.id)}>tSend<MdSend /></Button></Col> */}
          </Row>
        </Form.Group>
        {/* <Imageviewer image={mimage} /> */}
        <ImageModal
          className="uploadModal"
          image={mimage}
          setflag={setmimage}
        />
        <ImageModal2
          image={tempimg}
          flag={setupload}
          setimage={settempimg}
          addmore={mediashare}
          removeitems={removeitems}
        />
      </div>
    );
  }

  function cmpmsg(msg1, msg2) {
    let temp1 = JSON.parse(msg1);
    let temp2 = msg2 == undefined ? JSON.parse(msg1) : JSON.parse(msg2);

    let ct = Number(temp1.timestamp);
    let pt = Number(temp2.timestamp);
    if (gettbystamps(ct, "date") != gettbystamps(pt, "date")) {
      let temp = gettbystamps(ct, "fulldate");
      return temp;
    } else if (msg2 == undefined) {
      let temp = gettbystamps(ct, "fulldate");
      return temp;
    } else return null;
  }

  function removeitems(data) {
    console.log(data);
    settempimg(data);
  }
}
function getmsgtime(nap) {
  // let stamps = countSpecial(nap);
  let msgtime = gettbystamps(Number(nap), "time");
  return msgtime;
}
function Headings() {
  return (
    <div className="resHead">
      <Row style={{ width: "100%", textAlign: "center" }}>
        <Col>
          <Link to="/chat" style={{ color: "gray", textDecoration: "none" }}>
            <h2>
              <MdFeaturedPlayList size="2.1rem" color="gray" /> Responses
            </h2>
          </Link>
        </Col>
        <Col style={{ borderBottom: "3px solid #007bff", marginBottom: "0" }}>
          <Link
            to="/chats-section"
            style={{ color: "#007bff", textDecoration: "none" }}
          >
            <h2>
              {" "}
              <MdChatBubble size="2.1rem" color="#007bff" /> Chats
            </h2>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

function ImageModal(props) {
  const [open, setOpen] = useState(false);
  var image = props.image;
  var setflag = props.setflag;

  const handleInputChange = useCallback(
    (event) => {
      setflag(false);
    },
    [setflag]
  );

  const closemodal = () => {
    handleInputChange();
    setOpen(false);
  };
  useEffect(() => {
    if (image != false && image != null) {
      setOpen(true);
    }
    console.log(image);
  }, [image]);

  // function ValidURL(str) {
  //   var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  //   if (!regex.test(str)) {
  //     // alert("Please enter valid URL.");
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  return (
    <Modal
      basic
      onClose={closemodal}
      onOpen={() => setOpen(true)}
      open={open}
      // size="tiny"
      className="uploadModal"
      // trigger={<Button>Show Modal</Button>}
    >
      {/* <Modal.Header>Photo</Modal.Header> */}
      {image != null ? (
        <Modal.Content image>
          {ValidURL(image) ? (
            <Image centered src={image} wrapped />
          ) : (
            <Modal.Description>
              <p>{image}</p>
            </Modal.Description>
          )}
        </Modal.Content>
      ) : null}
      <Modal.Actions>
        <Button basic color="red" inverted onClick={closemodal}>
          <MdClose /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

function ImageModal2(props) {
  const [open, setOpen] = useState(false);
  const [image, setimage] = useState([]);

  useEffect(() => {
    setimage(props.image);
    console.log("images change");
  }, [props.image]);

  useEffect(() => {
    if (image.length > 0) setOpen(true);
    if (image.length <= 0) setOpen(false);
    console.log(image);
  }, [image]);

  const handleInputChange = useCallback(
    (event) => {
      props.flag(true);
      setOpen(false);
    },
    [props.flag]
  );

  const sekhararr = (e) => {
    console.log(e.target.parentElement.parentElement.id);
    let ritem = image[e.target.parentElement.parentElement.id];

    props.setimage(image.filter((e) => e !== ritem));
  };
  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      centered
      size="tiny"
      className="uploadModal"
      // trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>Upload image</Modal.Header>
      <Modal.Content scrolling>
        {image.length > 0 ? (
          <Image.Group size="small">
            {image.map((nap, key) => (
              <Image
                key={key}
                id={key}
                label={{
                  as: "a",
                  corner: "right",
                  icon: "trash",
                  onClick: sekhararr,
                }}
                src={URL.createObjectURL(nap)}
              />
            ))}
            <RiImageAddFill
              onClick={props.addmore}
              color="gray"
              style={{ cursor: "pointer" }}
            />
          </Image.Group>
        ) : null}
      </Modal.Content>

      <Modal.Actions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleInputChange} positive>
          Send
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

function Empty() {
  return <div></div>;
}
