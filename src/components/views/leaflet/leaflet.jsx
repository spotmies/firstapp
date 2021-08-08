import React, {Component} from 'react';
import './leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import leafGreen from '../../../images/sm3dlogo.svg';




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
      lat: 35.772790,
      lng: -78.652305,
    },
    zoom: 17
  }


  grenIcon = L.icon({
    iconUrl: leafGreen,
    shadowUrl: leafGreen,
    iconSize:     [78, 123], // size of the icon
  });



  render(){
    const positionGreenIcon = [this.state.greenIcon.lat, this.state.greenIcon.lng];
    return (
      <MapContainer className="map" center={positionGreenIcon} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={positionGreenIcon} 
        icon={this.grenIcon}
        >
          <Popup>
          I am a green leaf
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
}

export default Leaflet;