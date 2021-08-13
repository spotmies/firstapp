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
  const center = {
    lat: props.latitude,
    lng: props.logitude,
  };
  const [zoom, setZoom] = useState(17);
  const [popup, setpopup] = useState("spotmies");
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);

  useEffect(async () => {
    const addressObject = await reverseGeocode({
      lat: position.lat,
      long: position.lng,
    });
    setpopup(addressObject.display_name);
    props.updateMapAddress(addressObject.display_name);
    props.updateCoordinates(position);
  }, [position]);
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
          setPosition(marker.getLatLng());
          console.log("inside if");
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
        center={position}
        zoom={zoom}
        minZoom={1}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          ref={markerRef}
          position={position}
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
export default connect(null, mapDispatchToProps)(LeafletMap);
// export default LeafletMap;
