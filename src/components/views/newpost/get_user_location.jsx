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
import {
  MdHistory,
  MdLocationOn,
  MdLocationSearching,
  MdNearMe,
  MdSearch,
} from "react-icons/md";
import { apiGetMethod } from "../../../api_services/api_calls/api_calls";
import { searchLocation } from "../../controllers/search_location_controller/search_location_controller";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
function GetLocationDialog(props) {
  const [open, setOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
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
  const searchHandle = async (e) => {
    let search = e.target.value;
    if (search.length > 3) {
      let response = await searchLocation(search);
      console.log(response);
      setSearchSuggestions(response);
    }
  };
  const setLocation = (data) => {
    props.updateCoordinates({
      lat: data.coordinates.latitude,
      lng: data.coordinates.logitude,
    });
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
                    onChange={searchHandle}
                  />
                  {/* <MdSearch size="2.5rem" /> */}
                  {/* <MdLocationSearching size="2.2rem" onClick={getUserLocation} /> */}
                </div>
                <div className="list-search-locations">
                  <List dense={true}>
                    <ListItem
                      button
                      style={{ paddingBottom: "10px" }}
                      onClick={getUserLocation}
                    >
                      <div>
                        <MdNearMe color="grey" size="1.2rem" />
                      </div>
                      <div className="list-text">
                        {props.mapAddress.display_name}
                      </div>
                    </ListItem>
                    {searchSuggestions.map((cap, key) => (
                      <ListItem
                        button
                        key={key}
                        style={{ paddingBottom: "10px" }}
                        onClick={() => {
                          setLocation(cap);
                        }}
                      >
                        <div>
                          <MdLocationOn color="grey" size="1.2rem" />
                        </div>
                        <div className="list-text">{cap.addressLine}</div>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </div>
              {/* <div>{props.mapAddress.display_name}</div> */}
              <div>
                <LeafletMapp
                  style={{ width: "500px" }}
                  draggable={true}
                  popup={false}
                />
                <p>{props.mapAddress.display_name}</p>
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
