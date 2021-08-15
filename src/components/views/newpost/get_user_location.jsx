import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import LeafletMapp from "../leaflet/leaflet";
import { makeStyles } from "@material-ui/core/styles";
import "./newpost.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import StarIcon from "@material-ui/icons/Star";
//import icons
import { MdLocationOn, MdLocationSearching, MdSearch } from "react-icons/md";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
function GetLocationDialog(props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const getUserLocation = () => {
    console.log("user l");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (location) {
        console.log("user loc", location.coords);
        props.updateCoordinates({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      });
    } else {
      console.log("unable to find loc");
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
            <div className="main-content-map">
              <div>
                <div className="map-search-controls">
                  <input
                    className="input-search"
                    placeholder="Search Street, area, colony, city.................."
                  />
                  {/* <MdSearch size="2.5rem" /> */}
                  {/* <MdLocationSearching size="2.2rem" onClick={getUserLocation} /> */}
                </div>
                <div className="list-search-locations">
                  <List dense={true}>
                    <ListItem button>
                      <div>
                        <MdLocationOn />
                      </div>
                      <div className="list-text">
                        <p>lksjfdlk</p>
                      </div>
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <MdLocationOn />
                      </ListItemIcon>
                      <ListItemText primary="Chelsea Otakan" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <MdLocationOn />
                      </ListItemIcon>
                      <ListItemText primary="Eric Hoffman" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <MdLocationOn />
                      </ListItemIcon>
                      <ListItemText primary="Chelsea Otakan" />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <MdLocationOn />
                      </ListItemIcon>
                      <ListItemText primary="Eric Hoffman" />
                    </ListItem>
                  </List>
                </div>
              </div>
              {/* <div>{props.mapAddress.display_name}</div> */}
              <div>
                <LeafletMapp
                  style={{ width: "260px" }}
                  draggable={true}
                  popup={false}
                />
              </div>
            </div>
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
