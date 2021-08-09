import React, { Component } from "react";
import "./leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import leafGreen from "../../../images/sm3dlogo.svg";
import { MdClose } from "react-icons/md";

function LeafletMap({
  latitude = 17.734467,
  logitude = 83.312754,
  zoom = 17,
  popup = "spotmies",
}) {
  const positionGreenIcon = [latitude, logitude];
  const grenIcon = L.icon({
    iconUrl: leafGreen,
    shadowUrl: leafGreen,
    iconSize: [38, 95], // size of the icon
  });
  return (
    <div>
      <MapContainer
        className="map"
        center={positionGreenIcon}
        zoom={zoom}
        minZoom={4}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={positionGreenIcon} icon={grenIcon}>
          <Popup>{popup}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

class Leaflet extends Component {
  state = {
    greenIcon: {
      lat: 17.734467,
      lng: 83.312754,
    },
    redIcon: {
      lat: 35.774416,
      lng: -78.633271,
    },
    orangeIcon: {
      lat: 35.77279,
      lng: -78.652305,
    },
    zoom: 17,
  };

  grenIcon = L.icon({
    iconUrl: leafGreen,
    shadowUrl: leafGreen,
    iconSize: [78, 123], // size of the icon
  });

  render() {
    const positionGreenIcon = [
      this.state.greenIcon.lat,
      this.state.greenIcon.lng,
    ];
    return (
      <MapContainer
        className="map"
        center={positionGreenIcon}
        zoom={this.state.zoom}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={positionGreenIcon} icon={this.grenIcon}>
          <Popup>I am a green leaf</Popup>
        </Marker>
      </MapContainer>
    );
  }
}

export default LeafletMap;
