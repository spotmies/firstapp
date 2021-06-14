import React, { Component, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  Form,
  Input,
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
import FullScreenLoader from "../../reusable/helpers";
import { BsCalendar, BsHammer, BsHouseFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import imageCompression from "browser-image-compression";
import "../rentals/rental.css";

import {
  MdLaptopMac,
  MdTv,
  MdDriveEta,
  MdFace,
  MdCheckCircle,
  MdEventAvailable,
  MdBuild,
  MdLocalDining,
  MdMonochromePhotos,
} from "react-icons/md";
import { BiCodeBlock } from "react-icons/bi";
import { FaChalkboardTeacher, FaTools, FaScrewdriver } from "react-icons/fa";
import { BiCctv } from "react-icons/bi";
import { DiPhotoshop } from "react-icons/di";
import firebase from "../../../firebase";
import "firebase/storage";
import { createHashHistory } from "history";
import "../../../post.css";
import ComingSoon from "../../reusable/coming_soon_widget";
import { categoryAssign } from "../../../helpers/categories";
import { createNewServiceRequest } from "../../controllers/new_post/order_controller";

const history = createHashHistory();

const storage = firebase.storage();

class Postnew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: null,
      openJobModal: true,
      loader: false,
    };
  }
  eventLoader = (value) => {
    this.setState({ loader: value });
  };
  updateJob = (value) => {
    console.log(this.props);
    this.setState({
      job: value,
      openJobModal: false,
    });
  };
  triggerJobModal = (value) => {
    console.log("triggered", value);
    this.setState({ openJobModal: value });
  };
  render() {
    // console.log(this.props);
    return (
      <>
        <ComingSoon />
        <FullScreenLoader loader={this.state.loader} data="Please wait...." />

        <div
          style={{
            paddingTop: "20px",
          }}
        >
          <Card centered id="formcard" className="postjobb1">
            <Card.Content>
              <Card.Header
                style={{
                  textAlign: "center",
                }}
              >
                New Post
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <Postform
                job={this.state.job}
                triggerJobModal={this.triggerJobModal}
                eventLoader={this.eventLoader}
                addNewOrder={this.props.addNewOrder}
              />
            </Card.Content>
          </Card>
          <ModalExampleModal
            job={this.state.job}
            updateJob={this.updateJob}
            trigger={this.state.openJobModal}
          />
        </div>
      </>
    );
  }
}
class Postform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: "",
      media: [],
      image: [],
      valprogress: 0,
      pflag: false,
      addPosted: false,
      uId: firebase.auth().currentUser.uid,
      //controllers
      problemController: React.createRef(),
      descriptionController: React.createRef(),
      moneyController: React.createRef(),
      scheduleController: React.createRef(),
    };
    this.updateSchedule = this.updateSchedule.bind(this);
  }

  updateSchedule(date) {
    console.log(new Date(date).valueOf());
    this.setState({
      schedule: new Date(date).valueOf(),
    });
  }

  componentDidUpdate() {
    if (this.state.image.length > 0 && this.state.addPosted == false) {
      if (this.state.image.length == this.state.media.length) {
        this.handleSubmit();
      }
    }
  }

  handleSubmit = async () => {
    const state = this.state;
    let reqObj = {
      join: new Date().valueOf(),
      problem: state.problemController.current.value,
      desc: state.descriptionController.current.value,
      money: state.moneyController.current
        ? state.moneyController.current.value
        : null,
      schedule: state.schedule,
      job: this.props.job,
      loc: [17.686815, 83.218483],
      media: this.state.media,
      ordState: "0",
      ordId: new Date().valueOf(),

      uId: this.state.uId,
    };

    console.log(reqObj);
    let response = await createNewServiceRequest(reqObj.uId, reqObj);
    this.setState({ addPosted: true });
    if (response != false) {
      this.props.addNewOrder(response);
      this.props.eventLoader(false);
      toast.info("service requested");
      console.log(response);
    } else {
      console.log("request not done");
      console.log(response);
    }
  };

  compressImages = (e) => {
    const options = {
      maxSizeMB: 0.15,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    let cfile;

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

  uploadImageToCloud = async (e) => {
    e.preventDefault();
    this.props.eventLoader(true);
    document.getElementById("uploaderb").style.display = "block";
    // document.getElementById("upldbtn").style.display = "none";

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
                media: this.state.media.concat([url]),
              });
            });
        }
      );
    }
    if (this.state.image.length < 1) this.handleSubmit();
  };

  deleteImage = (e) => {
    console.log(e.target.parentElement.parentElement.id);
    let ritem = this.state.image[e.target.parentElement.parentElement.id];
    this.setState({
      image: this.state.image.filter((e) => e !== ritem),
    });
    console.log(this.state.image);
  };

  pricetag = (flag) => {
    this.setState({ pflag: flag });
  };

  changeJob = () => {
    this.props.triggerJobModal(true);
  };

  render() {
    return (
      <>
        <Form className="postjobb" onSubmit={this.uploadImageToCloud}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Title of Your problem</label>
              <input
                required
                placeholder="enter name of service"
                id="nameofserv"
                className="nameofser"
                ref={this.state.problemController}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field>
            <label>Description</label>
            <textarea
              rows="3"
              label="Description"
              placeholder="Tell us more about you..."
              ref={this.state.descriptionController}
            />
          </Form.Field>
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
                  selected={this.state.schedule}
                  placeholderText="when you want service"
                  onChange={this.updateSchedule}
                  minDate={new Date()}
                  name="schedule"
                  showTimeSelect
                  timeFormat="HH:mm"
                  todayButton="Today"
                  timeIntervals={60}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  withPortal
                  autoComplete="off"
                  ref={this.state.scheduleController}
                  required
                />
              </InputGroup>
            </Form.Field>

            <b style={{ fontWeight: "800" }}> Enter Amount </b>
            <Button.Group size="tiny">
              <Button
                type="button"
                onClick={() => {
                  this.pricetag(true);
                }}
              >
                Yes
              </Button>
              <Button.Or />
              <Button
                type="button"
                onClick={() => {
                  this.pricetag(false);
                }}
              >
                No
              </Button>
            </Button.Group>
            {this.state.pflag ? (
              <Input
                labelPosition="right"
                type="number"
                id="sprice"
                placeholder="Amount"
                style={{ width: "60%" }}
              >
                <Label basic>₹</Label>
                <input ref={this.state.moneyController} />
                <Label>.00</Label>
              </Input>
            ) : null}
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
                onChange={this.compressImages}
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
                    onClick: this.deleteImage,
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

          <p>{categoryAssign(this.props.job)}</p>
          <p onClick={this.changeJob}>change</p>
        </Form>
      </>
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
      ref={this.state.moneyController}
    >
      <Label basic>₹</Label>
      <input />
      <Label>.00</Label>
    </Input>
  );
}

function ModalExampleModal(props) {
  useEffect(() => {
    if (props.trigger) {
      setOpen(props.trigger);
    }
  }, [props.trigger]);
  const [open, setOpen] = React.useState(props.trigger);

  const click = useCallback((e) => {
    console.log(e.target.dataset.txt);
    props.updateJob(e.target.dataset.txt);
    setOpen(false);
  });

  return (
    <>
      <div>
        <Modal
          size="small"
          centered
          className="categoryModal"
          onOpen={() => setOpen(true)}
          open={open}
        >
          <Modal.Header className="categoryMheader">
            {/* Select Job Category */}
            Available Services
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
                  <FaScrewdriver size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Electrician
                </Menu.Item>
                <Menu.Item link data-txt="12" onClick={click}>
                  <BsHouseFill size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Interior Design
                </Menu.Item>
                <Menu.Item link data-txt="13" onClick={click}>
                  <DiPhotoshop size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Design
                </Menu.Item>
                <Menu.Item link data-txt="3" onClick={click}>
                  <BiCodeBlock size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Development
                </Menu.Item>
                <Menu.Item link data-txt="8" onClick={click}>
                  <MdEventAvailable size="1.5rem" />
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
                  <MdMonochromePhotos size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Photographer
                </Menu.Item>
                <Menu.Item link data-txt="7" onClick={click}>
                  <MdDriveEta size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Driver
                </Menu.Item>
                <Menu.Item link data-txt="10" onClick={click}>
                  <BsHammer size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Carpenter
                </Menu.Item>
                <Menu.Item link data-txt="11" onClick={click}>
                  <MdBuild size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; Plumber
                </Menu.Item>
                <Menu.Item link data-txt="14" onClick={click}>
                  <BiCctv size="1.5rem" />
                  &nbsp;&nbsp;&nbsp;&nbsp; CC Tv Installation
                </Menu.Item>
                <Menu.Item link data-txt="15" onClick={click}>
                  <MdLocalDining size="1.5rem" />
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Postnew);
