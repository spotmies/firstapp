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
//import icons
import { MdMyLocation, MdNearMe } from "react-icons/md";
import { searchLocation } from "../../controllers/search_location_controller/search_location_controller";

function GetLocationDialog(props) {
  const [open, setOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const getUserLocation = () => {
    props.allowUpdateMapAddressFromLeaflet(true);
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
      props.updateLoader(true);
      let response = await searchLocation(search);
      console.log(response);
      setSearchSuggestions(response);
      props.updateLoader(false);
    }
  };
  const setLocation = (data) => {
    props.allowUpdateMapAddressFromLeaflet(false);
    props.updateMapAddress(data);
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
                          <MdNearMe color="grey" size="1.2rem" />
                        </div>
                        <div className="list-text">
                          {cap.remaingTargetWord != null ||
                          cap.remaingTargetWord != undefined ? (
                            <>
                              <b>{cap.searchTargetWord}</b>
                              {cap.remaingTargetWord}
                            </>
                          ) : null}
                          {cap.remainingAddress ?? cap.addressLine}
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </div>
              </div>
              {/* <div>{props.mapAddress.display_name}</div> */}
              <div>
                <div className="current-location-tools">
                  <p>
                    <MdNearMe color="grey" size="1.4rem" />
                    &nbsp;{" "}
                    {props.mapAddress?.display_name ??
                      props.mapAddress?.addressLine}
                  </p>
                  <MdMyLocation
                    size="1.6rem"
                    onClick={getUserLocation}
                    className="cursor-pointer"
                  />
                </div>
                <LeafletMapp
                  style={{ width: "500px" }}
                  draggable={true}
                  popup={false}
                  // updateMapAddress={false}
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
    loader: state.universalLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateCoordinates: (data) => {
      dispatch({ type: "UPDATE_JOB_POST_LOCATION", value: data });
    },
    updateMapAddress: (data) => {
      dispatch({ type: "UPDATE_CURRENT_MAP_ADDRESS", value: data });
    },
    allowUpdateMapAddressFromLeaflet: (data) => {
      dispatch({ type: "IS_UPDATE_MAP_ADDRESS", value: data });
    },
    updateLoader: (data) => {
      dispatch({ type: "UPDATE_UNIVERSAL_LOADER", value: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GetLocationDialog);
