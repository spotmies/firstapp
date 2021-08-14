import React, { Component, useState, useEffect, useRef } from "react";
import "./leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import leafGreen from "../../../images/sm3dlogo.svg";
import { MdClose } from "react-icons/md";
import { reverseGeocode } from "../../../helpers/geocodes/reverse_geocode";
import { connect } from "react-redux";
// import LocationPicker from "react-leaflet-location-picker";

function LeafletMap(props) {
  const [zoom, setZoom] = useState(17);
  const [popup, setpopup] = useState("spotmies");
  const [map, setMap] = useState(null);
  const markerRef = useRef(null);
  useEffect(() => {
    console.log("new lat", props.latitude);
  }, [props.latitude]);
  useEffect(async () => {
    const addressObject = await reverseGeocode({
      lat: props.position.lat,
      long: props.position.lng,
    });
    setpopup(addressObject.display_name);
    props.updateMapAddress(addressObject);
    if (map != null) map.flyTo(props.position, zoom);
  }, [props.position]);
  const grenIcon = L.icon({
    iconUrl: leafGreen,
    shadowUrl: leafGreen,
    iconSize: [38, 95], // size of the icon
  });
  const eventHandlers = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          props.updateCoordinates(marker.getLatLng());

          console.log("inside if", marker.getLatLng());
        }
      },
    }),
    []
  );

  return (
    <div>
      <MapContainer
        className="map"
        style={{ height: "50vh", width: "700px" }}
        center={props.position}
        zoom={zoom}
        minZoom={1}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          ref={markerRef}
          position={props.position}
          icon={grenIcon}
          draggable={props.draggable ?? false}
          eventHandlers={eventHandlers}
        >
          {props.popup == false ? null : <Popup>{popup}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    position: state.jobPostLocation,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateMapAddress: (data) => {
      dispatch({ type: "UPDATE_CURRENT_MAP_ADDRESS", value: data });
    },
    updateCoordinates: (data) => {
      dispatch({ type: "UPDATE_JOB_POST_LOCATION", value: data });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LeafletMap);
// export default LeafletMap;
