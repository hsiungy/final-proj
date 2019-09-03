import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={8}
        zoom={props.zoom}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        center={props.center}>
            {props.markers &&
            props.markers.filter(marker => marker.isVisible).map((marker, index) => {
                const clickedVenue = props.venues.find(venue => venue.id === marker.id);
                return (
                    <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} 
                        onClick={() => props.handleMarkerClick(marker)}>
                            {marker.isOpen &&
                                (<InfoWindow>
                                    <React.Fragment>
                                        <p>{clickedVenue.name}</p>
                                        <p>{clickedVenue.location.address? clickedVenue.location.address : 'No Address Provided'}</p>
                                    </React.Fragment>
                                </InfoWindow>
                                )
                            }
                    </Marker>
                )
            }
            )}
    </GoogleMap>
))

class Map extends Component {
    render() {
        return (
            <MyMapComponent
                {...this.props}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAP6HLhyDjpJiTy4XKj7zLYAoN8ym_cl7E"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%`, width: `75%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}

export default Map; 