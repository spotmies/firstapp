import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import LeafletMapp from "../leaflet/leaflet";

//search bar imp
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";

import "./newpost.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
//import icons
import { MdMyLocation, MdNearMe } from "react-icons/md";
import { searchLocation } from "../../controllers/search_location_controller/search_location_controller";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function CustomSearchBar(props) {
  const searchRef = React.useRef(null);
  let searchInputTemp;
  const classes = useStyles();
  const changeHandle = (e) => {
    searchInputTemp = e.target.value;
    props.onChangeFunc(searchInputTemp);
  };
  const clickHandle = () => {
    props.onChangeFunc(searchRef.current?.value);
  };
  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search location here......"
        inputProps={{ "aria-label": "search google maps" }}
        // onChange={props.onChangeFunc}
        onChange={changeHandle}
        inputRef={searchRef}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={clickHandle}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

function GetLocationDialog(props) {
  const [open, setOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const scrollRef = React.useRef(null);

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
  const searchHandle = async (input) => {
    if (input === undefined || input === null) return;
    let search = input;
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
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  const currentLocation = () => {
    return (
      <div className="current-location-tools">
        <div className="leftpart">
          <p className="current-map-address">
            <MdNearMe color="grey" size="1.4rem" />
            &nbsp;{" "}
            {props.mapAddress?.display_name ?? props.mapAddress?.addressLine}
          </p>
        </div>
        <div className="rightpart">
          <MdMyLocation
            size="1.6rem"
            onClick={getUserLocation}
            className="cursor-pointer"
          />
        </div>
      </div>
    );
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Select your Location Here ?"}
      </DialogTitle>
      <DialogContent>
        <div className="dialog-body">
          <>
            <div className="main-content-map">
              <div className="leftpart">
                <div className="map-search-controls">
                  <CustomSearchBar onChangeFunc={searchHandle} />
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

              <div className="rightpart">
                <div className="current-location-web"> {currentLocation()}</div>
                <LeafletMapp draggable={true} popup={false} mapHeight={40} />
                <div className="current-location-mobile" ref={scrollRef}>
                  {currentLocation()}
                </div>
              </div>
            </div>
          </>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.onComplete();
            handleClose();
          }}
          color="primary"
          variant="contained"
          autoFocus
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
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
