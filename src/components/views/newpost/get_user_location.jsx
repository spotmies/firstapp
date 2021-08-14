import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import LeafletMapp from "../leaflet/leaflet";

function GetLocationDialog(props) {
  const [open, setOpen] = useState(false);

  const getUserLocation = () => {
    if (window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (location) {
        props.updateCoordinates({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      });
    }
  };

  useEffect(() => {
    if (Object.keys(props.editOrderData).length === 0) {
      getUserLocation();
    } else {
      props.updateCoordinates({
        lat: props.editOrderData.loc[0],
        lng: props.editOrderData.loc[1],
      });
    }
    setOpen(props.openDialog);
  }, [props.openDialog]);

  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };

  return (
    <div>
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
            <div>{props.mapAddress.display_name}</div>
            <Button onClick={getUserLocation} color="primary">
              Get current Location
            </Button>
            <LeafletMapp
              style={{ width: "300px" }}
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
    editOrderData: state.editOrderData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateCoordinates: (data) => {
      dispatch({ type: "UPDATE_JOB_POST_LOCATION", value: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GetLocationDialog);
