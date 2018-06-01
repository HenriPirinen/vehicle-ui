import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import api from '../keys.js';
//AIzaSyByUso6gm7TCZwzQDbSpx2TK4Zz1F6QqGo Google API key

export class MapTab extends React.Component {

  render() {
    return (
      <div>
        <Map google={this.props.google} zoom={5}>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: api.weather
})(MapTab)
