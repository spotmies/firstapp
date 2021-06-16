import "date-fns";
import React, { Component, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import {
  // Button,
  Form,
  Input,
  Card,
  Label,
  Image,
  Modal,
  Menu,
} from "semantic-ui-react";

import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Cardd from "@material-ui/core/Card";
import Badge from "@material-ui/core/Badge";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

import { withStyles } from "@material-ui/core/styles";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import InputAdornment from "@material-ui/core/InputAdornment";
import { toast } from "react-toastify";
import FullScreenWidget from "../../reusable/helpers";
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
  MdAccountBalance,
  MdAccountBalanceWallet,
  MdDescription,
  MdCreate,
  MdMic,
  MdVideoLibrary,
  MdAddAPhoto,
  MdDelete,
  MdClear,
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
import { loadState } from "../../../helpers/localStorage";

//for dialog
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import { maxWidth } from "@material-ui/system";
import { constants } from "../../../helpers/constants";

const history = createHashHistory();

const storage = firebase.storage();

class Postnew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: null,
      openJobModal: true,
      loader: false,
      isUserLogin: true,
      uId: this.props.userDetails.uId ?? null,
      loaderData: "Please wait...",
    };
  }

  eventLoader = (value, data) => {
    this.setState({ loader: value, loaderData: data ?? "Please wait..." });
  };

  updateJob = (value) => {
    this.setState({
      job: value,
      openJobModal: false,
      isUserLogin: this.state.uId == null ? false : true,
    });
  };
  triggerJobModal = (value) => {
    console.log("triggered", value);
    this.setState({ openJobModal: value });
  };
  goToSignUp = () => {
    this.props.history.push("/signup");
  };
  render() {
    return (
      <>
        <ComingSoon />
        <FullScreenWidget
          type="loader"
          show={this.state.loader}
          data="Please wait..."
        />
        <FullScreenWidget
          type="noDataPlaceHolder"
          show={!this.state.isUserLogin}
          data="Please Login then Proceed"
          buttonLabel="Login / Signup"
          onButtonClick={this.goToSignUp}
        />

        <div
          style={{
            padding: "20px",
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
                history={this.props.history}
                uId={this.state.uId}
                prop={this.props}
              />
            </Card.Content>
          </Card>
          {/* <ModalExampleModal
            job={this.state.job}
            updateJob={this.updateJob}
            trigger={this.state.openJobModal}
          /> */}

          <SimpleDialog
            selectedValue={this.state.job}
            open={this.state.openJobModal}
            onClose={this.updateJob}
            prop={this.props}
          />
        </div>
      </>
    );
  }
}
const useStyles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
      palette: {
        primary: "#e91e63",
        secondary: "#e91e63",
      },
    },
  },
  input: {
    display: "none",
  },
  button: {
    // color: "rgb(25, 148, 255)",
    margin: 10,
    size: 20,
  },
  media: {
    height: 70,
    width: 110,
    margin: 10,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
  submitButton: {
    width: "30%",
  },
  cateButton: {
    maxWidth: "60%",
  },
  listBuilder: {
    overflow: "auto",
  },
  dialogBox: {
    // maxHeight: "80%",
    height: 200,
    // width: "auto",
    // maxWidth: "90%",
  },
});
class Postform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: new Date(),
      media: [],
      image: [],
      valprogress: 0,
      pflag: false,
      addPosted: false,
      uId: this.props.uId ?? null,
      //controllers
      problemController: React.createRef(),
      descriptionController: React.createRef(),
      moneyController: React.createRef(),
      scheduleController: React.createRef(),
    };
    this.updateSchedule = this.updateSchedule.bind(this);
  }

  updateSchedule(date) {
    this.setState({
      schedule: date,
    });
  }

  componentDidUpdate() {
    if (this.state.image.length > 0 && this.state.addPosted == false) {
      if (this.state.image.length == this.state.media.length) {
        this.handleSubmit();
      }
    }
  }

  handleSubmit = async (e) => {
    const state = this.state;
    let reqObj = {
      join: new Date().valueOf(),
      problem: state.problemController.current.value,
      desc: state.descriptionController.current.value,
      money: state.moneyController.current
        ? state.moneyController.current.value
        : null,
      schedule: new Date(state.schedule).valueOf(),
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

      toast.info("service requested");
      console.log(response);
      this.props.history.push("/mybookings");
    } else {
      console.log("request not done");
      console.log(response);
    }
    this.props.eventLoader(false);
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
        })
        .catch(function (error) {
          console.log(error.message);
          toast.warning(error.message);
        });
    }
  };

  uploadImageToCloud = async (e) => {
    e.preventDefault();
    this.props.eventLoader(true, "Uploading Media...");

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

  deleteImage = (key) => {
    let ritem = this.state.image[key];
    this.setState({
      image: this.state.image.filter((e) => e !== ritem),
    });
  };

  pricetag = (flag) => {
    this.setState({ pflag: flag });
  };

  changeJob = () => {
    this.props.triggerJobModal(true);
  };

  render() {
    const { classes } = this.props.prop;
    return (
      <>
        <form
          className={classes.root}
          // noValidate
          autoComplete="off"
          onSubmit={this.uploadImageToCloud}
        >
          <TextField
            id="filled-basic"
            label="Title of Your problem"
            inputRef={this.state.problemController}
            variant="filled"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MdCreate />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="filled-multiline-static"
            label="Description"
            multiline
            rows={4}
            // defaultValue="Default Value"
            variant="filled"
            inputRef={this.state.descriptionController}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MdDescription />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="filled-basic"
            label="Want to mention Price"
            variant="filled"
            inputRef={this.state.moneyController}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MdAccountBalanceWallet />
                </InputAdornment>
              ),
              startAdornment: (
                <InputAdornment position="start">₹</InputAdornment>
              ),
            }}
          />

          <Grid container justify="left">
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.compressImages}
            />
            <label htmlFor="contained-button-file">
              <Tooltip title="Add Images, photos" aria-label="add">
                <Fab component="span" className={classes.button}>
                  <MdAddAPhoto size="1.5rem" />
                </Fab>
              </Tooltip>
            </label>
            <Tooltip title="Add Audio, record" aria-label="add">
              <Fab className={classes.button}>
                <MdMic size="1.5rem" />
              </Fab>
            </Tooltip>
            <Tooltip title="Add Video" aria-label="add">
              <Fab className={classes.button}>
                <MdVideoLibrary size="1.5rem" />
              </Fab>
            </Tooltip>
          </Grid>

          <Grid
            container
            justify="left"

            // alignItems="center"
          >
            {this.state.image.map((nap, key) => (
              <Badge color="white" badgeContent=" " variant="dot">
                <CardMedia
                  key={key}
                  className={classes.media}
                  image={URL.createObjectURL(nap)}
                  title={nap.name}
                />
                <MdClear
                  color="red"
                  onClick={() => {
                    this.deleteImage(key);
                  }}
                />
              </Badge>
            ))}
          </Grid>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              required
              margin="normal"
              variant="filled"
              id="time-picker"
              label="Schedule"
              value={this.state.schedule}
              onChange={this.updateSchedule}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className={classes.submitButton}
              startIcon={<MdCheckCircle />}
            >
              Submit
            </Button>

            <Button
              variant="contained"
              color="grey"
              size="large"
              className={classes.cateButton}
              onClick={this.changeJob}
              startIcon={<MdCheckCircle />}
            >
              {categoryAssign(this.props.job)}
            </Button>
          </Grid>
        </form>
      </>
    );
  }
}

function SimpleDialog(props) {
  const classes = props.prop;
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  var loadData = constants.categories;

  return (
    <Dialog
      // onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      className="categoryModal"
    >
      <DialogTitle id="simple-dialog-title">Select Category here</DialogTitle>
      <List
      // className={classes.listBuilder}
      >
        {loadData.map((email, key) => (
          <ListItem button onClick={() => handleListItemClick(key)} key={email}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}
      </List>
    </Dialog>
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
    let val = e.target.dataset.txt;
    console.log(val);
    props.updateJob(val);
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
    userDetails:
      Object.keys(state.userDetails).length != 0
        ? state.userDetails
        : loadState("userDetails") ?? [],
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Postnew));
