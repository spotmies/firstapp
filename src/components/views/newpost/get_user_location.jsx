import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { connect } from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import LeafletMapp from "../leaflet/leaflet";

function GetLocationDialog(props) {
  const [open, setOpen] = useState(false);
  const [latitude, setLatitude] = useState(17.7367265);
  const [logitude, setlogitude] = useState(83.3073091);
  useEffect(() => {
    if (window.navigator.geolocation) {
      // Geolocation available
      navigator.geolocation.getCurrentPosition(function (location) {
        console.log(location.coords.latitude, location.coords.longitude);
        setLatitude(location.coords.latitude);
        setlogitude(location.coords.longitude);
        console.log(location.coords.accuracy);
      });
    }
    console.log(props.openDialog);
    setOpen(props.openDialog);
    return () => {};
  }, [props.openDialog]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        fullWidth={true}
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <>
            <div>{props.mapAddress}</div>
            <LeafletMapp
              style={{ width: "300px" }}
              latitude={latitude}
              logitude={logitude}
              draggable={true}
              popup={false}
            />
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => {
              props.onComplete();
            }}
            color="primary"
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    mapAddress: state.currentMapAddress,
  };
};
export default connect(mapStateToProps, null)(GetLocationDialog);
