import "date-fns";
import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import { IconContext } from "react-icons";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
// import DialogBox from "./dialogbox";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import * as MaterialDesign from "react-icons/md"; // import * as FontAwesome from "react-icons/fa";
import * as BootStrap from "react-icons/bs";
import * as FontAwesome from "react-icons/fa";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import InputAdornment from "@material-ui/core/InputAdornment";
import { toast } from "react-toastify";
import FullScreenWidget from "../../reusable/helpers";
import useRecorder from "./useRecorder";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import "../rentals/rental.css";
import ListMediaFiles from "../../reusable/list_media_files";
import {
  MdLaptopMac,
  MdCheckCircle,
  MdAccountBalanceWallet,
  MdDescription,
  MdCreate,
  MdMic,
  MdAddAPhoto,
  MdClose,
  MdCheck,
} from "react-icons/md";
import firebase from "../../../firebase";
import "firebase/storage";
import "../../../post.css";
import ComingSoon from "../../reusable/coming_soon_widget";
import {
  createNewServiceRequest,
  updateOrder,
} from "../../controllers/new_post/order_controller";
import { loadState } from "../../../helpers/localStorage";

//for dialog
import Avatar from "@material-ui/core/Avatar";
import { blue } from "@material-ui/core/colors";
import { onlyNumRegEx } from "../../../helpers/regex/regex";

//audio recording

//image compressorjs
import Compressor from "compressorjs";
import { getFileType, validURL } from "../../../helpers/dateconv";
import GetLocationDialog from "./get_user_location";
import { useStores } from "../../stateManagement/index";

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
      isNewForm: true,

      //edit form details
      editDateForm: {},
    };
  }

  getOrder = async () => {
    let ordId = window.location.pathname;
    ordId = ordId.replace("/mybookings/id/edit/", "");
    let orders =
      this.props.orders.length > 0 ? this.props.orders : loadState("orders");
    let order = orders.filter((item) => item.ordId == ordId);
    // console.log(order);
    if (order.length > 0) {
      this.setState({
        job: order[0].job,
        openJobModal: false,
        isNewForm: false,
        editDateForm: order[0],
      });
    } else console.log("unable to load data");
    // eventLoader(false);
  };
  componentDidMount() {
    console.log("mount");
    if (this.props.editDate === "true") {
      // console.log("edit data coming >>>");
      this.getOrder();
    } else {
      let emptyObject = {};
      this.props.editOrder(emptyObject);
    }
    // console.log(this.state);
    // console.log(this.props);
  }

  eventLoader = (value, data) => {
    this.setState({ loader: value, loaderData: data ?? "Please wait..." });
  };

  updateJob = (value) => {
    // console.log(this.state);
    this.setState({
      job: value,
      openJobModal: false,
      isUserLogin: this.state.uId === null ? false : true,
    });
  };
  triggerJobModal = (value) => {
    // console.log("triggered", value);
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
          <Card className="orderCard">
            <CardHeader className="cardHeaderPost" title="new post" />
            <CardContent>
              <Postform
                job={this.state.job}
                triggerJobModal={this.triggerJobModal}
                eventLoader={this.eventLoader}
                addNewOrder={this.props.addNewOrder}
                history={this.props.history}
                uId={this.state.uId}
                prop={this.props}
                editDate={this.state.editDateForm}
              />
            </CardContent>
          </Card>

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
  dialogBox: {
    height: 200,
  },
  avatar: {
    backgroundColor: blue,
    color: blue,
  },
  errorColor: {
    "&:invalid": {
      border: "red solid 2px",
    },
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
      submitForm: false,
      showLocationDialog: false,
      // services: useStores,
      //edit form
      editFormFillFlag: false,
      editDateForm: this.props.editDate,
      ordId: null,

      //controllers
      problem: null,
      description: null,
      money: "",

      //auido files
      audioFile: null,
      stopRecoding: false,
    };
    this.updateSchedule = this.updateSchedule.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.compressorJs = this.compressorJs.bind(this);
    this.setAudioFile = this.setAudioFile.bind(this);
  }

  updateSchedule(date) {
    this.setState({
      schedule: date,
    });
  }
  handleChange(e) {
    var formName = e.target.name;
    var value = e.target.value;
    this.setState({
      [formName]: value,
    });
    // console.log(this.state);
  }

  async componentDidUpdate() {
    // console.log(this.props.editDate);
    if (
      Object.keys(this.props.editDate).length !== 0 &&
      this.state.editFormFillFlag === false
    ) {
      let tempEditData = this.props.editDate;
      this.setState({
        editFormFillFlag: true,
        problem: tempEditData.problem,
        description: tempEditData.desc,
        money: tempEditData.money,
        schedule: new Date(tempEditData.schedule),
        media: tempEditData.media,
        ordId: tempEditData.ordId,
        editDateForm: tempEditData,
      });
    }
    if (this.state.submitForm) {
      await this.handleSubmit();
    }
  }

  handleSubmit = async () => {
    console.log("submitting form");

    this.state.image = [];
    const state = this.state;
    let reqObj = {
      join: new Date().valueOf(),
      problem: state.problem,
      desc: state.description,
      money: state.money,
      schedule: new Date(state.schedule).valueOf(),
      job: this.props.job,
      loc:{
        coordinates: [this.props.prop.reqGeocodes.lat, this.props.prop.reqGeocodes.lng],
      },
      address: JSON.stringify(this.props.prop.reqAddress),
      media: state.media,
      ordState: !state.editFormFillFlag ? "req" : "updated",
      ordId: !state.editFormFillFlag ? new Date().valueOf() : state.ordId,
      uDetails: this.props.prop.userDetails._id,
      uId: state.uId,
    };

    console.log(reqObj);
    let response = !state.editFormFillFlag
      ? await createNewServiceRequest(reqObj.uId, reqObj)
      : await updateOrder(reqObj.ordId, reqObj);
    this.setState({ addPosted: true, submitForm: false });
    if (response !== false) {
      if (!state.editFormFillFlag) {
        this.props.addNewOrder(response);
        toast.info("service requested successfully");
      } else {
        this.props.prop.updateOrder(response);
        toast.info("Request updated");
      }
      console.log(response);
      this.props.history.push("/mybookings");
    } else {
      console.log("request not done");
      console.log(response);
    }
    this.props.eventLoader(false);
  };
  allowFiles = (array) => {
    let vidCount = 0;
    let audCount = 0;
    let imgCount = 0;
    for (let index = 0; index < array.length; index++) {
      // console.log("vid count >> ", vidCount);
      const element = array[index];
      if (getFileType(element) === "video") {
        vidCount += 1;
      } else if (getFileType(element) === "audio") {
        audCount += 1;
      } else if (getFileType(element) === "img") {
        imgCount += 1;
      }
    }
    return [imgCount, vidCount, audCount];
  };
  compressorJs = async (e) => {
    let filesFromWeb = e.target.files;
    let allFiles = [...filesFromWeb, ...this.state.image];

    //this function setFile to states
    const setFile = (compressedFile) => {
      this.setState({
        image: this.state.image.concat([compressedFile]),
      });
    };
    if (allFiles.length > 5) {
      toast.info("max files are 5 only");
      return;
    }

    let blocker = this.allowFiles(allFiles);
    if (blocker[0] > 5) {
      toast.info("maximum allowed image 5 only");
      return;
    } else if (blocker[1] > 1) {
      toast.info("max no of videos 1 only");
      return;
    } else if (blocker[2] > 2) {
      toast.info("max no of audio file 2 only");
      return;
    }
    for (let i = 0; i < filesFromWeb.length; i++) {
      let k = Number(i);
      if (getFileType(filesFromWeb[k]) === "img") {
        new Compressor(filesFromWeb[k], {
          quality: 0.6,
          success(result) {
            setFile(result);
          },
          error(err) {
            console.log(err.message);
          },
        });
      } else {
        //write video compressing tool here
        setFile(filesFromWeb[k]);
        console.log("file not compressed");
      }
    }
  };

  uploadImageToCloud = async () => {
    // e.preventDefault();
    console.log("media upload >>>");
    this.props.eventLoader(true, "Uploading Media...");

    for (let i = 0; i < this.state.image.length; i++) {
      console.log(`img no ${i}`);
      try {
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
            try {
              storage
                .ref(`users/${firebase.auth().currentUser.uid}/adpost/`)
                .child(this.state.image[k].name)
                .getDownloadURL()
                .then((url) => {
                  //setUrl(url);
                  console.log(url);
                  this.setState({
                    media: this.state.media.concat([url]),
                    submitForm:
                      i === this.state.image.length - 1 ? true : false,
                  });
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
    if (this.state.image.length < 1) {
      this.setState({
        submitForm: true,
      });
    }
  };

  deleteMedia = (key, typeOfMode) => {
    let ritem =
      typeOfMode === "offline" ? this.state.image[key] : this.state.media[key];
    let file = typeOfMode === "offline" ? "image" : "media";
    this.setState({
      [file]:
        typeOfMode === "offline"
          ? this.state.image.filter((e) => e !== ritem)
          : this.state.media.filter((e) => e !== ritem),
    });
  };

  changeJob = () => {
    this.props.triggerJobModal(true);
  };
  setAudioFile = (audioFile) => {
    let allFiles = [audioFile, ...this.state.image];
    let blocker = this.allowFiles(allFiles);
    if (blocker[2] > 2) {
      toast.info("max no of audio file 2 only");
      return;
    }
    this.setState({
      image: this.state.image.concat([audioFile]),
    });
  };
  locationModalState = (state) => {
    this.setState({ showLocationDialog: state });
  };
  render() {
    const { classes } = this.props.prop;

    return (
      <>
        <form
          className={classes.root}
          // noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            this.locationModalState(true);
          }}
        >
          <TextField
            id="filled-basic"
            label="Title of Your problem"
            variant="filled"
            required
            name="problem"
            onChange={this.handleChange}
            value={this.state.problem}
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
            variant="filled"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
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
            name="money"
            type="number"
            onChange={(e) => {
              if (onlyNumRegEx(e.target.value)) this.handleChange(e);
            }}
            value={this.state.money}
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
          <Grid container justify="flex-start">
            <input
              accept="image/*,video/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.compressorJs}
            />
            <label htmlFor="contained-button-file">
              <Tooltip title="Add Images, photos" aria-label="add">
                <Fab component="span" className={classes.button}>
                  <MdAddAPhoto size="1.5rem" />
                </Fab>
              </Tooltip>
            </label>
            <MediaImport setAudioFile={this.setAudioFile} />
          </Grid>
          {this.state.editFormFillFlag ? (
            <ListMediaFiles
              mediaFiles={this.state.media}
              typeOfMode="online"
              deleteMedia={this.deleteMedia}
              disableAddmore={true}
            />
          ) : null}
          <ListMediaFiles
            mediaFiles={this.state.image}
            deleteMedia={this.deleteMedia}
            typeOfMode="offline"
            addMore={this.compressorJs}
          />
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
              {!this.state.editFormFillFlag ? "Submit" : "Update"}
            </Button>

            <ServiceButton onClick={this.changeJob} prop={this.props} />
          </Grid>
        </form>
        <GetLocationDialog
          openDialog={this.state.showLocationDialog}
          close={this.locationModalState}
          onComplete={this.uploadImageToCloud}
        />
      </>
    );
  }
}

function ServiceButton(props) {
  const { services } = useStores();
  return (
    <Button
      variant="contained"
      // color="grey"
      onClick={props.onClick}
      size="large"
      // className={classes.cateButton}
      startIcon={<MdCheckCircle />}
    >
      {services.getServiceNameById(props.prop.job)}
    </Button>
  );
}

const GetCategoryIcons = (props) => {
  const mdIcon = MaterialDesign[props.iconId];
  const bsIcon = BootStrap[props.iconId];
  const fontAwesome = FontAwesome[props.iconId];

  if (props.iconId == null || props.iconId == undefined || props.iconId == "") return <MdLaptopMac />;

  switch (props.iconId.substring(0, 2)) {
    case "Md":
      return (
        <IconContext.Provider value={{ size: "1.5rem" }}>
          {React.createElement(mdIcon)}
        </IconContext.Provider>
      );
    case "Bs":
      return (
        <IconContext.Provider value={{ size: "1.5rem" }}>
          {React.createElement(bsIcon)}
        </IconContext.Provider>
      );

    case "Fa":
      return (
        <IconContext.Provider value={{ size: "1.5rem" }}>
          {React.createElement(fontAwesome)}
        </IconContext.Provider>
      );

    default:
      return <MdLaptopMac />;
  }
};

function SimpleDialog(props) {
  const classes = props.prop;
  const { onClose, selectedValue, open } = props;
  const handleListItemClick = (value) => {
    onClose(value);
  };
  const handleClose = () => {
    if (selectedValue !== null) onClose(selectedValue);
  };

  const { services } = useStores();
  // const mdIcons = MaterialIcons["MdAccountBox"];

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      className="categoryModal"
      onClose={handleClose}
    >
      <DialogTitle id="simple-dialog-title">
        <u> Select Category here</u>
      </DialogTitle>
      <div className="categoryModalBody">
  
        <List>
          {services.serviceList.map((data, key) => (
            <ListItem
              key={key}
              button
              onClick={() => handleListItemClick(data.serviceId)}
              // key={key}
              selected={data.serviceId === selectedValue}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <GetCategoryIcons iconId={data.userWebIcon} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={data.nameOfService} />
            </ListItem>
          ))}
        </List>
      </div>
    </Dialog>
  );
}
function MediaImport(props) {
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  const [audioFile, setaudioFile] = useState("");
  useEffect(() => {
    setaudioFile(audioURL);
    console.log(audioURL);
  }, [audioURL]);

  const setFile = () => {
    props.setAudioFile(audioURL);
    setaudioFile("");
  };
  const deleteFile = () => {
    setaudioFile("");
  };
  return (
    <>
      {isRecording === false ? (
        <Tooltip title="Add Audio, record" aria-label="add">
          <Fab
            onClick={startRecording}
            style={{ margin: "10px" }}
            disabled={audioFile !== ""}
          >
            <MdMic size="1.5rem" />
          </Fab>
        </Tooltip>
      ) : (
        <Tooltip title="Stop Audio, record" aria-label="add">
          <Fab style={{ margin: "10px" }} onClick={stopRecording}>
            <MdMic size="1.5rem" color="red" />
          </Fab>
        </Tooltip>
      )}
      {audioFile !== "" ? (
        <audio
          src={URL.createObjectURL(audioURL)}
          controls
          style={{ margin: "10px" }}
        />
      ) : null}
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
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userDetails:
      Object.keys(state.userDetails).length !== 0
        ? state.userDetails
        : loadState("userDetails") ?? [],
    orders: state.orders,
    reqGeocodes: state.jobPostLocation,
    reqAddress: state.currentMapAddress,
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
    updateOrder: (data) => {
      dispatch({ type: "UPDATE_ORDER", value: data });
    },
    editOrder: (data) => {
      dispatch({ type: "EDIT_ORDER_DATA", value: data });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Postnew));
