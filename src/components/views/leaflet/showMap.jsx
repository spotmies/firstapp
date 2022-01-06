import React, { useState, useEffect, useRef } from "react";
import "./leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import leafGreen from "../../../images/sm3dlogo.svg";
import { reverseGeocode } from "../../../helpers/geocodes/reverse_geocode";

function ShowMap(props) {
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
    if (props.isupdateMapAddress) props.updateMapAddress(addressObject);
    if (map != null) map.flyTo(props.position, props.zoom ?? 17);
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
          props.allowUpdateMapAddressFromLeaflet(true);
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
        style={{ height: `${props.mapHeight ?? 50}vh` }}
        center={props.position}
        zoom={props.zoom ?? 17}
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

export default ShowMap;
