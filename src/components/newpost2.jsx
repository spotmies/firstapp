import React, { Component } from "react";

import {
  Button,
  Form,
  Input,
  TextArea,
  Card,
  Label,
  Image,
  Modal,
  Menu,
} from "semantic-ui-react";

import { InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

import { BsCalendar } from "react-icons/bs";
import { Link } from "react-router-dom";
import imageCompression from "browser-image-compression";
import "./rental.css";

import {
  MdLaptopMac,
  MdTv,
  MdEventNote,
  MdDriveEta,
  MdFace,
  MdCheckCircle,
  MdFileUpload,
} from "react-icons/md";
import { BiCodeBlock } from "react-icons/bi";
import { FaChalkboardTeacher, FaTools } from "react-icons/fa";
import { IoCameraSharp } from "react-icons/io5";

import firebase from "../firebase";
import "firebase/storage";
import { createHashHistory } from "history";

import "../post.css";

const history = createHashHistory();

const db = firebase.firestore();
const storage = firebase.storage();

//var imgarr=['https://www.w3schools.com/howto/img_snow.jpg','https://www.w3schools.com/howto/img_snow.jpg'];

var imgarr = [];
var jobcate;

export default function newpost2() {
  return (
    <div>
      {/* <div className="comingSoon">
        <h1 className="soonText">Coming Soon ...</h1>
        </div> */}
      <Postnew />
    </div>
  );
}

function Postnew() {
  return (
    <div style={{ paddingTop: "20px" }}>
      <Card centered id="formcard" className="postjobb1">
        <Card.Content>
          <Card.Header style={{ textAlign: "center" }}>New Post</Card.Header>
        </Card.Content>
        <Card.Content>
          <Postform />
        </Card.Content>
      </Card>
      <ModalExampleModal />
    </div>
  );
}
var src = "https://www.w3schools.com/howto/img_snow.jpg";

class Postform extends Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  //from old

  //date picker code here

  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      sekcate: "",
      arrayvar: [],
      mopen: false,
      image: [],
      imgurl: "",
      valprogress: 0,
      addsubmit: false,
      pflag: false,
    };
    this.handleChange2 = this.handleChange2.bind(this);
  }

  handleChange2(date) {
    console.log(this.state.arrayvar);

    this.setState({
      startDate: date,
    });
  }

  componentDidUpdate() {
    if (this.state.image.length > 0) {
      if (this.state.image.length == this.state.arrayvar.length) {
        this.handleSubmit();
      }
    }
  }

  handleSubmit = async () => {
    // event.preventDefault();
    console.log(this.state.arrayvar);
    let schedule = this.state.startDate;
    let name = document.querySelector("#nameofserv").value;
    let desc = document.querySelector("#sdesc").value;

    let cat = jobcate;
    let price = document.querySelector("#sprice").value;
    if (desc == NaN) desc = "";
    if (cat == "true") {
      alert("please select category");
      toast.warning("please select category");
    } else {
      cat = parseInt(cat);
      price = parseInt(price);
      console.log(name, desc, cat, price, imgarr, schedule);
      const newpost = db
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("adpost")
        .doc();
      var d = new Date();
      console.log(d);
      newpost
        .set({
          job: cat,
          problem: name,
          description: desc,
          money: price,
          userid: firebase.auth().currentUser.uid,
          orderid: newpost.id,
          media: this.state.arrayvar,
          request: "nothing",
          posttime: d,
          views: 0,
          location: "seethammadhara",
          schedule: schedule,
          orderstate: null,
          fback: null,
        })
        .then(() => {
          return db.collection("allads").doc(newpost.id).set({
            job: cat,
            problem: name,
            description: desc,
            money: price,
            userid: firebase.auth().currentUser.uid,
            orderid: newpost.id,
            media: this.state.arrayvar,
            request: "nothing",
            posttime: d,
            views: 0,
            location: "seethammadhara",
            schedule: schedule,
            orderstate: null,
            fback: null,
          });
        })
        .then(() => {
          // alert("post added successfully");
          toast.success("post added successfully");
          history.go(-1);
          imgarr = [];
          this.setState({ image: [], addsubmit: false, arrayvar: [] });
        });
    }
  };

  handleChangeg = (e) => {
    const options = {
      maxSizeMB: 0.15,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    let cfile;

    // this.setState({image:[]})
    for (var i = 0; i < e.target.files.length; i++) {
      let k = Number(i);

      imageCompression(e.target.files[k], options)
        .then((x) => {
          cfile = x;
          this.setState({
            image: this.state.image.concat([cfile]),
          });
          console.log(cfile);
          document.getElementById("upldbtn").style.display = "block";
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  };

  handleUpload = async (e) => {
    e.preventDefault();
    document.getElementById("uploaderb").style.display = "block";
    document.getElementById("upldbtn").style.display = "none";

    console.log(this.state.image);
    console.log(this.state.image.length);
    for (var i = 0; i < this.state.image.length; i++) {
      console.log(`img no ${i}`);
      let k = Number(i);
      const uploadTask = storage
        .ref(
          `users/${firebase.auth().currentUser.uid}/adpost/${
            this.state.image[k].name
          }`
        )
        .put(this.state.image[k]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // setProgress(progress);
          this.setState({ valprogress: progress });
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref(`users/${firebase.auth().currentUser.uid}/adpost/`)
            .child(this.state.image[k].name)
            .getDownloadURL()
            .then((url) => {
              //setUrl(url);
              console.log(url);

              this.setState({
                arrayvar: this.state.arrayvar.concat([url]),
              });
            });
        }
      );
    }
    if (this.state.image.length < 1) this.handleSubmit();
  };

  newfunk = (e) => {
    console.log(e.target.id);
    this.setState({ jobcate: e.target.id });
    this.setState({ mopen: true });
  };

  sekhararr = (e) => {
    console.log(e.target.parentElement.parentElement.id);
    let ritem = this.state.image[e.target.parentElement.parentElement.id];
    this.setState({
      image: this.state.image.filter((e) => e !== ritem),
    });
    console.log(this.state.image);
    //setimage(image.filter((e)=>(e !== ritem)))
  };
  pricetag = (flag) => {
    if (flag == "yes") this.setState({ pflag: true });
    else this.setState({ pflag: false });
  };

  render() {
    const { value } = this.state;
    return (
      <Form className="postjobb" onSubmit={this.handleUpload}>
        <Form.Group widths="equal">
          <Form.Field
            required
            control={Input}
            label="Name of Service"
            placeholder="enter name of service"
            id="nameofserv"
            className="nameofser"
          />
        </Form.Group>

        <Form.Field
          control={TextArea}
          label="Description"
          id="sdesc"
          placeholder="Tell us more about your problem or any note here..."
        />
        <Form.Field>
          <Form.Field>
            <b>Select Date</b>
          </Form.Field>
          <Form.Field>
            <InputGroup className="mb-2">
              <InputGroup.Prepend className="nameofser">
                <InputGroup.Text>
                  {" "}
                  <BsCalendar size="1.3em" />
                </InputGroup.Text>
              </InputGroup.Prepend>

              <DatePicker
                // className="datepicker"
                selected={this.state.startDate}
                placeholderText="when you want service"
                onChange={this.handleChange2}
                minDate={new Date()}
                name="startDate"
                showTimeSelect
                timeFormat="HH:mm"
                todayButton="Today"
                timeIntervals={60}
                timeCaption="time"
                // dateFormat="dd/MM/yyyy"
                dateFormat="MMMM d, yyyy h:mm aa"
                withPortal
                required
              />
            </InputGroup>
          </Form.Field>

          <b style={{ fontWeight: "800" }}> Enter Amount </b>
          <Button.Group size="tiny">
            <Button
              type="button"
              onClick={() => {
                this.pricetag("yes");
              }}
            >
              Yes
            </Button>
            <Button.Or />
            <Button
              type="button"
              onClick={() => {
                this.pricetag("no");
              }}
            >
              No
            </Button>
          </Button.Group>
          {this.state.pflag ? <Pricefield /> : null}
        </Form.Field>

        <div style={{ display: "inline-block" }}>
          <Form.Field>
            <Input
              icon="photo"
              iconPosition="Right"
              type="file"
              placeholder="Enter tags"
              // onChange={this.upldimg}
              accept=".gif,.jpg,.jpeg,.png"
              onChange={this.handleChangeg}
              multiple
            />
          </Form.Field>
        </div>
        <progress value={this.state.valprogress} max="100" id="uploaderb">
          progress
        </progress>

        <div>
          <Image.Group size="small">
            {this.state.image.map((nap, key) => (
              <Image
                fluid
                key={key}
                id={key}
                label={{
                  as: "a",
                  corner: "right",
                  icon: "trash",
                  onClick: this.sekhararr,
                }}
                src={URL.createObjectURL(nap)}
              />
            ))}
          </Image.Group>
        </div>

        <Form.Field control={Button} type="submit" centered color="primary">
          <MdCheckCircle size="1.3rem" style={{ textAlign: "left" }} />
          Submit
        </Form.Field>
      </Form>
    );
  }
}

function Pricefield() {
  return (
    <Input
      labelPosition="right"
      type="number"
      id="sprice"
      placeholder="Amount"
      style={{ width: "60%" }}
    >
      <Label basic>₹</Label>
      <input />
      <Label>.00</Label>
    </Input>
  );
}

function ModalExampleModal() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      //  history.go('/login')
      console.log("user login");
      document.getElementById("redirectsignup").click();
    }
  });

  var imgsrc =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorgraphit.com%2Ffree-svg-illustrations-for-your-next-website-or-blog%2Famp&psig=AOvVaw28FMPvsnbckOWg5KwrbFDM&ust=1614586813687000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLDUruGSjO8CFQAAAAAdAAAAABAJ";
  const [open, setOpen] = React.useState(true);

  function click(e) {
    console.log(e.target.dataset.txt);
    jobcate = e.target.dataset.txt;
    setOpen(false);
  }

  return (
    <>
      <div>
        <Modal
          size="small"
          centered
          // style={{marginLeft:"auto",marginRight:"auto",display:"block",width:"70%"}}
          className="categoryModal"
          onOpen={() => setOpen(true)}
          open={open}
        >
          <Modal.Header className="categoryMheader">
            Select Job Category
          </Modal.Header>
          <Modal.Content></Modal.Content>
          <Card centered id="jobcate">
            <Card.Content>
              <Card.Header>Select Category here</Card.Header>
            </Card.Content>
            <Card.Content>
              <Menu vertical centered style={{ width: "auto" }}>
                <Menu.Item link data-txt="0" onClick={click}>
                  <FaTools size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Ac/Refrigirator Service
                </Menu.Item>
                <Menu.Item link data-txt="1" onClick={click}>
                  <MdLaptopMac size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Computer/Laptop Service
                </Menu.Item>
                <Menu.Item link data-txt="2" onClick={click}>
                  <MdTv size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Tv Repair
                </Menu.Item>
                <Menu.Item link data-txt="9" onClick={click}>
                  <MdEventNote size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Electrician
                </Menu.Item>
                <Menu.Item link data-txt="12" onClick={click}>
                  <MdEventNote size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Interior Design
                </Menu.Item>
                <Menu.Item link data-txt="13" onClick={click}>
                  <MdEventNote size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Design
                </Menu.Item>
                <Menu.Item link data-txt="3" onClick={click}>
                  <BiCodeBlock size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Development
                </Menu.Item>
                <Menu.Item link data-txt="8" onClick={click}>
                  <MdEventNote size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Events
                </Menu.Item>
                <Menu.Item link data-txt="5" onClick={click}>
                  <MdFace size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Beauty
                </Menu.Item>
                <Menu.Item link data-txt="4" onClick={click}>
                  <FaChalkboardTeacher size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Tutor
                </Menu.Item>
                <Menu.Item link data-txt="6" onClick={click}>
                  <IoCameraSharp size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Photographer
                </Menu.Item>
                <Menu.Item link data-txt="7" onClick={click}>
                  <MdDriveEta size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Driver
                </Menu.Item>
                <Menu.Item link data-txt="10" onClick={click}>
                  <MdEventNote size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Carpenter
                </Menu.Item>
                <Menu.Item link data-txt="11" onClick={click}>
                  <MdEventNote size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Plumber
                </Menu.Item>
                <Menu.Item link data-txt="14" onClick={click}>
                  <MdEventNote size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; CC Tv Installation
                </Menu.Item>
                <Menu.Item link data-txt="15" onClick={click}>
                  <MdEventNote size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Catering
                </Menu.Item>
              </Menu>
              <Link to="/signup" style={{ display: "none" }}>
                <p id="redirectsignup">signup</p>
              </Link>
            </Card.Content>
          </Card>
        </Modal>
      </div>
    </>
  );
}
