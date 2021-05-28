import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
 


class SimpleMap extends Component {
    
    static defaultProps = {
    center: {
        lat: 17.6599,
        lng: 75.9064
    },
    zoom: 11
  };
 useSes
  render() {
      
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBHzDWU9_RkghCksNvPOvCBpBQH6T3l5rk'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={localStorage.getItem('lata')}
            lng={localStorage.getItem('lona')}
            text={"Your Location"}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;