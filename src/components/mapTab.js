import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import api from '../keys.js';

export class MapTab extends React.Component {

  render() {
    return (
      <div id="mapContainer">
        <Map google={this.props.google} zoom={5}>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: api.api.maps
})(MapTab)
